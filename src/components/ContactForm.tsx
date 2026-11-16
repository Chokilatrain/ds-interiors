import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Enquiry form. With VITE_FORMS_ENDPOINT unset it runs in fake mode: it validates and shows
 * the thank-you state but sends nothing, and says so. Wiring it later means setting the
 * endpoint (a small API like the PeriscoPe forms service, or a form provider) that accepts
 * a JSON POST of the fields below.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const endpoint = import.meta.env.VITE_FORMS_ENDPOINT
  const fake = !endpoint

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    if (fake) {
      await new Promise((r) => setTimeout(r, 400))
      setStatus('sent')
      form.reset()
      return
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <p className="form-done__title">Thanks, your message is on its way.</p>
        {fake && (
          <p className="form-done__note">
            This is a preview of the site, so nothing was actually sent yet.
          </p>
        )}
        <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label className="field">
        <span>First name</span>
        <input type="text" name="firstName" autoComplete="given-name" required />
      </label>
      <label className="field">
        <span>Last name</span>
        <input type="text" name="lastName" autoComplete="family-name" required />
      </label>
      <label className="field field--wide">
        <span>Email</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label className="field field--wide">
        <span>What’s the project?</span>
        <input type="text" name="subject" />
      </label>
      <label className="field field--wide">
        <span>Message</span>
        <textarea name="message" rows={5} required />
      </label>
      {status === 'error' && (
        <p className="form-error field--wide" role="alert">
          Something went wrong sending that. Please try again, or email directly.
        </p>
      )}
      <button type="submit" className="btn btn--dark field--wide" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  )
}
