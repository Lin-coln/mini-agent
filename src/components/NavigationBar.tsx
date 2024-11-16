import { View } from "@tarojs/components";
import { getSystemInfo } from "../utils/safeArea";

export default function NavigationBar({ title }) {
  const info = getSystemInfo();

  const capsuleMarginBottom = info.navHeight - info.capsuleInfo.bottom;
  const paddingTop =
    info.navHeight - info.capsuleInfo.height - 2 * capsuleMarginBottom;
  return (
    <View
      className={[
        `fixed z-50 top-0 w-full box-border`,
        `flex flex-row justify-center items-center`,
      ].join(" ")}
      style={{
        paddingTop: paddingTop,
        height: info.navHeight,
      }}
    >
      <View
        className={[
          "font-bold",
          `h-full w-full`,
          `flex flex-row justify-center items-center`,
        ].join(" ")}
      >
        {title}
      </View>
    </View>
  );
}
