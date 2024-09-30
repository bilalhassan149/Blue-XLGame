<template>
  <div class="game_bg">
    <div class="game_container">
      <div class="game_text">
        <div class="game_title">{{ $en("games.dice") }}</div>
        <h1 style="font-size: 88px; font-weight: bold">在线真人</h1>
        <div style="font-size: 14px; font-weight: bold; width: 522px">
          {{ $en("games.dice_text") }}
        </div>
        <img
          :alt="$en('games.dice_text')"
          src="../../assets/image/realdice/realDiceSponsors.png"
          style="max-height: 72px; object-fit: cover"
        />
        <div
          class="game_types"
          v-for="(item, index) in $store.state.appIndex"
          :key="index"
          v-show="item.gameType == 3"
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
      <img class="char" src="../../assets/image/realdice/realDiceChar.png" />
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
  background-image: url("../../assets/games/game3.png");
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
  right: 180px;
  height: 100%;
}
</style>
