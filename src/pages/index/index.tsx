import { useState } from "react";
import { View, Button, Text, Input } from "@tarojs/components";

import "./index.css";
import Taro from "@tarojs/taro";

export default function Index() {
  const [token, setToken] = useState("");
  const [value, setValue] = useState("林肯");
  const [result, setResult] = useState("nothing here");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!token || !value) {
      return;
    }
    try {
      const data = await new Promise((resolve, reject) => {
        console.log(`requesting...`);
        setLoading(true);
        setResult(`requesting...`);
        Taro.request({
          method: "POST",
          url: `https://api.coze.cn/v1/workflow/run`,
          data: {
            workflow_id: "7435701312569163813",
            BOT_USER_INPUT: value,
          },
          header: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          success: (res) => {
            resolve(res.data);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
      console.log(`got data.`, data);
      setResult(JSON.stringify(data));
    } catch (error) {
      console.warn(`failed`, error);
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  };
  const inputStyle = {
    boxShadow: "inset 0 0 0 1px #dfdfdf",
    padding: `8px 12px`,
    minHeight: 28,
    borderRadius: 6,
  };
  return (
    <View
      className="index"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: 8,
      }}
    >
      <Input
        type="text"
        placeholder="输入Token"
        value={token}
        onInput={(event) => setToken(event.detail.value)}
        style={inputStyle}
      />
      <Input
        type="text"
        placeholder="输入提示"
        value={value}
        onInput={(event) => setValue(event.detail.value)}
        style={inputStyle}
      />

      <Button
        style={{ width: "100%" }}
        loading={loading}
        onClick={handleSubmit}
      >
        提交
      </Button>

      <View style={{ padding: 4 }}>{result}</View>
    </View>
  );
}
