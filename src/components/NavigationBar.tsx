import { View } from "@tarojs/components";
import { getSystemInfo } from "../utils/safeArea";
import { ReactElement, ReactNode } from "react";

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

export default function NavigationBar({
  title,
}: {
  title: string | ReactElement;
}) {
  const { navigationBarPaddingTop, navigationBarHeight, toolbarPadding } =
    useNavigationBarBounds();

  const renderTitle = () =>
    typeof title === "string" ? (
      <View
        className={[
          `h-full w-full`,
          `flex flex-row justify-center items-center`,
          "font-bold",
        ].join(" ")}
      >
        {title}
      </View>
    ) : (
      title
    );

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
        {renderTitle()}
      </View>
    </View>
  );
}
