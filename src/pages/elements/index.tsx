import { useCozeStore } from "../../stores/useCozeStore";
import { useState } from "react";
import { Button, Input, Text, View } from "@tarojs/components";

export default function Index() {
  const { requestCozeApi, token: currentToken } = useCozeStore();
  const [token, setToken] = useState(currentToken);
  const [value, setValue] = useState("林肯");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const isCanSubmit = token && value && !loading;

  const handleSubmit = async () => {
    if (!token || !value) return;
    try {
      setLoading(true);
      const data = await requestCozeApi({
        workflow_id: "7436445370878001190",
        bot_id: "7436434756130783286",
        input: value,
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
      if (token !== currentToken) setToken(currentToken);
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex flex-col items-stretch gap-4 px-2 py-8 border-t-2 border-neutral-200 h-screen">
      <Text className="px-2 mt-4 text-lg font-bold">Elements</Text>
      <Text className="px-2 text-sm -mb-2">Token</Text>
      <Input
        type="text"
        password={true}
        value={token}
        onInput={(event) => setToken(event.detail.value)}
        className="ring-1 ring-neutral-300 px-2 py-2 h-6 rounded-md"
      />
      {/*<Text className="px-2 text-sm -mb-2">Prompts</Text>*/}
      {/*<Textarea*/}
      {/*  autoHeight*/}
      {/*  disabled={true}*/}
      {/*  value={value}*/}
      {/*  onInput={(event) => setValue(event.detail.value)}*/}
      {/*  className="ring-1 ring-neutral-300 px-2 py-2 w-full box-border min-h-16 rounded-md"*/}
      {/*/>*/}
      <Button
        className="bg-blue-600 w-full text-blue-50"
        loading={loading}
        onClick={handleSubmit}
        disabled={!isCanSubmit}
      >
        Submit
      </Button>
      <Text className="px-2 text-sm -mb-2">Result:</Text>
      <View className="px-2 w-full">
        {result && (
          <>
            <View>{result.elements}</View>
            <View>{result.message}</View>
          </>
        )}
      </View>
    </View>
  );
}
