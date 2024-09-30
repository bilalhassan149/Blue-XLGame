import state from "./state";
import { gameBalancegetAllBalance } from "@/api/galApi";

let actions = {
  gameMoney() {
    return new Promise((resolve, reject) => {
      let arr = [];
      state.gameMoneyLoading = true;
      gameBalancegetAllBalance()
        .then((res) => {
          if (res.code == 0) {
            state.gameMoneyLoading = false;
            let data = res.data.allBalance;
            let selectGame = state.game.platforms.uniqueCodes;
            for (let key in data) {
              for (let val in selectGame) {
                if (key == val) {
                  arr.push({
                    key: key, // label 字段
                    balance: data[key].balance,
                    name: selectGame[key], // value字段
                    bstatus: data[key].balanceStatus,
                  });
                }
              }
            }
            resolve(arr);
          } else {
            // alert(state.codes[res.code]);
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default actions;
