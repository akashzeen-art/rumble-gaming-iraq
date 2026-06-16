import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { isValidMsisdn } from '../auth';
import SubscribeModal from './SubscribeModal';

export default function SubscriptionGuard({ children }) {
  const { checkStatus, redirectToCampaign, msisdn } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!isValidMsisdn(msisdn)) {
        if (!cancelled) {
          setShowModal(true);
          setChecking(false);
        }
        return;
      }

      const subscribed = await checkStatus(msisdn);
      if (cancelled) return;

      if (subscribed) {
        setChecking(false);
      } else {
        const result = await redirectToCampaign(msisdn);
        if (!cancelled && !result?.ok) {
          setShowModal(true);
          setChecking(false);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [checkStatus, redirectToCampaign, msisdn]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <i className="fas fa-spinner fa-spin text-3xl font_hue_1_start"></i>
      </div>
    );
  }

  if (showModal) {
    return (
      <SubscribeModal
        onClose={() => navigate('/')}
        onSuccess={() => setShowModal(false)}
      />
    );
  }

  return children;
}
