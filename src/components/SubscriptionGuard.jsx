import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

export default function SubscriptionGuard({ children }) {
  const { checkStatus, redirectToCampaign, msisdn } = useAuth();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed]   = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const subscribed = await checkStatus(msisdn || null);
      if (cancelled) return;
      if (!subscribed) {
        redirectToCampaign();
      } else {
        setAllowed(true);
        setChecking(false);
      }
    })();

    return () => { cancelled = true; };
  }, [checkStatus, redirectToCampaign, msisdn]);

  if (checking || !allowed) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <i className="fas fa-spinner fa-spin text-3xl font_hue_1_start"></i>
      </div>
    );
  }

  return children;
}
