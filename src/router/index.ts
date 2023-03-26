import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RouterList from './router-list';
import LocalConfig from '../config.json';

Vue.use(VueRouter)


const router = new VueRouter({
  mode: LocalConfig.RouterMode as RouterMode,
  base: LocalConfig.RouterBase,
  routes: RouterList
})

export default router
