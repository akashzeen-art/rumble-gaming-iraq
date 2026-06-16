import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import t from '../i18n/ar';

export default function Login() {
  const navigate = useNavigate();
  const { redirectToCampaign } = useAuth();

  const handleSubscribe = () => {
    redirectToCampaign();
  };

  return (
    <div className="min-h-screen bg_hue_4_start flex items-center justify-center px-4 py-12">
      <div className="auth-card">
        <div className="text-center mb-6">
          <h1 className="font-heading text-2xl font-black font_hue_4_start uppercase">{t.login_title}</h1>
          <p className="font-body text-sm grey_font mt-1">{t.login_subtitle}</p>
        </div>

        <button
          onClick={handleSubscribe}
          className="w-full bg_spot_start spot_fontcol font-heading font-black uppercase text-lg py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          {t.profile_subscribe}
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-3 font-body text-sm grey_font py-2 hover:underline"
        >
          {t.login_backHome}
        </button>

        <p className="font-body text-xs text-center grey_font mt-4 px-2">
          {t.login_redirect}
        </p>
      </div>
    </div>
  );
}
