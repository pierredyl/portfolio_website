import { useEffect, useRef, useState } from 'react'

/**
 * Simulated register -> login walkthrough of Checkpoint's real request/
 * response contract. Entirely client-side: nothing typed here is sent
 * anywhere, and the token returned is a locally generated look-alike, not a
 * real Ed25519-signed PASETO token from a live server.
 *
 * The shapes here — endpoints, field names, status behavior, the PASETO
 * version, and the refresh-token cookie on login — are taken directly from
 * the project's README (github.com/pierredyl/secure-auth-gateway), not
 * guessed. Only the actual values (ids, timestamps, the token bytes) are
 * fabricated for the walkthrough.
 */

function randomHex(len) {
  let s = ''
  while (s.length < len) s += Math.floor(Math.random() * 16).toString(16)
  return s.slice(0, len)
}

function randomBase64Url(len) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  let s = ''
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)]
  return s
}

function maskPassword(pw) {
  return '•'.repeat(Math.max(pw.length, 8))
}

/** Reveals `text` progressively, respecting prefers-reduced-motion. */
function useTypedReveal(text) {
  const [shown, setShown] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    clearInterval(timerRef.current)

    if (!text) return

    // Under reduced motion, a single tick reveals the whole string at once —
    // same async-callback code path either way, no synchronous setState in
    // the effect body itself.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const step = reduceMotion ? text.length : 3
    let i = 0
    timerRef.current = setInterval(() => {
      i += step
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(timerRef.current)
    }, reduceMotion ? 0 : 10)
    return () => clearInterval(timerRef.current)
  }, [text])

  return shown
}

function RequestResponse({ curl, response }) {
  const shownResponse = useTypedReveal(response)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <div>
        <span className="meta text-text-faint block mb-2">request</span>
        <pre className="text-xs leading-relaxed text-text-muted bg-bg border border-border rounded-lg p-4 overflow-x-auto whitespace-pre">
          {curl}
        </pre>
      </div>
      <div>
        <span className="meta text-text-faint block mb-2">response</span>
        <pre className="text-xs leading-relaxed text-text bg-bg border border-border rounded-lg p-4 overflow-x-auto whitespace-pre min-h-[3.5rem]">
          {shownResponse}
        </pre>
      </div>
    </div>
  )
}

function StepForm({ title, email, password, onEmail, onPassword, onSubmit, buttonLabel, disabled }) {
  return (
    <div className={disabled ? 'opacity-40 pointer-events-none' : ''}>
      <span className="meta text-accent block mb-4">{title}</span>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="flex flex-wrap gap-3"
      >
        <input
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          type="email"
          placeholder="email"
          className="bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-text-faint flex-1 min-w-[10rem] focus:outline-none focus:border-accent"
        />
        <input
          value={password}
          onChange={(e) => onPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-text-faint flex-1 min-w-[10rem] focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={!email || !password}
          className="meta px-5 py-2.5 rounded-full bg-accent text-bg font-bold hover:bg-accent-hi disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  )
}

export default function CheckpointDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signup, setSignup] = useState(null)
  const [login, setLogin] = useState(null)

  const handleSignup = () => {
    const id = crypto.randomUUID ? crypto.randomUUID() : randomHex(32)
    const curl =
      `curl -k -X POST https://localhost/api/v1/auth/register \\\n` +
      `  -H "Content-Type: application/json" \\\n` +
      `  -d '{"email":"${email}","password":"${maskPassword(password)}"}'`
    const response = JSON.stringify(
      {
        message: 'user registered',
        data: { id, role: 'user', email, created_at: new Date().toISOString() },
      },
      null,
      2
    )
    setSignup({ curl, response })
    setLogin(null)
  }

  const handleLogin = () => {
    const curl =
      // -i to show response headers — the register call doesn't need them,
      // but login is the one that sets the refresh_token cookie.
      `curl -k -i -X POST https://localhost/api/v1/auth/login \\\n` +
      `  -H "Content-Type: application/json" \\\n` +
      `  -d '{"email":"${email}","password":"${maskPassword(password)}"}'`

    // Access tokens are PASETO v2.public (Ed25519-signed, not encrypted) —
    // this one is a random look-alike, not a real signature.
    const accessToken = `v2.public.${randomBase64Url(86)}`
    const refreshCookie = randomBase64Url(64)

    const response =
      `HTTP/1.1 201 Created\n` +
      `Set-Cookie: refresh_token=${refreshCookie}; HttpOnly; Secure; SameSite=Strict; Path=/api/v1/auth\n\n` +
      JSON.stringify({ message: 'login successful', access_token: accessToken }, null, 2)

    setLogin({ curl, response })
  }

  return (
    <div className="card p-6 md:p-8">
      <p className="meta text-text-faint mb-6">
        Simulated locally — nothing typed here is sent anywhere. Use any values.
      </p>

      <StepForm
        title="1. Register"
        email={email}
        password={password}
        onEmail={setEmail}
        onPassword={setPassword}
        onSubmit={handleSignup}
        buttonLabel="Register →"
      />
      {signup && <RequestResponse curl={signup.curl} response={signup.response} />}

      <div className="border-t border-border mt-8 pt-8">
        <StepForm
          title="2. Log in"
          email={email}
          password={password}
          onEmail={setEmail}
          onPassword={setPassword}
          onSubmit={handleLogin}
          buttonLabel="Log in →"
          disabled={!signup}
        />
        {login && <RequestResponse curl={login.curl} response={login.response} />}
      </div>
    </div>
  )
}
