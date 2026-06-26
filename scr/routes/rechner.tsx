import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Crosshair, Wind, Mountain, Target } from "lucide-react";
import { AppShell, SubBar } from "@/components/AppShell";
import { Card } from "@/components/ui-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rechner")({
  head: () => ({
    meta: [
      { title: "Ballistik-Rechner — AGA Trainer" },
      {
        name: "description",
        content:
          "Vereinfachter Ballistik-Rechner für Scharfschützen und Artillerie: Kaliber, Distanz, Wind, Neigung — Drop, Drift und Haltepunkt.",
      },
    ],
  }),
  component: RechnerPage,
});

type Caliber = {
  id: string;
  label: string;
  kind: "rifle" | "artillery";
  muzzleVelocity: number; // m/s
  bc: number; // ballistic coefficient G1
  description: string;
};

const CALIBERS: Caliber[] = [
  { id: "556", label: "5,56 × 45 mm NATO", kind: "rifle", muzzleVelocity: 920, bc: 0.151, description: "G36, HK416" },
  { id: "762", label: "7,62 × 51 mm NATO", kind: "rifle", muzzleVelocity: 850, bc: 0.4, description: "G3, G28, MG5" },
  { id: "338", label: ".338 Lapua Magnum", kind: "rifle", muzzleVelocity: 915, bc: 0.62, description: "G29 Scharfschützengewehr" },
  { id: "50", label: ".50 BMG (12,7 × 99)", kind: "rifle", muzzleVelocity: 853, bc: 1.05, description: "G82 Anti-Material-Rifle" },
  { id: "120", label: "120 mm Mörser", kind: "artillery", muzzleVelocity: 318, bc: 2.5, description: "Tampella-Mörser" },
  { id: "155", label: "155 mm Haubitze", kind: "artillery", muzzleVelocity: 945, bc: 3.2, description: "PzH 2000" },
];

const G = 9.81;

function computeBallistics(opts: {
  caliber: Caliber;
  distanceM: number;
  windMS: number;
  windDirDeg: number; // 0 = headwind, 90 = right
  inclineDeg: number;
}) {
  const { caliber, distanceM, windMS, windDirDeg, inclineDeg } = opts;
  // Simple drag model: average velocity decays with BC over distance
  const dragFactor = Math.max(0.4, 1 - distanceM / (caliber.bc * 6000));
  const avgV = caliber.muzzleVelocity * ((1 + dragFactor) / 2);
  const tof = distanceM / avgV; // time of flight (s)
  const dropM = 0.5 * G * tof * tof; // free fall component
  // Rifleman's rule: effective horizontal distance for incline
  const effHoriz = distanceM * Math.cos((inclineDeg * Math.PI) / 180);
  const dropEff = 0.5 * G * Math.pow(effHoriz / avgV, 2);

  // Cross wind component
  const crossWind = windMS * Math.sin((windDirDeg * Math.PI) / 180);
  const driftM = crossWind * tof * 0.55; // empirical factor for lag

  // Convert to MOA / MIL at given distance
  const dropMOA = (dropEff / distanceM) * (60 * 180 / Math.PI);
  const dropMIL = (dropEff / distanceM) * 1000;
  const driftMOA = (Math.abs(driftM) / distanceM) * (60 * 180 / Math.PI);
  const driftMIL = (Math.abs(driftM) / distanceM) * 1000;

  // Artillery: elevation angle to hit at distance (parabolic, vacuum)
  // sin(2θ) = g·d / v²
  const ratio = Math.min(1, (G * distanceM) / (caliber.muzzleVelocity * caliber.muzzleVelocity));
  const elevationDeg = (Math.asin(ratio) / 2) * (180 / Math.PI);

  return {
    tof,
    dropM,
    dropEffM: dropEff,
    driftM,
    driftDir: crossWind >= 0 ? "rechts" : "links",
    dropMOA,
    dropMIL,
    driftMOA,
    driftMIL,
    elevationDeg,
  };
}

function RechnerPage() {
  const [calId, setCalId] = useState("762");
  const [distanceKm, setDistanceKm] = useState("0.6");
  const [windMS, setWindMS] = useState("3");
  const [windDir, setWindDir] = useState("90");
  const [incline, setIncline] = useState("0");

  const caliber = CALIBERS.find((c) => c.id === calId)!;
  const distanceM = Math.max(1, Number(distanceKm) * 1000);

  const result = useMemo(
    () =>
      computeBallistics({
        caliber,
        distanceM,
        windMS: Number(windMS) || 0,
        windDirDeg: Number(windDir) || 0,
        inclineDeg: Number(incline) || 0,
      }),
    [caliber, distanceM, windMS, windDir, incline],
  );

  const isArtillery = caliber.kind === "artillery";

  return (
    <AppShell>
      <SubBar title="Ballistik-Rechner" back={{ to: "/", label: "Dashboard" }} />

      <div className="px-5 pt-5 space-y-4">
        <Card className="p-4 bg-mil-pale border-mil/20">
          <p className="text-xs text-ink-soft leading-relaxed">
            Vereinfachte Berechnung für Ausbildungszwecke — Drop, Drift und Haltepunkt
            basierend auf Mündungsgeschwindigkeit, BC und Umgebungswerten.
            <strong> Nicht für scharfen Einsatz.</strong>
          </p>
        </Card>

        {/* Caliber */}
        <Card className="p-5 space-y-3">
          <Label icon={Target}>Kaliber / Waffe</Label>
          <div className="grid grid-cols-1 gap-2">
            {CALIBERS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCalId(c.id)}
                className={cn(
                  "press text-left p-3 rounded-xl border flex items-center justify-between",
                  calId === c.id
                    ? "border-mil bg-mil-pale"
                    : "border-line bg-surface hover:border-mil/50",
                )}
              >
                <div>
                  <p className="font-semibold text-ink text-sm">{c.label}</p>
                  <p className="text-xs text-ink-mute">{c.description}</p>
                </div>
                <span className="text-[10px] font-mono uppercase text-mil bg-white px-2 py-0.5 rounded border border-mil/20">
                  {c.kind === "rifle" ? "Gewehr" : "Artillerie"}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Distance */}
        <Card className="p-5 space-y-3">
          <Label icon={Crosshair}>Distanz zum Ziel (km)</Label>
          <NumInput value={distanceKm} onChange={setDistanceKm} step="0.05" />
          <p className="text-xs text-ink-mute">
            = {Math.round(distanceM)} m
          </p>
        </Card>

        {/* Wind */}
        <Card className="p-5 space-y-3">
          <Label icon={Wind}>Wind</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] font-medium text-ink-mute mb-1">Stärke (m/s)</p>
              <NumInput value={windMS} onChange={setWindMS} step="0.5" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-ink-mute mb-1">Richtung (°)</p>
              <NumInput value={windDir} onChange={setWindDir} step="5" />
            </div>
          </div>
          <p className="text-xs text-ink-mute">0° = Gegenwind, 90° = von rechts, 180° = Rückenwind.</p>
        </Card>

        {/* Incline */}
        <Card className="p-5 space-y-3">
          <Label icon={Mountain}>Neigung (°)</Label>
          <NumInput value={incline} onChange={setIncline} step="1" />
          <p className="text-xs text-ink-mute">Positiv = aufwärts schießen, negativ = abwärts.</p>
        </Card>

        {/* Results */}
        <Card className="p-5 bg-ink text-white space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mil-light">
            Feuerleitwerte
          </p>

          {isArtillery ? (
            <Row label="Rohrerhöhung" value={`${result.elevationDeg.toFixed(2)} °`} mono />
          ) : null}

          <Row label="Flugzeit" value={`${result.tof.toFixed(2)} s`} mono />
          <Row
            label="Fallhöhe (effektiv)"
            value={`${result.dropEffM.toFixed(2)} m`}
            mono
          />
          <Row label="Haltepunkt Höhe" value={`${result.dropMIL.toFixed(2)} MIL · ${result.dropMOA.toFixed(1)} MOA`} mono />
          <Row
            label="Windversatz"
            value={`${Math.abs(result.driftM).toFixed(2)} m ${result.driftDir}`}
            mono
          />
          <Row
            label="Haltepunkt Seite"
            value={`${result.driftMIL.toFixed(2)} MIL · ${result.driftMOA.toFixed(1)} MOA`}
            mono
          />
        </Card>

        <p className="text-[11px] text-ink-mute text-center pb-2">
          Modell: Drag-Approximation auf Basis BC ({caliber.bc}) und v₀ = {caliber.muzzleVelocity} m/s.
        </p>
      </div>
    </AppShell>
  );
}

function Label({ icon: Icon, children }: { icon: typeof Crosshair; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-mil" />
      <p className="text-sm font-bold text-ink">{children}</p>
    </div>
  );
}

function NumInput({ value, onChange, step }: { value: string; onChange: (v: string) => void; step?: string }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      step={step}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-11 rounded-xl border border-line bg-surface px-3 font-mono text-base text-ink focus:outline-none focus:border-mil"
    />
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2 last:border-0 last:pb-0">
      <p className="text-xs uppercase tracking-wider text-white/60">{label}</p>
      <p className={cn("text-sm font-bold text-white", mono && "font-mono tabular-nums")}>{value}</p>
    </div>
  );
}
