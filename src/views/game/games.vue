<template>
  <div>
    <div v-if="!$route.query.code" class="game_bg">
      <div class="game_container">
        <div class="game_text">
          <h1 class="game_title">{{ $en("games.electronics") }}</h1>
          <div style="font-size: 88px; font-weight: bold">电子娱乐厅</div>
          <div style="font-size: 14px; font-weight: bold; width: 522px">
            {{ $en("games.electronics_text") }}
          </div>
          <img
            src="../../assets/image/electronics/electronicsSponsors.png"
            style="max-width: 600px; max-height: 72px"
          />
          <div
            class="game_types"
            v-for="(item, index) in $store.state.appIndex"
            :key="index"
            v-show="item.gameType == 5"
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
          src="../../assets/image/electronics/electronicsChar.png"
        />
      </div>
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
.game_bg {
  background-image: url("../../assets/games/game5.png");
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
  right: 80px;
  top: 50px;
  // z-index: -1;
}
.games {
  background-image: url("../../assets/image/electronics/gamesBg.jpg");
  background-size: cover;
  height: 904px;
  .cover {
    height: 430px;
  }
  .inner {
    width: 1296px;
    height: 424px;
    flex-shrink: 0;
    border-radius: 30px;
    background: rgba(236, 236, 236, 0.55);
    box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    margin-top: 20px;
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
          background: #b53d1e;
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
