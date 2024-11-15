import { View } from "@tarojs/components";

export default function NavigationBar({ title, height, padding, offset }) {
  return (
    <View
      className={[
        `fixed z-50 top-0 w-full box-border`,
        `flex flex-row justify-center items-center`,
      ].join(" ")}
      style={{
        paddingTop: offset - 4,
        height: height + offset + padding,
      }}
    >
      <View className="font-bold">{title}</View>
    </View>
  );
}
