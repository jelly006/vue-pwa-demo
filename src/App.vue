<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
}
</script>

<style lang="less">
@import './less/base.less';

#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>