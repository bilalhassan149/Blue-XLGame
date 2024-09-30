<template>
  <div class="view_width">
    <div class="vip_banner">
      <div class="banner_text">
        <div
          style="
            font-size: 70px;
            line-height: 70px;
            color: #d9d9d9;
            font-weight: bold;
          "
        >
          {{ $en("vip.vip_title") }}
        </div>
        <div style="font-size: 30px; line-height: 40px; color: white">
          {{ $en("vip.vip_text") }}
        </div>
        <div>{{ $en("vip.vip_member") }}</div>
      </div>
    </div>
    <div class="vip_Cards">
      <img
        src="../assets/image/vip/vipCardLeft.png"
        style="
          max-width: 1245px;
          max-height: 1366px;
          position: absolute;
          left: -450px;
          top: -350px;
        "
      />
      <div class="cards" v-if="levelInfo.levelRecords">
        <el-carousel
          :interval="4000"
          type="card"
          height="350px"
          arrow="never"
          indicator-position="none"
          :autoplay="false"
          @change="handleCarouselChange"
        >
          <el-carousel-item
            v-for="(item, index) in levelInfo.levelRecords"
            :key="index"
          >
            <div class="card">
              <img src="../assets/image/vip/vipPointIcon.png" />
              <div class="vipcard_text">
                <div>
                  <div>{{ $en("vip.vipcard_text1") }}</div>
                  <div>{{ item.upgradeRecharge }}</div>
                </div>
                <div>
                  <div>{{ $en("vip.vipcard_text2") }}</div>
                  <div>{{ item.upgradeValid }}</div>
                </div>
                <div>
                  <div>{{ $en("vip.vipcard_text3") }}</div>
                  <div>{{ item.relegationValid }}</div>
                </div>
              </div>
            </div>
            <div class="pointIcon">
              <img :src="vipPoints[index].vipLogo" />
              <div>VIP {{ index }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="vip_catagories">
          <div
            class="vip_catagory"
            v-for="(catagory, index) in vipCatagories"
            :key="index"
          >
            <img
              :src="catagory.icon"
              style="max-width: 142px; max-height: 142px"
            />
            <div style="font-size: 20px; line-height: 20px; font-weight: bold">
              {{ catagory.title }}
            </div>
            <div class="catagory_content" v-if="levelInfo.levelPermissions">
              <div style="font-weight: bold">
                {{
                  index === 0
                    ? levelInfo.levelPermissions[vipsIndex].upBonus
                    : index === 1
                    ? levelInfo.levelPermissions[vipsIndex].moonFreeAmt
                    : index === 2
                    ? levelInfo.levelPermissions[vipsIndex].birthdayAmt
                    : index === 3
                    ? levelInfo.levelPermissions[vipsIndex].dayWithdrawAmt
                    : ""
                }}
              </div>
              <div>{{ catagory.benefit }}</div>
            </div>
          </div>
        </div>
      </div>
      <img
        src="../assets/image/vip/vipCardRight.png"
        style="
          max-width: 560px;
          max-height: 300px;
          position: absolute;
          right: -60px;
          top: -150px;
        "
      />
    </div>
    <div class="vip_tables">
      <div>
        <div style="font-weight: bold">
          <div class="return_blurtext">{{ $en("vip.vip_return_rate") }}</div>
          <div class="return_text">{{ $en("vip.vip_return_rate") }}</div>
        </div>
        <div style="margin: 40px 0" v-if="levelInfo.levelRebates">
          <table>
            <tr>
              <th style="border-radius: 15px 0 0 0">
                {{ $en("user.vip_rebate") }}
              </th>
              <td
                style="background: #bdc1c7; font-weight: bold"
                v-for="(n, i) in 11"
                :key="i"
                :style="{
                  borderRadius: i === n.length - 1 ? '0 15px 0 0' : '',
                }"
              >
                VIP {{ n - 1 }}
              </td>
            </tr>
            <tr
              v-for="(n, i) in levelInfo.levelRebates[0].platformRebates"
              :key="i"
            >
              <th style="background: transparent">{{ n.platformName }}</th>
              <td v-for="(item, index) in levelInfo.levelRebates" :key="index">
                {{
                  ((item.platformRebates[i].rebateRatio * 10000) / 100).toFixed(
                    2
                  )
                }}%
              </td>
            </tr>
          </table>
          <div style="font-weight: bold; font-size: 14px; margin: 40px 0">
            {{ $en("vip.note") }}
          </div>
        </div>
      </div>
      <img
        src="../assets/image/vip/tableRight.png"
        style="
          max-width: 1784px;
          max-height: 1050px;
          margin: -780px 0px 0px 1170px;
          z-index: -10;
        "
      />
      <img
        src="../assets/image/vip/tableLeft.png"
        style="max-width: 960px; max-height: 760px; margin: -367px 0 0 -1000px"
      />
      <div style="margin-top: -545px">
        <div style="font-weight: bold">
          <div class="return_blurtext">{{ $en("vip.vip_Withdraw_limit") }}</div>
          <div class="return_text">{{ $en("vip.vip_Withdraw_limit") }}</div>
        </div>
        <div style="margin: 40px 0">
          <table>
            <tr>
              <th style="border-radius: 15px 0 0 0">
                {{ $en("user.withdrawal") }}
              </th>
              <td
                style="background: #bdc1c7; font-weight: bold"
                v-for="(n, i) in 11"
                :key="i"
              >
                VIP {{ n - 1 }}
              </td>
            </tr>
            <tr>
              <th style="background: transparent">
                {{ $en("vip.dail_withdrawals") }}
              </th>
              <td v-for="(item, i) in levelInfo.levelPermissions" :key="i">
                {{ item.dayWithdrawNum }}
              </td>
            </tr>
            <tr>
              <th style="border-radius: 0 0 0 15px; background: transparent">
                {{ $en("vip.withdrawals_limit") }}
              </th>
              <td v-for="(item, i) in levelInfo.levelPermissions" :key="i">
                {{ item.dayWithdrawAmt / 10000 }}万
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div style="margin-top: 90px">
        <div style="font-weight: bold">
          <div class="return_blurtext">{{ $en("vip.vip_event_rule") }}</div>
          <div class="return_text">{{ $en("vip.vip_event_rule") }}</div>
        </div>
        <div class="rules_Cards shadow">
          <div
            v-for="(rule, index) in rules"
            :key="index"
            style="margin: 24px 0"
          >
            <div style="font-weight: bold">
              {{ index + 1 }}. {{ rule.name }}
            </div>
            <div style="font-size: 14px; margin: 4px 0 4px 16px">
              {{ rule.description }}
            </div>
          </div>
        </div>
        <div style="text-align: left; margin: 40px">
          <div style="font-weight: bold; font-size: 14px; margin: 40px 0">
            {{ $en("vip.xunli_rights") }}
            <div style="margin: 12px 0">
              <span> {{ $en("vip.remarks") }} : </span>
              <span style="color: #c01c05">{{ $en("vip.remarks_text") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getJsonXq } from "@/api/galApi";
import state from "@/store/state";

export default {
  name: "vipView",
  data() {
    return {
      vipPoints: [
        {
          vipLogo: require("../assets/image/vip/vip0.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip1.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip2.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip3.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip4.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip5.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip6.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip7.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip8.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip9.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip10.png"),
        },
      ],
      vipCatagories: [
        {
          icon: require("../assets/image/vip/upgrade.png"),
          title: state.en.vip.upgrade,
          benefit: state.en.vip.upgrade_text,
        },
        {
          icon: require("../assets/image/vip/vipWeekly.png"),
          title: state.en.vip.weekly,
          benefit: state.en.vip.weekly_text,
        },
        {
          icon: require("../assets/image/vip/birthday.png"),
          title: state.en.vip.birthday,
          benefit: "",
        },
        {
          icon: require("../assets/image/vip/daily.png"),
          title: state.en.vip.daily,
          benefit: state.en.vip.daily_text,
        },
      ],
      rules: [
        {
          name: state.en.vip.rule1,
          description: state.en.vip.rule1_text,
        },
        {
          name: state.en.vip.rule2,
          description: state.en.vip.rule2_text,
        },
        {
          name: state.en.vip.rule3,
          description: state.en.vip.rule3_text,
        },
        {
          name: state.en.vip.rule4,
          description: state.en.vip.rule4_text,
        },
        {
          name: state.en.vip.rule5,
          description: state.en.vip.rule5_text,
        },
        {
          name: state.en.vip.rule6,
          description: state.en.vip.rule6_text,
        },
        {
          name: state.en.vip.rule7,
          description: state.en.vip.rule7_text,
        },
        {
          name: state.en.vip.rule8,
          description: state.en.vip.rule8_text,
        },
      ],
      levelInfo: [],
      vipsIndex: 0,
    };
  },
  beforeMount() {
    this.getVips();
  },
  methods: {
    handleCarouselChange(index) {
      this.vipsIndex = index;
    },
    getVips() {
      getJsonXq(state.jsonUrl + state.jsons.levelInfo).then((res) => {
        this.levelInfo = res.data.datas;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 1300px;
  background-color: white;
  box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #304258;
  border-collapse: collapse;
  border-radius: 15px;
}

td,
th {
  text-align: center;
  padding: 14px 20px;
}
th {
  background-color: #bdc1c7;
  font-weight: 700;
}
tr:nth-child(odd) {
  background-color: #ececec;
}
tr {
  border-radius: 20px;
}
.shadow {
  box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
}

.vip_banner {
  background-image: url("../assets/games/vip.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 904px;
  color: white;

  .banner_text {
    display: flex;
    flex-direction: column;
    line-height: 1;
    gap: 12px;
    width: 520px;
    margin-left: 370px;
    padding-top: 350px;
  }
}
.vip_Cards {
  position: relative;
  display: flex;
  justify-content: center;
  .cards {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;
  }
  .vip_catagories {
    display: flex;
    gap: 100px;
    margin-top: 50px;
  }
  .vip_catagory {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    .catagory_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
    }
  }
}
.vip_tables {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  .return_blurtext {
    opacity: 0.1;
    filter: blur(6.5px);
    color: #304258;
    font-size: 100px;
  }
  .return_text {
    background: linear-gradient(to top left, #dc2626, #c53030);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 40px;
    margin-top: -90px;
  }
  .rules_Cards {
    border-radius: 20px;
    background-color: #ececec;
    text-align: left;
    padding: 5px 35px;
    max-width: 1296px;
    margin-top: 40px;
    position: relative;
    z-index: -1;
  }
}

.el-carousel__item {
  filter: blur(3.5px);

  .card {
    width: 543px;
    height: 307px;
    flex-shrink: 0;
    border-radius: 20px;
    background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
    padding: 30px;
    display: flex;
    gap: 20px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    img {
      width: 77px;
      height: 244.218px;
      flex-shrink: 0;
    }
  }
  .vipcard_text {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 10px 0;
  }
  .pointIcon {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    color: white;
    width: 202px;
    height: 202px;
    flex-shrink: 0;
    background: linear-gradient(
      90deg,
      #104d7a 0.37%,
      rgba(16, 77, 122, 0) 316.68%
    );
    font-size: 20px;
    font-weight: bold;
    border-radius: 50%;
    position: absolute;
    left: 440px;
    top: 50px;
    padding: 20px;
    img {
      height: 130px;
      object-fit: cover;
    }
  }
}

.el-carousel__item--card.is-active {
  filter: blur(0);
}
</style>
