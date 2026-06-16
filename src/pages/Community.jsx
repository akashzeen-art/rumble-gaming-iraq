import { Link } from 'react-router-dom';
import { PODS_IMG } from '../data';

const leaderboard = [
  { rank: 1, name: 'GamerKing',   pods: 12450, avatar: '🥇' },
  { rank: 2, name: 'ProPlayer99', pods: 9870,  avatar: '🥈' },
  { rank: 3, name: 'StarQuest',   pods: 8320,  avatar: '🥉' },
  { rank: 4, name: 'NightOwl',    pods: 7100,  avatar: '🎮' },
  { rank: 5, name: 'SpeedRun',    pods: 6540,  avatar: '🎮' },
  { rank: 6, name: 'PixelHero',   pods: 5980,  avatar: '🎮' },
  { rank: 7, name: 'QuestMaster', pods: 5210,  avatar: '🎮' },
  { rank: 8, name: 'ArcadeAce',   pods: 4870,  avatar: '🎮' },
  { rank: 9, name: 'LevelUp',     pods: 4320,  avatar: '🎮' },
  { rank: 10, name: 'GameOn',     pods: 3990,  avatar: '🎮' },
];

export default function Community() {
  return (
    <>
      <div className="page-hero">
        <h1 className="font-heading text-4xl lg:text-5xl font-black uppercase mb-2">Community</h1>
        <p className="font-body text-lg opacity-80">Top Players &amp; Leaderboards</p>
      </div>

      <div className="lg:container lg:px-4 lg:mx-auto px-3 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-bold font_hue_4_start mb-4">
              <i className="fas fa-trophy font_spot_start mr-2"></i>Top Players
            </h2>
            <div className="rounded-2xlg overflow-hidden border-2 border_hue_1_start">
              {leaderboard.map((p, i) => (
                <div key={p.rank}
                  className={`flex items-center px-4 py-3 ${i % 2 === 0 ? 'bg-white' : 'bg_hue_1_with_transparency'}`}>
                  <span className="font-heading font-black text-xl w-8 text-center"
                    style={{ color: p.rank <= 3 ? '#ff9e03' : '#008aaa' }}>
                    {p.rank}
                  </span>
                  <span className="text-2xl mx-3">{p.avatar}</span>
                  <span className="font-body font-semibold font_hue_4_start flex-1">{p.name}</span>
                  <div className="flex items-center gap-1">
                    <img src={PODS_IMG} alt="pods" className="w-5 h-5" />
                    <span className="font-heading font-black font_hue_2_start">{p.pods.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join CTA */}
          <div>
            <div className="bg_hue_4_start rounded-2xlg p-6 text-center mb-6">
              <i className="fas fa-users text-4xl font_hue_1_start mb-3 block"></i>
              <h3 className="font-heading text-xl font-black font_main mb-2">Join the Community</h3>
              <p className="font-body text-sm font_main opacity-80 mb-4">Compete, earn Pods, and climb the leaderboard</p>
              <Link to="/register">
                <button className="w-full bg_spot_start spot_fontcol font-heading font-black uppercase py-2 rounded-xl">
                  Sign Up Free
                </button>
              </Link>
            </div>
            <div className="bg-white rounded-2xlg p-6 border-2 border_hue_1_start text-center">
              <i className="fas fa-star text-4xl font_spot_start mb-3 block"></i>
              <h3 className="font-heading text-xl font-bold font_hue_4_start mb-2">Your Rank</h3>
              <p className="font-body text-sm grey_font mb-3">Login to see your position</p>
              <Link to="/login">
                <button className="w-full bg_hue_2_start hue_2_fontcol font-heading font-black uppercase py-2 rounded-xl">
                  Login
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
