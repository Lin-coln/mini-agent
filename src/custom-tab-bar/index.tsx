import { CoverView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";
import clsx from "clsx";

const list = [
  {
    pagePath: "/pages/index/index",
    text: "首页",
  },
  {
    pagePath: "/pages/elements/index",
    text: "元素",
  },
];

export default function CustomTabBar() {
  const handleItemClick = (item, index) => {
    Taro.switchTab({ url: item.pagePath });
  };

  return (
    <CoverView className="tab-bar">
      {list.map((item, index) => (
        <CoverView
          key={index}
          className={clsx("tab-bar-item", {
            // "tab-bar-item--active": selected === index,
          })}
          onClick={() => handleItemClick(list[index], index)}
        >
          {/*<CoverImage*/}
          {/*  src={selected === index ? item.selectedIconPath : item.iconPath}*/}
          {/*/>*/}
          <CoverView
          // style={{ color: selected === index ? selectedColor : color }}
          >
            {item.text}
          </CoverView>
        </CoverView>
      ))}
    </CoverView>
  );
}
