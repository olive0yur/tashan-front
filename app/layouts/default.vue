<template>
  <UApp>
    <AppHeader :is-dark="isDarkHeader" />
    <UMain>
      <slot />
    </UMain>
    <AppFooter />
  </UApp>
</template>

<script setup lang="ts">
const route = useRoute()

// 定义需要深色 Header 的页面路径前缀
const darkHeaderPrefixes = ['/newsDetail/']

const isDarkHeader = computed(() => {
  return darkHeaderPrefixes.some(prefix => route.path.startsWith(prefix))
})
</script>
