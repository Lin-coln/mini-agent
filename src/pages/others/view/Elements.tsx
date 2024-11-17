import { useCozeStore } from "../../../stores/useCozeStore";
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import MiniButton from "../../../components/MiniButton";
import { promiseWithToast } from "../../../utils";

export default function Elements() {
  const token = useCozeStore((state) => state.token);
  const invokeWorkflow = useCozeStore((state) => state.invokeWorkflow);
  const [result, setResult] = useState<any | null>(null);
  const isCanSubmit = !!token;
  const handleSubmit = async () => {
    if (!token) return;
    await promiseWithToast(
      {
        loading: "generating...",
      },
      async () => {
        try {
          const data = await invokeWorkflow({
            workflow_id: "7436445370878001190",
            bot_id: "7436434756130783286",
            input: "value",
            token: token,
          });
          const { elements, result } = data;
          setResult({
            elements: elements.items
              .map((item) => `${item.emoji} (${item.label})`)
              .join(", "),
            message: result.message,
          });
        } catch (error) {
          setResult(error.message);
        }
      },
    );
  };
  return (
    <View className="p-4 h-full flex flex-col items-start justify-start gap-4">
      <MiniButton
        {...{
          label: "Submit",
          disabled: !isCanSubmit,
          onClick: handleSubmit,
          className: "self-end mt-4",
        }}
      />

      <Text className="px-2 text-sm -mb-2 text-neutral-100/60">Result</Text>
      <View className="p-3 box-border w-full h-0 grow bg-neutral-950/30 text-neutral-100/60 rounded-md">
        {JSON.stringify(result, null, 2)}
      </View>
    </View>
  );
}
