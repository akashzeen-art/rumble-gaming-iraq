import { gamesData } from './gamesData';

export { gamesData };

export const newestGames = gamesData.slice(0, 5);
export const questGames  = gamesData.slice(0, 10);
export const quickGames  = gamesData.filter(g => g.categories.includes('Easy to Play')).slice(0, 5);

export const contests = [
  {
    id: 64833, slug: '5-fruit', name: '5 Fruit',
    img: 'https://gamifya.com/storage/images/games/klQC9kyLF4JDvyGUQoDCnsJjTdfyPVQHWlq4CXSS.png',
    badge: 'members', prize: 'Win 50',
    prizeImg: 'https://gamifya.com/storage/default/r5NBUPhTNFqJMVPczxR2vfnF92TdwG2k2eDbZCID.png',
  },
  {
    id: 64834, slug: 'dashers', name: 'Dashers',
    img: 'https://gamifya.com/storage/images/games/CUSvBmC9gZtrUKpIoJt21fphEquBBy5liY0mcJNF.png',
    badge: 'members', prize: 'Win 50',
    prizeImg: 'https://gamifya.com/storage/default/r5NBUPhTNFqJMVPczxR2vfnF92TdwG2k2eDbZCID.png',
  },
  {
    id: 65178, slug: '8-ball-pool', name: '8 Ball Pool',
    img: 'https://gamifya.com/storage/images/games/uYk87WKx3RVfBe3EJuuWCXfRTJ0NDkS9jx4wZHGZ.png',
    badge: 'free', prize: 'For Fun',
    prizeImg: 'https://gamifya.com/storage/default/hSkgLVrruDmMrjN64EUJhRlHyGJpH3OdpRQeFurW.png',
    freeIcon: 'https://gamifya.com/storage/default/hSkgLVrruDmMrjN64EUJhRlHyGJpH3OdpRQeFurW.png',
  },
  {
    id: 65179, slug: 'tasty-jewel', name: 'Tasty Jewel',
    img: 'https://gamifya.com/storage/images/games/j0X5gLkFJn2AR3NBvg3ewp4RqF0B3Buu6jZjbtgt.png',
    badge: 'cost', cost: 2,
    costIcon: 'https://gamifya.com/storage/default/ibTwpivcn3tLHbvG1wSj5gOwVxYjW1u6SNG3JyRv.png',
    prize: 'Win Prizes',
    prizeImg: 'https://gamifya.com/storage/default/8pu3wWaShWwVkwagxCfzdgraXXXtPpVRKezT2bf5.png',
  },
];

export const languages = [
  { code: 'ar', label: 'عربى' }, { code: 'cy', label: 'Cymraeg' },
  { code: 'de', label: 'Deutsche' }, { code: 'en', label: 'English', active: true },
  { code: 'es', label: 'Español (mexico)' }, { code: 'fa', label: 'فارسی' },
  { code: 'fr', label: 'Français' }, { code: 'ga', label: 'Gaeilge' },
  { code: 'hi', label: 'हिंदी' }, { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'it', label: 'Italiano' }, { code: 'kk', label: 'Қазақ' },
  { code: 'ko', label: '한국어' }, { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'nl', label: 'Nederlands' }, { code: 'no', label: 'Norsk' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' }, { code: 'pl', label: 'Polskie' },
  { code: 'pt', label: 'Português' }, { code: 'si', label: 'සිංහල' },
  { code: 'so', label: 'Soomaali' }, { code: 'sw', label: 'Kiswahili' },
  { code: 'th', label: 'ไทย' }, { code: 'tl', label: 'Tagalog' },
  { code: 'tr', label: 'Türk' }, { code: 'vi', label: 'Tiếng Việt' },
  { code: 'zh', label: '简体中文）' },
];

export const PODS_IMG      = 'https://gamifya.com/storage/default/ibTwpivcn3tLHbvG1wSj5gOwVxYjW1u6SNG3JyRv.png';
export const PROMO_IMG     = 'https://gamifya.com/storage/images/promotions/IJMrsj25asKG1KWxQuz8FsFjbDqQup04dzhLkb2W.png';
export const AWARDS_FLAG_L = 'https://gamifya.com/storage/images/assets/awards_flag_l.png';
export const AWARDS_FLAG_R = 'https://gamifya.com/storage/images/assets/awards_flag_r.png';
