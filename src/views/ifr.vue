<template>
  <div>
    <iframe class="iframe" id="iframes" ref="iframe" v-bind:src="src"></iframe>
  </div>
</template>

<script>
import state from "../store/state";

export default {
  data() {
    return {};
  },
  created() {
    let that = this;
    setTimeout(function () {
      that.$money();
    }, 1500);

    that.src = localStorage.getItem("ifrUrl");

    window.addEventListener("message", (e) => {
      if (e.data.name) {
        let iframes = document.getElementById("iframes");
        if (iframes) {
          iframes = document.getElementById("iframes").contentWindow;
        }
        iframes.postMessage({ token: state.userInfo.authToken }, "*");
      }
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: calc(100vh - 64px);
  border: none;
  display: block;
}
</style>
