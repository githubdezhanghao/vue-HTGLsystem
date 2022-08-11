// import router from "@/router";
import Cookie from "js-cookie";
export default {
  state: {
    isCollapse: false,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    currentMenu: null,
    menu: [],
  },
  mutations: {
    CollapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, value) {
      if (value.name !== "home") {
        state.currentMenu = value;
        const result = state.tabsList.findIndex(
          (item) => item.name === value.name
        );
        if (result === -1) {
          state.tabsList.push(value);
        }
      } else {
        state.currentMenu = null;
      }
    },
    closeTag(state, value) {
      const result = state.tabsList.findIndex(
        (item) => item.name === value.name
      );
      state.tabsList.splice(result, 1);
    },
    setMenu(state, value) {
      state.menu = value;
      Cookie.set("menu", JSON.stringify(value));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    addMenu(state, router) {
      if (!Cookie.get("menu")) {
        return;
      }
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`../../views/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../../views/${item.url}`);
          menuArray.push(item);
        }
      });
      menuArray.forEach(item=>{
        router.addRoute('Main',item)
      })
    },
  },
};
