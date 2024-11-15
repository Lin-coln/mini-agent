import { Image, Slot, View, Text } from "@tarojs/components";

import sample from "../assets/sample_1.jpg";

export default function ImageView() {
  return (
    <View
      className={[
        `h-full`,
        `flex flex-col items-center justify-center`,
        `p-4`,
      ].join(" ")}
      style={
        {
          // boxShadow: "inset 0 0 0 1px red",
        }
      }
    >
      <Image className="w-full  h-full" src={sample} mode={"aspectFit"} />
    </View>
  );
}
