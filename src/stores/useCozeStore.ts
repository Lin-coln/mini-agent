import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

const coze_token = {
  get() {
    return Taro.getStorageSync("coze.token");
  },
  set(val: string) {
    Taro.setStorageSync("coze.token", val);
  },
};

export const useCozeStore = () => {
  const [token, setToken] = useState(() => coze_token.get());
  useEffect(() => {
    if (!token) return;
    coze_token.set(token);
  }, [token]);

  return {
    token,
    requestCozeApi: async (options: {
      token?: string;
      workflow_id: string;
      bot_id?: string;
      input: string;
    }) => {
      const opts = { token: token, ...options };
      if (!opts.token) return;
      const result = await requestCozeApi(opts);
      setToken(opts.token);
      return result;
    },
  };
};

async function requestCozeApi(options: {
  token: string;
  workflow_id: string;
  input: string;
  bot_id?: string;
}) {
  const result = await new Promise<any>((resolve, reject) => {
    console.log(`[coze::request] requesting...`);
    Taro.request({
      method: "POST",
      url: `https://api.coze.cn/v1/workflow/run`,
      data: {
        workflow_id: options.workflow_id,
        bot_id: options.bot_id,
        parameters: {
          BOT_USER_INPUT: options.input,
        },
      },
      header: {
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json",
      },
      success: (res) => {
        console.log(`[coze::request] success`, res.data);
        resolve(res.data);
      },
      fail: (err) => {
        console.warn(`[coze::request] failed`, err);
        reject(err);
      },
    });
  });

  if (result.code) {
    console.warn(`[coze::result] failed`, result);
    throw new Error(result.msg);
  }

  console.log(`[coze::result] result`, result);
  const data = JSON.parse(result.data);
  console.log(`[coze::result] data`, data);
  Taro.setStorageSync("coze.token", options.token);
  return data;
}
