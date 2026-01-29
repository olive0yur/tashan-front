<script setup lang="ts">
interface MediaItem {
  type: 'image' | 'video'
  src: string
  label?: string
}

const props = withDefaults(defineProps<{
  items: MediaItem[]
  autoplay?: boolean
  interval?: number
}>(), {
  autoplay: true,
  interval: 2000
})

const currentIndex = ref(0)
const startX = ref(0)
const isDragging = ref(false)
const currentTranslate = ref(0)
const prevTranslate = ref(0)
const isTransitioning = ref(false)
let transitionTimeout: ReturnType<typeof setTimeout> | null = null

// 自动切换相关
let autoplayTimer: ReturnType<typeof setTimeout> | null = null
const isPaused = ref(false)

const currentItem = computed((): MediaItem => {
  return props.items[currentIndex.value] ?? props.items[0]!
})
const prevItem = computed((): MediaItem => {
  const prevIndex = currentIndex.value === 0 ? props.items.length - 1 : currentIndex.value - 1
  return props.items[prevIndex] ?? props.items[0]!
})
const nextItem = computed((): MediaItem => {
  const nextIndex = currentIndex.value === props.items.length - 1 ? 0 : currentIndex.value + 1
  return props.items[nextIndex] ?? props.items[0]!
})

const handleMouseDown = (e: MouseEvent) => {
  // 如果点击的是按钮或指示器，不触发拖动
  if ((e.target as HTMLElement).closest('.watch-video-btn, .indicators')) return

  // 用户交互时暂停自动播放
  pauseAutoplay()

  if (transitionTimeout) {
    clearTimeout(transitionTimeout)
    transitionTimeout = null
  }

  isDragging.value = true
  startX.value = e.clientX
  isTransitioning.value = false
  prevTranslate.value = currentTranslate.value
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  const currentX = e.clientX
  const diff = currentX - startX.value
  currentTranslate.value = prevTranslate.value + diff
}

const handleMouseUp = () => {
  if (!isDragging.value) return

  isDragging.value = false
  const movedBy = currentTranslate.value - prevTranslate.value
  const threshold = window.innerWidth * 0.15

  if (movedBy < -threshold) {
    // 向左滑动 - 下一个
    next()
  } else if (movedBy > threshold) {
    // 向右滑动 - 上一个
    prev()
  } else {
    // 回弹
    isTransitioning.value = true
    currentTranslate.value = 0
    transitionTimeout = setTimeout(() => {
      resetPosition()
      // 用户交互结束后恢复自动播放
      resumeAutoplay()
    }, 450)
  }
}

const resetPosition = () => {
  isTransitioning.value = false
  currentTranslate.value = 0
  prevTranslate.value = 0
  transitionTimeout = null
}

const next = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentTranslate.value = -window.innerWidth
  transitionTimeout = setTimeout(() => {
    currentIndex.value = currentIndex.value === props.items.length - 1 ? 0 : currentIndex.value + 1
    resetPosition()
    // 切换完成后重启自动播放
    startAutoplay()
  }, 450)
}

const prev = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentTranslate.value = window.innerWidth
  transitionTimeout = setTimeout(() => {
    currentIndex.value = currentIndex.value === 0 ? props.items.length - 1 : currentIndex.value - 1
    resetPosition()
    // 切换完成后重启自动播放
    startAutoplay()
  }, 450)
}

const goToSlide = (index: number) => {
  if (isTransitioning.value || index === currentIndex.value) return

  // 手动切换时暂停自动播放
  pauseAutoplay()

  isTransitioning.value = true
  const isNext = index > currentIndex.value
  currentTranslate.value = isNext ? -window.innerWidth : window.innerWidth

  transitionTimeout = setTimeout(() => {
    currentIndex.value = index
    resetPosition()
    // 切换完成后恢复自动播放
    resumeAutoplay()
  }, 450)
}

const handleWatchVideo = () => {
  console.log('观看视频')
}

const getSlideStyle = (position: 'prev' | 'current' | 'next') => {
  let baseOffset = 0
  if (position === 'prev') baseOffset = -100
  else if (position === 'next') baseOffset = 100

  const dragPercent = (currentTranslate.value / window.innerWidth) * 100
  const finalTranslate = baseOffset + dragPercent

  // 计算缩放和透明度，增加真实感
  const absProgress = Math.abs(dragPercent) / 100
  let scale = 1
  let opacity = 1

  if (position === 'current') {
    scale = 1 - absProgress * 0.05 // 当前项轻微缩小
    opacity = 1 - absProgress * 0.3
  } else {
    // 进场项从 0.95 放大到 1
    const isIncoming = (position === 'next' && dragPercent < 0) || (position === 'prev' && dragPercent > 0)
    if (isIncoming) {
      scale = 0.95 + (absProgress * 0.05)
      opacity = 0.5 + (absProgress * 0.5)
    } else {
      scale = 0.95
      opacity = 0.5
    }
  }

  return {
    transform: `translateX(${finalTranslate}%) scale(${scale})`,
    opacity,
    transition: isTransitioning.value ? 'all 0.45s cubic-bezier(0.2, 0, 0, 1)' : 'none',
    zIndex: position === 'current' ? 2 : 1
  }
}

// 启动自动播放
const startAutoplay = () => {
  if (!props.autoplay || isPaused.value) return
  stopAutoplay()
  autoplayTimer = setTimeout(() => {
    next()
  }, props.interval)
}

// 停止自动播放
const stopAutoplay = () => {
  if (autoplayTimer) {
    clearTimeout(autoplayTimer)
    autoplayTimer = null
  }
}

// 暂停自动播放
const pauseAutoplay = () => {
  isPaused.value = true
  stopAutoplay()
}

// 恢复自动播放
const resumeAutoplay = () => {
  isPaused.value = false
  startAutoplay()
}

// 组件挂载时启动自动播放
onMounted(() => {
  if (props.autoplay) {
    startAutoplay()
  }
})

// 组件卸载时清理定时器
onUnmounted(() => {
  stopAutoplay()
  if (transitionTimeout) {
    clearTimeout(transitionTimeout)
  }
})
</script>

<template>
  <div
    class="carousel-container"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseenter="pauseAutoplay"
    @mouseleave="() => { handleMouseUp(); resumeAutoplay(); }"
  >
    <div class="carousel-track">
      <!-- 上一张 -->
      <div
        class="media-slide"
        :style="getSlideStyle('prev')"
      >
        <img
          v-if="prevItem.type === 'image'"
          :src="prevItem.src"
          alt=""
          class="media-content"
        >
        <div
          v-else
          class="video-wrapper"
        >
          <video
            :src="prevItem.src"
            class="media-content"
            loop
            muted
          />
        </div>
      </div>

      <!-- 当前张 -->
      <div
        class="media-slide"
        :style="getSlideStyle('current')"
      >
        <img
          v-if="currentItem.type === 'image'"
          :src="currentItem.src"
          alt=""
          class="media-content"
        >
        <div
          v-else-if="currentItem.type === 'video'"
          class="video-wrapper"
        >
          <video
            :src="currentItem.src"
            class="media-content"
            autoplay
            loop
            muted
          />
          <button
            class="watch-video-btn"
            @click.stop="handleWatchVideo"
          >
            <img
              src="/home/play.svg"
              alt=""
            >
            观看视频
          </button>
        </div>
      </div>

      <!-- 下一张 -->
      <div
        class="media-slide"
        :style="getSlideStyle('next')"
      >
        <img
          v-if="nextItem.type === 'image'"
          :src="nextItem.src"
          alt=""
          class="media-content"
        >
        <div
          v-else
          class="video-wrapper"
        >
          <video
            :src="nextItem.src"
            class="media-content"
            loop
            muted
          />
        </div>
      </div>
    </div>

    <!-- 固定品牌文字 -->
    <div class="brand-text">
      TASHAN TS-F+
    </div>

    <!-- 文案标题 -->
    <SplitText
      v-if="currentItem.label"
      :key="currentIndex"
      :text="currentItem.label"
      class="carousel-title"
      tag="div"
      split-type="chars"
      :delay="30"
      :duration="1"
      :from="{ opacity: 0, y: 30 }"
      :to="{ opacity: 1, y: 0 }"
      text-align="left"
      :once="false"
    />

    <!-- 导航指示器 -->
    <div class="indicators">
      <span
        v-for="(_, index) in items"
        :key="index"
        class="indicator"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
  user-select: none;
  -webkit-user-drag: none;
}

.carousel-container:active {
  cursor: grabbing;
}

.carousel-track {
  position: relative;
  width: 100%;
  height: 100%;
}

.media-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.media-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  -webkit-user-drag: none;
  user-select: none;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.watch-video-btn {
  position: absolute;
  bottom: 100px;
  right: 100px;
  display: inline-flex;
  padding: 14px 30px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.20);
  backdrop-filter: blur(20px);
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  pointer-events: auto;
}

.watch-video-btn:hover {
  background: rgba(255, 255, 255, 0.30);
  transform: scale(1.05);
}

.watch-video-btn img {
  width: 20px;
  height: 20px;
}

.brand-text {
  position: absolute;
  bottom: 248px;
  left: 100px;
  color: #FFF;
  font-family: "Source Han Sans SC", sans-serif;
  font-size: 16px;
  font-weight: 400;
  z-index: 10;
  pointer-events: none;
}

.carousel-title {
  position: absolute;
  bottom: 164px;
  left: 100px;
  color: #FFF;
  font-family: "Source Han Sans SC", sans-serif;
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 70px;
  letter-spacing: 1.2px;
  z-index: 10;
  pointer-events: none;
  white-space: pre-line;
}

.indicators {
  position: absolute;
  bottom: 100px;
  left: 100px;
  display: flex;
  gap: 8px;
  pointer-events: auto;
  z-index: 10;
}

.indicator {
  width: 80px;
  height: 4px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.20);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.4);
}

.indicator.active {
  background: #FFF;
}
</style>
