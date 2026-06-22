import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { languages } from '../data';
import { useAuth } from '../AuthContext';
import SubscribeModal from './SubscribeModal';
import { useTranslation } from '../i18n';

function AccountPanel({ onClose }) {
  const { t } = useTranslation();
  const { account, loadAccount, unsubscribe } = useAuth();
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    (async () => {
      await loadAccount();
      setLoading(false);
    })();
  }, [loadAccount]);

  const isActive = Number(account?.status) === 1;

  const handleAction = async () => {
    setActionError('');
    setActionLoading(true);
    try {
      if (isActive) {
        await unsubscribe();
      } else {
        setShowSubscribeModal(true);
      }
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      {showSubscribeModal && (
        <SubscribeModal
          onClose={() => setShowSubscribeModal(false)}
          onSuccess={() => { setShowSubscribeModal(false); loadAccount(); }}
        />
      )}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: '#fff', borderRadius: '1.2rem', width: '100%', maxWidth: '380px',
            padding: '0', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden',
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '0.75rem', left: '1rem', zIndex: 1,
              background: 'none', border: 'none', fontSize: '1.5rem',
              cursor: 'pointer', color: '#fff', lineHeight: 1,
            }}
          >
            ×
          </button>

          <div style={{ background: 'linear-gradient(135deg,#00122d,#006177)', padding: '1.5rem 1rem 1rem', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#00c5eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
              <i className="fas fa-user" style={{ color: '#fff', fontSize: '1.25rem' }}></i>
            </div>
            {loading ? (
              <i className="fas fa-spinner fa-spin" style={{ color: '#fff' }}></i>
            ) : (
              <>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff', fontSize: '0.875rem', margin: 0 }}>{account?.msisdn || '-'}</p>
                <span style={{ display: 'inline-block', background: isActive ? '#00c5eb' : '#ef4444', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.7rem', padding: '2px 10px', borderRadius: '9999px', marginTop: '4px' }}>
                  {isActive ? t.profile_active : t.profile_inactive}
                </span>
              </>
            )}
          </div>

          {!loading && (
            <div style={{ padding: '0.75rem 1rem' }}>
              {[
                { icon: 'fa-tag', label: t.profile_service, value: account?.service_name },
                { icon: 'fa-calendar-check', label: t.profile_activated, value: account?.valid_from },
                { icon: 'fa-sync-alt', label: t.profile_renews, value: account?.valid_to },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.35rem 0', borderBottom: '1px solid #f0f0f0' }}>
                  <i className={`fas ${row.icon}`} style={{ color: '#00c5eb', width: '16px', fontSize: '0.8rem' }}></i>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: '#666', flex: 1 }}>{row.label}</span>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#00122d' }}>{row.value || '-'}</span>
                </div>
              ))}

              <button
                onClick={handleAction}
                disabled={actionLoading}
                style={{
                  width: '100%', marginTop: '0.75rem',
                  background: isActive ? '#ef4444' : '#ff9e03',
                  color: isActive ? '#fff' : '#000',
                  fontFamily: "'Baloo Tamma 2', cursive", fontWeight: 900,
                  fontSize: '0.9rem', padding: '0.5rem',
                  borderRadius: '0.5rem', border: 'none',
                  cursor: actionLoading ? 'not-allowed' : 'pointer',
                  opacity: actionLoading ? 0.7 : 1,
                }}
              >
                {actionLoading
                  ? <span><i className="fas fa-spinner fa-spin" style={{ marginLeft: '6px' }}></i></span>
                  : isActive ? t.profile_unsubscribe : t.profile_subscribe}
              </button>
              {actionError && (
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', color: '#dc2626', textAlign: 'center', marginTop: '0.5rem' }}>
                  {actionError}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const { t, lang, setLang } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [langMobileOpen, setLangMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const langDropRef = useRef(null);
  const langMobileDropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 1024) setIsSticky(true);
      else {
        const el = document.getElementById('stickyNav');
        setIsSticky(el ? window.pageYOffset >= el.offsetTop : false);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-is-sticky', isSticky);
    return () => document.body.classList.remove('nav-is-sticky');
  }, [isSticky]);

  useEffect(() => {
    const el = document.getElementById('stickyNavContainer');
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty('--navbar-height', `${el.offsetHeight}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (langDropRef.current && !langDropRef.current.contains(e.target)) setLangOpen(false);
      if (langMobileDropRef.current && !langMobileDropRef.current.contains(e.target)) setLangMobileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLangChange = (code) => {
    setLang(code);
    setLangOpen(false);
    setLangMobileOpen(false);
  };

  const currentLang = languages.find(l => l.code === lang) || languages.find(l => l.active);

  const LangList = () => (
    <ul style={{ minWidth: '160px' }}>
      {languages.map(l => (
        <li key={l.code}>
          <div
            onClick={() => handleLangChange(l.code)}
            className="cursor-pointer py-1 px-2 rounded transition-colors"
            style={{
              fontSize: '0.875rem',
              color: lang === l.code ? '#00c5eb' : '#00122d',
              fontWeight: lang === l.code ? 900 : 400,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            {lang === l.code && <i className="fas fa-check" style={{ fontSize: '0.65rem', color: '#00c5eb' }}></i>}
            {l.label}
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {accountOpen && <AccountPanel onClose={() => setAccountOpen(false)} />}

      <nav id="stickyNavContainer" className={`w-full z-50 divider bg_nav${isSticky ? ' sticky' : ' relative'}`}>
        <div className="flex lg:hidden justify-center">
          <Link to="/" className="font-heading font-black text-xl nav_fontcol uppercase px-4 py-2">Rumble</Link>
        </div>

        <div className="hidden lg:flex justify-center relative">
          <div className="flex w-full xl:container xl:mx-auto items-center justify-between px-6">
            <Link to="/" className="font-heading font-black text-2xl nav_fontcol uppercase">Rumble</Link>

            <div className="flex items-center gap-4">
              <div ref={langDropRef} className="relative" style={{ zIndex: 60 }}>
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className="flex items-center gap-1 cursor-pointer focus:outline-none"
                  style={{ background: 'none', border: 'none', padding: '4px 6px', borderRadius: '6px' }}
                  title={`Language: ${currentLang?.label}`}
                >
                  <i className="fas fa-globe-americas font_main" style={{ fontSize: '1.4rem' }}></i>
                  <span className="font_main font-heading font-bold uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>{lang.toUpperCase()}</span>
                  <i className={`fas fa-chevron-${langOpen ? 'up' : 'down'} font_main`} style={{ fontSize: '0.6rem' }}></i>
                </button>
                {langOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '4px', background: '#fff',
                    border: '2px solid #008aaa', borderRadius: '0.5rem', padding: '0.75rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 60,
                  }}
                  >
                    <div className="font-heading font-bold font_hue_4_start border-b-2 border_hue_4_start mb-2 pb-1" style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}>
                      {t.nav_selectLang}
                    </div>
                    <LangList />
                  </div>
                )}
              </div>

              <button
                onClick={() => setAccountOpen(true)}
                className="rounded bg_spot_start py-1 px-3 text-base font-bold focus:outline-none spot_fontcol hover:opacity-90 transition-opacity font-heading uppercase"
              >
                {t.nav_myProfile}
              </button>
            </div>
          </div>
        </div>

        <div id="stickyNav" className="flex w-full bg_hue_1_start py-1 lg:py-2 px-0 text-sm justify-center font_main font-bold border-t-4 border_hue_3_start relative lg:hidden">
          <div className="relative flex justify-between items-center w-full xl:container xl:mx-auto px-2">
            <div
              className="z-20 rounded-md bg_hue_2_start w-8 text-center py-1 px-2 cursor-pointer"
              onClick={() => setMenuOpen(v => !v)}
            >
              <span className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} hue_2_fontcol`}></span>
            </div>

            <button
              onClick={() => setAccountOpen(true)}
              className="rounded bg_spot_start py-1 px-2 text-sm font-bold spot_fontcol font-heading uppercase"
            >
              {t.nav_myProfile}
            </button>

            {menuOpen && (
              <div className="absolute top-full right-0 left-0 mt-1 mx-2 bg-gameovateGrey rounded-2xl shadow-md p-3 z-50">
                <Link to="/" className="block py-2 px-2 font-body font-semibold darklight_fontcol border-b border_font_color" onClick={() => setMenuOpen(false)}>
                  {t.nav_home}
                </Link>
                <div ref={langMobileDropRef} className="pt-2">
                  <button
                    onClick={() => setLangMobileOpen(v => !v)}
                    className="flex items-center gap-2 w-full py-2 px-2 font-body font-semibold darklight_fontcol"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <i className="fas fa-globe-americas font_hue_4_start"></i>
                    <span>{t.nav_selectLang}</span>
                    <span className="ml-auto font-heading text-xs">{lang.toUpperCase()}</span>
                  </button>
                  {langMobileOpen && (
                    <div className="mt-1 p-2 bg-white rounded-lg border-2 border_hue_4_start">
                      <LangList />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
