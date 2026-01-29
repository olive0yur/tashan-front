<template>
  <div class="brand-scroll-wrapper">
    <!-- 左侧遮罩 -->
    <div class="gradient-mask gradient-mask-left" />

    <div class="brand-scroll-container">
      <!-- 三行滚动 -->
      <div
        v-for="(row, rowIndex) in scrollRows"
        :key="rowIndex"
        class="scroll-row"
        @mouseenter="hoveredRow = rowIndex"
        @mouseleave="hoveredRow = null"
      >
        <div
          class="scroll-content"
          :class="[
            `scroll-content-${rowIndex}`,
            { paused: hoveredRow === rowIndex }
          ]"
          :style="{ animationDuration: `${duration}s` }"
        >
          <div
            v-for="(brand, index) in [...row, ...row]"
            :key="`${rowIndex}-${index}`"
            class="brand-box"
          >
            <span class="brand-text">{{ brand.text }}</span>
            <div class="brand-icon">
              <div class="icon-placeholder">
                <img
                  :src="brand.img"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧遮罩 -->
    <div class="gradient-mask gradient-mask-right" />
  </div>
</template>

<script setup lang="ts">
interface Brand {
  text: string
  img?: string
}

interface Props {
  rows: Brand[][] // 三行数据
  duration?: number // 滚动持续时间（秒）
}

const props = withDefaults(defineProps<Props>(), {
  duration: 30
})

// 当前悬停的行索引
const hoveredRow = ref<number | null>(null)

// 确保三行数据
const scrollRows = computed(() => {
  return props.rows.slice(0, 3)
})
</script>

<style scoped>
.brand-scroll-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.brand-scroll-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.scroll-row {
  overflow: hidden;
  width: 100%;
}

.scroll-content {
  display: flex;
  gap: 24px;
  animation: scroll-left linear infinite;
  width: fit-content;
}

.scroll-content.paused {
  animation-play-state: paused;
}

/* 第二行 - 向左偏移156px */
.scroll-content-1 {
  margin-left: -156px;
}

/* 第三行 - 向左偏移78px */
.scroll-content-2 {
  margin-left: -78px;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.brand-box {
  width: 288px;
  height: 72px;
  border-radius: 16px;
  border: 1px solid #BCC1D2;
  background: #E0E3EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}

.brand-text {
  color: #000;
  font-family: "Source Han Sans SC", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.32px;
}

.brand-icon {
  width: 46px;
  height: 46px;
  flex-shrink: 0;
}

.icon-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #EEF0F4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gradient-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 505px;
  pointer-events: none;
  z-index: 1;
}

.gradient-mask-left {
  left: 0;
  background: linear-gradient(90deg, #EEF0F4 0%, rgba(238, 240, 244, 0.00) 100%);
}

.gradient-mask-right {
  right: 0;
  background: linear-gradient(270deg, #EEF0F4 0%, rgba(238, 240, 244, 0.00) 100%);
}
</style>
