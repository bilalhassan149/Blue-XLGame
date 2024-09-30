<template>
  <div class="view_width">
    <Carousel />
    <div class="landing_page">
      <Advertisement />
      <div class="topgames">
        <img
          src="../assets/image/home/topGamesChar.png"
          style="max-width: 720px; max-height: 788px"
        />
        <div class="shadow"></div>
      </div>
      <Games />
      <Services />
      <Sponsorship />
      <Trophies />
      <div class="industory_text">{{ $en("home.best_industory") }}</div>
      <img
        src="../assets/image/home/mobileView.png"
        style="max-width: 1312px; max-height: 1318px"
      />
      <img
        src="../assets/image/home/morganite.png"
        style="max-width: 880px; margin-top: -150px"
      />
      <div style="font-size: 24px; line-height: 24px">
        {{ $en("home.native_text") }}
      </div>
      <Benefits style="margin-bottom: 50px" />
    </div>
  </div>
</template>

<script>
import Carousel from "../components/home/Carousel.vue";
import Trophies from "../components/home/Trophies.vue";
import Benefits from "../components/home/Benefits.vue";
import Sponsorship from "../components/home/Sponsorship.vue";
import Services from "../components/home/Services.vue";
import Advertisement from "../components/home/Advertisement.vue";
import Games from "../components/home/Games.vue";

export default {
  name: "homePage",

  data() {
    return {};
  },
  components: {
    Carousel,
    Games,
    Trophies,
    Benefits,
    Sponsorship,
    Services,
    Advertisement,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.landing_page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  color: #304258;
  background-color: white;
  .topgames {
    background-image: url("../assets/image/home/topGamesBg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 600px;
    .shadow {
      width: 1065px;
      height: 59px;
      flex-shrink: 0;
      border-radius: 1065px;
      opacity: 0.6;
      background: radial-gradient(
        5117.92% 745.08% at 60.33% 50.85%,
        #000 0%,
        rgba(0, 0, 0, 0) 100%
      );
      filter: blur(48px);
    }
  }
  .industory_text {
    font-size: 40px;
    font-weight: bold;
    border-bottom: 4px dashed #304258;
    padding: 0px 10px 10px 10px;
  }
}
</style>
