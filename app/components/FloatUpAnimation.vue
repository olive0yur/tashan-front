<template>
  <component
    :is="tag"
    ref="elementRef"
    :class="className"
    :style="elementStyle"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface FloatUpAnimationProps {
  text?: string
  className?: string
  tag?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  duration?: number
  delay?: number
  y?: number
  ease?: string
  threshold?: number
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  replayOnChange?: boolean
}

const props = withDefaults(defineProps<FloatUpAnimationProps>(), {
  text: '',
  className: '',
  tag: 'div',
  duration: 1,
  delay: 0,
  y: 30,
  ease: 'power2.out',
  threshold: 0.1,
  textAlign: 'left',
  replayOnChange: false
})

const emit = defineEmits<{
  animationComplete: []
}>()

const elementRef = ref<HTMLElement | null>(null)
let scrollTriggerInstance: ScrollTrigger | null = null
let currentTween: gsap.core.Tween | null = null

const elementStyle = computed(() => ({
  textAlign: props.textAlign,
  opacity: 0,
  transform: `translateY(${props.y}px)`
}))

const playAnimation = () => {
  if (!elementRef.value) return

  const element = elementRef.value

  // 清理之前的动画
  if (currentTween) {
    currentTween.kill()
    currentTween = null
  }

  // 重置为初始状态
  gsap.set(element, {
    opacity: 0,
    y: props.y
  })

  // 播放动画
  currentTween = gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: props.duration,
    delay: props.delay,
    ease: props.ease,
    onComplete: () => {
      emit('animationComplete')
    }
  })
}

const initAnimation = () => {
  if (!elementRef.value) return

  const element = elementRef.value

  if (props.replayOnChange) {
    // 如果需要在变化时重播，直接播放动画
    playAnimation()
  } else {
    // 否则使用 ScrollTrigger
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: element,
      start: `top ${(1 - props.threshold) * 100}%`,
      once: true,
      onEnter: playAnimation
    })
  }
}

const cleanup = () => {
  if (currentTween) {
    currentTween.kill()
    currentTween = null
  }

  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
    scrollTriggerInstance = null
  }
}

onMounted(() => {
  initAnimation()
})

onBeforeUnmount(() => {
  cleanup()
})

// 监听 text 变化，如果启用了 replayOnChange，重新播放动画
watch(
  () => props.text,
  () => {
    if (props.replayOnChange && elementRef.value) {
      playAnimation()
    }
  }
)
</script>
