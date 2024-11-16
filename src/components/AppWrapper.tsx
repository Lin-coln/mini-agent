import { ReactNode, useEffect } from "react";
import { PageMeta, View } from "@tarojs/components";
import { NavigationBar as Nav } from "@tarojs/components";
import NavigationBar, { useNavigationBarBounds } from "./NavigationBar";
import {
  BACKGROUND_COLOR,
  BORDER_COLOR,
  TAB_BAR_HEIGHT,
} from "../utils/constant";

import { getSystemInfo } from "../utils/safeArea";

export default function AppWrapper({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const dark = true;
  const backgroundColor = BACKGROUND_COLOR;
  const borderColor = BORDER_COLOR;
  const navigationBounds = useNavigationBarBounds();

  const offsetBottom = useOffsetBottom();
  const tabBarHeight = offsetBottom + TAB_BAR_HEIGHT;

  return (
    <>
      <PageMeta
        backgroundTextStyle={dark ? "dark" : "light"}
        backgroundColor={backgroundColor}
        backgroundColorTop={backgroundColor}
        backgroundColorBottom={backgroundColor}
      >
        <Nav
          frontColor={dark ? "#ffffff" : "#000000"}
          backgroundColor={backgroundColor}
        />
      </PageMeta>
      <NavigationBar title={title} />
      <View
        className={
          // 'fixed top-0',
          "absolute"
        }
        style={{
          boxSizing: "border-box",
          paddingTop: navigationBounds.navigationBarHeight,
          height: `100vh`,
          width: "100%",
          paddingBottom: tabBarHeight,
        }}
      >
        {children}
      </View>
      <View
        className={["fixed bottom-0 w-full", "backdrop-blur-xl"].join(" ")}
        style={{
          height: tabBarHeight,
          borderTop: `1px solid ${borderColor}`,
        }}
      ></View>
    </>
  );
}

function useOffsetBottom() {
  const info = getSystemInfo();

  const safeAreaBottom = info.safeArea ? info.safeArea.bottom : 0;

  const currentHeight =
    info.deviceOrientation === "portrait"
      ? info.screenHeight
      : info.screenWidth;

  return currentHeight - safeAreaBottom;
}
