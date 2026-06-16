import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import t from '../i18n/ar';

export default function Register() {
  const [params] = useSearchParams();
  const { redirectToCampaign, updateSubid, setProductcode } = useAuth();

  useEffect(() => {
    const subid = params.get('subid');
    const productcode = params.get('productcode');
    if (subid) updateSubid(subid);
    if (productcode) setProductcode(productcode);
  }, [params, updateSubid, setProductcode]);

  return (
    <div className="min-h-screen bg_hue_4_start flex items-center justify-center px-4 py-12">
      <div className="auth-card text-center">
        <h1 className="font-heading text-2xl font-black font_hue_4_start uppercase mb-2">
          {t.profile_subscribe}
        </h1>
        <p className="font-body text-sm grey_font mb-6">{t.sub_subtitle}</p>
        <button
          onClick={redirectToCampaign}
          className="w-full bg_spot_start spot_fontcol font-heading font-black uppercase text-lg py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          {t.sub_btn}
        </button>
      </div>
    </div>
  );
}
