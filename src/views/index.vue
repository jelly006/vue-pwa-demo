<template>
  <div style="height: 100vh">
    <div class="layout__page"
         ref="content">
      <search :searchData="searchData"
              @has-content="hasContent"></search>
      <div v-show="isShow">
        <recommend :topList="topList"></recommend>
        <div class="free-app-warp">
          <van-loading type="spinner"
                       class="free-app-load"
                       v-if="hasRequest" />
          <template v-else>
            <HorizontalLayout v-for="(item, index) in freeList"
                              :key="`freeList-${index}`"
                              :appInfo="item"
                              :appNum="Number(index)+1"></HorizontalLayout>
            <HorizontalLayout v-for="(item, index) in freeOtherList"
                              :key="`freeList-${10 + Number(index)}`"
                              :appInfo="item"
                              :appNum="Number(index)+11"></HorizontalLayout>
            <van-loading type="spinner"
                         class="scroll-wait-load"
                         v-if="scrollWait" />
            <div class="no-more"
                 v-if="this.freeOtherList.length > 0">
              没有更多了
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { commonInteractor } from '@/core';
import Recommend from './widgets/Recommend.vue';
import HorizontalLayout from './widgets/HorizontalLayout.vue';
import Search from './widgets/Search.vue';
import { Loading } from 'vant';
import { debounce } from '@/utils/common-tools';

Vue.use(Loading);

@Component({
  components: { Recommend, HorizontalLayout, Search }
})
export default class Home extends Vue {
  // @Ref() readonly content!: Ht; searchData
  private get searchData() {
    return [].concat(this.topList, this.freeList, this.freeOtherList);
  }
  private topList = [];

  private freeList = [];

  private freeOtherList = [];

  private hasRequest = false;

  private scrollWait = false;

  private isShow = true;

  private value = '';

  private hasContent(val: boolean = false) {
    this.isShow = !val;
  }

  private async getTopAppList() {
    try {
      this.hasRequest = true;
      const { entry } = await commonInteractor.getTopAppList();
      this.topList = entry;
    } catch (error) {
      console.log(error);
    } finally {
      this.hasRequest = false;
    }
  }

  private async getFreeAppList(limit: number = 10) {
    try {
      if (this.hasRequest || this.scrollWait) {
        return;
      }
      if (limit === 10) {
        this.hasRequest = true;
      } else {
        this.scrollWait = true;
      }

      const { entry } = await commonInteractor.getFreeAppList(limit);
      if (limit === 10) {
        this.freeList = entry;
        // 查找评分和评论数量 挂在属性到list
        const ids = this.freeList
          .map((n: any) => n.id.attributes['im:id'])
          .join(',');
        const results = await this.getLookup(ids);
        this.freeList.forEach((n: any, i) => {
          const row =
            results.find((m: any) => m.trackId === Number(n.id.attributes['im:id'])) ||
            {};
          this.$set(this.freeList[i], 'userRatingCount', row.userRatingCount || 0);
          this.$set(this.freeList[i], 'averageUserRating', row.averageUserRating || 0);
        });
      } else {
        this.freeOtherList = entry.slice(10);
        // 查找评分和评论数量 挂在属性到list
        const ids = this.freeOtherList
          .map((n: any) => n.id.attributes['im:id'])
          .join(',');
        const results = await this.getLookup(ids);
        this.freeOtherList.forEach((n: any) => {
          const row =
            results.find((m: any) => m.trackId === Number(n.id.attributes['im:id'])) ||
            {};
          this.$set(n, 'userRatingCount', row.userRatingCount || 0);
          this.$set(n, 'averageUserRating', row.averageUserRating || 0);
        });

      }
    } catch (error) {
      console.log(error);
    } finally {
      this.hasRequest = false;
      this.scrollWait = false;
    }
  }

  private async getLookup(id: number | string) {
    try {
      const results = await commonInteractor.getLookupAppList(id);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  private async handleScroll() {
    if (this.freeOtherList.length > 0 || this.hasRequest || this.scrollWait) {
      return false;
    }
    const scrollHeight = (this.$refs.content as any).scrollHeight;
    // clientHeight是网页在浏览器中的可视高度
    const clientHeight = (this.$refs.content as any).clientHeight;
    // scrollTop是浏览器滚动条的top位置
    const scrollTop = (this.$refs.content as any).scrollTop;
    // 判断到底部了 接口加载时间长所以距离稍大
    if (scrollTop + clientHeight > scrollHeight - 100) {
      this.getFreeAppList(100);
    }
  }

  private async created() {
    this.getFreeAppList();
    this.getTopAppList();
  }
  private mounted() {
    window.addEventListener('scroll', debounce(this.handleScroll), true);
  }
  private destroyed() {
    window.removeEventListener('scroll', debounce(this.handleScroll));
  }
}
</script>

<style lang="less" scoped>
.layout__page {
  height: inherit;
  overflow-y: scroll;
}

.recommend {
  font-size: 14px;
  //
}

.free-app-warp {
  position: relative;
  // height: calc(100vh - 300px);

  .free-app-load {
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 150px;
  }
}

.scroll-wait-load {
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
}

.no-more {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>
