<template>
  <div class="game_bg">
    <div class="game_container">
      <div class="game_text">
        <div class="game_title">{{ $en("games.lottery") }}</div>
        <h1 style="font-size: 88px; font-weight: bold">彩票</h1>
        <div style="font-size: 14px; font-weight: bold; width: 550px">
          {{ $en("games.lottery_text") }}
        </div>
        <img
          src="../../assets/image/lottery/lotterySponsors.png"
          style="max-width: 488px; max-height: 92px"
        />
        <div
          class="game_types"
          v-for="(item, index) in $store.state.appIndex"
          :key="index"
          v-show="item.gameType == 6"
        >
          <button
            v-for="(game, n) in item.platforms"
            :key="n"
            @click="$goGame(game, n)"
          >
            <img
              class="gameLogo"
              :src="
                $store.state.iconUrl +
                $store.state.static.gameIcon[game.uniqueCode]
              "
            />
            <div>{{ game.platformName }}</div>
          </button>
        </div>
      </div>
      <img
        class="char"
        style="right: 400px"
        src="../../assets/image/lottery/lotteryChar.png"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.game_bg {
  background-image: url("../../assets/games/game6.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 904px;
  min-width: 1200px;
  display: flex;
  scale: 1.01;
}
.char {
  position: absolute;
  top: 0;
  right: 400px;
  height: 100%;
}
</style>
