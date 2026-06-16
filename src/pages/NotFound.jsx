import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg_hue_4_start flex items-center justify-center px-4 text-center">
      <div>
        <p className="font-heading text-9xl font-black font_hue_1_start">404</p>
        <h1 className="font-heading text-3xl font-black font_main uppercase mt-2 mb-4">Page Not Found</h1>
        <p className="font-body font_main opacity-70 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/">
          <button className="bg_spot_start spot_fontcol font-heading font-black uppercase px-8 py-3 rounded-xl text-lg">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
