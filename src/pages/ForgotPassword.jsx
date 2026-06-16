import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_IMG } from '../data';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent]   = useState(false);

  return (
    <div className="min-h-screen bg_hue_4_start flex items-center justify-center px-4 py-12">
      <div className="auth-card">
        <div className="text-center mb-6">
          <img src={LOGO_IMG} alt="Gamifya" className="h-14 mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-black font_hue_4_start uppercase">Reset Password</h1>
          <p className="font-body text-sm grey_font mt-1">Enter your email to receive a reset link</p>
        </div>
        {sent ? (
          <div className="text-center py-4">
            <i className="fas fa-check-circle text-5xl font_hue_1_start mb-3 block"></i>
            <p className="font-body font_hue_4_start font-semibold">Reset link sent! Check your email.</p>
            <Link to="/login" className="block mt-4 font_hue_2_start font-bold hover:underline font-body text-sm">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <div>
              <label className="block font-body text-sm font-semibold font_hue_4_start mb-1">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border-2 border_hue_2_start rounded-xl px-4 py-2 font-body text-sm focus:outline-none" />
            </div>
            <button type="submit"
              className="w-full bg_hue_2_start hue_2_fontcol font-heading font-black uppercase text-lg py-2 rounded-xl hover:opacity-90 transition-opacity">
              Send Reset Link
            </button>
            <div className="text-center">
              <Link to="/login" className="font-body text-sm font_hue_2_start hover:underline">Back to Login</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
