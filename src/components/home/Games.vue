<template>
  <div class="games">
    <hr />
    <div class="indexes">
      <div
        :class="index === activeIndex ? 'active' : 'inactive'"
        v-for="(item, index) in elecGames"
        :key="index"
        @click="goToCard(index)"
        style="cursor: pointer"
      >
        {{ index + 1 }}
      </div>
    </div>
    <el-carousel
      :interval="4000"
      type="card"
      height="800px"
      @change="handleCarouselChange"
      indicator-position="none"
      arrow="none"
      style="overflow: hidden"
      ref="carousel"
    >
      <el-carousel-item
        v-for="(item, gameIndex) in $store.state.appIndex"
        :key="gameIndex"
      >
        <div class="electronic_text_bg" v-if="gameIndex === activeIndex">
          <div class="text_blur">{{ item.gameTypeName }}</div>
          <div class="text">{{ item.gameTypeName }}</div>
        </div>
        <img
          :src="elecGames[gameIndex].game"
          style="height: 460px; width: 460px; margin-top: 50px"
        />
        <div
          class="game_catagories"
          v-for="(appItem, index) in $store.state.appIndex"
          :key="index"
          v-show="appItem.gameType == gameIndex + 1"
        >
          <div
            class="catagory"
            v-for="(game, n) in appItem.platforms"
            :key="n"
            @click="$goGame(game, n)"
            :style="{ border: elecGames[gameIndex].border }"
          >
            <button :style="{ background: elecGames[gameIndex].gradient }">
              <div>{{ game.platformName }}</div>
            </button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <img
      src="../../assets/image/pageBorderBottom.png"
      style="max-width: 100%; max-height: 730px; margin-top: -500px"
    />
  </div>
</template>

<script>
import state from "@/store/state";

export default {
  name: "PCXLGamegames",

  data() {
    return {
      activeIndex: 0,
      elecGames: [
        {
          game: require("../../assets/image/home/games/game1.png"),
          gameCatagories: ["IM Gaming", "Xunli Sports", "FB Sports"],
          gradient: "linear-gradient(172deg, #C51F2D -39.16%, #94050E 118.59%)",
          border: "1px solid #FF507C",
        },
        {
          game: require("../../assets/image/home/games/game2.png"),
          gradient: "linear-gradient(172deg, #B74300 -39.16%, #482906 118.59%)",
          border: "1px solid #C66A1B",
        },
        {
          game: require("../../assets/image/home/games/game3.png"),
          gradient: "linear-gradient(172deg, #A11C0D -39.16%, #1B1D32 118.59%)",
          border: "1px solid #761C19",
        },
        {
          game: require("../../assets/image/home/games/game5.png"),
          gradient: "linear-gradient(180deg, #C99B1E 0%, #5C2306 100%)",
          border: "1px solid #AD6A28",
        },
        {
          game: require("../../assets/image/home/games/game4.png"),
          gradient: "linear-gradient(180deg, #2F8F9D 0%, #1E2E41 100%)",
          border: "1px solid #2A7584",
        },
        {
          game: require("../../assets/image/home/games/game6.png"),
          gradient: "linear-gradient(180deg, #206E95 0%, #15222A 100%)",
          border: "1px solid #303B42",
        },
      ],
    };
  },

  mounted() {},

  methods: {
    handleCarouselChange(index) {
      this.activeIndex = index;
    },
    goToCard(index) {
      this.$refs.carousel.setActiveItem(index);
    },
    gameFx(game, n) {
      state.unique = game.uniqueCode;

      if (game.platformType == 5 && this.$logins()) {
        this.$router.push({
          path: "/games",
          query: {
            code: game.uniqueCode,
          },
        });
      } else {
        this.$goGame(game, n);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.games {
  width: 100%;
  user-select: none;
  margin-top: 200px;
  .indexes {
    width: 581px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 170px;
    background: #c01c05;
    box-shadow: 2px 2px 9px 0px rgba(249, 68, 47, 0.71);
    margin: 0 auto;
    margin-top: -40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .active {
      color: #fff;

      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.47);
      font-size: 40px;
      font-weight: bold;
    }
    .inactive {
      color: #fff;

      font-size: 20px;
      opacity: 0.6;
      font-weight: bold;
    }
  }
  hr {
    color: #838e9b;
    height: 4px;
  }
  .el-carousel__item {
    text-align: center;
    filter: blur(3.5px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 100px;
  }
  .el-carousel__item--card.is-active {
    filter: blur(0);
    margin-top: 0;
  }

  .game_catagories {
    display: flex;
    align-items: center;
    gap: 20px;
    .catagory {
      width: 116px;
      height: 44px;
      flex-shrink: 0;
      border-radius: 15px;
      box-shadow: 2px 2px 9px 0px #194456;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        width: 106px;
        height: 30px;
        flex-shrink: 0;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        border-radius: 9px;
        border: none;
        cursor: pointer;
        outline: none;
        list-style: none;
      }
    }
  }
  .electronic_text_bg {
    font-weight: bold;
    white-space: nowrap;
    margin-top: 20px;
    .text_blur {
      opacity: 0.1;
      filter: blur(6.5px);
      color: #304258;
      font-size: 90px;
    }
    .text {
      background: linear-gradient(to top left, #dc2626, #c53030);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-size: 40px;
      text-align: center;
      margin-top: -70px;
    }
  }
}
</style>
