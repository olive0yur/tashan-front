<template>
  <div class="bg-[#EEF0F4]">
    <div
      class="app-footer"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <div class="footer-content">
        <!-- 左侧Logo和联系方式 -->
        <div class="footer-left">
          <div class="logo">
            <img
              src="/img/logo-active.svg"
              alt=""
            >
          </div>
          <div class="contact-info">
            <p>联系我们</p>
            <p>+886 888888888</p>
            <p>Tashan@Gmail.Com</p>
          </div>
        </div>

        <!-- 中间导航链接 -->
        <div class="footer-center">
          <div class="footer-column">
            <h4>技术</h4>
            <ul>
              <li>人工智能模型专用芯片</li>
              <li>真三维力传感器</li>
              <li>核心算法案例</li>
              <li>触觉感知知识库</li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>产品中心</h4>
            <ul>
              <li>机器人</li>
              <li>汽车</li>
              <li>消费电子</li>
              <li>家电</li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>其他</h4>
            <ul>
              <li>关于我们</li>
              <li>新闻中心</li>
              <li>联系我们</li>
            </ul>
          </div>
        </div>

        <!-- 右侧二维码 -->
        <div class="footer-right">
          <div class="qr-code">
            <img
              src="/footer/gzh.svg"
              alt="公众号"
              class="qr-image"
            >
            <p>公众号</p>
          </div>
          <div class="qr-code">
            <img
              src="/footer/xcx.svg"
              alt="小程序"
              class="qr-image"
            >
            <p>小程序</p>
          </div>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="footer-bottom">
        <p class="copyright">
          Copyright© 2026
        </p>
        <div class="footer-links">
          <a href="#">隐私政策</a>
          <a href="#">使用条款</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const bgImage = '/footer/bg-footer.png'
</script>

<style scoped>
.app-footer {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  padding: 100px 100px 24px 100px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
}

/* 左侧 */
.footer-left {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #000 !important;
  font-family: "Source Han Sans SC";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.32px;
}

.logo-text {
  color: #000 !important;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: "Source Han Sans SC";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.32px;
}

.contact-info p {
  margin: 0;
}

.contact-info p:first-child {
  color: rgba(0, 0, 0, 0.60) !important;
}

.contact-info p:not(:first-child) {
  color: #000 !important;
}

/* 中间导航 */
.footer-center {
  display: flex;
  gap: 120px;
}

.footer-column h4 {
  color: rgba(0, 0, 0, 0.60) !important;
  font-family: "Source Han Sans SC";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.36px;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-column li {
  color: #000;
  font-family: "Source Han Sans SC";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.32px;
  cursor: pointer;
  transition: color 0.3s;
}

.footer-column li:hover {
  color: #0073FF !important;
}

/* 右侧二维码 */
.footer-right {
  display: flex;
  gap: 40px;
}

.qr-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.qr-image {
  width: 100px;
  height: 100px;
}

.qr-code p {
  margin: 0;
  color: #000 !important;
  font-family: "Source Han Sans SC";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.32px;
}

/* 底部版权 */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid rgba(217, 217, 217, 0.40);
  color: rgba(0, 0, 0, 0.60) !important;
  font-family: "Source Han Sans SC";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.32px;
}

.copyright {
  margin: 0;
  color: rgba(0, 0, 0, 0.60) !important;
}

.footer-links {
  display: flex;
  gap: 32px;
}

.footer-links a {
  color: rgba(0, 0, 0, 0.60) !important;
  font-family: "Source Han Sans SC";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.32px;
  text-decoration: none;
  transition: opacity 0.3s;
}

.footer-links a:hover {
  opacity: 1;
}

/* 响应式布局 */
/* 平板 (1024px 以下) */
@media (max-width: 1024px) {
  .app-footer {
    padding: 60px 40px 24px 40px;
  }

  .footer-center {
    gap: 60px;
  }

  .footer-right {
    gap: 24px;
  }
}

/* 小平板 (768px 以下) */
@media (max-width: 768px) {
  .app-footer {
    padding: 40px 24px 20px 24px;
  }

  .footer-content {
    flex-direction: column;
    gap: 40px;
    margin-bottom: 40px;
  }

  .footer-center {
    gap: 40px;
  }

  .footer-right {
    flex-direction: row;
    justify-content: flex-start;
    gap: 40px;
  }

  .qr-image {
    width: 80px !important;
    height: 80px !important;
  }
}

/* 手机 (480px 以下) */
@media (max-width: 480px) {
  .app-footer {
    padding: 32px 16px 16px 16px;
  }

  .logo {
    font-size: 20px;
  }

  .logo-icon {
    width: 40px !important;
    height: 40px !important;
  }

  .contact-info {
    font-size: 14px;
    line-height: 20px;
  }

  .footer-content {
    gap: 32px;
    margin-bottom: 32px;
  }

  .footer-center {
    flex-direction: column;
    gap: 32px;
  }

  .footer-column h4 {
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 16px;
  }

  .footer-column li {
    font-size: 14px;
    line-height: 20px;
  }

  .footer-column ul {
    gap: 12px;
  }

  .footer-right {
    gap: 24px;
  }

  .qr-image {
    width: 70px !important;
    height: 70px !important;
  }

  .qr-code p {
    font-size: 12px;
    line-height: 16px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    padding-top: 16px;
    font-size: 12px;
    line-height: 18px;
  }

  .footer-links {
    gap: 16px;
  }

  .footer-links a {
    font-size: 12px;
    line-height: 18px;
  }
}
</style>
