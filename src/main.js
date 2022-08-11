import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/less/index.less";
import http from "axios";
import "../src/api/mock.js";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$http = http;
router.beforeEach((to, from, next) => {
  store.commit("getToken");
  const token = store.state.user.token;
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (token && to.name === "login") {
    next({ name: "home" });
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: (h) => h(App),
  created(){
    this.$store.commit('addMenu',this.$router)
  }
}).$mount("#app");
