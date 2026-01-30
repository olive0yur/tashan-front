<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface Props {
  title?: string
  badge?: string
  description?: string
  features?: string
  modelPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'TS-F-C',
  badge: 'New',
  description: '指尖触觉传感器',
  features: '高灵敏度/接近觉/三维力',
  modelPath: '/product-1.glb'
})

const containerRef = ref<HTMLDivElement>()
const isHovered = ref(false)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let model: THREE.Group
let animationFrameId: number

// 拖动相关
const isDragging = ref(false)
const previousMousePosition = { x: 0, y: 0 }
const rotationSpeed = 0.005

const initThree = () => {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(0, 0, 5)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value.appendChild(renderer.domElement)

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
  scene.add(ambientLight)

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight1.position.set(5, 5, 5)
  scene.add(directionalLight1)

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(-5, 3, -5)
  scene.add(directionalLight2)

  // 加载 GLB 模型
  const loader = new GLTFLoader()
  loader.load(
    props.modelPath,
    (gltf) => {
      model = gltf.scene

      // 计算模型边界并居中
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      // 居中模型
      model.position.sub(center)

      // 自动缩放模型以适应视图
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 3 / maxDim
      model.scale.multiplyScalar(scale)

      scene.add(model)
    },
    undefined,
    (error) => {
      console.error('加载模型失败:', error)
    }
  )

  // 渲染循环
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)

    // 只在 hover 且未拖动时自动旋转
    if (model && isHovered.value && !isDragging.value) {
      model.rotation.y += 0.01
    }

    renderer.render(scene, camera)
  }
  animate()
}

// 鼠标拖动事件处理
const handleMouseDown = (event: MouseEvent) => {
  isDragging.value = true
  previousMousePosition.x = event.clientX
  previousMousePosition.y = event.clientY
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !model) return

  const deltaX = event.clientX - previousMousePosition.x
  const deltaY = event.clientY - previousMousePosition.y

  // 水平拖动控制 Y 轴旋转
  model.rotation.y += deltaX * rotationSpeed

  // 垂直拖动控制 X 轴旋转
  model.rotation.x += deltaY * rotationSpeed

  // 限制 X 轴旋转角度，避免翻转过头
  model.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, model.rotation.x))

  previousMousePosition.x = event.clientX
  previousMousePosition.y = event.clientY
}

const handleMouseUp = () => {
  isDragging.value = false
}

const handleMouseLeave = () => {
  isDragging.value = false
}

const handleResize = () => {
  if (!containerRef.value || !camera || !renderer) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  initThree()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  if (renderer) {
    renderer.dispose()
  }

  if (containerRef.value && renderer) {
    containerRef.value.removeChild(renderer.domElement)
  }
})
</script>

<template>
  <div class="p-[24px] bg-[#F7F7F8] rounded-[16px] w-[500px] flex-shrink-0">
    <div class="mb-[16px] flex justify-between items-center">
      <span class="text-[20px] font-medium">{{ title }}</span>
      <span class="text-[14px] text-gray-600">{{ badge }}</span>
    </div>
    <div class="h-px bg-[#00000029]" />

    <div
      ref="containerRef"
      class="h-[354px] my-[60px] relative cursor-grab active:cursor-grabbing"
      @mouseenter="isHovered = true"
      @mouseleave="() => { isHovered = false; handleMouseLeave(); }"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    />
    <div class="h-px bg-[#00000029] mb-[16px]" />
    <div class="mb-[16px] flex justify-between items-center">
      <span class="text-[16px]">{{ description }}</span>
      <span class="text-[14px] text-black"><span class="text-[rgba(0,0,0,0.30)]">优势:</span> {{ features }}</span>
    </div>
  </div>
</template>
