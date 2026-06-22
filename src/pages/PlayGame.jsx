import { useLocation, useParams, Link } from 'react-router-dom';
import { gamesData } from '../gamesData';
import { useTranslation } from '../i18n';

function makeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function PlayGame() {
  const { gameName } = useTranslation();
  const { slug }   = useParams();
  const { state }  = useLocation();

  // find game from state or by matching slug
  const game = state?.game || gamesData.find(g => makeSlug(g.name) === slug);

  if (!game) {
    return (
      <div className="min-h-screen bg_hue_4_start flex flex-col items-center justify-center text-center px-4">
        <p className="font-heading text-4xl font-black font_hue_1_start mb-4">Game Not Found</p>
        <Link to="/" className="bg_spot_start spot_fontcol font-heading font-black uppercase px-6 py-2 rounded-xl">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      {/* Top bar */}
      <div className="bg_hue_4_start flex items-center justify-between px-4 py-2 flex-shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <i className="fas fa-arrow-left font_hue_1_start text-lg"></i>
          <span className="font-heading font-bold font_main text-sm uppercase">Back</span>
        </Link>
        <h1 className="font-heading font-black font_main uppercase text-base truncate mx-4">{gameName(game.name)}</h1>
        <div className="flex gap-2">
          {game.categories.slice(0, 1).map(c => (
            <span key={c} className="badge-pill bg_hue_2_start hue_2_fontcol text-xs">{c}</span>
          ))}
        </div>
      </div>

      {/* Game iframe */}
      <div className="flex-1 bg-black" style={{ minHeight: 'calc(100vh - 44px)' }}>
        <iframe
          src={game.game_url}
          title={gameName(game.name)}
          className="w-full h-full border-0"
          style={{ minHeight: 'calc(100vh - 44px)' }}
          allow="fullscreen; autoplay"
          allowFullScreen
        />
      </div>
    </div>
  );
}
