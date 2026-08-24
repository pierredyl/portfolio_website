import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'

/* Timings. Every value is a deliberate beat — the sequence is meant to read
   like watching a program boot, not like a loading spinner. */
const START_PAUSE = 750 // before the first keystroke, so it isn't instant-on
const COMMAND_SPEED = 95 // ms per character of the command
const RUN_PAUSE = 700 // after "enter", before the program prints anything
const BOOT_PAUSE = 900 // between boot lines
const WELCOME_PAUSE = 950 // after the last boot line, before the paragraph
const WELCOME_SPEED = 14 // ms per character of the paragraph
const NEWLINE_PAUSE = 450 // extra beat at each line break in the paragraph
const PROMPT_PAUSE = 650 // after the last character, before the prompt returns
const END_PAUSE = 1400 // after the prompt returns, before handing off to the page

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Drives the one-shot boot sequence: type the command, print the boot lines
 * one beat apart, type the welcome paragraph, then report done.
 *
 * Under prefers-reduced-motion the whole thing is skipped — everything is
 * already on screen and `onFinish` never fires, so the page won't move on
 * its own for anyone who asked it not to.
 */
function useBootSequence({ command, boot, welcome }, onFinish) {
  const welcomeText = welcome.join('\n')

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [typedCommand, setTypedCommand] = useState(reduceMotion ? command : '')
  const [ran, setRan] = useState(reduceMotion)
  const [bootShown, setBootShown] = useState(reduceMotion ? boot.length : 0)
  const [typedWelcome, setTypedWelcome] = useState(reduceMotion ? welcomeText : '')
  const [done, setDone] = useState(reduceMotion)

  // Held in a ref so a new inline callback from the parent can't restart the
  // sequence partway through.
  const finishRef = useRef(onFinish)
  useEffect(() => {
    finishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    if (reduceMotion) return

    let cancelled = false

    async function run() {
      await sleep(START_PAUSE)

      for (let i = 1; i <= command.length; i++) {
        if (cancelled) return
        setTypedCommand(command.slice(0, i))
        await sleep(COMMAND_SPEED)
      }

      if (cancelled) return
      setRan(true)
      await sleep(RUN_PAUSE)

      for (let i = 0; i < boot.length; i++) {
        if (cancelled) return
        setBootShown(i + 1)
        await sleep(BOOT_PAUSE)
      }

      await sleep(WELCOME_PAUSE)

      for (let i = 1; i <= welcomeText.length; i++) {
        if (cancelled) return
        setTypedWelcome(welcomeText.slice(0, i))
        await sleep(welcomeText[i - 1] === '\n' ? NEWLINE_PAUSE : WELCOME_SPEED)
      }

      // A beat with the cursor still parked at the end of the paragraph, so the
      // prompt returns as its own moment rather than on the last keystroke.
      await sleep(PROMPT_PAUSE)
      if (cancelled) return
      setDone(true)

      await sleep(END_PAUSE)
      if (cancelled) return
      finishRef.current?.()
    }

    run()
    return () => {
      cancelled = true
    }
  }, [command, boot, welcomeText, reduceMotion])

  return { typedCommand, ran, bootShown, typedWelcome, done }
}

function Cursor() {
  return <span className="animate-pulse text-accent">&#9613;</span>
}

export default function HeroConsole({ onFinish }) {
  const config = site.hero.console
  const { user, boot, heading } = config
  const { typedCommand, ran, bootShown, typedWelcome, done } = useBootSequence(
    config,
    onFinish
  )

  return (
    <div className="card overflow-hidden">
      {/* The page's real heading. Kept out of the terminal so the boot
          sequence can be pure flavor without costing anything semantically. */}
      <h1 className="sr-only">{heading}</h1>

      {/* Title bar — monochrome dots, not the usual red/yellow/green macOS
          convention, to stay inside the site's one-accent-color palette. */}
      <div className="flex items-center gap-2 px-5 md:px-7 py-3.5 md:py-4 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-border-hi" />
        <span className="w-2.5 h-2.5 rounded-full bg-border-hi" />
        <span className="w-2.5 h-2.5 rounded-full bg-border-hi" />
        <span className="meta text-text-faint ml-2">{user}</span>
      </div>

      {/* Body. The min-height reserves the full sequence's space up front, so
          the card never grows under the reader mid-boot. */}
      <div className="px-6 py-8 md:px-12 md:py-12 font-mono text-sm md:text-base leading-relaxed md:leading-loose min-h-[24rem] md:min-h-[28rem] flex flex-col">
        {/* The command */}
        <div className="flex gap-2">
          <span className="text-accent shrink-0">{user} $</span>
          <span className="text-text break-all">
            {typedCommand}
            {!ran && <Cursor />}
          </span>
        </div>

        {/* Boot lines */}
        {bootShown > 0 && (
          <div className="mt-4 md:mt-5">
            {boot.slice(0, bootShown).map((line) => (
              <p key={line} className="text-text-muted">
                {line}
              </p>
            ))}
          </div>
        )}

        {/* Welcome paragraph */}
        {typedWelcome && (
          <p className="mt-6 md:mt-8 text-text whitespace-pre-wrap">
            {typedWelcome}
            {!done && <Cursor />}
          </p>
        )}

        {/* Back at an idle prompt, waiting. */}
        {done && (
          <div className="flex gap-2 mt-8 md:mt-10">
            <span className="text-accent shrink-0">{user} $</span>
            <Cursor />
          </div>
        )}
      </div>
    </div>
  )
}
