import AppWrapper from "../../components/AppWrapper";
import { Input, Text, View } from "@tarojs/components";
import { useState } from "react";
import { useCozeStore } from "../../stores/useCozeStore";
import { useShallow } from "zustand/react/shallow";
import MiniInput from "../../components/MiniInput";
import MiniButton from "../../components/MiniButton";
import { promiseWithToast } from "../../utils";

export default function Index() {
  const [currentToken, setCurrentToken] = useCozeStore(
    useShallow((state) => [state.token, state.setToken]),
  );

  const [token, setToken] = useState(currentToken);

  const handleApply = async () => {
    const result = await promiseWithToast(
      {
        loading: "正在保存",
        success: "已保存",
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (token) {
          setCurrentToken(token);
        }
      },
    );
    console.log({ result });
  };

  return (
    <AppWrapper title={"设置"}>
      <View className="p-4 h-full flex flex-col items-start justify-start gap-4">
        <MiniInput
          {...{
            label: `Coze API Key ${currentToken !== token ? "(未保存)" : ""}`,
            value: token,
            placeholder: `设置你的 coze api key`,
            onValueChange: setToken,
          }}
        />
        <MiniButton
          {...{
            label: "保存设置",
            onClick: handleApply,
            className: "self-end mt-4",
          }}
        />
      </View>
    </AppWrapper>
  );
}
