import Taro from "@tarojs/taro";

export async function invokeWorkflow<T = any>(opts: {
  token: string;
  workflow_id: string;
  bot_id?: string;
  input?: string;
  parameters?: Record<string, string>;
}): Promise<T> {
  const prefix = `[coze.invokeWorkflow]`;
  const result = await new Promise<{
    code: number;
    msg: string;
    data: string;
    debug_url: string;
    execute_id: string;
    token: number;
    cost: string;
  }>((resolve, reject) => {
    console.log(prefix, `invoking...`);
    Taro.request({
      method: "POST",
      url: `https://api.coze.cn/v1/workflow/run`,
      data: {
        workflow_id: opts.workflow_id,
        bot_id: opts.bot_id,
        parameters: {
          BOT_USER_INPUT: opts.input || "",
          ...(opts.parameters || {}),
        },
      },
      header: {
        Authorization: `Bearer ${opts.token}`,
        "Content-Type": "application/json",
      },
      success: (res) => {
        console.log(prefix, `success`, res);
        resolve(res.data);
      },
      fail: (err) => {
        console.error(prefix, err);
        reject(err);
      },
    });
  });
  console.log(prefix, `response`, result);
  if (result.code) {
    console.error(prefix, result.msg);
    throw new Error(result.msg);
  }
  return JSON.parse(result.data);
}
