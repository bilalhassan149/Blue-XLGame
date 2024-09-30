<template>
  <div class="game_bg">
    <div class="game_container">
      <div class="game_text">
        <h1 class="game_title">{{ $en("games.chess") }}</h1>
        <div style="font-size: 88px; font-weight: bold">棋牌游戏</div>
        <div style="font-size: 14px; font-weight: bold; width: 500px">
          {{ $en("games.chess_text") }}
        </div>
        <img
          src="../../assets/image/chess/chessSponsors.png"
          style="max-width: 744px; max-height: 88px"
        />
        <div
          class="game_types"
          v-for="(item, index) in $store.state.appIndex"
          :key="index"
          v-show="item.gameType == 4"
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
      <!-- img -->
      <img class="char" src="../../assets/image/chess/chessChar.png" />
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
  background-image: url("../../assets/games/game4.png");
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
  right: 80px;
  height: 100%;
}
</style>
