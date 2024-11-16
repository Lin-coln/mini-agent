import AppWrapper from "../../components/AppWrapper";
import { Input, Text, View } from "@tarojs/components";
import { useState } from "react";
import { useCozeStore } from "../../stores/useCozeStore";

export default function Index() {
  const { setToken: setCurrentToken, token: currentToken } = useCozeStore();
  const [token, setToken] = useState(currentToken);

  const handleApply = () => {
    if (token) {
      setCurrentToken(token);
    }
  };

  const renderToken = () => (
    <View className="w-full">
      <View className="px-2 text-sm mb-2">
        Token {currentToken !== token ? "(edited)" : ""}
      </View>
      <Input
        type="text"
        // password={true}
        value={token}
        placeholder={"input your token"}
        onInput={(event) => setToken(event.detail.value)}
        className="p-2 h-6 rounded-md bg-neutral-950/60"
      />
    </View>
  );

  return (
    <AppWrapper title={"设置"}>
      <View className="p-4 h-full flex flex-col items-start justify-start gap-2">
        {renderToken()}
        <View
          className={[
            "px-4 py-2 rounded-md bg-neutral-400/10",
            "self-end mt-4",
            `flex justify-center items-center`,
          ].join(" ")}
          onClick={handleApply}
        >
          Apply
        </View>
      </View>
    </AppWrapper>
  );
}
