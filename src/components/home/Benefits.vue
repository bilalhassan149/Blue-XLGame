<template>
  <div class="benefits">
    <div class="benefit" v-for="(benefit, index) in benefits" :key="index">
      <img :src="benefit.icon" />
      <div>
        <div class="name">
          {{ benefit.name }}
        </div>
        <div>{{ benefit.attribute }}</div>
        <div>{{ benefit.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import state from "@/store/state";

export default {
  name: "PCXLGameBenefits",

  data() {
    return {
      benefits: [
        {
          icon: require("../../assets/icons/safer.svg"),
          name: state.en.home.benefit1,
          attribute: state.en.home.benefit1_description,
          text: state.en.home.benefit1_text,
        },
        {
          icon: require("../../assets/icons/stable.svg"),
          name: state.en.home.benefit2,
          attribute: state.en.home.benefit2_description,
          text: state.en.home.benefit2_text,
        },
        {
          icon: require("../../assets/icons/richer.svg"),
          name: state.en.home.benefit3,
          attribute: state.en.home.benefit3_description,
          text: state.en.home.benefit3_text,
        },
        {
          icon: require("../../assets/icons/private.svg"),
          name: state.en.home.benefit4,
          attribute: state.en.home.benefit4_description,
          text: state.en.home.benefit4_text,
        },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.benefits {
  display: flex;
  align-items: center;
  gap: 25px;
  .benefit {
    display: flex;
    align-items: center;
    gap: 22px;
  }
  .name {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
