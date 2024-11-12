import { useState } from "react";
import { View, Button, Input, Text, Textarea } from "@tarojs/components";

import "./index.scss";
import { useCozeStore } from "./useCozeStore";

export default function Index() {
  const { requestCozeApi, token: currentToken } = useCozeStore();
  const [token, setToken] = useState(currentToken);
  const [value, setValue] = useState("林肯");
  const [result, setResult] = useState("nothing");
  const [loading, setLoading] = useState(false);

  const isCanSubmit = token && value && !loading;

  const handleSubmit = async () => {
    if (!token || !value) return;
    try {
      setLoading(true);
      const result = await requestCozeApi({
        workflow_id: "7435701312569163813",
        input: value,
        token: token,
      });
      setResult(result.output);
    } catch (error) {
      if (token !== currentToken) setToken(currentToken);
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex flex-col items-stretch gap-4 p-2">
      <Text className="px-2 text-sm -mb-2">Token</Text>
      <Input
        type="text"
        password={true}
        value={token}
        onInput={(event) => setToken(event.detail.value)}
        className="ring-1 ring-neutral-300 px-2 py-2 h-6 rounded-md"
      />
      <Text className="px-2 text-sm -mb-2">Prompts</Text>
      <Textarea
        autoHeight
        value={value}
        onInput={(event) => setValue(event.detail.value)}
        className="ring-1 ring-neutral-300 px-2 py-2 w-full box-border min-h-16 rounded-md"
      />
      <Button
        className="bg-amber-400 w-full"
        loading={loading}
        onClick={handleSubmit}
        disabled={!isCanSubmit}
      >
        Submit
      </Button>
      <Text className="px-2 text-sm -mb-2">Result:</Text>
      <View className="px-2 w-full">
        {result}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
        culpa doloremque eius ex explicabo, facere fugiat id iure libero nisi
        officiis quae quaerat qui quo ratione repellendus sit sunt ut! Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Beatae distinctio
        dolor dolore eum fugit, impedit ipsum molestiae mollitia, nam nobis
        numquam odio quidem similique tempora voluptates! Nam quisquam quod
        rerum.
      </View>
    </View>
  );
}
