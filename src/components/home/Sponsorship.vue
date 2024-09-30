<template>
  <div class="sponsorship">
    <img
      src="../../assets/image/pageBorderTop.png"
      style="max-width: 100%; max-height: 1032px; margin-top: 500px"
    />
    <div class="sponsorship_text_bg">
      <div class="text_blur">{{ $en("home.sponsorship") }}</div>
      <div class="text">{{ $en("home.sponsorship") }}</div>
    </div>
    <img
      src="../../assets/image/home/sponsorship/players.jpg"
      style="max-width: 100%"
    />
    <img
      src="../../assets/image/home/sponsorship/playerBanner.png"
      width="1248px"
      height="284px"
      style="margin-top: -200px"
    />
    <div class="sponsorship_description">
      {{ $en("home.xunli_info1") }}
      <br />
      <br />
      {{ $en("home.xunli_info2") }}
    </div>
    <img
      src="../../assets/image/home/sponsorship/partners.png"
      width="956px"
      height="144px"
    />
    <button @click="open()">{{ $en("home.partner_btn") }}</button>
    <div style="color: #858585;margin-top: -40px;">{{ $en("home.link") }}</div>
  </div>
</template>

<script>
export default {
  name: "PCXLGameSponsorship",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    open() {
      window.open("https://www.juventus.com/cn");
    },
  },
};
</script>

<style lang="scss" scoped>
.sponsorship {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../../assets/image/home/sponsorship/sponsorshipBg.png");
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  margin-top: -450px;
  .sponsorship_text_bg {
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
  .sponsorship_description {
    font-weight: bold;
    text-align: center;
    width: 70%;
  }
  button {
    background: url("../../assets/image/home/partenerBtnbg.png");
    background-size: 100% 100%;
    color: white;
    width: 257.109px;
    height: 52.008px;
    flex-shrink: 0;
    border: none;
    cursor: pointer;
  }
}
</style>
