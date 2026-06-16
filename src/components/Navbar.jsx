import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { languages, PODS_IMG } from '../data';
import { useAuth } from '../AuthContext';
import SubscribeModal from './SubscribeModal';
import t from '../i18n/ar';

function AccountPanel({ onClose }) {
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
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', direction: 'rtl',
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: '1.2rem', width: '100%', maxWidth: '380px',
        padding: '0', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden',
      }} onClick={e => e.stopPropagation()}>

        <button onClick={onClose} style={{
          position: 'absolute', top: '0.75rem', left: '1rem', zIndex: 1,
          background: 'none', border: 'none', fontSize: '1.5rem',
          cursor: 'pointer', color: '#fff', lineHeight: 1,
        }}>×</button>

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
              { icon: 'fa-tag',       label: t.profile_service,  value: account?.service_name },
              { icon: 'fa-calendar-check', label: t.profile_activated, value: account?.valid_from },
              { icon: 'fa-sync-alt',  label: t.profile_renews,    value: account?.valid_to },
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
              }}>
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
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [langOpen,       setLangOpen]       = useState(false);
  const [langMobileOpen, setLangMobileOpen] = useState(false);
  const [accountOpen,    setAccountOpen]    = useState(false);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [searchVal,      setSearchVal]      = useState('');
  const [isSticky,       setIsSticky]       = useState(false);
  const [activeLang,     setActiveLang]     = useState(() => localStorage.getItem('gamifya_lang') || 'ar');

  const langDropRef       = useRef(null);
  const langMobileDropRef = useRef(null);
  const navigate          = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 1024) setIsSticky(true);
      else { const el = document.getElementById('stickyNav'); setIsSticky(el ? window.pageYOffset >= el.offsetTop : false); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById('desktopPodsShakeLoggedOut');
    if (!el) return;
    const timer = setInterval(() => el.classList.toggle('shk'), 500);
    return () => clearInterval(timer);
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
    setActiveLang(code);
    localStorage.setItem('gamifya_lang', code);
    setLangOpen(false); setLangMobileOpen(false);
    document.documentElement.dir = ['ar', 'fa', 'he'].includes(code) ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
  };

  const currentLang = languages.find(l => l.code === activeLang) || languages.find(l => l.active);
  const doSearch = (val) => { if (val.length >= 3) { navigate('/games'); setSearchOpen(false); setSearchVal(''); } };

  const navLinks = [
    { to: '/tournaments', label: t.nav_contests },
    { to: '/clashes',     label: t.nav_clashes },
    { to: '/games',       label: t.nav_questGames },
    { to: '/quickplay',   label: t.nav_quickplay },
    { to: '/rewards',     label: t.nav_rewards },
  ];

  const mobileRows = [
    [{ to: '/', icon: 'fa-home', label: 'الرئيسية', col: 'font_hue_1_start' }, { to: '/support', icon: 'fa-question-circle', label: 'المساعدة', col: 'font_hue_4_start' }],
    [{ to: '/tournaments', icon: 'fa-trophy', label: t.nav_contests, col: 'font_hue_4_start' }, { to: '/clashes', icon: 'fa-user-friends', label: t.nav_clashes, col: 'font_hue_4_start' }],
    [{ to: '/games', icon: 'fa-play', label: t.nav_questGames, col: 'font_hue_4_start' }, { to: '/quickplay', icon: 'fa-play-circle', label: t.nav_quickplay, col: 'font_hue_4_start' }],
    [{ to: '/rewards', icon: 'fa-money-bill-alt', label: t.nav_rewards, col: 'font_hue_4_start' }],
    [{ to: '/community', icon: 'fa-users', label: t.nav_community, col: 'font_hue_4_start' }],
  ];

  const LangList = () => (
    <ul style={{ minWidth: '160px' }}>
      {languages.map(l => (
        <li key={l.code}>
          <div onClick={() => handleLangChange(l.code)}
            className="cursor-pointer py-1 px-2 rounded transition-colors"
            style={{ fontSize: '0.875rem', color: activeLang === l.code ? '#00c5eb' : '#00122d', fontWeight: activeLang === l.code ? 900 : 400, display: 'flex', alignItems: 'center', gap: '6px' }}>
            {activeLang === l.code && <i className="fas fa-check" style={{ fontSize: '0.65rem', color: '#00c5eb' }}></i>}
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
          <div className="relative flex w-full justify-center">
            <Link to="/" className="font-heading font-black text-xl nav_fontcol uppercase px-4 py-2">Rumble</Link>
          </div>
        </div>

        <div className="hidden lg:flex justify-center relative">
          <div className="flex w-full xl:container xl:mx-auto">
            <Link to="/"><div className="ml-6 font-heading font-black text-2xl nav_fontcol uppercase px-4 py-2">Rumble</div></Link>
            <div className="w-full flex flex-grow items-center pl-4">
              <div className="relative text-sm flex-grow flex flex-row text-center">
                {navLinks.map(l => (
                  <Link key={l.to} to={l.to} className="block mt-4 pt-3 px-3 rounded-full lg:inline-block lg:mt-0 ml-0 lg:ml-1 uppercase font-heading text-lg nav_fontcol hover:bg-white hover:bg-opacity-10 transition-colors">
                    {l.label}
                  </Link>
                ))}
                <div className="relative lg:inline-block lg:mt-0 ml-0 lg:ml-8 xl:ml-4 uppercase">
                  <div className="w-8 h-8 hover:cursor-pointer flex items-center" onClick={() => setSearchOpen(v => !v)}>
                    <span className="fas fa-search nav_fontcol textDropShadow text-3xl m-auto">&nbsp;</span>
                  </div>
                  {searchOpen && (
                    <div className="absolute left-0 top-0 w-48 ml-12 z-50">
                      <input type="text" placeholder={t.nav_search} value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && doSearch(searchVal)}
                        className="shadow appearance-none border rounded-full w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none"
                        autoFocus autoComplete="off" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div ref={langDropRef} className="absolute left-0 top-0 mt-3 ml-4" style={{ zIndex: 60 }}>
            <button onClick={() => setLangOpen(v => !v)}
              className="flex items-center gap-1 cursor-pointer focus:outline-none"
              style={{ background: 'none', border: 'none', padding: '4px 6px', borderRadius: '6px' }}
              title={`Language: ${currentLang?.label}`}>
              <i className="fas fa-globe-americas font_main" style={{ fontSize: '1.4rem' }}></i>
              <span className="font_main font-heading font-bold uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>{activeLang.toUpperCase()}</span>
              <i className={`fas fa-chevron-${langOpen ? 'up' : 'down'} font_main`} style={{ fontSize: '0.6rem' }}></i>
            </button>
            {langOpen && (
              <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', background: '#fff', border: '2px solid #008aaa', borderRadius: '0.5rem', maxHeight: '70vh', overflowY: 'auto', padding: '0.75rem', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 60 }}>
                <div className="font-heading font-bold font_hue_4_start border-b-2 border_hue_4_start mb-2 pb-1" style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}>{t.nav_selectLang}</div>
                <LangList />
              </div>
            )}
          </div>
        </div>

        <div id="stickyNav" className="flex w-full bg_hue_1_start py-1 lg:py-2 px-0 text-sm justify-center font_main font-bold border-t-4 border_hue_3_start relative">
          <div className="relative flex justify-end lg:justify-start w-full xl:container xl:mx-auto">

            <div className="hidden lg:flex items-start z-50 absolute top-0 right-0 -mt-2">
              <div className="flex flex-row content-end relative text-center hue_2_fontcol font-medium">
                <div className="free-pods-left absolute w-28 right-0 mr-2 h-10 bg_hue_2_start"></div>
                <div className="free-pods-right absolute w-44 right-0 mr-10 h-10 bg_hue_2_start">
                  <div className="flex flex-row mt-1" style={{ transform: 'skew(30deg,0deg)' }}>
                    <button onClick={() => setAccountOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <div className="flex flex-row font-bold pr-3 font-body relative">
                        <div className="absolute top-0 pl-3 right-0 -mr-3">
                          <img src={PODS_IMG} alt="Pods" id="desktopPodsShakeLoggedOut" className="fill-current h-8 m-auto z-10 px-1 shk" />
                        </div>
                        <div className="hue_2_fontcol font-body pr-0 mr-6 leading-8">
                          <div className="flex flex-wrap content-center mt-1">
                            <p className="flex-none inline-block align-middle text-center w-full hue_2_fontcol leading-6 text-base font-semibold">{t.nav_joinClaim}</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="z-20 block lg:hidden rounded-md bg_hue_2_start w-8 mx-1 text-center py-1 px-2 text-base self-center cursor-pointer" onClick={() => setMenuOpen(v => !v)}>
              <span className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} hue_2_fontcol`}></span>
            </div>

            <div className={`lg:hidden sidepanel h-auto absolute z-15 top-0 right-0 overflow-x-hidden duration-500 mt-9${menuOpen ? ' w-19/20' : ' w-0 z-min1'}`}>
              <div className="relative z-15 bg-gameovateGrey max-h-screen overflow-auto pb-2 rounded-bl-3xl rounded-br-3xl shadow-md">
                <div className="pt-2 px-2 no-underline block duration-300">
                  <div className="flex flex-row border-b-2 border_font_color">
                    <div className="w-6 h-6 ml-2 mt-1">
                      <span className="fas fa-search font_hue_2_start textDropShadow text-2xl m-auto">&nbsp;</span>
                    </div>
                    <input type="text" placeholder={t.nav_search} value={searchVal}
                      onChange={e => setSearchVal(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { doSearch(searchVal); setMenuOpen(false); } }}
                      className="shadow appearance-none border rounded-full w-3/4 py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none" />
                  </div>
                  <div ref={langMobileDropRef} className="absolute left-0 top-0 mt-3 ml-4" style={{ zIndex: 60 }}>
                    <button onClick={() => setLangMobileOpen(v => !v)}
                      className="flex items-center gap-1 cursor-pointer focus:outline-none"
                      style={{ background: 'none', border: 'none', padding: '4px 6px' }}
                      title={`Language: ${currentLang?.label}`}>
                      <i className="fas fa-globe-americas font_hue_4_start" style={{ fontSize: '1.4rem' }}></i>
                      <span className="font_hue_4_start font-heading font-bold uppercase" style={{ fontSize: '0.65rem' }}>{activeLang.toUpperCase()}</span>
                    </button>
                    {langMobileOpen && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', background: '#fff', border: '2px solid #008aaa', borderRadius: '0.5rem', maxHeight: '12rem', overflowY: 'scroll', padding: '0.75rem', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 60 }}>
                        <div className="font-heading font-bold font_hue_4_start border-b-2 border_hue_4_start mb-1 pb-1" style={{ fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{t.nav_selectLang}</div>
                        <LangList />
                      </div>
                    )}
                  </div>
                </div>

                {mobileRows.map((row, ri) => (
                  <div key={ri} className="pt-1 px-2 no-underline block duration-300 flex flex-row">
                    {row.map(item => (
                      <Link key={item.to} to={item.to} className="pt-1 px-2 no-underline block duration-300 w-1/2 hover:underline" onClick={() => setMenuOpen(false)}>
                        <div className="flex flex-row border-b-2 border_font_color">
                          <div className="mb-0 w-6 h-6 ml-2">
                            <span className={`fas ${item.icon} font_hue_2_start textDropShadow text-xl m-auto`}>&nbsp;</span>
                          </div>
                          <span className={`${item.col} text-base font-body font-semibold pb-1`}>{item.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}

                <div className="flex flex-row w-19/20 mx-auto justify-center border-4 border_hue_1_start rounded-b-6xl bg_hue_1_start -mt-5 pt-5 pb-1 px-5">
                  <img src={PODS_IMG} alt="Pods" className="w-10 h-10" />
                  <div className="flex content-center bg_hue_1_start pb-1 text-xs font_main font-body mt-auto">
                    <p className="font_hue_4_start text-lg font-semibold mr-4">
                      <button onClick={() => { setMenuOpen(false); setAccountOpen(true); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00122d', fontFamily: 'Montserrat, sans-serif', fontSize: '1.125rem', fontWeight: 600 }}>
                        {t.nav_myProfile}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-start">
              <div className="flex flex-row justify-start text-left relative">
                <button
                  onClick={() => setAccountOpen(true)}
                  className="flex-initial rounded bg_spot_start py-1 px-2 mx-1 text-base font-bold focus:outline-none spot_fontcol hover:opacity-90 transition-opacity">
                  {t.nav_myProfile}
                </button>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}
