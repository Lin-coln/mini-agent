import { ReactNode } from "react";
import { PageMeta, View } from "@tarojs/components";
import { NavigationBar as Nav } from "@tarojs/components";
import NavigationBar from "./NavigationBar";
import { BACKGROUND_COLOR, BORDER_COLOR } from "../constants";

export default function AppWrapper({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const dark = true;
  const offsetTop = 60;
  const navigationBarHeight = 32;
  const navigationBarPadding = 4;
  const offsetBottom = 102;
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
      <NavigationBar
        title={title}
        offset={offsetTop}
        height={navigationBarHeight}
        padding={navigationBarPadding}
      />
      <View
        className="relative"
        style={{
          boxSizing: "border-box",
          paddingTop: `calc(${offsetTop + navigationBarHeight + navigationBarPadding}px)`,
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
          borderTop: `2px solid ${borderColor}`,
        }}
      ></View>
    </>
  );
}
