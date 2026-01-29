<template>
  <div class="pagination">
    <button
      class="pagination-btn pagination-prev"
      :disabled="currentPage === 1"
      @click="handlePrev"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"

        height="10"
        viewBox="0 0 6 10"
        fill="none"
      >
        <path
          d="M5 1L1 5L5 9"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <button
      v-for="page in displayPages"
      :key="page"
      class="pagination-btn pagination-number"
      :class="{ active: currentPage === page, ellipsis: page === '...' }"
      :disabled="page === '...'"
      @click="handlePageClick(page)"
    >
      {{ page }}
    </button>

    <button
      class="pagination-btn pagination-next"
      :disabled="currentPage === totalPages"
      @click="handleNext"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
      >
        <path
          d="M1 1L5 5L1 9"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:currentPage'])

const displayPages = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 3; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 2) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 2; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      pages.push(current)
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

const handlePageClick = (page) => {
  if (page !== '...') {
    emit('update:currentPage', page)
  }
}

const handlePrev = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

const handleNext = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  display: flex;
  width: 40px;
  height: 40px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-weight: 400;
}

.pagination-number {
  background: transparent;
}

.pagination-number.active {
  background: #0073FF;
  color: #FFF;
}

.pagination-number:hover:not(.active):not(.ellipsis) {
  background: rgba(0, 115, 255, 0.1);
  color: #0073FF;
}

.pagination-number.ellipsis {
  cursor: default;
  background: transparent;
}

.pagination-prev,
.pagination-next {
  background: transparent;
}

.pagination-prev:hover:not(:disabled),
.pagination-next:hover:not(:disabled) {
  background: rgba(0, 115, 255, 0.1);
  color: #0073FF;
}

.pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 1080px) {
  .pagination-btn {
    width: clamp(32px, 3.704vw, 40px);
    height: clamp(32px, 3.704vw, 40px);
    padding: clamp(8px, 0.926vw, 10px);
    font-size: clamp(14px, 1.481vw, 16px);
  }

  .pagination {
    gap: clamp(6px, 0.741vw, 8px);
  }
}
</style>
