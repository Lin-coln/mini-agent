import { useCozeStore } from "../../../stores/useCozeStore";
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import MiniInput from "../../../components/MiniInput";
import MiniButton from "../../../components/MiniButton";
import MiniTextarea from "../../../components/MiniTextarea";

export default function General() {
  const invokeWorkflow = useCozeStore((state) => state.invokeWorkflow);

  const [value, setValue] = useState("林肯");
  const [result, setResult] = useState("nothing");

  const isCanSubmit = !!value;

  const handleSubmit = async () => {
    if (!value) return;
    try {
      const result = await invokeWorkflow({
        workflow_id: "7435701312569163813",
        input: value,
      });

      console.log(result);
      // setResult(result);
    } catch (error) {
      setResult(error.message);
    }
  };
  return (
    <View className="p-4 h-full flex flex-col items-start justify-start gap-4">
      <MiniTextarea
        {...{
          label: "Prompts",
          value: value,
          onValueChange: setValue,
        }}
      />
      <MiniButton
        {...{
          label: "Submit",
          onClick: handleSubmit,
          disabled: !isCanSubmit,
        }}
      />
      <Text className="px-2 text-sm -mb-2 text-neutral-100/60">Result</Text>
      <View className="p-3 box-border w-full h-0 grow bg-neutral-950/30 text-neutral-100/60 rounded-md">
        {result}
      </View>
    </View>
  );
}
