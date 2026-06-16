import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', msg: '' });
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <>
      <div className="page-hero">
        <h1 className="font-heading text-4xl lg:text-5xl font-black uppercase mb-2">Contact Us</h1>
        <p className="font-body text-lg opacity-80">Get in touch with the Gamifya team</p>
      </div>
      <div className="lg:container lg:px-4 lg:mx-auto px-3 py-8 max-w-2xl">
        <form onSubmit={e => e.preventDefault()} className="bg-white rounded-2xlg p-6 border-2 border_hue_1_start space-y-4">
          {[
            { key: 'name',    label: 'Full Name',     type: 'text',  ph: 'Your name' },
            { key: 'email',   label: 'Email',         type: 'email', ph: 'your@email.com' },
            { key: 'subject', label: 'Subject',       type: 'text',  ph: 'How can we help?' },
          ].map(f => (
            <div key={f.key}>
              <label className="block font-body text-sm font-semibold font_hue_4_start mb-1">{f.label}</label>
              <input type={f.type} value={form[f.key]} onChange={set(f.key)} placeholder={f.ph}
                className="w-full border-2 border_hue_2_start rounded-xl px-4 py-2 font-body text-sm focus:outline-none" />
            </div>
          ))}
          <div>
            <label className="block font-body text-sm font-semibold font_hue_4_start mb-1">Message</label>
            <textarea rows={5} value={form.msg} onChange={set('msg')} placeholder="Write your message here..."
              className="w-full border-2 border_hue_2_start rounded-xl px-4 py-2 font-body text-sm focus:outline-none resize-none" />
          </div>
          <button type="submit"
            className="w-full bg_hue_2_start hue_2_fontcol font-heading font-black uppercase text-lg py-2 rounded-xl hover:opacity-90 transition-opacity">
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}
