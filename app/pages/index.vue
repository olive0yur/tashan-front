<script setup lang="ts">
import gsap from 'gsap'
import { imgBaseURL } from '@/utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 轮播数据
const carouselItems = [
  { type: 'video' as const, src: imgBaseURL('home-video.mp4'), label: '让触觉赋能 千行百业' },
  { type: 'image' as const, src: imgBaseURL('ts-home-logo.png'), label: '他山之石，可以攻玉' }

]

const main = ref()
const section7Content = ref()
let ctx: gsap.Context

// section7 文字内容 - 分成四段
const section7Lines = [
  '他山科技是AI触觉传感领域的领军者',
  '凭借自研芯片赋予机器人等设备对三维力、温度及纹理的精确感知',
  '全面提升人机交互的智能化水平。',
  '让触觉赋能千行百业。'
]

type CoverConfig = {
  from: string
  to: string
  end?: string
  // 防止后续 section 在 pinSpacing:false 时提前露出
  hideAfter?: string
}

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

// 场景数据
const sceneItems = [
  {
    title: '工业场景',
    desc: '在产线实现精密装配、柔性抓取，以极致触觉精度护航高端制造零失误',
    icon: imgBaseURL('ts-touch-1.png')
  },
  {
    title: '服务场景',
    desc: '在酒店等商业服务场景完成柔性交互作业，破解服务履约最后一厘米难题',
    icon: imgBaseURL('ts-touch-2.png')
  },
  {
    title: '生活场景',
    desc: '走进日常居家与养老场景，以类人触觉带来安全、温柔的智能生活陪伴',
    icon: imgBaseURL('ts-touch-3.png')
  },
  {
    title: '前沿创新',
    desc: '深耕感控一体与边缘触觉感知，突破机器人类人感知与交互边界',
    icon: imgBaseURL('ts-touch-4.png')
  }
]

const activeSceneIndex = ref(0)

const handleSceneChange = (index: number) => {
  activeSceneIndex.value = index
}

// section8 解决方案数据
const solutionItems = [
  {
    title: '汽车解决方案',
    description: '拥有全球领先的AI触感知专用芯片及触觉感知算法，同时攻克了触觉传感器方向软硬件的难题，大大增强了智能汽车在复杂环境下的操作性及交互体验',
    image: imgBaseURL('ts-section8-2.png')
  },
  {
    title: '家电及消费电子解决方案',
    description: '可提供家电持续液位检测及防溢检测，通过电容技术和人工智能算法，实现用户手势的识别，与设备非接触的交互，以及编码识别',
    image: imgBaseURL('ts-section8-1.png')
  }
]

const activeSolutionIndex = ref(0)

// 切换解决方案
const handleSolutionChange = (index: number) => {
  if (activeSolutionIndex.value === index) return

  // 先让标题和描述向上淡出
  const tl = gsap.timeline()
  tl.to(['.section8ContentLeftTitle', '.section8ContentLeftDescription'], {
    y: -20,
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in'
  })

  // 切换内容
  tl.call(() => {
    activeSolutionIndex.value = index
  })

  // 从下方向上浮入新内容
  tl.fromTo(['.section8ContentLeftTitle', '.section8ContentLeftDescription'],
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
  )

  // 同时切换图片
  if (index === 1) {
    gsap.to('.section8-image2', { yPercent: 0, duration: 0.8, ease: 'power2.out' })
  } else {
    gsap.to('.section8-image2', { yPercent: 100, duration: 0.8, ease: 'power2.out' })
  }
}

onMounted(() => {
  ctx = gsap.context(() => {
    const pinCover = (trigger: string) => {
      ScrollTrigger.create({
        trigger,
        start: 'top top',
        pin: true,
        pinSpacing: false
      })
    }

    const createCover = ({ from, to, end = '+=100%', hideAfter }: CoverConfig) => {
      gsap.set(to, { yPercent: 100 })
      if (hideAfter) gsap.set(hideAfter, { autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: from,
          start: 'top top',
          end,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          fastScrollEnd: true,
          scrub: true,
          invalidateOnRefresh: true
        }
      })

      tl.to(to, { yPercent: 0, ease: 'none', duration: 1 })
      if (hideAfter) tl.set(hideAfter, { autoAlpha: 1 })
    }

    // section2 盖 section1
    pinCover('.section1')

    // 1. 获取 DOM 元素
    const s3 = document.querySelector('.section3') as HTMLElement
    const title = document.querySelector('.section3-title') as HTMLElement
    const fg = document.querySelector('.section3-finger-container') as HTMLElement

    // 2. 创建主时间轴（控制手指移动 + 碰撞检测）
    let isColored = false

    // 关键修正：只控制 section4 和 section5，不影响更后面的元素
    // 使用统一的 y 偏移（而不是百分比），确保两者移动距离一致，不会分离
    const moveSections = ['.section4', '.section5']
    const offset = window.innerHeight * 1.1 // 110vh
    gsap.set(moveSections, { y: offset })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section3',
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: false, // 允许 section4 覆盖 section3
        scrub: true,
        onLeave: () => {
          // 动画结束后刷新，确保后续 section 的触发位置正确
          ScrollTrigger.refresh()
        },
        onEnterBack: () => {
          // 回滚时也刷新，避免触发位置错位
          ScrollTrigger.refresh()
        },
        onUpdate: () => {
          if (!s3 || !title || !fg) return

          const fingerRect = fg.getBoundingClientRect()
          const titleRect = title.getBoundingClientRect()

          // 计算手指"指尖"位置 (加一点 offset，模拟指尖在图片内部)
          // fingerRect.top 是图片上边缘，加上 20% 高度作为指尖判定点
          const fingerTipY = fingerRect.top + (fingerRect.height * 0.2)
          const titleBottomY = titleRect.bottom

          // 当指尖位置 <= 标题底部位置时，说明已经碰到了（坐标系原点在左上角，越往上越小）
          if (fingerTipY <= titleBottomY) {
            if (!isColored) {
              gsap.to('.section3-title', {
                backgroundImage: 'linear-gradient(90deg, #2838E8 0%, #74FAFD 100%)',
                duration: 0.3,
                overwrite: true
              })
              isColored = true
            }
          } else {
            if (isColored) {
              gsap.to('.section3-title', {
                backgroundImage: 'linear-gradient(90deg, rgba(16, 16, 16, 0.06) 0%, rgba(16, 16, 16, 0.04) 50%, rgba(16, 16, 16, 0.06) 100%)',
                duration: 0.3,
                overwrite: true
              })
              isColored = false
            }
          }
        }
      }
    })

    tl.fromTo('.section3-finger-container',
      { y: '100%' },
      { y: '-3%', ease: 'none', duration: 1 }
    )

    // 手指动画跑完后，让 section4 和 section5 一起从底部盖上来
    // 它们使用相同的偏移量和动画，像一个整体一样移动，消除了缝隙
    tl.to(moveSections, { y: 0, ease: 'none', duration: 0.4 })

    // section6 盖 section5
    createCover({ from: '.section5', to: '.section6', hideAfter: '.section7' })

    // section7 文字逐字变白色
    if (section7Content.value) {
      const chars = section7Content.value.querySelectorAll('.section7-char')

      gsap.timeline({
        scrollTrigger: {
          trigger: '.section7',
          start: 'top top',
          end: '+=50%',
          scrub: true
        }
      }).to(chars, {
        color: '#FFF',
        stagger: 0.02, // 每个字之间的延迟
        duration: 0.1,
        ease: 'none'
      })
    }

    // section8 盖 section7
    createCover({ from: '.section7', to: '.section8' })

    // 初始化第二张图片位置 (默认在下方隐藏)
    gsap.set('.section8-image2', { yPercent: 100 })
  }, main.value)
})

onUnmounted(() => {
  ctx.revert()
})
</script>

<template>
  <div
    ref="main"
    class="bg-[white]"
  >
    <div class="h-screen w-full section1 flex items-center justify-center text-white text-9xl font-bold">
      <MediaCarousel :items="carouselItems" />
    </div>

    <div class="h-screen w-full section2 relative z-10 flex items-center justify-center text-9xl font-bold text-black">
      222
    </div>

    <div class="h-screen w-full section3 flex flex-col items-center justify-center text-9xl font-bold text-black">
      <div class="section3-title">
        让触觉赋能千行百业
      </div>
      <div class="section3-mark-container">
        <div class="section3-mark">
          <span>Make touch warmer&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>Make touch warmer&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>Make touch warmer&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
      <div class="section3-finger-container">
        <img
          :src="imgBaseURL('ts-finger.svg')"
          alt=""
        >
      </div>
    </div>

    <div class="h-screen w-full section4">
      <div class="flex justify-between">
        <SplitText
          text="触觉感知产品"
          tag="span"
          class-name="section4Title"
          split-type="chars"
          :delay="10"
          :duration="1"
          ease="power3.out"
          :from="{ opacity: 0, y: 40 }"
          :to="{ opacity: 1, y: 0 }"
          text-align="center"
        />

        <div>
          <ThemeButton
            theme="white"
            text="了解更多"
          />
        </div>
      </div>

      <div class="flex gap-[clamp(12px,2.222vw,24px)] overflow-x-auto scrollbar-hide">
        <ProductCard
          v-for="item in 5"
          :key="item"
        />
      </div>
    </div>

    <div class="h-screen w-full section5">
      <video
        class="h-full w-full object-cover"
        :src="imgBaseURL('ts-home-1.mp4')"
        autoplay
        muted
        loop
      />

      <SplitText
        text="触觉感知训练平台（数据采集）"
        tag="span"
        class-name="section5Title"
        split-type="chars"
        :delay="50"
        :duration="1"
        ease="power3.out"
        :from="{ opacity: 0, y: 40 }"
        :to="{ opacity: 1, y: 0 }"
        text-align="center"
      />

      <div class="section5Content">
        提供专业的多维触觉数据记录、标注与导出功能，适配多款灵巧手及夹爪等末端执行器。用户可轻松采集三维力、接近觉、触点变化等数据，大大降低了数据采集的成本，为训练触觉感知算法与评估机器人交互性能提供可靠基础。
      </div>
    </div>

    <div class="h-screen w-full section6">
      <div class="section6Content">
        <div class="section6ContentLeft">
          <SplitText
            text="触觉感知服务机器人"
            tag="span"
            class-name="section6Title"
            split-type="chars"
            :delay="50"
            :duration="1"
            ease="power3.out"
            :from="{ opacity: 0, y: 40 }"
            :to="{ opacity: 1, y: 0 }"
            text-align="center"
          />

          <div class="section6ContentLeftText">
            空间允许范围内，协同感知解决方案可支持触觉传感单元的无限极连。
          </div>

          <SceneSelector
            :items="sceneItems"
            @change="handleSceneChange"
          />
        </div>

        <div class="section6ContentRight">
          <img
            v-if="sceneItems[activeSceneIndex]"
            :src="sceneItems[activeSceneIndex]?.icon"
            alt=""
            class="section6ContentRightImage"
          >
        </div>
      </div>
    </div>

    <div class="h-screen w-full section7">
      <video
        class="h-full w-full object-cover"
        :src="imgBaseURL('home-video.mp4')"
        autoplay
        muted
        loop
      />

      <div
        ref="section7Content"
        class="section7Content"
      >
        <div
          v-for="(line, lineIndex) in section7Lines"
          :key="lineIndex"
          class="section7-line"
        >
          <span
            v-for="(char, charIndex) in line"
            :key="`${lineIndex}-${charIndex}`"
            class="section7-char"
          >{{ char }}</span>
        </div>
      </div>
    </div>

    <div class="h-screen w-full section8">
      <div class="section8Content">
        <div class="section8ContentLeft">
          <div class="section8ContentLeftTitle">
            {{ solutionItems?.[activeSolutionIndex]?.title }}
          </div>
          <div class="section8ContentLeftDescription">
            {{ solutionItems?.[activeSolutionIndex]?.description }}
          </div>
          <div class="flex flex-col gap-[clamp(30px,5.556vw,60px)] w-full">
            <div class="flex justify-center gap-[clamp(28px,5.185vw,56px)]">
              <span
                v-for="(item, index) in solutionItems"
                :key="index"
                class="section8ContentLeftDescriptionText"
                :class="{ active: index === activeSolutionIndex }"
                @click="handleSolutionChange(index)"
              >
                {{ item.title }}
              </span>
            </div>
            <ThemeButton
              theme="white"
              full-width
              text="了解更多"
            />
          </div>
        </div>
        <div class="section8ContentRight">
          <!-- 第一张图片 -->
          <img
            class="section8ContentRightImage section8-image1"
            :src="solutionItems?.[0]?.image"
            alt=""
          >
          <!-- 第二张图片从下方盖上来 -->
          <img
            class="section8ContentRightImage section8-image2"
            :src="solutionItems?.[1]?.image"
            alt=""
          >
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

<style scoped>
  .section1 {
    background: linear-gradient(180deg, #121212 0%, #000000 100%);
  }

  .section2 {
    border-radius: 54px 54px 0 0;
    background: #FFF;
  }

  .section3 {
    background: #F4F4F5;
    overflow: hidden;
    position: relative;

    .section3-title {
      font-size: clamp(32px, 7.407vw, 80px);
      font-style: normal;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: 0.045em;
      text-transform: capitalize;
      background: linear-gradient(90deg, rgba(16, 16, 16, 0.06) 0%, rgba(16, 16, 16, 0.04) 50%, rgba(16, 16, 16, 0.06) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
      padding: 0 20px;
    }

    .section3-mark-container {
      width: 100%;
      overflow: hidden;
      margin-top: clamp(80px, 18.519vw, 200px);
    }

    .section3-mark {
      display: flex;
      width: fit-content;
      animation: scroll-left 30s linear infinite;

      span {
        font-size: clamp(60px, 16.667vw, 180px);
        font-style: normal;
        font-weight: 700;
        line-height: 1;
        letter-spacing: 0.02em;
        text-transform: capitalize;
        background: linear-gradient(90deg, rgba(16, 16, 16, 0.06) 0%, rgba(16, 16, 16, 0.04) 50%, rgba(16, 16, 16, 0.06) 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
      }
    }

    .section3-finger-container {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      display: flex;
      justify-content: center;
      z-index: 10;
      pointer-events: none;

      img {
        /* 尝试修复 SVG 顶部可能存在的黑线，裁剪掉顶部 2px */
        clip-path: inset(2px 0 0 0);
        /* 或者如果是因为渲染问题，可以尝试 */
        backface-visibility: hidden;
      }
    }
  }

  .section4 {
    border-radius: 54px 54px 0 0;
    background: #FFF;
    position: relative;
    z-index: 10; /* 需要盖住 section3 时保持在上层 */
    color: #000;
    padding: clamp(40px, 9.259vw, 100px);

    .section4Title {
      color: #000;
      font-size: clamp(24px, 4.444vw, 48px);
      font-style: normal;
      font-weight: 400;
      line-height: 1.25;
      letter-spacing: 0.02em;
      margin-bottom: clamp(30px, 5.556vw, 60px);
    }
  }

  .section5 {
    overflow: hidden;
    position: relative;

    .section5Title {
      color: #FFF;
      font-size: clamp(24px, 4.444vw, 48px);
      font-style: normal;
      font-weight: 400;
      line-height: 1.25;
      letter-spacing: 0.02em;
      margin-bottom: clamp(30px, 5.556vw, 60px);
      position: absolute;
      bottom: clamp(120px, 21.296vw, 230px);
      left: clamp(40px, 9.259vw, 100px);
      z-index: 10;
    }

    .section5Content {
      color: #FFF;
      font-size: clamp(14px, 1.852vw, 20px);
      font-style: normal;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: 0.1em;
      bottom: clamp(50px, 9.259vw, 100px);
      left: clamp(40px, 9.259vw, 100px);
      max-width: clamp(320px, 62.963vw, 680px);
      position: absolute;
      text-align: left;
      z-index: 10;
    }
  }

  .section6 {
    border-radius: 54px 54px 0 0;
    background: #F7F7F8;
    padding: clamp(20px, 3.611vw, 39px) clamp(40px, 9.259vw, 100px);

    .section6Content {
      display: flex;
      justify-content: space-between;
      gap: clamp(40px, 9.259vw, 100px);
      height: 100%;

      .section6ContentLeft {
        padding-top: clamp(30px, 6.389vw, 69px);
        flex: 1;

        .section6ContentLeftText {
          color: #000;
          font-size: clamp(14px, 1.852vw, 20px);
          font-style: normal;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: 0.1em;
          margin-bottom: clamp(40px, 7.407vw, 80px);
        }
      }

      .section6ContentRight {
        flex: 1;
        background: #000;
        height: 100%;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        .section6ContentRightImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
        }
      }
    }

    .section6Title {
      color: #000;
      font-size: clamp(24px, 4.444vw, 48px);
      font-style: normal;
      font-weight: 400;
      line-height: 1.25;
      letter-spacing: 0.02em;
      margin-bottom: clamp(30px, 5.556vw, 60px);
    }
  }

  .section7 {
    overflow: hidden;
    position: relative;

    .section7Content {
      font-size: clamp(24px, 4.444vw, 48px);
      font-style: normal;
      font-weight: 400;
      line-height: 1.25;
      letter-spacing: 0.02em;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      max-width: clamp(600px, 116.111vw, 1254px);
      padding: 0 20px;

      .section7-line {
        display: block;
        margin-bottom: clamp(5px, 0.926vw, 10px);
        white-space: nowrap;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .section7-char {
        color: #FFFFFF80;
        display: inline-block;
      }
    }
  }

  .section8 {
    background: #F7F7F8;
    border-radius: 54px 54px 0 0;
    padding: clamp(20px, 3.704vw, 40px);

    .section8Content {
      display: flex;
      height: 100%;
      justify-content: space-between;
      gap: clamp(12px, 2.222vw, 24px);

      .section8ContentLeft {
        background: #EEF0F4;
        flex: 3;
        padding-top: clamp(40px, 9.259vw, 100px);
        padding-bottom: clamp(20px, 3.704vw, 40px);
        padding-left: clamp(20px, 3.704vw, 40px);
        padding-right: clamp(20px, 3.704vw, 40px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .section8ContentLeftTitle {
          color: #000;
          text-align: center;
          font-size: clamp(24px, 4.444vw, 48px);
          font-style: normal;
          font-weight: 400;
          line-height: 1.25;
          letter-spacing: 0.02em;
          will-change: transform, opacity;
        }

        .section8ContentLeftDescription {
          color: rgba(0, 0, 0, 0.60);
          text-align: center;
          font-size: clamp(14px, 1.852vw, 20px);
          font-style: normal;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: 0.02em;
          max-width: clamp(300px, 43.704vw, 472px);
          will-change: transform, opacity;
        }

        .section8ContentLeftDescriptionText {
          color: #00000066;
          font-size: clamp(12px, 1.481vw, 16px);
          font-style: normal;
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: color 0.3s ease;

          &.active {
            color: #000;
          }

          &:hover {
            color: rgba(0, 0, 0, 0.80);
          }
        }
      }

      .section8ContentRight {
        flex: 5;
        position: relative;
        overflow: hidden;

        .section8ContentRightImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .section8-image2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .section5,
  .section6,
  .section7,
  .section8,
  .section9 {
    position: relative;
    z-index: 10;
  }

  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-33.333%);
    }
  }

  /* 隐藏滚动条 */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }

  .partner-container {
    padding: clamp(40px, 9.259vw, 100px);
    background: #EEF0F4;

    .partner-title {
      color: #000;
      font-size: clamp(24px, 4.444vw, 48px);
      font-style: normal;
      font-weight: 400;
      line-height: 1.25;
      letter-spacing: 0.02em;
      margin-bottom: clamp(35px, 6.481vw, 70px);
    }

    .partner-content {
      display: flex;
      align-items: center;
    }
  }
</style>
