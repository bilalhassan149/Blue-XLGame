<!-- 提示 -->
<template>
  <div>
    <!--------------------------------ALerts----------------------------------------->
    <!-- :class="$store.state.alertVal == 0 ? 's' : ''" -->
    <div
      class="alert-main_02 alert-BG s1 alert_bg"
      :class="$store.state.alertVal == 0 ? 's' : ''"
    >
      <img class="image3" src="../assets/image/alert/alert.png" />
      <div class="font- font-alert">
        {{ $store.state.alertContent }}
      </div>
    </div>
    <!--------------------------------SUCCESS----------------------------------------->
    <div
      class="alert-main_02 alert-BG success_bg"
      :class="$store.state.alertVal == 1 ? 's' : ''"
    >
      <img class="image" src="../assets/image/alert/yes.png" mode="widthFix" />
      <div class="font- font-alert">
        {{ $store.state.alertContent }}
      </div>
    </div>
    <!--------------------------------ERROR----------------------------------------->
    <div
      class="alert-main_02 alert-BG s2 error_bg"
      :class="$store.state.alertVal == 2 ? 's' : ''"
    >
      <img class="image2" src="../assets/image/alert/no.png" mode="widthFix" />
      <div class="font- font-alert">{{ $store.state.alertContent }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    closeAlert() {
      this.$store.state.alertVal = 99; // Set the alertVal to null to hide the alert
    },
  },
};
</script>
<style scoped>
.alert-main_02 {
  position: fixed;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
  min-height: 122px;
  min-width: 550px;
  max-width: 800px;
  margin: 0 auto;
  transition: all ease-out 1s;
  border-radius: 30px;
  color: #d9d9d9;
  overflow: hidden;
  box-shadow: 1px 5px 4px rgba(135, 135, 135, 0.3);
  opacity: 0.94;
  padding: 0 40px;
}
.alert-main_02.s {
  top: 13%;
}

.font- {
  font-size: 15px;
  font-family: Microsoft YaHei UI;
  align-items: center;
  display: flex;
  justify-content: center;
  flex: 4;
  line-height: 30px;
  padding: 30px 10px 40px 2px;
  margin-right: 30px;
  position: relative;
}
.alert-BG {
  display: flex;
  align-items: center;
  box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.58);
  gap: 36px;
  z-index: 10003;
}
.success_bg {
  background: linear-gradient(64deg, #1a1c2b 49.57%, #96ff44 258.68%);
}
.alert_bg {
  background: linear-gradient(64deg, #1a1c2b 49.57%, #fff6d4 269.88%);
}
.error_bg {
  background: linear-gradient(64deg, #1a1c2b 49.57%, #c91d05 269.88%);
}
img {
  height: 50px;
}
</style>
