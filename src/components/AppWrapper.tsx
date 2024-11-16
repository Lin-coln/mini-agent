import { ReactNode, useEffect } from "react";
import { PageMeta, View } from "@tarojs/components";
import { NavigationBar as Nav } from "@tarojs/components";
import NavigationBar from "./NavigationBar";
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
  const info = getSystemInfo();
  useEffect(() => {
    console.log(info);
  }, []);

  const dark = true;
  const offsetBottom = info.bottomSafeHeight + TAB_BAR_HEIGHT;
  const backgroundColor = BACKGROUND_COLOR;
  const borderColor = BORDER_COLOR;

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
        className="relative"
        style={{
          boxSizing: "border-box",
          paddingTop: info.navHeight,
          height: `100vh`,
          paddingBottom: offsetBottom,
        }}
      >
        {children}
      </View>
      <View
        className={["fixed bottom-0 w-full", "backdrop-blur-xl"].join(" ")}
        style={{
          height: offsetBottom,
          borderTop: `1px solid ${borderColor}`,
        }}
      ></View>
    </>
  );
}
