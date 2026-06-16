import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import SubscribeModal from './SubscribeModal';
import t from '../i18n/ar';

function makeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function GameCard({
  game,
  borderClass = 'border_spot_start',
  btnBgClass  = 'bg_spot_start',
  textClass   = 'spot_fontcol',
  titleClass  = 'darklight_fontcol',
}) {
  const { isSubscribed } = useAuth();
  const navigate         = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const slug        = makeSlug(game.name);
  const thumb       = game.thumbnail_url || game.img;
  const displayName = t.gameNames[game.name] || game.name;

  const goToGame = () => navigate(`/play/${slug}`, { state: { game } });

  const handlePlay = (e) => {
    e.preventDefault();
    if (isSubscribed === true) {
      goToGame();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal && (
        <SubscribeModal
          onClose={() => setShowModal(false)}
          onSuccess={goToGame}
        />
      )}

      <div className="game-card-wrap card-hover">
        <div onClick={handlePlay} style={{ cursor: 'pointer' }}>
          <div className={`flex-none rounded-2xlg border-3 lg:border-4 ${borderClass} overflow-hidden relative z-10`}>
            <img
              src={thumb}
              alt={game.name}
              className="w-full object-cover"
              style={{ aspectRatio: '1/1' }}
              loading="lazy"
            />
            <div className="text-center relative h-6 md:h-10 flex justify-center bg-white">
              <h2 className={`uppercase font-bold font-heading text-center text-base px-1 lg:text-xl leading-4 lg:leading-6 mt-1 pt-1 h-4 lg:h-8 lg:overflow-hidden lg:w-full lg:p-2 lg:pb-0 truncate-1-line ${titleClass}`}>
                {displayName}
              </h2>
            </div>
          </div>
        </div>
        <div onClick={handlePlay} style={{ cursor: 'pointer' }}>
          <div className={`flex flex-row w-16/20 mx-auto justify-center rounded-b-3xl ${btnBgClass} py-1 lg:pb-0 px-2 relative z-5`}>
            <div className={`flex content-center pb-1 text-xs ${textClass} font-body mt-auto`}>
              <p className={`${textClass} text-center uppercase font-black font-heading leading-1 lg:leading-5 pt-4 text-xl lg:text-3xl font-semibold cursor-pointer`}>
                {t.play_now}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
