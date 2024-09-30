<template>
  <div class="xunli_info">
    <div class="contact_container">
      <div class="contact" v-for="(item, index) in about" :key="index">
        <div class="contact_info">
          <div class="contact_name">
            <img :src="icons[index]" />
            <div style="width: 50px">{{ item.contactName }}</div>
          </div>
          <div>{{ item.contactInfo }}</div>
        </div>
        <button @click="$copyFx(item.contactInfo)">
          {{ $en("discount.copy") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PCXLGameContactUs",

  data() {
    return {
      icons: [
        require("../../assets/image/emailIcon.png"),
        require("../../assets/image/telegramIcon.png"),
        require("../../assets/image/skypeIcon.png"),
      ],
    };
  },

  mounted() {},
  created() {
    this.about = JSON.parse(
      localStorage.getItem("staticResources")
    ).contactUsInfo;
    this.urls = JSON.parse(localStorage.getItem("JsonList")).iconUrl[0];
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.contact_container {
  width: 1296px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #ececec;
  box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}
.contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #304258;
  padding: 0 60px;
  font-size: 15px;
  height: 78px;

  .contact_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 110px;
    .contact_name {
      display: flex;
      font-weight: bold;
      gap: 12px;
      img {
        height: 24px;
      }
    }
  }
  button {
    border-radius: 15.365px;
    background: #de2828;
    padding: 5px 24px;
    border: none;
    cursor: pointer;
    color: white;
  }
}
.contact:nth-child(even) {
  background-color: #d9d9d9;
}
</style>
