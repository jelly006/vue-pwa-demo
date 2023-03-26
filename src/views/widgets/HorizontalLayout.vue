
<template>
  <div class="horizontal-layout">
    <div class="num">
      {{ appNum }}
    </div>

    <img class="icon"
         v-lazy="appInfo['im:image']?  appInfo['im:image'][1].label: ''"
         :class="appNum%2 == 0 ? 'circle':''"
         alt="">
    <div class="info">
      <div class="appName">
        {{ appInfo['im:name'].label }}
      </div>
      <div class="appType">
        {{ appInfo.category.attributes.label }}
      </div>
      <div class="rating">
        <van-rate v-model="appInfo.averageUserRating"
                  allow-half
                  void-icon="star"
                  void-color="#eee"
                  size="10" 
                  readonly />
        {{ `(${appInfo.userRatingCount || 0})` }}</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Rate, Lazyload } from 'vant';
import { commonInteractor } from '@/core';

Vue.use(Rate).use(Lazyload);
@Component
export default class HorizontalLayout extends Vue {
  // private value = Math.floor(Math.random() * 5);
  @Prop({
    type: Object,
    default: () => ({
      // averageUserRating: 0,
      // userRatingCount: 10
    })
  })
  private appInfo!: object;
  @Prop([Number, String]) private appNum!: number | string;

  // private async getLookup(id: number | string) {
  //   try {
  //     const results = await commonInteractor.getLookupAppList(id);
  //     this.$set(this.appInfo, 'userRatingCount', results[0].userRatingCount);
  //     this.$set(
  //       this.appInfo,
  //       'averageUserRating',
  //       results[0].averageUserRating
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  private async mounted() {
    // if ((this.appInfo as any).id.attributes['im:id']) {
    //   this.getLookup((this.appInfo as any).id.attributes['im:id']);
    // }
  }
}
</script>

<style lang="less" scoped>
.horizontal-layout {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 5px 10px;

  .num {
    width: 20px;
    opacity: 0.6;
  }

  .icon {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    &.circle {
      border-radius: 50%;
    }
  }

  .info {
    width: 250px;
    font-size: 14px;

    .appName {
      height: 20px;
      line-height: 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
    }

    .appType {
      height: 20px;
      line-height: 20px;
      opacity: 0.6;
    }

    .rating {
      height: 14px;
      line-height: 14px;
      font-size: 12px;
      opacity: 0.6;
    }
  }
}
</style>