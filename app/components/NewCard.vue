<template>
  <div class="new-card">
    <div class="new-card-image-wrapper">
      <img
        :src="image"
        alt="news-image"
        class="new-card-image"
      >
    </div>
    <div class="new-card-content">
      <div class="new-card-date">
        {{ date }}
      </div>
      <div class="new-card-desc">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.new-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  cursor: pointer;
}

.new-card-image-wrapper {
  width: 100%;
  aspect-ratio: 279/157;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
}

.new-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.5s ease;
}

.new-card:hover .new-card-image {
  transform: scale(1.02);
  filter: brightness(0.9) contrast(1.1);
}

.new-card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.new-card-date {
  color: rgba(0, 0, 0, 0.40);
  font-family: "Source Han Sans SC";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.32px;
}

.new-card-desc {
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: "Source Han Sans SC";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.48px;
  min-height: 64px;
  transition: color 0.3s ease;
}

.new-card:hover .new-card-desc {
  color: #0073FF;
}

@media (max-width: 1080px) {
  .new-card {
    gap: clamp(8px, 1.481vw, 16px);
    max-width: 100%;
  }

  .new-card-image-wrapper {
    border-radius: clamp(8px, 1.481vw, 16px);
  }

  .new-card-content {
    gap: clamp(8px, 1.481vw, 16px);
  }

  .new-card-date {
    font-size: clamp(14px, 1.481vw, 16px);
    line-height: clamp(17.5px, 1.852vw, 20px);
    letter-spacing: clamp(0.28px, 0.03vw, 0.32px);
  }

  .new-card-desc {
    font-size: clamp(18px, 2.222vw, 24px);
    line-height: clamp(24px, 2.963vw, 32px);
    letter-spacing: clamp(0.36px, 0.044vw, 0.48px);
    min-height: clamp(48px, 5.926vw, 64px);
  }
}
</style>
