<template>
  <div class="services">
    <div class="services_text_bg">
      <div class="text_blur">{{ $en("home.excellent_services") }}</div>
      <div class="text">{{ $en("home.excellent_services") }}</div>
    </div>
    <img
      src="../../assets/image/home/border.png"
      style="max-width: 760px; height: 78px; margin-top: 50px"
    />
    <div class="title">
      {{ $en("home.services_text") }}
    </div>
    <div class="services_container">
      <div class="service" v-for="(service, index) in services" :key="index">
        <img :src="service.icon" style="max-width: 260px; max-height: 254px" />
        <div style="font-weight: bold">{{ service.title }}</div>
        <div style="font-size: 14px">{{ service.text }}</div>
      </div>
    </div>
    <div class="experties">
      <div class="experty" v-for="(experty, index) in experties" :key="index">
        <img :src="experty.icon" style="max-width: 164px; max-height: 142px" />
        <div class="experty_content">
          <div style="font-weight: bold">{{ experty.title }}</div>
          <div style="font-size: 14px">
            {{ experty.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import state from "@/store/state";

export default {
  name: "PCXLGameServices",

  data() {
    return {
      services: [
        {
          icon: require("../../assets/image/home/services/depositTime.png"),
          title: state.en.home.service1,
          text: "AVERAGE TIME OF DEPOSIT",
        },
        {
          icon: require("../../assets/image/home/services/cooperativePayment.png"),
          title: state.en.home.service2,
          text: "PAYMENT PLATFORM PARTNERS",
        },
        {
          icon: require("../../assets/image/home/services/withdrawalTime.png"),
          title: state.en.home.service3,
          text: "AVERAGE TIME OF WITHDRAW",
        },
        {
          icon: require("../../assets/image/home/services/gamingPlatform.png"),
          title: state.en.home.service4,
          text: "GAMING PROVIDER PARTNERS",
        },
      ],
      experties: [
        {
          icon: require("../../assets/image/home/services/fastDeposit.png"),
          title: state.en.home.experty1,
          description: state.en.home.experty1_description,
        },
        {
          icon: require("../../assets/image/home/services/massiveEvent.png"),
          title: state.en.home.experty2,
          description: state.en.home.experty2_description,
        },
        {
          icon: require("../../assets/image/home/services/securityManagement.png"),
          title: state.en.home.experty3,
          description: state.en.home.experty3_description,
        },
        {
          icon: require("../../assets/image/home/services/terminals.png"),
          title: state.en.home.experty4,
          description: state.en.home.experty4_description,
        },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.services {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .services_text_bg {
    font-weight: bold;
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
  .title {
    color: #304258;
    font-weight: bold;
    margin-top: -60px;
  }
  .services_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40px 0;
    gap: 120px;
    .service {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
  }
  .experties {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    .experty {
      display: flex;
      align-items: center;
      gap: 6px;
      width: 666px;
      height: 162px;
      .experty_content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }
  }
}
</style>
