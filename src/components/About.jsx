import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const ballRef = useRef(null)
  const shadowRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    const ctx = gsap.context(() => {
      let played = false
      ScrollTrigger.create({
        trigger: el,
        start: 'top 70%',
        onEnter: () => {
          if (played) return
          played = true
          const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
          gsap.set([ballRef.current, shadowRef.current], { opacity: 0 })
          // appear from top
          tl.to([ballRef.current, shadowRef.current], { opacity: 1, duration: 0.1 })
            .fromTo(ballRef.current, { y: -200 }, { y: 0, duration: 0.9, ease: 'bounce.out' })
            .fromTo(
              shadowRef.current,
              { scale: 0.6, opacity: 0.2 },
              { scale: 1.1, opacity: 0.5, duration: 0.9, ease: 'power2.out' },
              '<'
            )
            // roll out to right
            .to(ballRef.current, { x: () => window.innerWidth + 200, rotation: 540, duration: 1.2, ease: 'power3.in' })
            .to(shadowRef.current, { x: () => window.innerWidth + 200, duration: 1.2, ease: 'power3.in' }, '<')
            .add(() => {
              // remove from DOM
              ballRef.current?.remove()
              shadowRef.current?.remove()
            })
        },
        once: true,
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-28 bg-zinc-50 text-zinc-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative mx-auto h-48 w-48">
          {/* SVG Basketball */}
          <svg ref={ballRef} viewBox="0 0 100 100" className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-24 drop-shadow" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#ff6a00" stroke="#111" strokeWidth="4"/>
            <path d="M50 4 V96 M4 50 H96" stroke="#111" strokeWidth="4"/>
            <path d="M18 18 C40 40 60 60 82 82" stroke="#111" strokeWidth="4" fill="none"/>
            <path d="M82 18 C60 40 40 60 18 82" stroke="#111" strokeWidth="4" fill="none"/>
          </svg>
          {/* Shadow */}
          <div ref={shadowRef} className="absolute left-1/2 bottom-0 h-3 w-24 -translate-x-1/2 rounded-full bg-black/30 blur-sm" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="h-20 bg-white/0 border border-zinc-200 rounded-lg" />
          <div className="h-20 bg-white/0 border border-zinc-200 rounded-lg" />
          <div className="h-20 bg-white/0 border border-zinc-200 rounded-lg" />
        </div>
      </div>
    </section>
  )
}
