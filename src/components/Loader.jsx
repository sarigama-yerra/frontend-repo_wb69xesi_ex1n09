import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader() {
  const [done, setDone] = useState(false)
  const wrapperRef = useRef(null)
  const lineRef = useRef(null)
  const dotRef = useRef(null)
  const textPathRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stroke draw animation for the SVG text
      const length = textPathRef.current?.getTotalLength?.() || 800
      gsap.set(textPathRef.current, { strokeDasharray: length, strokeDashoffset: length })

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.to(textPathRef.current, { strokeDashoffset: 0, duration: 1.6 })
        .fromTo(
          [lineRef.current, dotRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.6'
        )
        .to(dotRef.current, { y: -4, repeat: 5, yoyo: true, duration: 0.25 }, '-=0.2')
        .to(lineRef.current, { scaleX: 1.05, transformOrigin: 'center', repeat: 3, yoyo: true, duration: 0.2 }, '<')
        .to(wrapperRef.current, { opacity: 0, duration: 0.5, delay: 0.1 })
        .add(() => setDone(true))
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  if (done) return null

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white">
      {/* Wordmark */}
      <div className="flex flex-col items-center select-none">
        <svg width="360" height="120" viewBox="0 0 720 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
          <path ref={textPathRef} d="M90 170 Q90 90 160 90 Q230 90 230 170 L230 70 L310 170 L310 70 L380 170 L380 70 L470 70 Q520 70 520 120 Q520 170 470 170 M560 70 L560 170 L640 170" stroke="#fff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {/* line + dot */}
        <div className="mt-3 flex items-center gap-3">
          <span ref={lineRef} className="block h-[2px] w-14 bg-white/90" />
          <span ref={dotRef} className="block h-2 w-2 rounded-full bg-white" />
        </div>
      </div>
    </div>
  )
}
