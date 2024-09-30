<template>
  <div>
    <div>test - translate - 翻译</div>
    <h3 v-html="$en('about_us.about_us_description')"></h3>
    <h3>{{ $en("about_us.about_us_description") }}</h3>
    <h3>no br{{ $store.state.en.about_us.about_us_description }}</h3>
    <h2>{{ $en("alerts.password_error", 456) }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss"></style>
