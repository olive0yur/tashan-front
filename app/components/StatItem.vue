<template>
  <div
    ref="statItemRef"
    class="stat-item pb-[24px] flex justify-between items-end"
  >
    <span class="text-[#00000099]">{{ label }}</span>
    <span class="stat-number text-[#CCCCCC] text-[96px]">{{ displayValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StatItemProps {
  label: string
  value: number | string
  duration?: number
  startValue?: number
  suffix?: string
}

const props = withDefaults(defineProps<StatItemProps>(), {
  duration: 2,
  startValue: 0,
  suffix: ''
})

const statItemRef = ref<HTMLElement>()
const displayValue = ref<string | number>(props.startValue + props.suffix)
let scrollTriggerInstance: ScrollTrigger | null = null

const animateValue = () => {
  const isNumber = typeof props.value === 'number'
  const targetValue = isNumber ? props.value : Number.parseInt(props.value as string) || 0

  const current = { value: props.startValue }

  gsap.to(current, {
    value: targetValue,
    duration: props.duration,
    ease: 'power2.out',
    onUpdate: () => {
      const roundedValue = Math.round(current.value)
      displayValue.value = roundedValue + props.suffix
    }
  })
}

onMounted(() => {
  if (statItemRef.value) {
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: statItemRef.value,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        animateValue()
      }
    })
  }
})

onBeforeUnmount(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
})
</script>

<style scoped>
.stat-item {
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 1px;
    background: #0073FF;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .stat-number {
    transition: color 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    .stat-number {
      color: #0073FF;
    }

    &::after {
      width: 100%;
    }
  }
}
</style>
