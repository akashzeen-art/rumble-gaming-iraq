import { useState } from 'react';
import PromoBanner from '../components/PromoBanner';
import GameCard from '../components/GameCard';
import { gamesData } from '../gamesData';
import { useTranslation } from '../i18n';

export default function Home() {
  const { t } = useTranslation();
  const [active, setActive] = useState('All Games');

  const CATS = [
    { key: 'All Games',    label: t.cat_all },
    { key: 'Easy to Play', label: t.cat_easy },
    { key: 'Puzzle',       label: t.cat_puzzle },
    { key: 'Action',       label: t.cat_action },
    { key: 'Arcade',       label: t.cat_arcade },
    { key: 'Top 10 Games', label: t.cat_top10 },
  ];

  const filtered = active === 'All Games'
    ? gamesData
    : gamesData.filter(g => g.categories.includes(active));

  return (
    <>
      <PromoBanner />

      <div className="relative mb-0">
        <div className="divider w-full mb-6 h-2 absolute -mt-2 z-20" />
      </div>

      <div className="w-full bg_hue_4_start pb-8" id="games">
        <div className="lg:container lg:px-4 lg:mx-auto px-3 pt-8">
          <h1 className="text-3xl font-bold text-center font-heading font_main mb-1">
            {t.home_all_games}
          </h1>
          <p className="text-base font-medium text-center font-body mb-6 font_main opacity-80">
            {t.home_all_sub}
          </p>

          <div className="bg_hue_4_start py-3 mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {CATS.map(c => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActive(c.key)}
                  className={`font-heading font-bold text-xs uppercase px-3 py-1 rounded-full border-2 transition-colors ${
                    active === c.key
                      ? 'bg_hue_1_start border_hue_1_start font_main'
                      : 'border_hue_1_start font_hue_1_start hover:bg_hue_1_start hover:font_main'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <p className="font-body text-sm grey_font mb-4 text-center">
            {t.games_count(filtered.length)}
          </p>

          <div className="quest-grid">
            {filtered.map((g, i) => (
              <GameCard
                key={`${g.name}-${i}`}
                game={g}
                borderClass="border_spot_start"
                btnBgClass="bg_spot_start"
                textClass="spot_fontcol"
                titleClass="darklight_fontcol"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
