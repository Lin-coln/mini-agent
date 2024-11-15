import { APP_CONFIG } from "./constants";

export default defineAppConfig({
  darkmode: true,
  pages: APP_CONFIG.pages,
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
  tabBar: {
    custom: true,
    list: APP_CONFIG.tab_items,
  },
});
