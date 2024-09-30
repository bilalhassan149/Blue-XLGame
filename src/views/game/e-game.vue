<template>
  <div class="game_bg">
    <div class="game_container">
      <div class="game_text">
        <div class="game_title">{{ $en("games.e-games") }}</div>
        <h1 style="font-size: 88px; font-weight: bold">电子竞技</h1>
        <div style="font-size: 14px; font-weight: bold; width: 520px">
          {{ $en("games.e-games_text") }}
        </div>
        <img
        :alt="$en('games.e-games_text')"
          src="../../assets/image/e-game/eGameSponsors.png"
          style="max-width: 788px; max-height: 86px"
        />
        <div
          class="game_types"
          v-for="(item, index) in $store.state.appIndex"
          :key="index"
          v-show="item.gameType == 2"
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
        style=""
        src="../../assets/image/e-game/eGameChar.png"
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
  background-image: url("../../assets/games/game2.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 904px;
  min-width: 1200px;
  display: flex;
  scale: 1.01;
}
.char {
  position: absolute;
  height: 100%;
  z-index: 1;
  top: 20px;
  right: -50px;
}
</style>
