import Lenis from 'lenis'

let lenis: Lenis | null = null

export const useLenis = () => {
  const initLenis = () => {
    if (import.meta.client && !lenis) {
      lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // 触屏优化
        smoothTouch: true,
        syncTouch: true,
        touchMultiplier: 1.2
      })

      function raf(time: number) {
        lenis?.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }
  }

  const destroyLenis = () => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
  }

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    lenis?.scrollTo(target, options)
  }

  return {
    lenis,
    initLenis,
    destroyLenis,
    scrollTo
  }
}
