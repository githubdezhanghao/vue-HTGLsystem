import Vue from "vue";
import VueRouter from "vue-router";
import Main from '../views/Main'
Vue.use(VueRouter);
//解决多次点击首页报错BUG  原理未知
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err => err)
}
const routes = [
  {
    path: "/",
    redirect:'/home',
    component:Main,
    children:[
      {
        path:'/home',
        name:'home',
        component:()=>import('../views/home/home.vue')
      },
      {
        path:'/user',
        name:'user',
        component:()=>import('../views/user/user.vue')
      },
      {
        path:'/mall',
        name:'mall',
        component:()=>import('../views/mall/mall.vue')
      },
      {
        path:'/page1',
        name:'page1',
        component:()=>import('../views/other/pageOne.vue')
      },
      {
        path:'/page2',
        name:'page2',
        component:()=>import('../views/other/pageTwo.vue')
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login/login.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
