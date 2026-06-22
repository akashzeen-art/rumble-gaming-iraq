import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';

export default function Footer() {
  const { t } = useTranslation();

  const recaptchaNote = (
    <>
      {t.footer_recaptcha}{' '}
      <br className="hidden md:block" />
      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">{t.footer_privacy}</a>
      {' '}{t.footer_and}{' '}
      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">{t.footer_terms}</a>
      {' '}{t.footer_recaptcha_end}
    </>
  );

  return (
    <div id="footerContainer" className="right-0 bottom-0 left-0">
      <div className="grey_fontcol flex justify-center pb-10 lg:pb-2 pt-2 lg:pt-0">
        <div className="flex flex-col w-full justify-center items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 px-4">
            <Link to="/" className="font-body hover:underline darklight_fontcol">{t.nav_home}</Link>
            <Link to="/contact" className="font-body hover:underline darklight_fontcol">{t.footer_contact}</Link>
          </div>
          <div className="mx-auto text-xs text-gray-400 text-center px-2">{recaptchaNote}</div>
        </div>
      </div>
    </div>
  );
}
