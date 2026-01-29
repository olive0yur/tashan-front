<template>
  <div class="scene-selector-grid">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="scene-selector-item"
      :class="{ active: activeIndex === index }"
      @mouseenter="handleHover(index)"
    >
      <div class="scene-selector-item-title">
        {{ item.title }}
      </div>
      <div class="scene-selector-line">
        <div class="scene-selector-line-progress" />
      </div>
      <div class="scene-selector-item-desc">
        {{ item.desc }}
      </div>
      <div class="scene-selector-item-icon">
        <img :src="item.icon" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface SceneItem {
  title: string
  desc: string
  icon: string
}

interface Props {
  items: SceneItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  change: [index: number]
}>()

const activeIndex = ref(0)

const handleHover = (index: number) => {
  activeIndex.value = index
  emit('change', index)
}
</script>

<style scoped lang="scss">
.scene-selector-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.scene-selector-item {
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &.active {
    .scene-selector-item-title {
      color: #0073FF;
    }

    .scene-selector-line-progress {
      width: 100%;
    }
  }
}

.scene-selector-item-title {
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

.scene-selector-line {
  width: 100%;
  height: 1px;
  background: #00000033;
  position: relative;
  overflow: hidden;
}

.scene-selector-line-progress {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background: #0073FF;
  transition: width 0.3s ease;
}

.scene-selector-item-desc {
  color: rgba(0, 0, 0, 0.60);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 2px;
  max-width: 300px;
}

.scene-selector-item-icon {
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
}
</style>
