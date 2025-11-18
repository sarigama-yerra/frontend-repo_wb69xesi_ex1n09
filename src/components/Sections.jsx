import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Sections() {
  const servicesRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={servicesRef} className="py-28 bg-white text-black">
        <div className="container mx-auto px-6">
          <div className="reveal h-28 border border-zinc-200 rounded-xl" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="reveal h-24 border border-zinc-200 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      <section ref={contactRef} className="py-28 bg-zinc-50 text-black">
        <div className="container mx-auto px-6">
          <div className="reveal h-32 border border-zinc-200 rounded-xl" />
          <div className="mt-8 reveal h-20 border border-zinc-200 rounded-xl" />
        </div>
      </section>

      <footer className="py-16 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="h-10 w-32 border border-white/20 rounded" />
        </div>
      </footer>
    </>
  )
}
