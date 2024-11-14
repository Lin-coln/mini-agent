import {
  NavigationBar,
  PageMeta,
  Picker,
  ScrollView,
  StickyHeader,
  Swiper,
  SwiperItem,
  Switch,
  View,
} from "@tarojs/components";

import "./index.scss";
import General from "../../views/General";
import { useEffect, useState } from "react";

export default function Index() {
  const handleScrollToUpper = () => {};
  const handleScroll = () => {};
  const [foo, setFoo] = useState("xxx");

  // useEffect(() => {
  //   const page = Taro.getCurrentInstance().page;
  //   console.log(page);
  // }, []);

  return (
    <Swiper className="h-screen">
      <SwiperItem>
        <General />
      </SwiperItem>
    </Swiper>
  );
}
