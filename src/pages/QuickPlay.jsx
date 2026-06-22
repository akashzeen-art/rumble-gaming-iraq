import GameCard from '../components/GameCard';
import { gamesData } from '../gamesData';
import { useTranslation } from '../i18n';

const games = gamesData.filter(g => g.categories.includes('Easy to Play'));

export default function QuickPlay() {
  const { t } = useTranslation();
  return (
    <>
      <div className="page-hero">
        <h1 className="font-heading text-4xl lg:text-5xl font-black uppercase mb-2">{t.qp_hero}</h1>
        <p className="font-body text-lg opacity-80">{t.qp_sub}</p>
      </div>
      <div className="lg:container lg:px-4 lg:mx-auto px-3 py-6">
        <p className="font-body text-sm grey_font mb-4 text-center">{t.qp_count(games.length)}</p>
        <div className="quest-grid">
          {games.map((g, i) => (
            <GameCard key={`${g.name}-${i}`} game={g}
              borderClass="border_hue_1_start" btnBgClass="bg_hue_2_start"
              textClass="hue_2_fontcol" titleClass="darklight_fontcol" />
          ))}
        </div>
      </div>
    </>
  );
}
