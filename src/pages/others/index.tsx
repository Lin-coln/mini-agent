import AppWrapper from "../../components/AppWrapper";
import Elements from "./view/Elements";
import General from "./view/General";
import { Swiper, SwiperItem, View } from "@tarojs/components";
import { ReactNode, useMemo, useState } from "react";

export default function Index() {
  const items = useMemo(
    () => [
      { label: "吐槽", node: <General /> },
      { label: "元素", node: <Elements /> },
    ],
    [],
  );

  return <SwiperWrapper items={items} />;
}

function SwiperWrapper({
  items,
}: {
  items: {
    label: string;
    node: ReactNode;
  }[];
}) {
  const [index, setIndex] = useState(0);
  const onChange = (index: number) => {
    setIndex(index);
  };
  const labels = items.map((item) => item.label);
  const renderTitle = () => (
    <View className="w-full h-full flex flex-row justify-center items-center gap-2">
      {labels.map((label, i) => (
        <View
          onClick={() => (i === index ? void 0 : setIndex(i))}
          key={i}
          className={[
            `flex flex-row justify-center items-center`,
            "box-border rounded-full",
            ...(i === index
              ? ["font-bold text-sm text-neutral-100/80"]
              : ["font-normal text-sm text-neutral-100/30"]),
            ...(i === index
              ? [`px-2 py-1.5 bg-neutral-500/10 backdrop-blur-2xl min-w-16`]
              : ["py-1.5"]),
          ].join(" ")}
        >
          {label}
        </View>
      ))}
    </View>
  );
  return (
    <AppWrapper title={renderTitle()}>
      <Swiper
        className="w-full h-full"
        vertical={false}
        indicatorDots={false}
        current={index}
        onChange={(e) => {
          onChange(e.detail.current);
        }}
      >
        {items.map((item, index) => (
          <SwiperItem key={index}>{item.node}</SwiperItem>
        ))}
      </Swiper>
    </AppWrapper>
  );
}
