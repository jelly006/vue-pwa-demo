<template>
  <div class="recommend">
    <div class="title">Recommend</div>
    <div class="list">
      <van-loading type="spinner"
                   class="recommend-app-load"
                   v-if="hasRequest" />
      <template v-else>
        <card v-for="(item, index) in topList"
              :key="`recommend-${index}`"
              :appInfo="item"></card>
      </template>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { commonInteractor } from '@/core';
import Card from './Card.vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);

@Component({
  components: { Card }
})
export default class Recommend extends Vue {
  @Prop({ type: Array, default: () => [] }) private topList!: [];
  // private topList = [];
  private hasRequest = false;

  // private async getTopAppList() {
  //   try {
  //     this.hasRequest = true;
  //     const { entry } = await commonInteractor.getTopAppList();
  //     this.topList = entry;
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     this.hasRequest = false;
  //   }
  // }
  // private async created() {
  //   this.getTopAppList();
  // }
}
</script>

<style lang="less" scoped>
.recommend {
  margin: 8px 0;
  height: 172px;

  .title {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    font-weight: 550;
    padding-left: 14px;
  }
  .list {
    display: flex;
    overflow-x: scroll;
    height: 136px;
    position: relative;

    .recommend-app-load {
      position: absolute;
      margin-left: 50%;
      margin-top: 50px;
      transform: translate(-50%, -50%);
    }
  }
}
</style>