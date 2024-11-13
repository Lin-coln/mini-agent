import { View } from "@tarojs/components";

import "./index.scss";
import General from "../../views/General";
import Elements from "../../views/Elements";

export default function Index() {
  return (
    <View className="flex flex-col items-stretch pb-8">
      <General />
      <Elements />
    </View>
  );
}
