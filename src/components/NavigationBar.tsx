import { View } from "@tarojs/components";
import { getSystemInfo } from "../utils/safeArea";

export function useNavigationBarBounds() {
  const info = getSystemInfo();
  const toolbarMiniPadding = 4;
  const toolbarPadding = Math.max(
    // capsule bottom margin
    info.navHeight - info.capsuleInfo.bottom,
    toolbarMiniPadding,
  );
  const navigationBarPaddingTop = Math.max(
    info.capsuleInfo.top - toolbarPadding,
    0,
  );
  const navigationBarHeight = info.capsuleInfo.bottom + toolbarPadding;

  return {
    navigationBarPaddingTop,
    navigationBarHeight,
    toolbarPadding,
  };
}

export default function NavigationBar({ title }) {
  const { navigationBarPaddingTop, navigationBarHeight, toolbarPadding } =
    useNavigationBarBounds();
  return (
    <View
      className={[
        `fixed z-50 top-0 w-full box-border`,
        `flex flex-row justify-center items-center`,
      ].join(" ")}
      style={{
        paddingTop: navigationBarPaddingTop,
        height: navigationBarHeight,
      }}
    >
      <View
        className={[`h-full w-full`].join(" ")}
        style={{
          padding: toolbarPadding,
        }}
      >
        <View
          className={[
            `h-full w-full`,
            `flex flex-row justify-center items-center`,
            "font-bold",
          ].join(" ")}
        >
          {title}
        </View>
      </View>
    </View>
  );
}
