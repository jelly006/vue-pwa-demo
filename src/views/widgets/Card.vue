<template>
  <div class="card">
    <img class="icon"
         :src="appInfo['im:image'] ? appInfo['im:image'][1].label: ''"
         alt="">
    <div class="appName">{{ appInfo['im:name'].label }}</div>
    <div class="appType">{{ appInfo.category.attributes.label }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
// import draggable from 'vuedraggable';
// import { INotebook } from '@/types';

@Component
export default class Card extends Vue {
  @Prop({ type: Object, default: () => ({
  }) }) private appInfo!: object;
  // private notebook!: INotebook;

  // private dragOptions = {
  //   handler: '.card__note-action--drag',
  //   filter: '.card__note-main',
  //   ghostClass: 'ghost',
  //   animation: 0,
  //   preventOnFilter: false
  // };
}
</script>

<style lang="less" scoped>

.card {
  width: 84px;
  height: 120px;
  display: inline-block;
  box-sizing: border-box;
  margin: 10px 10px 10px 10px;
  text-align: center;

  &:first-child {
    margin-left: 20px;
  }

  .icon {
    border-radius: 10px;
    width: 84px;
    height: 84px;
  }

  .appName {
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
    padding: 0 4px;
    height: 18px;
    line-height: 18px;
  }
  
  .appType {
    opacity: 0.6;
    height: 18px;
    line-height: 18px;
  }
}
</style>
