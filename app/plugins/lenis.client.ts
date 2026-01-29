export default defineNuxtPlugin((nuxtApp) => {
  const { initLenis } = useLenis()

  nuxtApp.hook('app:mounted', () => {
    initLenis()
  })

  return {
    provide: {
      lenis: useLenis()
    }
  }
})
