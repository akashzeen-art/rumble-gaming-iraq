import { Link } from 'react-router-dom';
import { PODS_IMG } from '../data';
import t from '../i18n/ar';

const rewards = [
  { id: 1, name: 'R50 Voucher',  cost: 500,  img: PODS_IMG, category: 'Vouchers' },
  { id: 2, name: 'R100 Voucher', cost: 950,  img: PODS_IMG, category: 'Vouchers' },
  { id: 3, name: 'R200 Voucher', cost: 1800, img: PODS_IMG, category: 'Vouchers' },
  { id: 4, name: 'Airtime R20',  cost: 200,  img: PODS_IMG, category: 'Airtime' },
  { id: 5, name: 'Airtime R50',  cost: 480,  img: PODS_IMG, category: 'Airtime' },
  { id: 6, name: 'Data 1GB',     cost: 600,  img: PODS_IMG, category: 'Data' },
];

const catLabels = { Vouchers: t.cat_vouchers, Airtime: t.cat_airtime, Data: t.cat_data };

export default function Rewards() {
  return (
    <>
      <div className="page-hero">
        <h1 className="font-heading text-4xl lg:text-5xl font-black uppercase mb-2">{t.rewards_hero}</h1>
        <p className="font-body text-lg opacity-80">{t.rewards_sub}</p>
      </div>

      {/* Pods balance banner */}
      <div className="bg_hue_4_start py-4 px-4">
        <div className="lg:container lg:mx-auto flex items-center justify-center gap-4">
          <img src={PODS_IMG} alt="Pods" className="w-10 h-10" />
          <div className="text-center">
            <p className="font_main font-body text-sm">{t.rewards_balance}</p>
            <p className="font-heading text-3xl font-black font_hue_1_start">0</p>
          </div>
          <Link to="/login">
            <button className="bg_spot_start spot_fontcol font-heading font-black uppercase px-4 py-2 rounded-xl text-sm">
              {t.rewards_login}
            </button>
          </Link>
        </div>
      </div>

      <div className="lg:container lg:px-4 lg:mx-auto px-3 py-8">
        {['Vouchers', 'Airtime', 'Data'].map(cat => (
          <div key={cat} className="mb-10">
            <h2 className="font-heading text-2xl font-bold darklight_fontcol mb-4 border-b-2 border_hue_1_start pb-2">{catLabels[cat]}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {rewards.filter(r => r.category === cat).map(r => (
                <div key={r.id} className="rounded-2xlg border-3 border_hue_1_start overflow-hidden bg-white card-hover">
                  <div className="bg_hue_4_start p-6 flex justify-center">
                    <img src={r.img} alt={r.name} className="w-16 h-16 object-contain" />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-heading font-bold darklight_fontcol text-base">{r.name}</h3>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <img src={PODS_IMG} alt="pods" className="w-5 h-5" />
                      <span className="font-heading font-black font_hue_4_start text-lg">{r.cost}</span>
                    </div>
                    <Link to="/login">
                      <button className="mt-2 w-full bg_hue_2_start hue_2_fontcol font-heading font-black uppercase text-sm py-1 rounded-lg">
                      {t.rewards_redeem}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
