<template>
  <div
    ref="main"
    class="bg-[#EEF0F4]"
  >
    <div

      ref="section1"
      class="section1 h-screen w-full header-container"
      :style="{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }"
    >
      <SplitText
        text="新闻中心"
        tag="span"
        class-name="news-center-title"
        split-type="chars"
        :delay="50"
        :duration="1"
        ease="power3.out"
        :from="{ opacity: 0, y: 40 }"
        :to="{ opacity: 1, y: 0 }"
        text-align="center"
      />
    </div>

    <div class="newsList">
      <SplitText
        text="最新新闻"
        tag="div"
        class-name="newsList-title"
        split-type="chars"
        :delay="50"
        :duration="1"
        ease="power3.out"
        :from="{ opacity: 0, y: 40 }"
        :to="{ opacity: 1, y: 0 }"
        text-align="center"
      />

      <div
        v-if="currentNewsItem"
        class="newslist-header-content"
      >
        <div class="newslist-header-content-item-left">
          <div class="newslist-header-content-item-left-image-wrapper">
            <img
              :src="currentNewsItem.image"
              alt="new-icon"
            >
          </div>
        </div>

        <div class="newslist-header-content-item-right">
          <div>
            <div class="newslist-header-content-item-right-date">
              {{ currentNewsItem.date }}
            </div>
            <FloatUpAnimation
              :text="currentNewsItem.title"
              tag="div"
              class-name="newslist-header-content-item-right-title"
              :duration="1"
              :delay="0.2"
              :y="30"
              ease="power2.out"
              text-align="left"
            />
            <ThemeButton theme="white" />
          </div>

          <div class="news-indicators">
            <div
              v-for="(item, index) in newsItems"
              :key="index"
              class="indicator"
              :class="{ active: currentNewsIndex === index }"
              @click="currentNewsIndex = index"
            />
          </div>
        </div>
      </div>

      <div class="news-card-list">
        <NewCard
          v-for="(item, index) in newsCardList"

          :key="index"
          :date="item.date"
          :title="item.title"
          :image="item.image"
          @click="handleNewsCardClick(item)"
        />
      </div>

      <div class="pagination-wrapper">
        <PaginationTool
          v-model:current-page="currentPage"
          :total-pages="totalPages"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { imgBaseURL } from '~/utils'

gsap.registerPlugin(ScrollTrigger)

const main = ref()
const section1 = ref()
let ctx: gsap.Context

const bgImage = ref(imgBaseURL('ts-new-bg.png'))

const currentNewsIndex = ref(0)

type NewsItem = {
  id: number
  date: string
  title: string
  image: string
}

const newsItems = ref<NewsItem[]>([
  {
    id: 1,
    date: '2024.12.24',
    title: '他山科技发布"灵巧手"H3系列，搭载自研 R-SpiNNaker 触觉芯片',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 2,
    date: '2024.12.20',
    title: '他山科技完成新一轮融资，加速触觉技术研发',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 3,
    date: '2024.12.15',
    title: '他山科技参展2024世界机器人大会，展示最新触觉技术',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 4,
    date: '2024.12.10',
    title: '他山科技与多家企业达成战略合作，共建触觉生态',
    image: imgBaseURL('ts-news-cover.png')
  }
])

const currentNewsItem = computed(() => {
  return newsItems.value[currentNewsIndex.value] ?? newsItems.value[0]!
})

const handleNewsCardClick = (item: NewsItem) => {
  navigateTo(`/newsDetail/${item.id}`)
}

const allNewsCardList = ref([
  {
    id: 1,
    date: '2024.12.24',
    title: '赋能具身智能,他山科技与头部人形机器人厂商达成深度战略合作',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 2,
    date: '2024.12.20',
    title: '他山科技发布"灵巧手"H3系列，搭载自研 R-SpiNNaker 触觉芯片',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 3,
    date: '2024.12.15',
    title: '他山科技完成新一轮融资，加速触觉技术研发与产品创新',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 4,
    date: '2024.12.10',
    title: '他山科技参展2024世界机器人大会，展示最新触觉技术成果',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 5,
    date: '2024.12.05',
    title: '他山科技与多家企业达成战略合作，共建触觉生态圈',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 6,
    date: '2024.12.01',
    title: '他山科技触觉芯片技术突破，为机器人行业带来新机遇',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 7,
    date: '2024.11.28',
    title: '赋能具身智能,他山科技与头部人形机器人厂商达成深度战略合作',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 8,
    date: '2024.11.25',
    title: '他山科技发布"灵巧手"H3系列，搭载自研 R-SpiNNaker 触觉芯片',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 9,
    date: '2024.11.20',
    title: '他山科技完成新一轮融资，加速触觉技术研发与产品创新',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 10,
    date: '2024.11.15',
    title: '他山科技参展2024世界机器人大会，展示最新触觉技术成果',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 11,
    date: '2024.11.10',
    title: '他山科技与多家企业达成战略合作，共建触觉生态圈',
    image: imgBaseURL('ts-news-cover.png')
  },
  {
    id: 12,
    date: '2024.11.05',
    title: '他山科技触觉芯片技术突破，为机器人行业带来新机遇',
    image: imgBaseURL('ts-news-cover.png')
  }
])

const currentPage = ref(1)
const pageSize = 6

const totalPages = computed(() => Math.ceil(allNewsCardList.value.length / pageSize))

const newsCardList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return allNewsCardList.value.slice(start, end)
})

onMounted(() => {
  // 背景初始缩放动画
  gsap.fromTo(section1.value,
    {
      backgroundSize: '120% 120%'
    },
    {
      backgroundSize: '100% 100%',
      duration: 1.5,
      ease: 'power2.out'
    }
  )

  ctx = gsap.context(() => {
    // Pin section1
    ScrollTrigger.create({
      trigger: '.section1',
      start: 'top top',
      pin: true,
      pinSpacing: false
    })

    // newsList 从下方覆盖上来
    gsap.set('.newsList', { yPercent: 10 })

    gsap.timeline({
      scrollTrigger: {
        trigger: '.section1',
        start: 'top top',
        end: '+=100%',
        scrub: true,
        anticipatePin: 1
      }
    }).to('.newsList', {
      yPercent: 0,
      ease: 'none',
      duration: 1
    })
  }, main.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<style scoped>
.header-container {
  position: relative;
  .news-center-title {
    position: absolute;
    bottom: 164px;
    left: 100px;
    color: #FFF;
    font-size: 60px;
    font-style: normal;
    font-weight: 400;
    line-height: 70px;
    letter-spacing: 1.2px;
  }
}
.newsList {
  position: relative;
  border-radius: 54px 64px 0 0;
  background: #EEF0F4;
  padding: 100px;
  z-index: 2;
  margin-top: -10vh;

  .newsList-title {
    color: #000;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 60px;
    letter-spacing: 0.96px;
    margin-bottom: 60px;
  }

  .newslist-header-content {
    display: flex;
    margin-bottom: 60px;
    border-radius: 16px;
    overflow: hidden;
    background: #FFF;
    color: #000;
    height: auto;

    .newslist-header-content-item-right {
      margin-left: 40px;
      padding: 60px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: auto;
      .newslist-header-content-item-right-date {
        color: rgba(0, 0, 0, 0.40);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.32px;
        margin-bottom: 16px;
      }
      .newslist-header-content-item-right-title {
        color: #000;
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: 42px;
        letter-spacing: 0.56px;
        max-width: 577px;
        margin-bottom: 40px;
        &:hover {
          color: #0073FF;
        }
      }
    }

    .newslist-header-content-item-left {
      flex-shrink: 0;
      flex: 1;
      max-width: 976px;

      .newslist-header-content-item-left-image-wrapper {
        width: 100%;
        height: 540px;
        border-radius: 16px;
        overflow: hidden;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease, filter 0.5s ease;
      }
    }

    .newslist-header-content:hover .newslist-header-content-item-left img {
      transform: scale(1.02);
      filter: brightness(0.9) contrast(1.1);
    }

    .newslist-header-content-item-right {
      img {
        border-radius: 16px;
        overflow: hidden;
      }
    }
  }

  .news-indicators {
    display: flex;
    gap: 12px;

    .indicator {
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.12);
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        width: 40px;
        aspect-ratio: 5/1;
        background: #0073FF;
      }

      &:hover:not(.active) {
        background: rgba(0, 0, 0, 0.24);
      }
    }
  }

  .news-card-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 23px;
    row-gap: 36px;
    grid-auto-rows: max-content;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 60px;
  }
}

@media (max-width: 1080px) {
  .header-container {
    .news-center-title {
      font-size: clamp(30px, 5.556vw, 60px);
      line-height: clamp(35px, 6.481vw, 70px);
      letter-spacing: clamp(0.6px, 0.111vw, 1.2px);
      bottom: clamp(82px, 15.185vw, 164px);
      left: clamp(50px, 9.259vw, 100px);
    }
  }

  .newsList {
    padding: clamp(50px, 9.259vw, 100px);

    .newsList-title {
      font-size: clamp(24px, 4.444vw, 48px);
      line-height: clamp(30px, 5.556vw, 60px);
      letter-spacing: clamp(0.48px, 0.089vw, 0.96px);
      margin-bottom: clamp(30px, 5.556vw, 60px);
    }

    .newslist-header-content {
      margin-bottom: clamp(30px, 5.556vw, 60px);
      border-radius: clamp(8px, 1.481vw, 16px);
      flex-direction: column;

      .newslist-header-content-item-left {
        width: 100%;

        .newslist-header-content-item-left-image-wrapper {
          border-radius: clamp(8px, 1.481vw, 16px);
        }

        img {
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease, filter 0.5s ease;
        }
      }

      .newslist-header-content-item-right {
        margin-left: 0;
        margin-top: clamp(20px, 3.704vw, 40px);
        padding: clamp(20px, 3.704vw, 40px) clamp(20px, 3.704vw, 40px) clamp(20px, 3.704vw, 40px) clamp(20px, 3.704vw, 40px);
        height: auto;

        .newslist-header-content-item-right-date {
          font-size: clamp(14px, 1.481vw, 16px);
          line-height: clamp(17.5px, 1.852vw, 20px);
          letter-spacing: clamp(0.28px, 0.03vw, 0.32px);
          margin-bottom: clamp(8px, 1.481vw, 16px);
        }

        .newslist-header-content-item-right-title {
          font-size: clamp(20px, 2.593vw, 28px);
          line-height: clamp(30px, 3.889vw, 42px);
          letter-spacing: clamp(0.4px, 0.052vw, 0.56px);
          max-width: 100%;
          margin-bottom: clamp(20px, 3.704vw, 40px);
        }

      }
    }

    .news-indicators {
      padding-left: clamp(20px, 2.778vw, 30px);
      padding-right: clamp(30px, 5.556vw, 60px);
    }

    .news-card-list {
      grid-template-columns: repeat(2, 1fr);
      gap: clamp(18px, 3.333vw, 36px);
    }
  }
}

@media (max-width: 768px) {
  .newsList {
    padding-left: clamp(20px, 4.167vw, 50px);
    padding-right: clamp(20px, 4.167vw, 50px);

    .newslist-header-content {
      flex-direction: column;

      .newslist-header-content-item-left {
        width: 100%;

        .newslist-header-content-item-left-image-wrapper {
          width: 100%;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .newslist-header-content-item-right {
        margin-left: 0;
        margin-top: clamp(20px, 3.704vw, 40px);
        padding: clamp(20px, 3.704vw, 40px) clamp(20px, 4.167vw, 40px) clamp(20px, 3.704vw, 40px) clamp(20px, 4.167vw, 40px);
      }
    }

    .news-indicators {
      padding-left: clamp(20px, 4.167vw, 40px);
      margin-top: clamp(20px, 4.167vw, 40px);
    }

    .news-card-list {
      grid-template-columns: 1fr;
      gap: clamp(18px, 3.333vw, 36px);
    }
  }
}
</style>
