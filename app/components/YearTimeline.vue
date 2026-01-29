<template>
  <div class="year-timeline">
    <div
      v-for="(year, index) in years"
      :key="year"
      class="year-item"
      :class="{ active: year === activeYear }"
      :style="getYearItemStyle(index)"
      @click="handleYearClick(year)"
    >
      <svg
        class="year-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="20"
        viewBox="0 0 17 20"
        fill="none"
      >
        <path
          d="M1.99555 0.043475C1.20145 0.10869 0.114418 0.561556 0.0861836 1.54341C-0.030284 5.2969 -0.0161654 9.25692 0.054421 12.9959C0.11089 15.956 3.30492 19.2167 5.98014 19.666C8.80007 20.137 12.2694 19.9812 15.1634 19.9522C15.9364 19.7855 16.8928 19.2276 16.9387 18.2892C17.0269 16.4849 16.9916 14.6444 16.9952 12.8365V7.97073C16.9952 6.92367 17.0375 5.48168 16.8716 4.53606C16.5187 2.51801 14.1364 0.192021 12.1494 0.112314C10.2365 0.0326067 8.15069 0 6.08956 0C4.69195 0 3.30845 0.0144869 1.99555 0.0398484"
          :fill="year === activeYear ? '#0073FF' : '#FFFFFF'"
        />
      </svg>
      <span class="year-text">{{ year }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  startYear: number
  endYear: number
  activeYear?: number
}

const props = withDefaults(defineProps<Props>(), {
  activeYear: undefined
})

const emit = defineEmits<{
  yearClick: [year: number]
}>()

const years = computed(() => {
  const result: number[] = []
  for (let year = props.startYear; year <= props.endYear; year++) {
    result.push(year)
  }
  return result
})

const getYearItemStyle = (index: number) => {
  const totalYears = years.value.length
  if (totalYears <= 1) {
    return { left: '100px' }
  }

  const containerWidth = `calc(100% - 200px)`
  const gap = `calc(${containerWidth} / ${totalYears - 1})`
  return {
    left: `calc(100px + ${gap} * ${index})`
  }
}

const handleYearClick = (year: number) => {
  emit('yearClick', year)
}
</script>

<style scoped lang="scss">
.year-timeline {
  position: absolute;
  width: 100%;
  bottom: -30px;

  .year-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: translate(-50%, -50%);
    top: 0;

    .year-icon {
      transition: all 0.3s ease;
    }

    .year-text {
      color: #FFFFFF33;
      font-family: "Source Han Sans SC";
      font-size: 40px;
      font-style: normal;
      font-weight: 400;
      line-height: 40px;
      letter-spacing: 2px;
      transition: color 0.3s ease;
    }

    &.active {
      .year-text {
        color: #FFF;
      }
    }

    &:hover {
      .year-icon {
        transform: scale(1.1);
      }
    }
  }
}
</style>
