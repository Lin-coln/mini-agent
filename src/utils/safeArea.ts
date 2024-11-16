import Taro from "@tarojs/taro";

type NativeInfo = ReturnType<typeof Taro.getSystemInfoSync> & {
  statusBarHeight: number;
};
type MobileInfo = {
  isIphoneX: boolean;
  isMi: boolean;
  isIphone: boolean;
  isIpad: boolean;
  isIOS: boolean;
  isHeightPhone: boolean;
};
type BoundInfo = {
  navHeight: number;
  pageWidth: number;
  pageHeight: number;
  bottomSafeHeight: number;
  capsuleInfo: ReturnType<typeof Taro.getMenuButtonBoundingClientRect>;
  headerHeight: number;
  navbarHeight: number;
};

export type SystemInfo = NativeInfo & MobileInfo & BoundInfo;

export function getSystemInfo() {
  const res = Taro.getSystemInfoSync();
  const result: SystemInfo = {
    ...res,
    bottomSafeHeight: 0,
  } as any;
  Object.assign(result, resolveMobileType(result));

  // 状态栏高度
  const statusBarHeight = result.statusBarHeight || 0;
  result.navHeight = statusBarHeight + 46;
  result.pageWidth = result.windowWidth;
  result.pageHeight = result.windowHeight - result.navHeight;
  if (!result.isIOS) {
    result.bottomSafeHeight = 0;
  }
  const capsuleInfo = Taro.getMenuButtonBoundingClientRect();
  // 胶囊热区 = 胶囊和状态栏之间的留白 * 2 (保持胶囊和状态栏上下留白一致) * 2(设计上为了更好看) + 胶囊高度
  const navbarHeight =
    (capsuleInfo.top - statusBarHeight) * 4 + capsuleInfo.height;
  // 写入胶囊数据
  result.capsuleInfo = capsuleInfo;
  // 安全区域
  const safeArea = result.safeArea!;
  // 可视区域高度 - 适配横竖屏场景
  const screenHeight = Math.max(result.screenHeight, result.screenWidth);
  const height = Math.max(safeArea.height, safeArea.width);
  // 获取底部安全区域高度（全面屏手机）
  if (safeArea && height && screenHeight) {
    result.bottomSafeHeight = screenHeight - height - statusBarHeight;
    if (result.bottomSafeHeight < 0) {
      result.bottomSafeHeight = 0;
    }
  }
  // 设置header高度
  result.headerHeight = statusBarHeight + navbarHeight;
  // 导航栏高度
  result.navbarHeight = navbarHeight;

  return result;
}

function resolveMobileType(info: SystemInfo): MobileInfo {
  const result: any = {
    isIphoneX: false,
    isMi: false,
    isIphone: false,
    isIpad: false,
    isIOS: false,
    isHeightPhone: false,
  };
  const modelmes = info.model;
  // 判断设备型号
  if (modelmes.search("iPhone X") != -1 || modelmes.search("iPhone 11") != -1) {
    result.isIphoneX = true;
  }
  if (modelmes.search("MI") != -1) {
    result.isMi = true;
  }
  if (modelmes.search("iPhone") != -1) {
    result.isIphone = true;
  }
  if (modelmes.search("iPad") > -1) {
    result.isIpad = true;
  }
  const ipadDiff = Math.abs(info.screenHeight / info.screenWidth - 1.33333);
  if (ipadDiff < 0.01) {
    result.isIpad = true;
  }
  if (result.isIphone || info.system.indexOf("iOS") > -1) {
    result.isIOS = true;
  }

  const myCanvasWidth = (640 / 375) * info.screenWidth;
  const myCanvasHeight = (1000 / 667) * info.screenHeight;
  const scale = myCanvasWidth / myCanvasHeight;
  if (scale < 0.64) {
    result.isHeightPhone = true;
  }

  return result;
}
