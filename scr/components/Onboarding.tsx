import { useState } from "react";
import nametape from "@/assets/nametape.png.asset.json";
import camoBg from "@/assets/camo-bg.png.asset.json";
import { useStore } from "@/lib/store";

export function Onboarding() {
  const setUserName = useStore((s) => s.setUserName);
  const [value, setValue] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setUserName(value);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
      style={{
        backgroundImage: `url(${camoBg.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-sm text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 mb-2">
          AGA Trainer
        </p>
        <h1 className="text-2xl font-bold text-white mb-6 drop-shadow">
          Willkommen, Rekrut
        </h1>

        <form onSubmit={submit} className="space-y-4">
          {/* Nametape with input overlaid on the strip */}
          <div className="relative aspect-[4/3] w-full">
            <img
              src={nametape.url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
            />
            {/* The strip sits roughly in the vertical middle of the photo */}
            <div className="absolute left-[10%] right-[10%] top-[42%] h-[18%] flex items-center justify-center">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value.toUpperCase())}
                placeholder="DEIN NAME"
                maxLength={14}
                autoFocus
                className="w-full h-full bg-transparent text-center font-black tracking-[0.15em] text-black text-2xl sm:text-3xl uppercase outline-none placeholder:text-black/30"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              />
            </div>
          </div>

          <p className="text-xs text-white/80">
            Trage deinen Namen ein — er erscheint dauerhaft auf deinem Namensband.
          </p>

          <button
            type="submit"
            disabled={!value.trim()}
            className="press w-full h-12 rounded-xl bg-mil text-white font-semibold disabled:opacity-50"
          >
            Dienst antreten
          </button>
        </form>
      </div>
    </div>
  );
}
