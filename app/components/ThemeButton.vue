<template>
  <div
    class="theme-button"
    :class="[theme, { 'full-width': fullWidth }]"
    @click="handleClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="8"
      viewBox="0 0 7 8"
      fill="none"
    >
      <path
        d="M0.821696 0.01739C0.494715 0.043476 0.0471133 0.224622 0.0354874 0.617362C-0.0124699 2.11876 -0.00665636 3.70277 0.0224086 5.19837C0.0456606 6.38238 1.36085 7.68668 2.46241 7.86638C3.62356 8.05478 5.05211 7.99246 6.24377 7.98087C6.56203 7.91421 6.95586 7.69103 6.97476 7.31568C7.01109 6.59397 6.99655 5.85776 6.99801 5.1346V3.18829C6.99801 2.76947 7.01545 2.19267 6.94714 1.81442C6.80182 1.0072 5.82087 0.0768085 5.00269 0.0449256C4.21503 0.0130427 3.35616 0 2.50747 0C1.93198 0 1.3623 0.00579477 0.821696 0.0159393"
      />
    </svg>
    <slot>{{ text }}</slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  theme?: 'white' | 'blue'
  text?: string
  fullWidth?: boolean
}
withDefaults(defineProps<Props>(), {
  theme: 'white',
  text: '了解更多',
  fullWidth: false
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.theme-button {
  display: inline-flex;
  padding: 14px 30px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.36px;
  text-transform: uppercase;
  border-radius: 8px;
  backdrop-filter: blur(20px);
  cursor: pointer;
  width: fit-content;
  gap: 8px;
  transition: all 0.3s ease;

  svg {
    width: 7px;
    height: 8px;
    flex-shrink: 0;
  }

  svg path {
    transition: fill 0.3s ease;
  }
}

/* 全宽模式 */
.theme-button.full-width {
  width: 100%;
}

/* 白色主题 */
.theme-button.white {
  color: #000;
  background: #F7F7F8;

  svg path {
    fill: #0073FF;
  }

  &:hover {
    background: #0073FF;
    color: #FFF;

    svg path {
      fill: #FFF;
    }
  }
}

/* 蓝色主题 */
.theme-button.blue {
  color: #FFF;
  background: #0073FF;

  svg path {
    fill: #FFF;
  }

  &:hover {
    background: #0051BB;

    svg path {
      fill: #FFF;
    }
  }
}

/* 响应式设计 */
@media (max-width: 1080px) {
  .theme-button {
    padding: clamp(10px, 1.296vw, 14px) clamp(20px, 2.778vw, 30px);
    font-size: clamp(14px, 1.667vw, 18px);
    line-height: clamp(17.5px, 1.852vw, 20px);
    letter-spacing: clamp(0.28px, 0.033vw, 0.36px);
    border-radius: clamp(4px, 0.741vw, 8px);
    gap: clamp(4px, 0.741vw, 8px);

    svg {
      width: clamp(5px, 0.648vw, 7px);
      height: clamp(6px, 0.741vw, 8px);
    }
  }
}
</style>
