import Spline from '@splinetool/react-spline'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const headingRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 0.2 })

      // subtle parallax on scroll
      gsap.to(headingRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          scrub: 0.3,
        },
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapperRef} className="relative min-h-[90vh] w-full bg-white text-black overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/igThmltzmqv5hkWo/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 pointer-events-none flex min-h-[90vh] items-center">
        <div className="container mx-auto px-6">
          <h1 ref={headingRef} className="text-5xl md:text-7xl font-extrabold tracking-tight">DIFDELE</h1>
        </div>
      </div>
      {/* gradient overlay for contrast */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
    </section>
  )
}
