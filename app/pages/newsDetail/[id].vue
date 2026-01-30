<template>
  <div class="news-detail-container text-black">
    <div class="pt-[80px] pb-[16px] md:pt-[60px] sm:pt-[40px]">
      <div class="news-detail-date">
        {{ currentNews?.date }}
      </div>
    </div>
    <div class="news-content">
      <div class="news-content-right">
        <div class="news-content-right-title">
          {{ currentNews?.title }}
        </div>

        <div class="news-content-line bg-[#00000033] h-px w-full" />

        <div class="news-content-right-content">
          <div class="news-content-right-content-item">
            致力于重新定义机器感知的他山科技今日正式发布了新一代智能柔性夹爪产品——"灵巧手"H3系列（Dexterous Hand H3 Series）。作为工业机器人末端执行器的革命性升级，H3系列首度搭载了公司自研的 R-SpiNNaker 类脑触觉传感芯片，成功将机器人的感知维度从单一的"位置控制"提升至毫秒级的"动态力控与材质感知"。
          </div>
          <img :src="imgBaseURL('ts-news-bg1.png')">
          <div class="news-content-right-content-item">
            类脑算力，突破感知瓶颈 传统机械手往往难以平衡"大负载"与"高灵敏"的矛盾。H3系列的核心在于其内置的 R-SpiNNaker 芯片，该芯片采用先进的类脑架构，支持触觉传感单元的无限极连。通过强大的边缘计算能力，H3系列实现了指尖与手掌区域传感器数据的深度融合与协同处理，让机器人不再依赖云端，直接在"末端"即可完成复杂的感知决策。0.01N 极致灵敏，还原人手触感 得益于芯片的高算力与新型传感材料的结合，H3系列具备了惊人的感知细腻度。其最小力控分辨率达到 0.01N，不仅能精准识别 30+种 不同物体的材质纹理，还能实时监测微米级的物体滑移。
          </div>
          <img :src="imgBaseURL('ts-news-bg2.png')">
          <div class="news-content-right-content-item">
            他山科技创始人兼 CEO 张博士表示："H3系列的发布不仅仅是一次产品迭代，更是我们对'机器人如何感知世界'这一命题的全新解答。通过类脑芯片的加持，机器人的'手'将真正拥有'触觉智能'，能够像人类一样感知、学习和决策。"
          </div>
          <div class="news-content-right-nav">
            <span class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.332 4.66675L7.33203 9.66675L12.332 14.6667"
                  stroke="black"
                  stroke-linejoin="round"
                />
              </svg>
              上一篇：</span>
            <span class="flex items-center gap-2">
              下一篇
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.66797 15.3333L12.668 10.3333L7.66797 5.33325"
                  stroke="black"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="news-content-left">
        <div class="text-[#000000] text-[32px] mb-[40px] lg:text-[28px] lg:mb-[32px] md:text-[24px] md:mb-[24px] sm:text-[20px] sm:mb-[20px]">
          最近新闻
        </div>
        <NewCard
          v-for="(item, index) in newsItems.filter(n => n.id !== Number(route.params.id)).slice(0, 3)"
          :key="index"
          :date="item.date"
          :title="item.title"
          :image="item.image"
          @click="navigateTo(`/newsDetail/${item.id}`)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { imgBaseURL } from '~/utils'

type NewsItem = {
  id: number
  date: string
  title: string
  image: string
  content?: string
}

const route = useRoute()

// 强制滚动到顶部的函数
const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }
}

// 页面加载时滚动到顶部
onMounted(() => {
  scrollToTop()
  // 延迟再执行一次,确保生效
  setTimeout(scrollToTop, 0)
})

// 监听路由参数变化
watch(() => route.params.id, () => {
  scrollToTop()
  nextTick(() => {
    scrollToTop()
  })
}, { immediate: true })

const newsItems = ref<NewsItem[]>([
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

const currentNews = computed(() => {
  const id = Number(route.params.id)
  return newsItems.value.find(item => item.id === id)
})
</script>

<style scoped>
.news-detail-container {
  width: 100%;
  min-height: 100vh;
  background: #EEF0F4;
  padding: 100px;

  @media (max-width: 1024px) {
    padding: 60px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 16px;
  }

  .news-detail-date {
    color: rgba(0, 0, 0, 0.40);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.32px;

    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 18px;
    }
  }

  .news-content {
    display: flex;
    justify-content: space-between;
    gap: 120px;

    @media (max-width: 1280px) {
      gap: 60px;
    }

    @media (max-width: 1024px) {
      gap: 40px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 40px;
    }

    .news-content-right {
      flex: 2;

      @media (max-width: 768px) {
        flex: 1;
      }

      .news-content-right-title {
        color: #000;
        font-size: 48px;
        font-style: normal;
        font-weight: 400;
        line-height: 60px;
        letter-spacing: 0.96px;

        @media (max-width: 1024px) {
          font-size: 36px;
          line-height: 48px;
          letter-spacing: 0.72px;
        }

        @media (max-width: 768px) {
          font-size: 28px;
          line-height: 36px;
          letter-spacing: 0.56px;
        }

        @media (max-width: 480px) {
          font-size: 24px;
          line-height: 32px;
          letter-spacing: 0.48px;
        }
      }

      .news-content-line {
        margin: 40px 0;

        @media (max-width: 768px) {
          margin: 24px 0;
        }

        @media (max-width: 480px) {
          margin: 20px 0;
        }
      }

      .news-content-right-content {

        .news-content-right-content-item {
            color: rgba(0, 0, 0, 0.80);
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: 2px;
            margin: 15px 0;

            @media (max-width: 768px) {
              font-size: 15px;
              line-height: 22px;
              letter-spacing: 1.5px;
              margin: 12px 0;
            }

            @media (max-width: 480px) {
              font-size: 14px;
              line-height: 20px;
              letter-spacing: 1px;
              margin: 10px 0;
            }
        }
        img{
            border-radius: 16px;
            width: 100%;
            height: auto;

            @media (max-width: 768px) {
              border-radius: 12px;
            }

            @media (max-width: 480px) {
              border-radius: 8px;
            }
        }

        .news-content-right-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          padding-top: 40px;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          color: #000;
          font-size: 16px;
          font-weight: 400;

          @media (max-width: 768px) {
            margin-top: 32px;
            padding-top: 32px;
            font-size: 15px;
          }

          @media (max-width: 480px) {
            margin-top: 24px;
            padding-top: 24px;
            font-size: 14px;
            flex-direction: column;
            gap: 16px;
          }

          span {
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
              color: #0073FF;
            }

            svg {
              @media (max-width: 480px) {
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }
    }

    .news-content-left {
      flex: 1;

      @media (max-width: 768px) {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
