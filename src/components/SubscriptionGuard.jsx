import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import SubscribeModal from './SubscribeModal';
import t from '../i18n/ar';

export default function SubscriptionGuard({ children }) {
  const { checkStatus } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const subscribed = await checkStatus();
      if (cancelled) return;
      if (subscribed) {
        setAllowed(true);
      } else {
        setShowModal(true);
      }
      setChecking(false);
    })();

    return () => { cancelled = true; };
  }, [checkStatus]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <i className="fas fa-spinner fa-spin text-3xl font_hue_1_start"></i>
      </div>
    );
  }

  if (!allowed) {
    return (
      <>
        {showModal && (
          <SubscribeModal
            onClose={() => navigate('/')}
          />
        )}
        {!showModal && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4 text-center">
            <p className="font-heading font-bold font_hue_4_start">{t.sub_title}</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg_spot_start spot_fontcol font-heading font-black uppercase px-6 py-2 rounded-xl"
            >
              {t.sub_btn}
            </button>
          </div>
        )}
      </>
    );
  }

  return children;
}
