<template>
  <div class="vip">
    <div class="vip_content">
      <div class="current_level">
        <div class="level_info">
          <img
            v-if="userLevelInfo && vipPoints[userLevelInfo.userLevel]"
            :src="vipPoints[userLevelInfo.userLevel].vipLogo"
          />
          <div class="level_content">
            <div style="display: flex">
              <div style="width: 100px; text-align: right">
                {{ $en("user.curr_lvl") }}:
              </div>
              <span
                style="color: #304258; padding-left: 26px; font-weight: bold"
                >VIP {{ userLevelInfo.userLevel }}</span
              >
            </div>
            <div style="margin-top: 6px; display: flex">
              <div style="width: 100px; text-align: right">
                {{ $en("user.turnover") }}:
              </div>
              <span style="padding-left: 26px"
                >{{ userLevelInfo.totalValidAmount }}￥</span
              >
            </div>
          </div>
        </div>
        <router-link to="/vips"
          ><button>{{ $en("user.vip_details_btn") }}</button></router-link
        >
      </div>
      <div class="vip_progress">
        <el-progress
          :percentage="progress * 10"
          color="#C91D05"
          :stroke-width="12"
          :show-text="false"
        ></el-progress>
        <div class="vip_list">
          <div
            v-for="i in 11"
            :key="i"
            :style="{
              'font-weight':
                i < userLevelInfo.userLevel + 2 ? 'bold' : 'normal',
            }"
            @click="setProgressValue(i - 1)"
          >
            VIP{{ i - 1 }}
          </div>
        </div>
      </div>
      <div class="dep_amount">
        <div>
          {{ $en("vip.current_deposit") }}
          {{ userLevelInfo.totalRechargeAmount }}
          <span
            >({{ userLevelInfo.totalRechargeAmount }}/{{
              userLevelInfo.upgradeRechargeAmount
            }})</span
          >
        </div>
        <div>
          {{ $en("vip.current_turnover") }} {{ userLevelInfo.totalValidAmount }}
          <span
            >({{ userLevelInfo.totalValidAmount }}/{{
              userLevelInfo.upgradeValidAmount
            }})</span
          >
        </div>
      </div>
      <div class="vip_exclusive">
        <div class="exclusive_title">
          VIP{{ selectedVIP }} {{ $en("user.exclusive") }}
        </div>
        <div class="exclusives">
          <div
            class="exclusive"
            v-for="(item, index) in vipExclusives"
            :key="index"
          >
            <img :src="item.icon" />
            <div style="font-weight: bold">
              {{ getExclusiveValue(index) }}
            </div>
            <div>{{ item.text }}</div>
          </div>
        </div>
      </div>
      <div class="vip_promotions" v-if="selectedVIP > 0">
        <div>VIP{{ selectedVIP }} {{ $en("user.promotion_offer") }}</div>
        <div class="stats">
          <div
            :class="{
              stat: true,
              stat_noborder: index === vipPromotions.length - 1,
            }"
            v-for="(item, index) in vipPromotions"
            :key="index"
          >
            <div style="color: #b53d1e; font-weight: bold">
              {{ getPromotionValue(index) }}
            </div>
            <div>{{ item.text }}</div>
          </div>
        </div>
      </div>
      <div class="vip_venue" v-if="selectedVIP > 0">
        <div>{{ $en("user.choose_venue") }}</div>
        <div class="venue">
          <el-select v-model="value" filterable placeholder="Plateform">
            <el-option
              v-for="(item, index) in levelRebates_gameType"
              :key="index"
              :label="item.platformName"
              :value="index"
            >
            </el-option>
          </el-select>
          <div>
            <input
              v-model="biNam"
              type="text"
              :placeholder="$en('inputs.amount')"
              oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
            />
            <div class="venue_info" v-if="biNam > 0">
              <img src="../../assets/user/infoIcon.png" />
              <div>
                {{
                  $en(
                    "vip.input_alert",
                    parseInt(
                      Number(biNam) *
                        (Number(
                          levelDetails.levelDiscounts.discountData[selectedVIP]
                            .bonusRatio
                        ) +
                          1) *
                        Number(
                          levelDetails.levelDiscounts.discountData[selectedVIP]
                            .validMulti
                        )
                    )
                  )
                }}
              </div>
            </div>
          </div>
        </div>
        <button @click="sqhd()" :class="{ btn_bg: biNam }">
          {{ $en("user.apply_now") }}
        </button>
      </div>
    </div>
    <div class="vip_info">
      <div class="title">{{ $en("user.vip_levels") }}</div>
      <div class="vips" v-if="levelDetails && levelDetails.levelRecords">
        <div
          class="vip_required"
          v-for="(item, index) in levelDetails.levelRecords.slice(0, -1)"
          :key="index"
        >
          <div>
            <div class="vip_name">{{ $en("vip.level") }} {{ index }}</div>
            <div class="vip_text">
              您需要 {{ item.upgradeRecharge }} 存款和
              {{ item.upgradeValid }} 流水升级至 VIP {{ index + 1 }}
            </div>
          </div>
          <img :src="vipPoints[index].vipLogo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  activityApplyapplyActivity,
  getJsonXq,
  userInfogetLevelInfo,
} from "@/api/galApi";
import store from "@/store";
import state from "@/store/state";

export default {
  name: "PCXLGameUserVip",

  data() {
    return {
      vipPoints: [
        {
          vipLogo: require("../../assets/image/vip/vip0.png"),
        },
        {
          vipLogo: require("../../assets/image/vip/vip1.png"),
        },
        {
          vipLogo: require("../../assets/image/vip/vip2.png"),
        },
        {
          vipLogo: require("../../assets/image/vip/vip3.png"),
        },
        {
          vipLogo: require("../../assets/image/vip/vip4.png"),
        },
        {
          vipLogo: require("../../assets/image/vip/vip5.png"),
        },
        {
          vipLogo: require("../../assets/image/vip/vip6.png"),
        },
        {
          vipLogo: require("../../assets/image/vip/vip7.png"),
        },
        {
          vipLogo: require("../../assets/image/vip/vip8.png"),
        },
        {
          vipLogo: require("../../assets/image/vip/vip9.png"),
        },
        {
          vipLogo: require("../../assets/image/vip/vip10.png"),
        },
      ],
      vipExclusives: [
        {
          icon: require("../../assets/user/withdrawalDay.png"),
          text: state.en.user.exclusive1,
        },
        {
          icon: require("../../assets/user/withdrawalDaily.png"),
          text: state.en.user.exclusive2,
        },
        {
          icon: require("../../assets/user/upgradeHour.png"),
          text: state.en.user.exclusive3,
        },
        {
          icon: require("../../assets/user/birthdayGift.png"),
          text: state.en.user.exclusive4,
        },
        {
          icon: require("../../assets/user/withdrawalWeekly.png"),
          text: state.en.user.exclusive5,
        },
      ],
      vipPromotions: [
        {
          text: state.en.user.promotion1,
        },
        {
          text: state.en.user.promotion2,
        },
        {
          text: state.en.user.promotion3,
        },
        {
          text: state.en.user.promotion4,
        },
        {
          text: state.en.user.promotion5,
        },
      ],
      value: 0,
      biNam: "",
      userLevelInfo: {},
      selectedVIP: null,
      levelDetails: [],
      levelRebates_gameType: [],
      progress: "",
    };
  },
  mounted() {
    this.getUserLevelInfo();
    this.getLevelDetails();
    this.getlevelRebates_gameType();
  },

  methods: {
    getUserLevelInfo() {
      userInfogetLevelInfo().then((res) => {
        this.userLevelInfo = res.data.levelInfo;
        this.selectedVIP = res.data.levelInfo.userLevel;
        this.setProgressValue(res.data.levelInfo.userLevel);
      });
    },

    async getLevelDetails() {
      let url = state.jsonUrl + state.jsons.levelInfo;
      await getJsonXq(url).then((res) => {
        this.levelDetails = res.data.datas;
      });
    },

    setProgressValue(index) {
      switch (index) {
        case 0:
          this.progress = 0;
          break;
        case 1:
          this.progress = 1.15;
          break;
        case 2:
          this.progress = 2.15;
          break;
        case 3:
          this.progress = 3.15;
          break;
        case 4:
          this.progress = 4.1;
          break;
        case 5:
          this.progress = 5;
          break;
        case 6:
          this.progress = 5.95;
          break;
        case 7:
          this.progress = 6.9;
          break;
        case 8:
          this.progress = 7.85;
          break;
        case 9:
          this.progress = 8.8;
          break;
        case 10:
          this.progress = 10;
          break;
        default:
          this.progress = 10;
      }
      this.selectedVIP = index;
    },

    getExclusiveValue(index) {
      const permissions =
        this.levelDetails?.levelPermissions?.[this.selectedVIP];
      if (permissions) {
        switch (index) {
          case 0:
            return permissions.dayWithdrawNum;
          case 1:
            return permissions.dayWithdrawAmt;
          case 2:
            return permissions.upBonus;
          case 3:
            return permissions.birthdayAmt;
          case 4:
            return permissions.moonFreeAmt;
          default:
            return null;
        }
      }
    },
    getPromotionValue(index) {
      const permissions =
        this.levelDetails.levelDiscounts?.discountData?.[this.selectedVIP];
      if (permissions) {
        switch (index) {
          case 0:
            return permissions.minApplyAmount;
          case 1:
            return parseInt(permissions.bonusRatio * 100) + "%";
          case 2:
            return permissions.maxBonusAmount;
          case 3:
            return permissions.validMulti;
          case 4:
            return store.state.status.applyLimit[permissions.applyLimit];
          default:
            return null;
        }
      }
    },
    getlevelRebates_gameType() {
      let levelRebates_gameTypeLis1 = [];
      let getlevelRebates_gameType = state.appIndex;
      getlevelRebates_gameType.forEach((element) => {
        element.platforms.forEach((el) => {
          levelRebates_gameTypeLis1.push(el);
        });
      });
      this.levelRebates_gameType = levelRebates_gameTypeLis1;
    },
    sqhd() {
      if (this.value === "" || Number(this.biNam) <= 0) {
        this.$codes(state.en.alerts.no_money, 2);
        return;
      }
      if (this.selectedVIP > 0) {
        activityApplyapplyActivity(
          this.levelDetails.levelDiscounts.activityId,
          this.levelDetails.levelDiscounts?.discountData[this.selectedVIP]
            .activityAwardId,
          this.levelRebates_gameType[this.value].uniqueCode,
          this.biNam
        ).then((res) => {
          if (res.code === 0) {
            this.$codes(state.codes[res.code], 1);
            this.biNam = "";
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      } else {
        this.$codes(state.en.alerts.level_requirements, 2);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.vip {
  display: flex;
  gap: 20px;
  color: #304258;
  letter-spacing: -0.5px;
  font-size: 14px;
  .vip_content {
    width: 800px;
    min-height: 874px;
    border-radius: 20px;
    background: #ececec;
    box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 26px;
    .current_level {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      margin-top: 70px;
      height: 80px;
      background: linear-gradient(
        90deg,
        #95aaba -3.27%,
        rgba(236, 236, 236, 0) 133.88%
      );
      .level_info {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-left: 64px;
        img {
          height: 72px;
        }
        .level_content {
          display: flex;
          flex-direction: column;
          color: #656565;
        }
      }
      button {
        border-radius: 50px;
        background: #b53d1e;
        box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
        padding: 14px;
        color: white;
        border: none;
        cursor: pointer;
      }
    }
    .vip_progress {
      margin: 0 40px;
      .vip_list {
        display: flex;
        align-items: center;
        gap: 40px;
        padding: 10px 0;
        div {
          cursor: pointer;
          white-space: nowrap;
        }
      }
    }
    .dep_amount {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 6px;
      font-size: 12px;
      letter-spacing: -0.5px;
      span {
        color: #8098b6;
      }
    }
    .vip_exclusive {
      border-radius: 20px;
      background: #ececec;
      box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
      padding: 10px 32px;
      margin: 0 16px;
      .exclusive_title {
        font-weight: bold;
      }
      .exclusives {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 13px;
        .exclusive {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
      }
    }
    .vip_promotions {
      padding: 0 34px;
      .stats {
        display: flex;
        align-items: center;
        padding: 15px;
        .stat {
          border-right: 1px solid #647182;
          text-align: center;
          padding: 0 34px;
        }
        .stat_noborder {
          border: none;
        }
      }
    }
    .vip_venue {
      padding: 0 34px;
      .venue {
        display: flex;
        gap: 16px;
        padding: 16px;
        input {
          width: 364px;
          height: 45px;
          outline: none;
          border: none;
          flex-shrink: 0;
          border-radius: 10px;
          background: #bdc1c7;
          padding: 20px;
          &:focus {
            background-color: white;
          }
        }
        .venue_info {
          display: flex;
          align-items: center;
          gap: 13px;
          color: #6f839b;
          margin-top: 12px;
          img {
            height: 25px;
          }
        }
      }
      button {
        width: 300px;
        height: 38px;
        flex-shrink: 0;
        border-radius: 10px;
        background: #656565;
        border: none;
        margin: 50px 200px;
        cursor: pointer;
        color: white;
      }
      .btn_bg {
        background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
      }
    }
  }
  .vip_info {
    width: 331px;
    border-radius: 20px;
    background: #ececec;
    box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .title {
      color: #9c200d;
      font-weight: bold;
    }
    .vips {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 11px;
    }
    .vip_required {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      .vip_name {
        font-weight: bold;
      }
      .vip_text {
        font-size: 12px;
      }
      img {
        height: 45px;
      }
    }
  }
}
</style>
