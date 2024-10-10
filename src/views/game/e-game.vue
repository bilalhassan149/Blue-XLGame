<template>
  <div class="game_container">
    <div class="game_text">
      <div class="game_title">{{ $en("games.e-games") }}</div>
      <div style="font-size: 50px">ESPORTS</div>
      <div style="font-size: 20px; width: 518px; color: black">
        {{ $en("games.sports_text") }}
      </div>
      <img
        src="../../assets/image/e-game/eGameSponsors.png"
        style="height: 60px; width: 350px"
        :alt="$en('games.sports_text')"
      />
      <div
        class="game_types"
        v-for="(item, index) in $store.state.appIndex"
        :key="index"
        v-show="item.gameType == 2"
      >
        <button
          class="blendScreen"
          v-for="(game, n) in item.platforms"
          :key="n"
          :style="
            uCode == game
              ? {
                  'box-shadow': '0px 0px 14px 0px #408cff',
                  color: '#408cff',
                }
              : {}
          "
          @click="
            uCode = game;
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
      <div class="enter_now_btn" @click="$goGame(uCode)">进入游戏</div>
    </div>
    <img class="char" src="../../assets/image/e-game/eGameChar.png" />
  </div>
</template>

<script>
export default {
  name: "PCXLGameSports",

  data() {
    return {
      uCode: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.char {
  position: absolute;
  top: 0;
  right: 150px;
  height: 100%;
  z-index: 1;
}
</style>
