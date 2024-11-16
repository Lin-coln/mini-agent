import { CoverView } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import "./index.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { APP_CONFIG } from "../utils/constant";

const TAB_ITEMS = APP_CONFIG.tab_items.map((item) => ({
  pagePath: `/${item.pagePath}`,
  text: item.text,
}));

export default function CustomTabBar() {
  const router = useRouter();
  const [selected, setSelected] = useState(() => {
    const idx = TAB_ITEMS.findIndex((item) => item.pagePath === router.path);
    return idx >= 0 ? idx : 0;
  });

  useEffect(() => {
    const idx = TAB_ITEMS.findIndex((item) => item.pagePath === router.path);
    setSelected(idx >= 0 ? idx : 0);
  }, [router.path]);

  const handleItemClick = (item) => {
    Taro.switchTab({ url: item.pagePath });
  };

  return (
    <CoverView className="tab-bar">
      {TAB_ITEMS.map((item, index) => (
        <CoverView
          key={index}
          onClick={() => handleItemClick(TAB_ITEMS[index])}
          className={clsx("tab-bar-item", {
            "tab-bar-item--active": selected === index,
          })}
        >
          <CoverView>{item.text}</CoverView>
        </CoverView>
      ))}
    </CoverView>
  );
}
