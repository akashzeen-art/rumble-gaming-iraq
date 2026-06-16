import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '', confirm: '' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg_hue_4_start flex items-center justify-center px-4 py-12">
      <div className="auth-card">
        <div className="text-center mb-6">
          <h1 className="font-heading text-2xl font-black font_hue_4_start uppercase">Create Account</h1>
          <p className="font-body text-sm grey_font mt-1">Join Gamifya for free</p>
        </div>

        <form onSubmit={e => e.preventDefault()} className="space-y-3">
          {[
            { key: 'name',     label: 'Full Name',        type: 'text',     ph: 'Your full name' },
            { key: 'email',    label: 'Email Address',    type: 'email',    ph: 'your@email.com' },
            { key: 'mobile',   label: 'Mobile Number',    type: 'tel',      ph: '+27 000 000 0000' },
            { key: 'password', label: 'Password',         type: 'password', ph: 'Create a password' },
            { key: 'confirm',  label: 'Confirm Password', type: 'password', ph: 'Repeat your password' },
          ].map(f => (
            <div key={f.key}>
              <label className="block font-body text-sm font-semibold font_hue_4_start mb-1">{f.label}</label>
              <input type={f.type} value={form[f.key]} onChange={set(f.key)} placeholder={f.ph}
                className="w-full border-2 border_hue_2_start rounded-xl px-4 py-2 font-body text-sm focus:outline-none" />
            </div>
          ))}
          <button type="submit"
            className="w-full bg_hue_2_start hue_2_fontcol font-heading font-black uppercase text-lg py-2 rounded-xl hover:opacity-90 transition-opacity mt-2">
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="font-body text-sm grey_font">Already have an account?{' '}
            <Link to="/login" className="font_hue_2_start font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
