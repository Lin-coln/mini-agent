export const Pages = {
  Index: {
    title: "首页",
    route: "pages/index/index",
  },
  Elements: {
    title: "元素",
    route: "pages/elements/index",
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
