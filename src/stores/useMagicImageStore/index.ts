import { create } from "zustand";
import Taro from "@tarojs/taro";
import { useCozeStore } from "../useCozeStore";

interface MagicImageStore {
  selectTargetImage(): Promise<string | null>;
  generateNewImage(options: {
    image_url: string;
    prompt: string;
  }): Promise<unknown>;
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
      const uploadFile = useCozeStore.getState().uploadFile;
      const uploadResult = await uploadFile({
        filePath: image_url,
      });
      const invokeWorkflow = useCozeStore.getState().invokeWorkflow;
      const result = await invokeWorkflow({
        workflow_id: "7436821443897769999",
        parameters: {
          image: uploadResult.id,
          prompt: prompt,
        },
      });
      console.log(`[magicImage] generate result`, result);
      return result;
    },
  };
});
