<script setup lang="ts">
// import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { imgBaseURL } from '~/utils'

interface Props {
  title?: string
  badge?: string
  description?: string
  features?: string
  modelPath?: string
  /** 暂用图片占位，与 modelPath 二选一 */
  imagePath?: string
}

withDefaults(defineProps<Props>(), {
  title: 'TS-F-C',
  badge: 'New',
  description: '指尖触觉传感器',
  features: '高灵敏度/接近觉/三维力',
  modelPath: '/product-1.glb',
  imagePath: 'ts-fc.png'
})

// --- Three.js 相关已注释，暂用图片占位 ---
// const containerRef = ref<HTMLDivElement>()
// const isHovered = ref(false)
// let scene: THREE.Scene
// let camera: THREE.PerspectiveCamera
// let renderer: THREE.WebGLRenderer
// let model: THREE.Group
// let animationFrameId: number
// const isDragging = ref(false)
// const previousMousePosition = { x: 0, y: 0 }
// const rotationSpeed = 0.005
// const initThree = () => { ... }
// const handleMouseDown = (event: MouseEvent) => { ... }
// const handleMouseMove = (event: MouseEvent) => { ... }
// const handleMouseUp = () => { ... }
// const handleMouseLeave = () => { ... }
// const handleResize = () => { ... }
// onMounted(() => { initThree(); window.addEventListener('resize', handleResize) })
// onUnmounted(() => { ... })
</script>

<template>
  <div class="p-[24px] bg-[#F7F7F8] rounded-[16px] w-[500px] flex-shrink-0">
    <div class="mb-[16px] flex justify-between items-center">
      <span class="text-[20px] font-medium">{{ title }}</span>
      <span class="text-[14px] text-gray-600">{{ badge }}</span>
    </div>
    <div class="h-px bg-[#00000029]" />

    <div class="h-[354px] my-[60px] relative flex items-center justify-center bg-[#F7F7F8]">
      <img
        :src="imgBaseURL(imagePath)"
        alt=""
        class="max-h-full max-w-full object-contain"
      >
    </div>
    <div class="h-px bg-[#00000029] mb-[16px]" />
    <div class="mb-[16px] flex justify-between items-center">
      <span class="text-[16px]">{{ description }}</span>
      <span class="text-[14px] text-black"><span class="text-[rgba(0,0,0,0.30)]">优势:</span> {{ features }}</span>
    </div>
  </div>
</template>
