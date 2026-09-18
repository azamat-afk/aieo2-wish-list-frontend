'use client'

import { useMemo, useState } from 'react'
import { BellRing, ChevronDown, Gift, PenLine, Sparkles, WandSparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SANTA_IMAGE = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cool_santa-3EGwIDi49GWo6H6LLF2maYRYxaQDcz.png'

const initialWishes = [
  { text: 'A telescope to explore the stars', rating: 'Nice', color: 'bg-emerald-700' },
  { text: 'A surprise trip somewhere snowy', rating: 'Nice', color: 'bg-emerald-700' },
  { text: 'Unlimited hot cocoa (with marshmallows!)', rating: 'Naughty', color: 'bg-rose-700' },
]

export function SantaWishList() {
  const [wish, setWish] = useState('')
  const [wishes, setWishes] = useState(initialWishes)
  const [isWriting, setIsWriting] = useState(false)
  const [sealed, setSealed] = useState(false)
  const [soundOn, setSoundOn] = useState(true)

  const snowflakes = useMemo(() => Array.from({ length: 30 }, (_, index) => ({
    left: `${(index * 37) % 100}%`,
    delay: `${(index % 9) * 0.7}s`,
    duration: `${7 + (index % 6)}s`,
    size: `${10 + (index % 4) * 4}px`,
  })), [])

  function playBell() {
    if (!soundOn || typeof window === 'undefined') return
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const context = new AudioContextClass()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(660, context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(990, context.currentTime + 0.18)
    gain.gain.setValueAtTime(0.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.8)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.8)
  }

  function addWish() {
    const cleanWish = wish.trim()
    if (!cleanWish || isWriting) return
    setIsWriting(true)
    setSealed(false)
    window.setTimeout(() => {
      setWishes((current) => [...current, { text: cleanWish, rating: cleanWish.toLowerCase().includes('candy') ? 'Naughty' : 'Nice', color: cleanWish.toLowerCase().includes('candy') ? 'bg-rose-700' : 'bg-emerald-700' }])
      setWish('')
      setIsWriting(false)
      playBell()
    }, 900)
  }

  function sealList() {
    if (!wishes.length) return
    setSealed(true)
    playBell()
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#091d2b] text-[#f8f1e1]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(161,49,43,.42),transparent_38%),linear-gradient(135deg,#0b2533_0%,#071722_55%,#1a1013_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(232,200,132,.2)_1px,transparent_1px)] [background-size:28px_28px]" />
      {snowflakes.map((flake, index) => <span key={index} aria-hidden="true" className="snowflake" style={{ left: flake.left, animationDelay: flake.delay, animationDuration: flake.duration, fontSize: flake.size }}>✦</span>)}

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-10">
        <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-full border border-[#e8c884]/70 bg-[#a8322b] shadow-[0_0_28px_rgba(232,200,132,.18)]"><Gift aria-hidden="true" /></div><span className="font-serif text-lg font-semibold tracking-wide">Santa&apos;s Workshop</span></div>
        <button onClick={() => setSoundOn(!soundOn)} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[.18em] text-[#f3ddad] backdrop-blur transition hover:bg-white/15" aria-label={soundOn ? 'Turn bells off' : 'Turn bells on'}><BellRing className="size-4" /> {soundOn ? 'Bells on' : 'Bells off'}</button>
      </header>

      <section className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-4 md:grid-cols-[1fr_1.05fr] md:items-center md:px-10 md:pt-12">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e8c884]/40 bg-[#e8c884]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.23em] text-[#f0d59d]"><Sparkles className="size-3.5" /> Christmas 2024</div>
          <h1 className="max-w-xl font-serif text-5xl leading-[.98] text-[#fff8e9] sm:text-6xl md:text-7xl">Tell Santa what your <em className="text-[#e8c884]">heart</em> desires.</h1>
          <p className="max-w-md text-base leading-7 text-[#c7d0d0]">Write down your wishes and watch them magically appear on Santa&apos;s list. Every wish gets a little holiday verdict.</p>
          <div className="flex items-center gap-5 text-sm text-[#aebabc]"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#e8c884]" /> Make a wish</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#e8c884]" /> Seal the magic</span></div>
        </div>

        <div className="relative mx-auto w-full max-w-[530px]">
          <div className="absolute -inset-6 rounded-[50%] bg-[#f0b24d]/10 blur-3xl" />
          <div className="relative aspect-[1.23] overflow-hidden rounded-[28px] border border-[#e8c884]/45 bg-[#96322d] shadow-[0_20px_80px_rgba(0,0,0,.42)]">
            <img src={SANTA_IMAGE} alt="Santa Claus wearing sunglasses and a red suit" className="absolute inset-0 size-full object-cover object-center opacity-90 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101925]/70 via-transparent to-[#7d1824]/10" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><div><p className="font-serif text-2xl text-white">Santa knows best.</p><p className="text-xs uppercase tracking-[.2em] text-[#f0d59d]">North Pole approved</p></div><WandSparkles className="size-8 text-[#f0d59d]" /></div>
          </div>
        </div>

        <div className="md:col-span-2 md:mx-auto md:w-full md:max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr]">
            <div className="rounded-[24px] border border-white/15 bg-white/[.07] p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <div className="mb-7 flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-[#e8c884] text-[#182735]"><PenLine /></div><div><h2 className="font-serif text-2xl">Make a wish</h2><p className="text-sm text-[#aebabc]">One wish at a time</p></div></div>
              <label htmlFor="wish" className="sr-only">Your wish</label><textarea id="wish" value={wish} onChange={(event) => setWish(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); addWish() } }} placeholder="I wish for..." className="min-h-32 w-full resize-none rounded-2xl border border-white/15 bg-[#061722]/70 p-4 font-serif text-lg text-[#fff8e9] outline-none placeholder:text-[#7f9298] focus:border-[#e8c884]/70 focus:ring-2 focus:ring-[#e8c884]/20" />
              <Button variant="outline" onClick={addWish} disabled={isWriting || !wish.trim()} className="mt-4 w-full border-[#e8c884]/70 bg-[#e8c884] text-[#172734] hover:bg-[#f3d99d]">{isWriting ? 'Writing your wish...' : 'Add to my list'} <WandSparkles data-icon="inline-end" /></Button>
              <p className="mt-4 text-center text-xs text-[#82949a]">Press Enter to add · Shift + Enter for a new line</p>
            </div>

            <div className="parchment relative min-h-[360px] overflow-hidden rounded-[26px] px-7 py-8 text-[#3a2418] shadow-[0_16px_55px_rgba(0,0,0,.35)] sm:px-11 sm:py-10">
              <div className="relative z-10 flex items-start justify-between border-b border-[#8d6338]/40 pb-4"><div><p className="text-xs font-bold uppercase tracking-[.28em] text-[#896238]">The official</p><h2 className="font-serif text-4xl text-[#4c2a1d]">Nice List</h2></div><div className={`seal ${sealed ? 'seal-stamped' : ''}`} aria-label={sealed ? 'List sealed' : 'List not sealed'}>N</div></div>
              <div className="relative z-10 flex flex-col gap-3 pt-5">{wishes.map((item, index) => <div key={`${item.text}-${index}`} className="wish-row" style={{ animationDelay: `${index * 90}ms` }}><span className="font-serif text-lg">{index + 1}.</span><span className="flex-1 font-serif text-lg leading-tight">{item.text}</span><span className={`${item.color} rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white`}>{item.rating}</span></div>)}</div>
              <div className="relative z-10 mt-7 flex items-center justify-between border-t border-[#8d6338]/35 pt-5"><p className="font-serif text-sm italic text-[#896238]">{sealed ? 'Sealed with North Pole magic.' : 'Ready for your final wish?'}</p><Button variant="outline" onClick={sealList} className="border-[#7d4b2a] bg-transparent text-[#5d3523] hover:bg-[#d4a56e]/25">{sealed ? 'Sealed!' : 'Seal my list'} <ChevronDown data-icon="inline-end" /></Button></div>
              <div className="absolute bottom-3 left-1/2 h-3 w-[70%] -translate-x-1/2 rounded-[50%] bg-[#8a5e34]/20 blur-md" />
            </div>
          </div>
        </div>
      </section>
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs uppercase tracking-[.22em] text-[#7e9297]">Made with wonder · from the North Pole</footer>
    </main>
  )
}

export default SantaWishList

// The embedded image comes from the user-provided Santa asset.
