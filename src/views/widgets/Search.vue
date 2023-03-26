<template>
  <div>
    <van-search v-model="value"
                placeholder="Search..."
                @input="querySearch" />
    <van-list v-if="value && optionList.length > 0">
      <van-cell v-for="(item, index) in optionList"
                :key="`content-${index}`"
                icon="search"
                :title="item['im:name'].label" />
    </van-list>

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { commonInteractor } from '@/core';
import { Search, List, Cell } from 'vant';

Vue.use(Search).use(List).use(Cell);

@Component
export default class SearchHead extends Vue {
    @Prop({ type: Array, default: () => [] }) private searchData!: [];

  private value = '';
  private loading = false;
  private optionList = [];

  @Emit()
  private hasContent() {
      return this.optionList.length > 0;
  }

  private querySearch() {
      if (this.value === '' || this.value.trim() === '') {
          this.optionList = [];
          this.hasContent();
          return false;
      }
      this.optionList = this.searchData.filter( (n) => {
          return (n['im:name'] as any).label.indexOf(this.value) !== -1 ||
          (n['im:name'] as any).label.indexOf(this.value) !== -1 ||
          (n['im:artist'] as any).label.indexOf(this.value) !== -1;
      });
      this.hasContent();
  }
}
</script>



