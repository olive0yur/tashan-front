<template>
  <component
    :is="tag"
    ref="textRef"
    :class="['split-parent', className, { 'is-visible': isVisible }]"
    :style="textStyle"
  >
    <span
      v-for="(char, index) in chars"
      :key="index"
      class="split-char"
      :style="getCharStyle(index)"
    >
      {{ char }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// 注释掉 GSAP 相关导入，使用原生 CSS 动画
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { SplitText as GSAPSplitText } from 'gsap/SplitText'
// gsap.registerPlugin(ScrollTrigger, GSAPSplitText)

export interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string | ((t: number) => number)
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  from?: { opacity?: number, y?: number, x?: number }
  to?: { opacity?: number, y?: number, x?: number }
  threshold?: number
  rootMargin?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  once?: boolean
}

const props = withDefaults(defineProps<SplitTextProps>(), {
  className: '',
  delay: 50,
  duration: 1.25,
  ease: 'power3.out',
  splitType: 'chars',
  from: () => ({ opacity: 0, y: 40 }),
  to: () => ({ opacity: 1, y: 0 }),
  threshold: 0.01,
  rootMargin: '0px',
  textAlign: 'center',
  tag: 'p',
  once: true
})

const emit = defineEmits<{
  animationComplete: []
}>()

const textRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

const chars = computed(() => {
  if (props.splitType === 'chars' || props.splitType === 'words, chars') {
    return props.text.split('')
  }
  return [props.text]
})

const textStyle = computed(() => ({
  textAlign: props.textAlign,
  display: 'inline-block',
  whiteSpace: 'normal',
  wordWrap: 'break-word'
}))

// 转换 ease 名称为 CSS cubic-bezier
const getCubicBezier = () => {
  const easeStr = props.ease.toString()
  if (easeStr.includes('power3.out')) {
    return 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
  }
  if (easeStr.includes('power2.out')) {
    return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }
  if (easeStr.includes('ease')) {
    return 'ease-out'
  }
  return 'ease-out'
}

const getCharStyle = (index: number) => {
  const fromY = props.from?.y || 0
  const fromX = props.from?.x || 0
  const fromOpacity = props.from?.opacity ?? 0

  const toY = props.to?.y || 0
  const toX = props.to?.x || 0
  const toOpacity = props.to?.opacity ?? 1

  return {
    display: 'inline-block',
    opacity: isVisible.value ? toOpacity : fromOpacity,
    transform: isVisible.value
      ? `translate(${toX}px, ${toY}px)`
      : `translate(${fromX}px, ${fromY}px)`,
    transition: `opacity ${props.duration}s ${getCubicBezier()}, transform ${props.duration}s ${getCubicBezier()}`,
    transitionDelay: `${index * props.delay}ms`,
    willChange: 'transform, opacity'
  }
}

const initObserver = () => {
  if (!textRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true

          // 动画完成后触发事件
          setTimeout(() => {
            emit('animationComplete')
          }, props.duration * 1000 + (chars.value.length * props.delay))

          // 如果只播放一次，断开观察器
          if (props.once && observer) {
            observer.disconnect()
          }
        }
      })
    },
    {
      threshold: props.threshold,
      rootMargin: props.rootMargin
    }
  )

  observer.observe(textRef.value)
}

const cleanup = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

onMounted(() => {
  initObserver()
})

onBeforeUnmount(() => {
  cleanup()
})
</script>

<style scoped>
.split-parent {
  position: relative;
}

.split-char {
  white-space: pre;
}
</style>
