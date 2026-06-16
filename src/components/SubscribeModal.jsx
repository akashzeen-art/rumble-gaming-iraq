import { LOGO_IMG } from '../data';
import { useAuth } from '../AuthContext';
import t from '../i18n/ar';

export default function SubscribeModal({ onClose }) {
  const { redirectToCampaign } = useAuth();

  const handleSubscribe = () => {
    onClose();
    redirectToCampaign();
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', direction: 'rtl' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: '1.2rem', width: '100%', maxWidth: '360px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '0.75rem', left: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#374151', lineHeight: 1 }}>×</button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <img src={LOGO_IMG} alt="Gamifya" style={{ height: '2.5rem', margin: '0 auto 0.75rem' }} />
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg,#00c5eb,#006177)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
            <i className="fas fa-gamepad" style={{ color: '#fff', fontSize: '1.5rem' }}></i>
          </div>
          <h2 style={{ fontFamily: "'Baloo Tamma 2', cursive", fontWeight: 900, fontSize: '1.2rem', color: '#00122d', margin: 0 }}>
            {t.sub_title}
          </h2>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', color: 'rgba(0,0,0,0.5)', marginTop: '0.25rem' }}>
            {t.sub_subtitle}
          </p>
        </div>

        <button
          onClick={handleSubscribe}
          style={{ width: '100%', background: '#ff9e03', color: '#000', fontFamily: "'Baloo Tamma 2', cursive", fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', padding: '0.6rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer' }}
        >
          {t.sub_btn}
        </button>

        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)', textAlign: 'center', marginTop: '0.75rem' }}>
          {t.sub_redirect}
        </p>
      </div>
    </div>
  );
}
