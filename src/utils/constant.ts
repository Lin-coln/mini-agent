export const Pages = {
  Index: {
    title: "首页",
    route: "pages/index/index",
  },
  // Elements: {
  //   title: "元素",
  //   route: "pages/elements/index",
  // },
  Settings: {
    title: "设置",
    route: "pages/settings/index",
  },
};

const tab_items = Array.from(Object.values(Pages)).map((item) => ({
  pagePath: item.route,
  text: item.title,
}));
export const APP_CONFIG = {
  pages: tab_items.map((item) => item.pagePath),
  tab_items: tab_items,
};

export const BORDER_COLOR = "#7F7F7F14";
export const BACKGROUND_COLOR = "#1a1a1a";

export const TAB_BAR_HEIGHT = 68;
