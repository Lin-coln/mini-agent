import { Image, View } from "@tarojs/components";

import sample from "../../../assets/sample_1.jpg";

export default function ImageView() {
  const handleClick = () => {
    // ...
  };

  return (
    <View
      className={[
        `relative`,
        `h-full`,
        `flex flex-col items-center justify-center`,
      ].join(" ")}
    >
      <View className="p-4 h-full shrink w-full">
        <Image
          className="w-full  h-full"
          src={sample}
          mode={"aspectFit"}
          onClick={handleClick}
        />
      </View>
    </View>
  );
}
