<template>
  <div>
    <div class="game_container" v-if="!$route.query.code">
      <div class="game_text">
        <div class="game_title">{{ $en("games.sports") }}</div>
        <div style="font-size: 50px">ELECTRONICS</div>
        <div style="font-size: 20px; width: 518px; color: black">
          {{ $en("games.sports_text") }}
        </div>
        <img
          src="../../assets/image/electronics/electronicsSponsors.png"
          style="height: 60px;width: 390px;"
          :alt="$en('games.sports_text')"
        />
        <div
          class="game_types"
          v-for="(item, index) in $store.state.appIndex"
          :key="index"
          v-show="item.gameType == 5"
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
      <img class="char" src="../../assets/image/electronics/electronicsChar.png" />
    </div>
    <div class="games view_width" v-if="$route.query.code">
      <img class="cover" src="../../assets/image/electronics/gamesCover.jpg" />
      <div class="inner">
        <div class="games_container">
          <div
            class="game"
            v-for="(item, index) in $store.state.gameList"
            :key="index"
          >
            <img :src="$store.state.iconUrl + item.iconUrl" />
            <div>{{ item.gameNameCN }}</div>
            <div class="show_options">
              <button
                class="play_btn"
                @click="
                  getgameLoginpcHallGameLogin(
                    item.gameCode,
                    item.hallUniqueCode
                  )
                "
              >
                {{ $en("games.enter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gameLoginpcHallGameLogin } from "@/api/galApi";
import state from "@/store/state";

export default {
  name: "PCXLGameElectronicGames",

  data() {
    return {
      uCode: "",
    };
  },
  methods: {
    getgameLoginpcHallGameLogin(gameCode, hallUniqueCode) {
      gameLoginpcHallGameLogin(gameCode, hallUniqueCode).then((res) => {
        if (res.code == 0) {
          if (res.data.hallGameUrl) {
            localStorage.setItem("ifrUrl", res.data.hallGameUrl);
            this.$router.push("/ifr");
          }
        } else {
          this.$codes(state.codes[res.code], 0);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.char {
  position: absolute;
  top: 0;
  right: 150px;
  height: 100%;
  z-index: 1;
}
.games {
  // background-image: url("../../assets/image/electronics/gamesBg.jpg");
  // background-size: cover;
  // height: 904px;
  .cover {
    height: 802px;
    width: 100%;
  }
  .inner {
    width: 1296px;
    height: 424px;
    flex-shrink: 0;
    border-radius: 30px;
    background: #B5C3D5;
    box-shadow: 0px 0px 14px 0px #B5C3D5;
    margin: 32px auto;
    padding: 18px 32px;
  }
  .games_container {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    gap: 20px;
    overflow-y: scroll;

    .game {
      color: #304258;
      font-weight: bold;
      text-align: center;
      position: relative;
      img {
        width: 224.214px;
        height: 146px;
        flex-shrink: 0;
        border-radius: 20px;
        margin-bottom: 10px;
      }
      &:hover .show_options {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        width: 225px;
        height: 146px;
        border-radius: 20px;
        backdrop-filter: blur(7.5px);
      }
      .show_options {
        display: none;

        button {
          width: 126px;
          height: 39px;
          flex-shrink: 0;
          border-radius: 10px;
          background: linear-gradient(180deg, #6F97CE 6.79%, #2C3F5D 95.07%);
          font-size: 14px;
          color: #fff;
          border: none;
          cursor: pointer;
        }
        .try_btn {
          background: #bdc1c7;
          color: #304258;
        }
      }
    }
  }
}
</style>
