<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    width: 100%;
  }
  .p7 {
    /* width: 70%; */
  }
  .header {
    width: 90%;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .header-img {
      width: 10rem;
      flex: 0 0 30%;
    }
    .header-right {
      flex: 0 0 65%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: inherit;
    }
    .nav {
      padding-right: 2rem;
      .nav-items {
        display: flex;
        .nav-item {
          width: 5rem;
          font-size: 1rem;
          text-align: center;
          cursor: pointer;
          font-weight: bold;
          color: rgb(145, 143, 143);
          &.nav-items_spea {
            border-right: 2px solid rgb(145, 143, 143);
          }
        }
      }
    }
  }
  .content {
    width: 90%;
    .content-title {
      text-align: center;
      margin: 3rem 0;
      b {
        font-size: 1.8rem;
        color: rgb(89, 87, 87);
        &::after {
          display: inline-block;
          width: 15px;
          height: 15px;
          margin-left: 10px;
          vertical-align: top;
          border-radius: 15px;
          background: red;
          border: 1px solid red;
          content: " ";
        }
      }
      .content-title-desc {
        font-size: 1.2rem;
        p {
          font-size: 1.2rem;
          line-height: 2rem;
        }
        .en {
          font-size: 0.7rem;
          line-height: 1rem;
        }
        &.first {
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          ul {
            display: flex;
            li {
              width: 8rem;

              line-height: 2rem;
              &.spear {
                border-right: 2px solid #ccc;
              }
            }
          }
        }
      }
    }
    .content-free-wrap {
      display: flex;
      justify-content: space-between;
      .content-free-wrap_left {
        width: 70%;
      }
      .content-free-wrap_right {
        width: 25%;
        height: 30em;
        & > div {
          height: 100%;
          margin-bottom: 0.3rem;
          border: 3px solid rgb(181, 161, 119);
          ul {
            height: 70%;
            padding: 1rem;
            text-align: center;
            li {
              height: 30%;
              div {
                padding: 0.5rem 0;
                p {
                  font-size: 1rem;
                  line-height: 1.5rem;
                  font-weight: 500;
                }
                span {
                  font-size: 0.1rem;
                  color: #ccc;
                }
              }
            }
          }
        }

        .order-title {
          height: 4rem;
          text-align: center;
          line-height: 4rem;
          font-size: 1.2rem;
          background: rgb(195, 13, 35);
          color: #fff;
        }
      }
    }
    .order-form {
      width: 70%;
    }
    .el-form.order-form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin: 3em 0;
      .order-form-item {
        width: 45%;
        margin-right: 5%;
        .form-item-select {
          width: 100%;
        }
        .order-btn {
          width: 100%;
          background: red;
          border: 1px solid red;
        }
      }
    }
  }
}
.footer,
.about {
  width: 100%;
}
.about {
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5rem 0;
  .about-content {
    width: 50%;
    padding-left: 1rem;
    & > ul {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .about-content-title {
        font-size: 1rem;
        line-height: 1.8rem;
        color: #000;
      }
      .about-content-item {
        line-height: 1.5rem;
        font-size: 0.8rem;
      }
    }
  }
  .qrcode {
    width: 8rem;
    p {
      text-align: center;
    }
  }
}
.footer {
  padding-top: 8rem;
  background: rgb(35, 26, 9);
  color: #fff;
  font-size: 1rem;
  height: 12rem;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    ul {
      margin-bottom: 0.5rem;
    }
  }
  li {
    width: 6rem;
    display: inline-block;
    line-height: 1rem;
    text-align: center;
    &.footer-item {
      border-right: 2px solid #fff;
    }
  }
}
.active {
  color: red !important;
}
</style>
<template>
  <div id='idx' class="container">
    <header class="header">
      <div class="header-img">
        <img class="img" src="../../assets/com-icon.jpg" alt="">
      </div>

      <div class="header-right">
        <div class="search d6">
          <form>
            <input type="text" placeholder="输入产品型号 搜素更多">
            <button type="submit"></button>
          </form>
        </div>
        <nav class="nav">
          <div class="nav-items">
            <span :class="{ active: isActive_1 }" class="nav-item nav-items_spea" @click="linkTo(1)">首页</span>
            <span :class="{ active: isActive_2 }" class="nav-item nav-items_spea" @click="linkTo(2)">产品中心</span>
            <span :class="{ active: isActive_3 }" class="nav-item nav-items_spea" @click="linkTo(3)">7大设计</span>
            <span :class="{ active: isActive_4 }" class="nav-item nav-items_spea" @click="linkTo(4)">品牌视频</span>
            <span :class="{ active: isActive_5 }" class="nav-item nav-items_spea" @click="linkTo(5)">品牌咨询</span>
            <span :class="{ active: isActive_6 }" class="nav-item nav-items_spea" @click="linkTo(6)">免费量房</span>
            <span :class="{ active: isActive_7 }" class="nav-item" @click="linkTo(7)">地热大讲堂</span>
          </div>
        </nav>

      </div>

    </header>
    <div class="content">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img class="img" src="../../assets/banner1.jpg" alt=""></div>
          <div class="swiper-slide"><img class="img" src="../../assets/p2.jpg" alt=""></div>
          <div class="swiper-slide"><img class="img" src="../../assets/p1.jpg" alt=""></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <section>
        <div class="content-title">
          <b>诺高之稳</b>
          <div class="content-title-desc first">
            <ul>
              <li class="spear">
                <span>稳定的木种</span>
              </li>
              <li class="spear">
                <span>养生烘干工艺</span>
              </li>
              <li class="spear">
                <span>榫卯结构</span>
              </li>
              <li>
                <span>油漆工艺</span>
              </li>
            </ul>
            <p class="en">Stable wood growing | curing process | tenon structure |paint technology</p>
          </div>
        </div>
        <div><img class="img" src="../../assets/p2.jpg" alt=""></div>
      </section>
      <section>
        <div class="content-title">
          <b>产品中心</b>
          <div class="content-title-desc">
            <p class="content-title-desc_1">带您欣赏诺高更多更美的产品</p>
            <p class="en">Show you more and more beautiful products</p>
          </div>
        </div>
        <div><img class="img" src="../../assets/p1.jpg" alt=""></div>
      </section>
      <section>
        <div class="content-title">
          <b>七大设计</b>
          <div class="content-title-desc">
            <p>GEMAX地热稳定系统</p>
            <p class="en">GEMAX genthermal stability system</p>
          </div>
        </div>
        <div><img class="img" src="../../assets/p3.jpg" alt=""></div>
      </section>
      <section>
        <div class="content-title">
          <b>品牌视频</b>
          <div class="content-title-desc">
            <p>带您欣赏诺高更多更美的产品</p>
            <p class="en">Show you more and more beautiful products</p>
          </div>
        </div>
        <div><img class="img" src="../../assets/video1.jpg" alt=""></div>
      </section>
      <section>
        <div class="content-title">
          <b>品牌咨询</b>
          <div class="content-title-desc">
            <p>带您欣赏诺高更多更美的产品</p>
            <p class="en">Show you more and more beautiful products</p>
          </div>
        </div>
        <div><img class="img" src="../../assets/p4.jpg" alt=""></div>
      </section>
      <section>
        <div class="content-title">
          <b>免费量房</b>
          <div class="content-title-desc">
            <p>带您欣赏诺高更多更美的产品</p>
            <p class="en">Show you more and more beautiful products</p>
          </div>
        </div>
        <div class="content-free-wrap">
          <div class="content-free-wrap_left">
            <div class="p7"><img class="img" src="../../assets/p7.jpg" alt=""></div>
            <ng-form class="order-form">
              <ng-form-item class="order-form-item">
                <ng-input placeholder="您的姓名"></ng-input>
              </ng-form-item>
              <ng-form-item class="order-form-item">
                <ng-input width="50%" placeholder="手机号码"></ng-input>
              </ng-form-item>
              <ng-form-item class="order-form-item">
                <ng-select class="form-item-select" v-model="sel_province" width="50%" placeholder="请选择省份"></ng-select>
              </ng-form-item>
              <ng-form-item class="order-form-item">
                <ng-select class="form-item-select" v-model="sel_city" width="50%" placeholder="请选择城市"></ng-select>
              </ng-form-item>
              <ng-form-item class="order-form-item">
                <ng-select class="form-item-select" v-model="sel_store" width="50%" placeholder="请选择门店"></ng-select>
              </ng-form-item>
              <ng-form-item class="order-form-item">
                <ng-button type="primary" class="order-btn">立即预约</ng-button>
              </ng-form-item>
            </ng-form>
          </div>
          <div class="content-free-wrap_right">
            <div>
              <div class="order-title">累计47281人预约</div>
              <ul>
                <li>
                  <div>
                    <p>14:51:13 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;南京宋小姐</p>
                    <span>已申请9月25日上门量房</span>
                  </div>

                </li>
                <li>
                  <div>
                    <p>11:23:11 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;北京王先生</p>
                    <span>已申请9月25日上门量房</span>
                  </div>

                </li>
                <li>
                  <div>
                    <p>09:45:49 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;青岛林先生</p>
                    <span>已申请9月25日上门量房</span>
                  </div>

                </li>
                <li>
                  <div>
                    <p>09:45:49 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;桂林张小姐</p>
                    <span>已申请9月25日上门量房</span>
                  </div>

                </li>
              </ul>
            </div>

          </div>
        </div>

      </section>
      <section>
        <div class="content-title">
          <b>地热大讲堂</b>
          <div class="content-title-desc">
            <p>带您欣赏诺高更多更美的产品</p>
            <p class="en">Show you more and more beautiful products</p>
          </div>
        </div>
        <div><img class="img" src="../../assets/p5.jpg" alt=""></div>
      </section>
      <section>
        <div class="content-title">
          <b>合作伙伴</b>
          <div class="content-title-desc">
            <p>带您欣赏诺高更多更美的产品</p>
            <p class="en">Show you more and more beautiful products</p>
          </div>
        </div>
        <div><img class="img" src="../../assets/p6.jpg" alt=""></div>
      </section>
    </div>
    <div class="about">
      <div class="about-content">
        <ul>
          <li>
            <div class="about-content-title">
              <b>关于我们</b>
            </div>
            <ul>
              <li class="about-content-item">公司简介</li>
              <li class="about-content-item">品牌使命</li>
              <li class="about-content-item">发展历程</li>
              <li class="about-content-item">企业责任</li>
              <li class="about-content-item">品牌荣誉</li>
            </ul>
          </li>
          <li>
            <div class="about-content-title">
              <b>招商加盟</b>
            </div>
            <ul>
              <li class="about-content-item">招商政策</li>
              <li class="about-content-item">加盟流程</li>
              <li class="about-content-item">申请加盟</li>
            </ul>
          </li>
          <li>
            <div class="about-content-title">
              <b>联系我们</b>
            </div>
            <ul>
              <li class="about-content-item">联系方式</li>
              <li class="about-content-item">加盟流程</li>
              <li class="about-content-item">交通路线</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="qrcode">
        <img class="img" src="../../assets/qr.png" alt="">
        <p>德品地板官方微信</p>
      </div>
    </div>
    <div class="footer">
      <div>
        <ul>
          <li class="footer-item">招聘发布</li>
          <li class="footer-item">友情链接</li>
          <li class="footer-item">店面查询</li>
          <li>经销商登录</li>
        </ul>
        <div class="copyright">
          <p>COPYRIGHT2015 湖州诺高地板科技有限公司ALL RIGHTS RESERVED 苏ICP16061331号</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import common from "../../js/common";
import * as service from "./service";
export default {
  data() {
    return {
      sel_province: "",
      sel_city: "",
      sel_store: "",
      isActive_1: true,
      isActive_2: false,
      isActive_3: false,
      isActive_4: false,
      isActive_5: false,
      isActive_6: false,
      isActive_7: false
    };
  },
  mounted() {},
  created() {},
  methods: {
    linkTo(num) {
      this.isActive_1 = this.isActive_2 = this.isActive_3 = this.isActive_4 = this.isActive_5 = this.isActive_6 = this.isActive_7 = false;
      this["isActive_" + num] = true;
    }
  }
};
</script>
