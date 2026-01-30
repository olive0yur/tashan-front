<template>
  <header
    class="fixed header z-300"
    :class="{ 'header-sticky': isSticky, 'header-dark': isDark }"
  >
    <div class="header-left">
      <img
        :src="(isSticky || isDark) ? '/img/logo-active.svg' : '/img/logo.svg'"
        alt="logo"
        class="w-auto h-6 shrink-0"
        @click="navigateTo('/')"
      >
    </div>

    <div class="header-right desktop-menu">
      <div
        v-for="item in menuItems"
        :key="item.to"
        class="header-menu-item"
      >
        <NuxtLink
          v-if="!item.disabled"
          :to="item.to"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="menu-label"
        >
          {{ item.label }}
        </span>
      </div>
      <!-- <UColorModeButton /> -->
    </div>

    <!-- 移动端菜单按钮 -->
    <button
      class="mobile-menu-button"
      :class="{ active: isMenuOpen }"
      @click="toggleMenu"
    >
      <span />
      <span />
      <span />
    </button>

    <!-- 移动端抽屉菜单 -->
    <Transition name="drawer">
      <div
        v-if="isMenuOpen"
        class="mobile-menu-overlay"
        @click="closeMenu"
      >
        <div
          class="mobile-menu-drawer"
          @click.stop
        >
          <button
            class="mobile-menu-close"
            @click="closeMenu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div class="mobile-menu-content">
            <div
              v-for="item in menuItems"
              :key="item.to"
              class="mobile-menu-item"
            >
              <NuxtLink
                v-if="!item.disabled"
                :to="item.to"
                @click="closeMenu"
              >
                {{ item.label }}
              </NuxtLink>
              <span
                v-else
                class="menu-label"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const { isDark = false } = defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})

const menuItems = [
  {
    label: '技术',
    to: '/technology',
    disabled: true
  },
  {
    label: '产品',
    to: '/product',
    disabled: true
  },
  {
    label: '关于我们',
    to: '/about'
  },
  {
    label: '新闻动态',
    to: '/community'
  },
  {
    label: '联系我们',
    to: '/contact',
    disabled: true
  }
]

const isSticky = ref(false)
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  const handleScroll = () => {
    isSticky.value = window.scrollY > 10
  }

  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 40px;
  justify-content: space-between;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(40px);
  height: 60px;
  animation: slideDown 1s ease-out;
  top: 40px;
  left: 100px;
  right: 100px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-sticky {
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0;
  background: #FFF;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding-left: 140px;
  padding-right: 140px;
}

/* 移动端菜单按钮 */
.mobile-menu-button {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 301;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: #FFF;
    transition: all 0.3s ease;
  }

  &.active {
    opacity: 0;
    pointer-events: none;
  }
}

.header-sticky .mobile-menu-button span,
.header-dark .mobile-menu-button span {
  background: #000;
}

/* 移动端抽屉菜单 */
.mobile-menu-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 299;
  overflow: hidden;
}

.mobile-menu-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: #FFF;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 300;
}

.mobile-menu-close {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #000;
  transition: color 0.3s ease;
  z-index: 301;

  &:hover {
    color: #0073FF;
  }
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  padding: 100px 30px 40px;
}

.mobile-menu-item {
  margin: 10px 0;
  width: 100%;
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;

  a {
    color: #000;
    font-family: "Source Han Sans SC";
    font-size: 18px;
    font-weight: 400;
    text-decoration: none;
    display: block;
    padding: 12px 0;
    transition: color 0.3s ease;

    &:hover {
      color: #0073FF;
    }

    &.router-link-active,
    &.router-link-exact-active {
      color: #0073FF;
    }
  }
}

.mobile-menu-item:nth-child(1) { animation-delay: 0.1s; }
.mobile-menu-item:nth-child(2) { animation-delay: 0.2s; }
.mobile-menu-item:nth-child(3) { animation-delay: 0.3s; }
.mobile-menu-item:nth-child(4) { animation-delay: 0.4s; }
.mobile-menu-item:nth-child(5) { animation-delay: 0.5s; }

/* 抽屉动画 */
.drawer-enter-active {
  transition: opacity 0.3s ease;

  .mobile-menu-drawer {
    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.drawer-leave-active {
  transition: opacity 0.3s ease;

  .mobile-menu-drawer {
    animation: slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .header {
    top: 0;
    left: 0;
    right: 0;
    padding: 0 20px;
    border-radius: 0;
  }

  .header-sticky {
    top: 0;
    left: 0;
    right: 0;
    padding-left: 20px;
    padding-right: 20px;
  }

  .desktop-menu {
    display: none !important;
  }

  .mobile-menu-button {
    display: flex;
  }

  .mobile-menu-overlay {
    display: block;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-120px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideDownSmall {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.header-left {
  img {
    animation: slideDownSmall 1s ease-out 0.2s both;
    cursor: pointer;
  }
}

.header-right {
  display: flex;
  gap: 50px;
  align-items: center;

  .header-menu-item {
    color: #FFF;
    font-family: "Source Han Sans SC";
    font-size: clamp(14px, 1.667vw, 18px);
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.36px;
    text-transform: uppercase;
    animation: slideDownSmall 1s ease-out 0.3s both;
    transition: color 0.1s cubic-bezier(0.4, 0, 0.2, 1);

    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        color: #0073FF;
      }

      &.router-link-active,
      &.router-link-exact-active {
        color: #0073FF;
      }
    }

    .menu-label {
      color: inherit;
      cursor: default;
    }

    &:hover {
      color: #0073FF;
    }
  }
}

.header-sticky .header-right .header-menu-item,
.header-dark .header-right .header-menu-item {
  color: #000;

  a.router-link-active,
  a.router-link-exact-active {
    color: #0073FF;
  }
}

.header-dark {
  background: rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(40px);
}

.header-dark.header-sticky {
  background: #FFF;
}
</style>
