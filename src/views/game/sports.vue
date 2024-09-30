<template>
  <div class="game_bg">
    <div class="game_container">
      <div class="game_text">
        <div class="game_title">{{ $en("games.sports") }}</div>
        <h1 style="font-size: 88px; font-weight: bold">体育游戏</h1>
        <div style="font-size: 14px; font-weight: bold; width: 518px">
          {{ $en("games.sports_text") }}
        </div>
        <img
          src="../../assets/image/sports/sportsSponsors.png"
          style="max-width: 454px; max-height: 94px; margin-left: -16px"
          :alt="$en('games.sports_text')"
        />
        <div
          class="game_types"
          v-for="(item, index) in $store.state.appIndex"
          :key="index"
          v-show="item.gameType == 1"
        >
          <button
            v-for="(game, n) in item.platforms"
            :key="n"
            @click="
              $goGame(game, n);
              $store.state.unique = game.uniqueCode;
            "
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
      <img class="char" src="../../assets/image/sports/sportsChar.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PCXLGameSports",

  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.game_bg {
  background-image: url("../../assets/games/game1.png");
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
  right: 0;
  height: 100%;
  z-index: 1;
}
</style>
