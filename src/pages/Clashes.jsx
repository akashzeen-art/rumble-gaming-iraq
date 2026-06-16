import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { gamesData } from '../gamesData';
import t from '../i18n/ar';

const games = gamesData.slice(0, 10);

export default function Clashes() {
  return (
    <>
      <div className="page-hero">
        <h1 className="font-heading text-4xl lg:text-5xl font-black uppercase mb-2">{t.clashes_hero}</h1>
        <p className="font-body text-lg opacity-80">{t.clashes_sub}</p>
      </div>
      <div className="lg:container lg:px-4 lg:mx-auto px-3 py-8">
        <div className="bg_hue_4_start rounded-2xlg p-6 mb-8 text-center">
          <i className="fas fa-user-friends text-5xl font_hue_1_start mb-4 block"></i>
          <h2 className="font-heading text-2xl font-black font_main mb-2">{t.clashes_challenge}</h2>
          <p className="font-body font_main opacity-80 mb-4">{t.clashes_desc}</p>
          <Link to="/login">
            <button className="rainbow-background font-heading font-black uppercase text-white px-8 py-3 rounded-xl text-lg border-2 border_hue_2_start">
              {t.clashes_start}
            </button>
          </Link>
        </div>
        <h2 className="font-heading text-2xl font-bold darklight_fontcol mb-4 text-center">{t.clashes_available}</h2>
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
