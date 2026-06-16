import { useState } from 'react';
import GameCard from '../components/GameCard';
import { gamesData } from '../gamesData';
import t from '../i18n/ar';

const CATS = [
  { key: 'All Games',    label: t.cat_all },
  { key: 'Easy to Play', label: t.cat_easy },
  { key: 'Puzzle',       label: t.cat_puzzle },
  { key: 'Action',       label: t.cat_action },
  { key: 'Arcade',       label: t.cat_arcade },
  { key: 'Top 10 Games', label: t.cat_top10 },
];

export default function Games() {
  const [active, setActive] = useState('All Games');
  const filtered = gamesData.filter(g => g.categories.includes(active));

  return (
    <>
      <div className="page-hero">
        <h1 className="font-heading text-4xl lg:text-5xl font-black uppercase mb-2">{t.games_hero}</h1>
        <p className="font-body text-lg opacity-80">{t.games_sub}</p>
      </div>

      {/* Category filter */}
      <div className="bg_hue_4_start py-3 px-4 sticky top-0 z-40">
        <div className="lg:container lg:mx-auto flex flex-wrap gap-2 justify-center">
          {CATS.map(c => (
            <button key={c.key} onClick={() => setActive(c.key)}
              className={`font-heading font-bold text-xs uppercase px-3 py-1 rounded-full border-2 transition-colors ${active === c.key ? 'bg_hue_1_start border_hue_1_start font_main' : 'border_hue_1_start font_hue_1_start hover:bg_hue_1_start hover:font_main'}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:container lg:px-4 lg:mx-auto px-3 py-6">
        <p className="font-body text-sm grey_font mb-4 text-center">{t.games_count(filtered.length)}</p>
        <div className="quest-grid">
          {filtered.map((g, i) => (
            <GameCard key={`${g.name}-${i}`} game={g}
              borderClass="border_spot_start" btnBgClass="bg_spot_start"
              textClass="spot_fontcol" titleClass="darklight_fontcol" />
          ))}
        </div>
      </div>
    </>
  );
}
