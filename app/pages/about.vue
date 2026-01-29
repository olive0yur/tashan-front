<template>
  <div
    ref="main"
    class="bg-[#F4F4F5]"
  >
    <div
      class="section1 h-screen w-full header-container"
      :style="{
        backgroundImage: 'url(/about/about.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }"
    >
      <SplitText
        text="关于我们"
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

    <div class="about">
      <FloatUpAnimation
        text="他山科技是一家人工智能触觉传感芯片及应用解决方案研发商，是触觉传感器赛道的领军者"
        tag="div"
        class-name="about-header-content-item-right-title"
        :duration="1"
        :delay="0.2"
        :y="30"
        ease="power2.out"
        text-align="left"
      />

      <div class="about-header-content-item-right-description">
        <div>
          <img
            class=""
            src="/about/logo.png"
            alt=""
          >
        </div>
        <div>
          <div class="about-header-content-item-right-description-item-text">
            他山科技通过自研的数模混合AI触感芯片为机器人、汽车、家电、消费电子等领域提供更加智能化的解决方案，并开发了适用于机器人赛道的触觉传感器，促进机器人技术的进一步发展和普及。<br>实现机器人对三维力及物体表面的形变、温度、纹理等信息的精确感知，提高人机交互的智能化水平和服务质量。
          </div>

          <StatItem
            label="公司成立于"
            :value="2017"
            :duration="2"
          />

          <StatItem
            label="员工人数"
            :value="100"
            :duration="2"
            suffix="+"
          />
        </div>
      </div>
    </div>

    <div
      ref="cultureSection"
      class="culture"
    >
      <div class="flex gap-[40px] justify-between">
        <div class="flex-1 flex flex-col">
          <div>
            <SplitText
              text="企业文化"
              tag="span"
              class-name="culture-title"
              split-type="chars"
              :delay="50"
              :duration="1"
              ease="power3.out"
              :from="{ opacity: 0, y: 40 }"
              :to="{ opacity: 1, y: 0 }"
              text-align="center"
            />
          </div>

          <div
            class="flex-1 flex flex-col pt-[60px] justify-between"
            @mouseleave="currentImage = '/about/mini.png'"
          >
            <div
              class="culture-item"
              @mouseenter="handleCultureItemHover(0)"
            >
              <div class="culture-item-content">
                <span class="culture-item-title">
                  企业管理
                </span>
                <span class="culture-item-desc">
                  数字化管理、科学化运营
                </span>
              </div>
              <div class="culture-item-icon">
                <img
                  src="/about/mini.png"
                  alt=""
                >
              </div>
            </div>

            <div
              class="culture-item"
              @mouseenter="handleCultureItemHover(1)"
            >
              <div class="culture-item-content">
                <span class="culture-item-title">
                  价值观
                </span>
                <span class="culture-item-desc flex flex-col gap-[10px]">
                  <span>
                    创新 发展 服务 奉献
                  </span>
                  <span>
                    德育 勤学 善思 致远
                  </span>
                </span>
              </div>
              <div class="culture-item-icon">
                <img
                  src="/about/mini2.png"
                  alt=""
                >
              </div>
            </div>

            <div
              class="culture-item"
              @mouseenter="handleCultureItemHover(2)"
            >
              <div class="culture-item-content">
                <span class="culture-item-title">
                  使命
                </span>
                <span class="culture-item-desc flex flex-col gap-[10px]">
                  <span>
                    建立标准化运营体系、培育高质量人才队伍
                  </span>
                  <span>
                    以产业报国为己任、打造出众的创新型企业
                  </span>
                </span>
              </div>
              <div class="culture-item-icon">
                <img
                  src="/about/mini3.png"
                  alt=""
                >
              </div>
            </div>

            <div
              class="culture-item"
              @mouseenter="handleCultureItemHover(3)"
            >
              <div class="culture-item-content">
                <span class="culture-item-title">
                  愿景
                </span>
                <span class="culture-item-desc flex flex-col gap-[10px]">
                  <span>
                    为建筑赋予智慧
                  </span>
                  <span>
                    让生活更加多彩
                  </span>
                  <span>
                    智慧 绿色 数智 低碳
                  </span>
                </span>
              </div>
              <div class="culture-item-icon">
                <img
                  src="/about/mini4.png"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            class="rounded-[20px] culture-image"
            :src="currentImage"
            alt=""
          >
        </div>
      </div>
    </div>

    <div
      ref="section3"
      class="section3  w-full"
      :style="{
        backgroundImage: 'url(/about/img-year.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }"
    >
      <SplitText
        text="发展历程"
        tag="span"
        class-name="year-title"
        split-type="chars"
        :delay="50"
        :duration="1"
        ease="power3.out"
        :from="{ opacity: 0, y: 40 }"
        :to="{ opacity: 1, y: 0 }"
        text-align="center"
      />

      <div class="year-content">
        <div class="year-number">
          {{ currentYear }}
          <!-- <FlipNumber :value="currentYear" /> -->
        </div>
        <div class="year-desc">
          <FloatUpAnimation
            tag="span"
            class-name="year-desc-title"
            :text="yearData[currentYear]?.title"
            :delay="0.1"
            :replay-on-change="true"
          />
          <FloatUpAnimation
            tag="span"
            class-name="year-desc-content"
            :text="yearData[currentYear]?.content"
            :delay="0.2"
            :replay-on-change="true"
          />
        </div>
      </div>

      <div class="year-timeline-container">
        <YearTimeline
          :start-year="2017"
          :end-year="2024"
          :active-year="currentYear"
          @year-click="handleYearClick"
        />
        <div class="h-px w-full bg-[#FFFFFF1F] absolute bottom-0" />
      </div>
    </div>

    <div
      ref="section4"
      class="section4  w-full flex gap-[253px]"
    >
      <div class="w-auto">
        <img
          src="/about/Subtract.svg"
          class="h-full"
          alt=""
        >
      </div>
      <div class="py-[100px]">
        <SplitText
          text="荣誉奖项"
          tag="span"
          class-name="honor-title"
          split-type="chars"
          :delay="50"
          :duration="1"
          ease="power3.out"
          :from="{ opacity: 0, y: 40 }"
          :to="{ opacity: 1, y: 0 }"
          text-align="center"
        />
        <div class="honor-label">
          我们将产品提升到一个全新的水平。以下这些业界权威奖项就是最好的证明。
        </div>
      </div>
    </div>

    <div class="partner-container h-[628px] flex flex-col">
      <div>
        <SplitText
          text="合作伙伴"
          tag="span"
          class-name="partner-title"
          split-type="chars"
          :delay="50"
          :duration="1"
          ease="power3.out"
          :from="{ opacity: 0, y: 40 }"
          :to="{ opacity: 1, y: 0 }"
          text-align="center"
        />
      </div>
      <div class="partner-content flex-1">
        <BrandScroll
          :rows="brandData"
          :duration="40"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const main = ref()
const cultureSection = ref()
const section3 = ref()
const section4 = ref()
const currentImage = ref('/about/mini.png')
const currentYear = ref<number>(2017)
let ctx: gsap.Context
let autoPlayTimer: ReturnType<typeof setInterval> | null = null

const yearData: Record<number, { title: string, content: string }> = {
  2017: {
    title: '他山科技正式成立',
    content: '核心团队组建完成，在深圳设立触觉感知实验室，启动首代柔性电子皮肤材料的基础研究'
  },
  2018: {
    title: '技术突破',
    content: '完成首代触觉传感器原型开发'
  },
  2019: {
    title: '产品迭代',
    content: '推出第二代触觉传感解决方案'
  },
  2020: {
    title: '市场拓展',
    content: '与多家机器人企业建立合作关系'
  },
  2021: {
    title: '规模化生产',
    content: '建立自动化生产线，实现量产'
  },
  2022: {
    title: '技术创新',
    content: '发布AI触感芯片'
  },
  2023: {
    title: '生态建设',
    content: '构建完整的触觉感知生态系统'
  },
  2024: {
    title: '持续发展',
    content: '继续引领触觉传感技术创新'
  }
}

const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]

// 品牌数据
const brandData = [
  [
    { text: 'SAIC', img: '/partner/1.svg' },
    { text: 'Autoliv', img: '/partner/2.svg' },
    { text: 'BMW', img: '/partner/3.svg' },
    { text: '理想', img: '/partner/4.svg' },
    { text: 'Mercedes-Benz', img: '/partner/5.svg' },
    { text: '奇瑞汽车', img: '/partner/6.1.svg' }
  ],
  [
    { text: '小米', img: '/partner/16.svg' },
    { text: 'NIO 蔚来', img: '/partner/6.svg' },
    { text: '广汽集团', img: '/partner/7.svg' },
    { text: 'ADIENT', img: '/partner/8.svg' },
    { text: 'AUDI 奥迪', img: '/partner/9.svg' },
    { text: '滴滴', img: '/partner/10.svg' }
  ],
  [
    { text: '红旗', img: '/partner/11.svg' },
    { text: '宇通客车', img: '/partner/12.svg' },
    { text: '长城汽车', img: '/partner/13.svg' },
    { text: '中通客车', img: '/partner/14.svg' },
    { text: '比亚迪', img: '/partner/15.svg' }
  ]
]

// 开始自动轮播
const startAutoPlay = () => {
  stopAutoPlay()
  autoPlayTimer = setInterval(() => {
    const currentIndex = years.indexOf(currentYear.value)
    const nextIndex = (currentIndex + 1) % years.length
    const nextYear = years[nextIndex]
    if (nextYear !== undefined) {
      currentYear.value = nextYear
    }
  }, 3000) // 每3秒切换一次
}

// 停止自动轮播
const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

const handleCultureItemHover = (index: number) => {
  currentImage.value = `/about/mini${index === 0 ? '' : index + 1}.png`
}

const handleYearClick = (year: number) => {
  currentYear.value = year
  // 点击后重新启动自动轮播
  startAutoPlay()
}

onMounted(() => {
  // 启动自动轮播
  startAutoPlay()

  ctx = gsap.context(() => {
    // Pin section1
    ScrollTrigger.create({
      trigger: '.section1',
      start: 'top top',
      pin: true,
      pinSpacing: false
    })

    // about 从下方覆盖上来
    gsap.set('.about', { yPercent: 0 })

    gsap.timeline({
      scrollTrigger: {
        trigger: '.section1',
        start: 'top top',
        end: '+=100%',
        scrub: true,
        anticipatePin: 1
      }
    }).to('.about', {
      yPercent: 0,
      ease: 'none',
      duration: 1
    })

    // Pin culture section
    ScrollTrigger.create({
      trigger: cultureSection.value,
      start: 'top top',
      pin: true,
      pinSpacing: false
    })

    // section3 从下方覆盖上来
    gsap.set(section3.value, { yPercent: 0 })

    gsap.timeline({
      scrollTrigger: {
        trigger: cultureSection.value,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        anticipatePin: 1
      }
    }).to(section3.value, {
      yPercent: 0,
      ease: 'none',
      duration: 1
    })

    // Pin section3
    ScrollTrigger.create({
      trigger: section3.value,
      start: 'top top',
      pin: true,
      pinSpacing: false
    })

    // section4 从下方覆盖上来
    gsap.set(section4.value, { yPercent: 0 })

    gsap.timeline({
      scrollTrigger: {
        trigger: section3.value,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        anticipatePin: 1
      }
    }).to(section4.value, {
      yPercent: 0,
      ease: 'none',
      duration: 1
    })
  }, main.value)
})

onBeforeUnmount(() => {
  stopAutoPlay()
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
.about {
  position: relative;
  border-radius: 54px 64px 0 0;
  background: #fff;
  padding: 100px;
  z-index: 2;
  height: 100vh;

  .about-header-content-item-right-title {
    color: #000;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 60px; /* 150% */
    letter-spacing: 0.8px;
    max-width: 920px;
  }

  .about-header-content-item-right-description {
    margin-top: 80px;
    display: flex;
    gap: 40px;
    color: #000;

    .about-header-content-item-right-description-item-text {
      color: rgba(0, 0, 0, 0.60);
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 40px; /* 200% */
      letter-spacing: 2px;
      max-width:888px;
    }

    img {
      border-radius: 20px;
    }
  }
}

.culture {
  position: relative;
  background: #F4F4F5;
  padding: 100px;
  z-index: 2;
  height: 100vh;

  .culture-title {
    color: #000;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 60px; /* 125% */
    letter-spacing: 0.96px;
  }

  .culture-item {
    border-top: 1px solid #00000033;
    width: 100%;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    position: relative;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: -1px;
      width: 0;
      height: 1px;
      background: #0073FF;
      transition: width 0.5s ease;
      z-index: 1;
    }

    .culture-item-content {
      display: flex;
      justify-content: space-between;
      flex: 1;
    }

    .culture-item-icon {
      position: absolute;
      left: 50%;
      top: -100px;
      transform: translateX(-50%) scale(0.8);
      width: 200px;
      height: 200px;
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      z-index: 100;

      img {
        width: 200px;
        height: 200px;
        object-fit: cover;
      }
    }

    .culture-item-title {
      color: #000000;
      font-size: 24px;
      transition: color 0.3s ease;
    }

    .culture-item-desc {
      color: #00000099;
      font-size: 16px;
      transition: color 0.3s ease;
    }

    &:hover {
      border-color: #0073FF;

      &::before {
        width: 100%;
      }

      .culture-item-title {
        color: #0073FF;
      }

      .culture-item-desc {
        color: #000000;
      }

      .culture-item-icon {
        opacity: 1;
        transform: translateX(-50%) scale(1);
      }
    }
  }

  .culture-image {
    transition: opacity 0.3s ease;
  }
}

.section3 {
  position: relative;
  border-radius: 54px 54px 0 0;
  z-index: 3;
  height: 100vh;
  overflow: hidden;

  .year-title {
    color: #FFF;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 60px; /* 125% */
    letter-spacing: 0.96px;
    position: absolute;
    top: 100px;
    left: 100px;
  }

  .year-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .year-number {
      position: relative;
      font-size: 400px;
      font-style: normal;
      font-weight: 400;
      line-height: 400px; /* 100% */
      letter-spacing: 2px;
        color: rgba(255, 255, 255, 0.7);
      }

      .year-number :deep(.flip-digit-item) {
        color: rgba(255, 255, 255, 0.7);
      }

      @supports (-webkit-background-clip: text) {
        .year-number :deep(.flip-digit-item) {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.00) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
    }

    .year-desc {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      .year-desc-title {
        color: #FFF;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px; /* 125% */
        letter-spacing: 2px;
        margin-bottom: 16px;
      }
      .year-desc-content {
        color: rgba(255, 255, 255, 0.80);
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
        letter-spacing: 2px;
        max-width: 367px;
      }
    }
  }

  .year-timeline-container {
    position: absolute;
    bottom: 186px;
    left: 0;
    width: 100%;
  }
}

.section4 {
  position: relative;
  background: linear-gradient(276deg, #F4FCFF -52.3%, #FFF 95.44%);
  border-radius: 54px 54px 0 0;
  height: 100vh;
  z-index: 4;

  .honor-title {
    color: #000;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 60px; /* 125% */
    letter-spacing: 0.96px;
    margin-bottom: 40px;
  }

  .honor-label {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: 0.32px;
  }
}

.partner-container {
  padding: 100px;
  background: #EEF0F4;

  .partner-title {
    color: #000;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 60px; /* 125% */
    letter-spacing: 0.96px;
    margin-bottom: 70px;
  }

  .partner-content {
    display: flex;
    align-items: center;
  }
}
</style>
