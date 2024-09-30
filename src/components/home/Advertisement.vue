<template>
  <div>
    <div class="advertisement">
      <div class="reminder_pill">
        <img src="../../assets/icons/speaker.svg" />
        <vue-seamless-scroll
          :data="listData"
          class="warp"
          :class-option="classOption"
        >
          <ul class="ul-item">
            <li v-for="(item, index) in listData" :key="index" class="li-item">
              <span
                class="title"
                style="color: white"
                v-text="item.noticeContent"
              ></span>
            </li>
          </ul>
        </vue-seamless-scroll>
        <button @click="showMore = true">{{ $en("records.more") }}</button>
      </div>
      <img src="../../assets/icons/redArrow.svg" />
      <h2 :title="$en('home.search')" class="downloadapp_bgtext">{{ $en("home.download_app") }}</h2>
      <div class="downloadapp_card">
        <div class="card_bg gradientBg">
          <div class="card_content">
            <div style="font-size: 40px; line-height: 40px; font-weight: bold">
              {{ $en("home.download_app") }}
            </div>
            <div style="font-size: 20px; line-height: 20px; font-weight: bold">
              {{ $en("home.download_text") }}
            </div>
            <div style="font-size: 14px">
              {{ $en("home.download_description") }}
            </div>
            <div class="card_btn">
              <button>
                <img src="../../assets/icons/android.svg" />
                <div>{{ $en("home.android_app") }}</div>
              </button>
              <button>
                <img src="../../assets/icons/apple.svg" />
                <div>{{ $en("home.apple_app") }}</div>
              </button>
            </div>
          </div>
          <div class="card_right">
            <img
              src="../../assets/image/home/advertisement/mobile.png"
              style="max-width: 448px; max-height: 674px; margin-top: -230px"
            />
            <div class="qr">
              <vue-qr
                class="sao-img"
                :text="$store.state.siteUrl + QRcode"
                :size="200"
              ></vue-qr>
              <div class="dwnld">{{ $en("home.scan") }}</div>
            </div>
          </div>
        </div>
        <img
          src="../../assets/image/home/advertisement/smileKing.png"
          style="max-width: 660px; max-height: 600px; margin-left: -100px"
        />
      </div>
      <img
        src="../../assets/image/pageBorderTop.png"
        style="max-width: 100%; max-height: 1032px"
      />
      <div class="advertisement_text_bg">
        <div class="text_blur">{{ $en("home.top_games") }}</div>
        <div class="text">{{ $en("home.top_games") }}</div>
      </div>
      <img
        src="../../assets/image/home/border.png"
        style="max-width: 760px; max-height: 78px"
      />
      <div class="top_games_text">
        {{ $en("home.top_games_text") }}
      </div>
    </div>
    <div class="modal" v-if="showMore">
      <div class="modal_content">
        <div style="padding: 27px 0 47px 0; text-align: center">
          <div class="title">{{ $en("home.announcements") }}</div>
          <img
            @click="showMore = false"
            src="../../assets/image/modalCrossIcon.png"
          />
        </div>
        <div v-if="listData.length > 0">
          <el-tabs :tab-position="tabPosition">
            <el-tab-pane
              :label="item.noticeTitle"
              v-for="(item, index) in listData"
              :key="index"
              >{{ item.noticeContent }}</el-tab-pane
            >
          </el-tabs>
        </div>
        <div v-if="listData.length === 0">
          <el-tabs :tab-position="tabPosition">
            <el-tab-pane
              :label="item.noticeTitle"
              v-for="(item, index) in noticeList"
              :key="index"
              >{{ item.noticeContent }}</el-tab-pane
            >
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="modal" v-if="showNotice && isNewDay()">
      <div class="modal_content">
        <div style="padding: 27px 0 47px 0; text-align: center">
          <div class="title">{{ $en("home.announcements") }}</div>
          <img
            @click="toggleCheckbox()"
            src="../../assets/image/modalCrossIcon.png"
          />
        </div>
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane
            :label="item.noticeTitle"
            v-for="(item, index) in noticeList"
            :key="index"
            >{{ item.noticeContent }}</el-tab-pane
          >
        </el-tabs>
        <hr />
        <div class="no_alert">
          <div>{{ $en("general.no_alert") }}</div>
          <div class="radio" @click="isChecked = !isChecked">
            <div class="active" v-if="isChecked"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { systemInfogetSystemNotice } from "@/api/galApi";
import state from "@/store/state";
import vueQr from "vue-qr";
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  name: "PCXLGameAdvertisement",
  components: { vueQr, vueSeamlessScroll },
  data() {
    return {
      listData: [],
      noticeList: [],
      classOption: {
        limitMoveNum: 1,
        direction: 2,
        step: 2,
      },
      showMore: false,
      QRcode: "",
      tabPosition: "left",
      isChecked: false,
      showNotice: false,
    };
  },

  mounted() {
    this.getMarqueeData();
    this.getNoticeList();
    this.staticFx();
  },

  methods: {
    getMarqueeData() {
      systemInfogetSystemNotice(0).then((res) => {
        this.listData = res.data.systemNotice;
      });
    },
    getNoticeList() {
      systemInfogetSystemNotice(1).then((res) => {
        this.noticeList = res.data.systemNotice;
        if (res.data.systemNotice.length > 0) {
          this.showNotice = true;
        }
      });
    },
    staticFx() {
      if (!state.static) {
        return;
      }
      //banner
      this.bannerResources = state.static.bannerResources;
      // down
      let statResource = state.static.downloadInfo;
      statResource.forEach((element) => {
        if (element.deviceName == "downloadPage") {
          this.QRcode = element.indexUrl;
        }
      });
    },
    toggleCheckbox() {
      this.showNotice = false;
      if (this.isChecked) {
        localStorage.setItem("checkboxTimestamp", Date.now());
      } else {
        localStorage.removeItem("checkboxTimestamp");
      }
    },
    isNewDay() {
      let tim = JSON.parse(localStorage.getItem("checkboxTimestamp"));
      // console.log(tim, "tim");
      const date1 = new Date(tim);
      const date2 = new Date();
      // console.log(date1, "date2");

      return (
        date1.getFullYear() !== date2.getFullYear() ||
        date1.getMonth() !== date2.getMonth() ||
        date1.getDate() !== date2.getDate()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3000;
  font-size: 12px;
  color: white;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal_content {
    width: 568px;
    min-height: 319px;
    flex-shrink: 0;
    border-radius: 30px;
    background: linear-gradient(64deg, #1a1c2b 49.57%, #c91d05 269.88%);
    box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.58);
    padding-bottom: 0;
    position: relative;
    img {
      height: 24px;
      cursor: pointer;
      position: absolute;
      right: 36px;
      top: 25px;
    }
    .title {
      font-size: 28px;
      line-height: 28px;
      font-weight: bold;
    }
    .no_alert {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 40px;
      .radio {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        background: #d9d9d9;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .active {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          background: linear-gradient(#ff2304, #3d0700);
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
  }
}

.el-tabs--left .el-tabs__nav-wrap.is-left:after {
  height: 0 !important;
}

.advertisement {
  background-image: url("../../assets/image/home/advertisement/bgDownLoadApp.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: 1524px;
  width: 100%;
  margin-top: -70px;
  .reminder_pill {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    border-radius: 54px;
    background: #b53d1e;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.63) inset;
    color: white;
    width: 1073px;
    height: 50px;
    flex-shrink: 0;
    padding: 0 15px 0 35px;
    marquee {
      margin: 0 20px;
    }
    .systemInfo {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    button {
      width: 107.429px;
      height: 32px;
      flex-shrink: 0;
      border-radius: 78px;
      background: #c01c05;
      box-shadow: 2px 2px 9px 0px rgba(0, 0, 0, 0.71);
      color: white;
      border: none;
      cursor: pointer;
    }
  }
  .downloadapp_card {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -200px;
    margin-left: 200px;
    .card_bg {
      display: flex;
      align-items: center;
      border-radius: 24px;
      color: #f9f9f9;
      max-width: 974px;
      max-height: 446px;

      .card_content {
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 50px;
        width: 55%;
        .card_btn {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: bold;
          color: #c01c05;
          button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            border-radius: 9999px;
            background-color: white;
            width: 163px;
            height: 44px;
            flex-shrink: 0;
            font-size: 14px;
            font-weight: bold;
            color: #c01c05;
            border: none;
          }
        }
      }
      .card_right {
        display: flex;
        align-items: center;
        margin-left: -70px;
        width: 44%;
        .qr {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-left: -70px;
          gap: 20px;
          .sao-img {
            width: 180px;
            height: 180px;
            box-shadow: 0 5px 5px rgba(16, 16, 16, 0.14);
            // background: red;
            border-radius: 10px;
          }
          .dwnld {
            padding: 12px 20px;
            border-radius: 33px;
            white-space: nowrap;
            color: #f9f9f9;
            font-size: 14px;
            background: linear-gradient(
              169deg,
              #c91d05 -5.74%,
              #441209 103.22%
            );
            box-shadow: 0px 4px 39px 0px rgba(0, 0, 0, 0.65);
          }
        }
      }
    }
  }
  .downloadapp_bgtext {
    color: white;
    font-weight: bold;
    font-size: 170px;
    line-height: 170px;
    margin:0;
    padding: 0;
    margin-top: 80px;
  }
  .advertisement_text_bg {
    font-weight: bold;
    margin-top: -900px;
    .text_blur {
      opacity: 0.1;
      filter: blur(6.5px);
      color: #304258;
      font-size: 100px;
    }
    .text {
      background: linear-gradient(to top left, #dc2626, #c53030);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-size: 40px;
      margin-top: -70px;
      text-align: center;
    }
  }
  .top_games_text {
    color: #304258;
    font-weight: bold;
    margin-top: -100px;
  }
}
.warp {
  width: 850px;
  height: 60px;
  margin: 0 auto;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    &.ul-item {
      display: flex;
      .li-item {
        min-width: 600px;
        height: 60px;
        margin-right: 40px;
        line-height: 60px;
        color: #6c7ba8;
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
</style>
