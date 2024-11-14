export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/elements/index", // elements
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    color: "#000000",
    selectedColor: "#DC143C",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "General",
      },
      {
        pagePath: "pages/elements/index",
        text: "Index",
      },
    ],
  },
});
