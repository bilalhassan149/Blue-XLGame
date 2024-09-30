<template>
  <div class="f-c user-main">
    <div style="display: flex">
      <leftNav></leftNav>
      <div class="body">
        <div :is="$store.state.navIcon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import leftNav from "../components/LeftNav.vue";
import purse from "../views/user/purse.vue";
import userVip from "../views/user/userVip.vue";
import transaction from "../views/user/transaction.vue";
import betting from "../views/user/betting.vue";
import news from "../views/user/news.vue";
import info from "../views/user/info.vue";
import Deposit from "../views/user/deposit.vue";
import Transfer from "../views/user/transfer.vue";
import Withdraw from "../views/user/withdraw.vue";

export default {
  data() {
    return {};
  },
  components: {
    leftNav,
    purse,
    userVip,
    transaction,
    betting,
    news,
    info,
    Deposit,
    Transfer,
    Withdraw,
  },
  methods: {},
};
</script>

<style lang="scss">
.user-main {
  padding: 40px 10px 30px 10px;
  user-select: none;
}
.body {
  min-width: 980px;
}
</style>
