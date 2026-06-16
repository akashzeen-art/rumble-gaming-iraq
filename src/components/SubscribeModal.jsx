import { useState } from 'react';
import { COUNTRY_CODE } from '../config';
import { useAuth } from '../AuthContext';
import t from '../i18n/ar';

export default function SubscribeModal({ onClose, onSuccess }) {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { checkStatus, redirectToCampaign, setMsisdn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const cleaned = mobile.replace(/\D/g, '');
    if (cleaned.length < 7) {
      setError(t.sub_error_short);
      return;
    }

    const fullMsisdn = COUNTRY_CODE + cleaned;
    setMsisdn(fullMsisdn);
    setLoading(true);

    try {
      const subscribed = await checkStatus(fullMsisdn);
      if (subscribed) {
        onClose();
        onSuccess?.();
      } else {
        redirectToCampaign();
      }
    } catch {
      setError(t.sub_error_net);
    } finally {
      setLoading(false);
    }
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
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg,#00c5eb,#006177)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
            <i className="fas fa-mobile-alt" style={{ color: '#fff', fontSize: '1.5rem' }}></i>
          </div>
          <h2 style={{ fontFamily: "'Baloo Tamma 2', cursive", fontWeight: 900, fontSize: '1.2rem', color: '#00122d', margin: 0 }}>
            {t.sub_title}
          </h2>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', color: 'rgba(0,0,0,0.5)', marginTop: '0.25rem' }}>
            {t.sub_subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#00122d', marginBottom: '0.4rem' }}>
            {t.sub_mobileLabel}
          </label>
          <div style={{ display: 'flex', border: '2px solid #008aaa', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '0.6rem' }}>
            <span style={{ padding: '0.6rem 0.75rem', background: '#f0f9ff', fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem', color: '#00122d', fontWeight: 700, borderRight: '2px solid #008aaa', whiteSpace: 'nowrap' }}>+{COUNTRY_CODE}</span>
            <input
              type="tel"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              placeholder={t.sub_placeholder}
              maxLength={12}
              autoFocus
              style={{ flex: 1, border: 'none', padding: '0.6rem 1rem', fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem', outline: 'none', color: '#00122d' }}
            />
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', padding: '0.4rem 0.75rem', marginBottom: '0.6rem' }}>
              <i className="fas fa-exclamation-circle" style={{ color: '#ef4444', fontSize: '0.8rem' }}></i>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: '#dc2626', margin: 0 }}>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: loading ? '#ccc' : '#ff9e03', color: '#000', fontFamily: "'Baloo Tamma 2', cursive", fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', padding: '0.6rem', borderRadius: '0.75rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading
              ? <span><i className="fas fa-spinner fa-spin" style={{ marginLeft: '0.5rem' }}></i>{t.sub_loading}</span>
              : t.sub_btn}
          </button>
        </form>

        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)', textAlign: 'center', marginTop: '0.75rem' }}>
          {t.sub_redirect}
        </p>
      </div>
    </div>
  );
}
