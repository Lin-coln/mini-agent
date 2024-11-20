import { create } from "zustand";
import Taro from "@tarojs/taro";
import { useCozeStore } from "../useCozeStore";
import * as TextEncoding from "text-encoding-shim";

interface MagicImageStore {
  selectTargetImage(): Promise<string | null>;
  generateNewImage(options: {
    image_url: string;
    prompt: string;
  }): Promise<string>;
}

export const useMagicImageStore = create<MagicImageStore>((set, get) => {
  return {
    async selectTargetImage() {
      const filePath = await new Promise((resolve) => {
        Taro.chooseImage({
          count: 1,
          sourceType: ["album"],
          complete: (result) => resolve(result),
        });
      }).then((result: any) => {
        if (!result.tempFilePaths) return null;
        return result.tempFilePaths[0];
      });
      if (filePath) {
        console.log(`[magicImage] select: ${filePath}`);
      }
      return filePath;
    },
    async generateNewImage({ image_url, prompt }) {
      const { uploadFile, token } = useCozeStore.getState();
      const uploadResult = await uploadFile({ filePath: image_url });
      const file_id = uploadResult.id;
      const url = await requestUrlFromAgentChat({ token, file_id });
      const invokeWorkflow = useCozeStore.getState().invokeWorkflow;
      const result = await invokeWorkflow({
        workflow_id: "7436821443897769999",
        parameters: {
          image: url,
          prompt: prompt,
        },
      });
      console.log(`[magicImage] generate result`, result);
      return result.output;
    },
  };
});

type AgentChatResult = {
  content: { image: string };
  usage: {
    input_count: number;
    output_count: number;
    token_count: number;
  };
};
async function requestUrlFromAgentChat({ token, file_id }) {
  const result = await new Promise<AgentChatResult>((resolve) => {
    const result: AgentChatResult = {} as any;
    const req = Taro.request({
      url: `https://api.coze.cn/v3/chat`,
      method: "POST",
      enableChunked: true, // event-stream support
      header: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        bot_id: `7438451296971341860`,
        user_id: `123456789`,
        stream: true,
        auto_save_history: false,
        additional_messages: [
          {
            role: "user",
            content_type: "object_string",
            content: JSON.stringify([{ type: "image", file_id: file_id }]),
          },
        ],
      },
    });

    const decoder = new TextEncoding.TextDecoder("utf-8");
    req.onChunkReceived(({ data }) => {
      const messages = decoder
        .decode(new Uint8Array(data))
        .split("\n\n")
        .filter(Boolean);
      messages.forEach((msg) => resolveChunk(msg));
      if (!!result.usage && !!result.content) {
        resolve(result);
        req.abort();
      }
    });
    function resolveChunk(message: string) {
      let [event, data] = message.split("\n");
      event = event.slice("event:".length);
      data = JSON.parse(data.slice("data:".length));
      handleEventStream(event, data);
    }
    function handleEventStream(event: string, data: any) {
      if (event === `conversation.message.delta`) return;
      console.log(event, data);
      if (event === `conversation.message.completed`) {
        if (data.type === `answer`) {
          result.content = JSON.parse(data.content);
        }
      }
      if (event === `conversation.chat.completed`) {
        result.usage = data.usage;
      }
    }
  });
  console.log(`[requestUrlFromAgentChat]`, result);
  return result.content.image;
}
