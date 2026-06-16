import { useState } from 'react';

const faqs = [
  { q: 'How do I earn Pods?', a: 'You earn Pods by playing games, completing quests, entering contests, and participating in PvP Clashes.' },
  { q: 'How do I redeem my Pods?', a: 'Go to the Rewards page, choose a reward, and click Redeem. You must be logged in.' },
  { q: 'What is a Contest?', a: 'A Contest is a tournament where multiple players compete for the highest score. Winners earn Pods or prizes.' },
  { q: 'What is a Clash?', a: 'A Clash is a 1v1 PvP battle where you challenge another player directly.' },
  { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.' },
  { q: 'Is Gamifya free to play?', a: 'Yes! Many games and contests are completely free. Some premium contests require Pods to enter.' },
];

export default function Support() {
  const [open, setOpen] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', msg: '' });

  return (
    <>
      <div className="page-hero">
        <h1 className="font-heading text-4xl lg:text-5xl font-black uppercase mb-2">Help &amp; Support</h1>
        <p className="font-body text-lg opacity-80">We're here to help you</p>
      </div>

      <div className="lg:container lg:px-4 lg:mx-auto px-3 py-8">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* FAQ */}
          <div>
            <h2 className="font-heading text-2xl font-bold font_hue_4_start mb-4">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {faqs.map((f, i) => (
                <div key={i} className="border-2 border_hue_1_start rounded-2xlg overflow-hidden">
                  <button
                    className="w-full text-left px-4 py-3 font-heading font-bold font_hue_4_start flex justify-between items-center bg_hue_1_with_transparency"
                    onClick={() => setOpen(open === i ? null : i)}>
                    {f.q}
                    <i className={`fas fa-chevron-${open === i ? 'up' : 'down'} font_hue_2_start ml-2`}></i>
                  </button>
                  {open === i && (
                    <div className="px-4 py-3 font-body text-sm font_hue_4_start bg-white">{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="font-heading text-2xl font-bold font_hue_4_start mb-4">Contact Us</h2>
            <form onSubmit={e => e.preventDefault()} className="space-y-4 bg-white rounded-2xlg p-6 border-2 border_hue_1_start">
              {[
                { key: 'name',  label: 'Your Name',    type: 'text',  ph: 'Full name' },
                { key: 'email', label: 'Email Address', type: 'email', ph: 'your@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block font-body text-sm font-semibold font_hue_4_start mb-1">{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.ph}
                    className="w-full border-2 border_hue_2_start rounded-xl px-4 py-2 font-body text-sm focus:outline-none" />
                </div>
              ))}
              <div>
                <label className="block font-body text-sm font-semibold font_hue_4_start mb-1">Message</label>
                <textarea rows={4} value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                  placeholder="How can we help?"
                  className="w-full border-2 border_hue_2_start rounded-xl px-4 py-2 font-body text-sm focus:outline-none resize-none" />
              </div>
              <button type="submit"
                className="w-full bg_hue_2_start hue_2_fontcol font-heading font-black uppercase text-lg py-2 rounded-xl hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
