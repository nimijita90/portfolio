"use client";

import type { CSSProperties } from "react";

// An illustrated, invented UI — not a real screenshot — used as a stand-in
// wherever a real product capture isn't available yet (WAND's own real
// screens are used everywhere one exists; nothing here claims to be XSITE's
// or the Customiser's actual interface). Names, studios and odds are all
// placeholder content the same way lorem ipsum is.
const games = [
  { name: "Golden Reels", studio: "Nova Studios", hue: 265 },
  { name: "Diamond Rush", studio: "Apex Games", hue: 199 },
  { name: "Mystic Fortune", studio: "Vertex Play", hue: 322 },
  { name: "Neon Blitz", studio: "Lumen Gaming", hue: 161 },
  { name: "Wild Odyssey", studio: "Nova Studios", hue: 27 },
  { name: "Royal Vault", studio: "Apex Games", hue: 45 },
  { name: "Lucky Cascade", studio: "Vertex Play", hue: 191 },
  { name: "Cosmic Spins", studio: "Lumen Gaming", hue: 283 },
];

const matches = [
  { home: "Real Madrid", away: "Barcelona", time: "20:00", odds: ["1.85", "3.40", "4.20"] },
  { home: "Lakers", away: "Celtics", time: "02:30", odds: ["1.65", "—", "2.25"] },
  { home: "Man City", away: "Liverpool", time: "17:30", odds: ["2.10", "3.60", "3.20"] },
  { home: "Alcaraz", away: "Sinner", time: "15:00", odds: ["1.90", "—", "1.95"] },
];

export function CasinoMockup({ mode = "casino", device = "desktop" }: { mode?: "casino" | "sportsbook"; device?: "desktop" | "mobile" }) {
  const tileCount = device === "mobile" ? 4 : 8;
  return (
    <div className={`mock mock--${device}`} aria-hidden="true">
      <div className="mock__bar">
        <span className="mock__logo" />
        {device === "desktop" && <nav className="mock__nav"><i className={mode === "casino" ? "is-on" : ""} /><i className={mode === "sportsbook" ? "is-on" : ""} /><i /><i /></nav>}
        <div className="mock__actions"><span className="mock__balance">€1,240.00</span><span className="mock__avatar" /></div>
      </div>
      {mode === "casino" ? (
        <>
          <div className="mock__hero" />
          <div className="mock__tabs"><i className="is-on" /><i /><i /><i />{device === "desktop" && <i />}</div>
          <div className="mock__grid">
            {games.slice(0, tileCount).map((g) => (
              <div className="mock__tile" key={g.name} style={{ "--h": g.hue } as CSSProperties}>
                <div className="mock__thumb" />
                <p>{g.name}</p>
                <span>{g.studio}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mock__hero mock__hero--sport" />
          <div className="mock__tabs"><i className="is-on" /><i /><i />{device === "desktop" && <i />}</div>
          <div className="mock__matches">
            {matches.slice(0, device === "mobile" ? 3 : 4).map((m) => (
              <div className="mock__match" key={m.home}>
                <span className="mock__time">{m.time}</span>
                <span className="mock__teams">{m.home} <em>vs</em> {m.away}</span>
                <span className="mock__odds">{m.odds.map((o, i) => <b key={i}>{o}</b>)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

