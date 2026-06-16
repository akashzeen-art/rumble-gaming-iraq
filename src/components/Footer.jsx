import { useState } from 'react';
import { Link } from 'react-router-dom';
import t from '../i18n/ar';

export default function Footer() {
  const [playOpen,    setPlayOpen]    = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const toggle = (which) => {
    setPlayOpen(which === 'play' ? v => !v : false);
    setSupportOpen(which === 'support' ? v => !v : false);
    setCompanyOpen(which === 'company' ? v => !v : false);
  };

  const recaptchaNote = (
    <>
      {t.footer_recaptcha}{' '}
      <br className="hidden md:block" />
      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">{t.footer_privacy}</a>
      {' '}و{' '}
      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">{t.footer_terms}</a>
      {' '}{t.footer_recaptcha_end}
    </>
  );

  return (
    <div id="footerContainer" className="right-0 bottom-0 left-0">
      <div className="grey_fontcol flex justify-center pb-10 lg:pb-2 pt-2 lg:pt-0">
        <div className="flex flex-col lg:flex-row w-full justify-center">

          {/* reCAPTCHA – desktop */}
          <div className="lg:flex lg:flex-col lg:p-8 w-auto mx-1">
            <div className="hidden lg:flex mx-auto"></div>
            <div className="hidden lg:block mx-auto text-xs text-gray-400 text-center mt-1">{recaptchaNote}</div>
          </div>

          <div className="flex flex-col md:flex-row w-full lg:w-auto justify-center">

            {/* Play */}
            <div className="lg:flex lg:flex-col lg:p-8 w-auto mx-auto md:mx-1">
              <div className="font-heading text-2xl uppercase m-2 hidden lg:block darklight_fontcol">{t.footer_play}</div>
              <div className="font-heading text-2xl mt-2 md:m-2 block lg:hidden flex flex-row cursor-pointer" onClick={() => toggle('play')}>
                <span className="pr-1 darklight_fontcol">{t.footer_play}</span>
                <i className="fas fa-caret-down float-right pl-1 darklight_fontcol"></i>
              </div>
              <div className={`${playOpen ? '' : 'hidden'} absolute bg-transparent border-solid border border_hue_1_start -mt-2 -ml-4 md:-mt-4 md:ml-2 lg:block lg:relative lg:bg-transparent lg:border-none lg:ml-0 rounded-2xlg bg-white shadow-lg lg:shadow-none z-10`}>
                <div className="flex flex-col">
                  {[
                    { to: '/tournaments', label: t.nav_contests },
                    { to: '/clashes',     label: t.nav_clashes },
                    { to: '/games',       label: t.nav_questGames },
                    { to: '/quickplay',   label: t.nav_quickplay },
                  ].map(l => (
                    <Link key={l.to} to={l.to} className="block font-body mx-2 my-0 lg:my-1 hover:underline darklight_fontcol">{l.label}</Link>
                  ))}
                </div>
                <div className="flex flex-col">
                  <Link to="/community" className="block font-body mx-2 my-0 lg:my-1 hover:underline darklight_fontcol">{t.nav_community}</Link>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="lg:flex lg:flex-col lg:p-8 w-auto mx-auto md:mx-1">
              <div className="font-heading text-2xl uppercase m-2 hidden lg:block darklight_fontcol">{t.footer_support}</div>
              <div className="font-heading text-2xl md:m-2 block lg:hidden flex flex-row cursor-pointer" onClick={() => toggle('support')}>
                <span className="pr-1 darklight_fontcol">{t.footer_support}</span>
                <i className="fas fa-caret-down float-right pl-1 darklight_fontcol"></i>
              </div>
              <div className={`${supportOpen ? '' : 'hidden'} absolute bg-transparent border-solid border border_hue_1_start -mt-2 -ml-8 md:-mt-4 md:ml-2 lg:block lg:relative lg:bg-transparent lg:border-none lg:ml-0 rounded-2xlg bg-white shadow-lg lg:shadow-none z-10`}>
                <Link to="/support" className="block font-body mx-2 my-0 lg:my-1 hover:underline darklight_fontcol">{t.footer_help}</Link>
                <Link to="/forgot-password" className="block font-body mx-2 my-0 lg:my-1 hover:underline darklight_fontcol">{t.footer_forgot}</Link>
              </div>
            </div>

            {/* Company */}
            <div className="lg:flex lg:flex-col lg:p-8 w-auto mx-auto md:mx-1">
              <div className="font-heading text-2xl uppercase m-2 hidden lg:block darklight_fontcol">{t.footer_company}</div>
              <div className="font-heading text-2xl md:m-2 block lg:hidden flex flex-row cursor-pointer" onClick={() => toggle('company')}>
                <span className="pr-1 darklight_fontcol">{t.footer_company}</span>
                <i className="fas fa-caret-down float-right pl-1 darklight_fontcol"></i>
              </div>
              <div className={`${companyOpen ? '' : 'hidden'} absolute bg-transparent border-solid border border_hue_1_start -mt-2 md:-mt-4 ml-2 lg:block lg:relative lg:bg-transparent lg:border-none lg:ml-0 rounded-2xlg bg-white shadow-lg lg:shadow-none z-10`}>
                <Link to="/contact" className="block font-body mx-2 my-0 lg:my-1 hover:underline darklight_fontcol">{t.footer_contact}</Link>
              </div>
            </div>

          </div>

          <hr className="lg:hidden border-solid border mx-auto w-4/5 bg_hue_1_start border_hue_1_start" />
          <div className="flex lg:hidden justify-center"></div>
          <div className="lg:hidden mx-auto mt-2 text-xs text-gray-400 text-center px-2">{recaptchaNote}.</div>

        </div>
      </div>
    </div>
  );
}
