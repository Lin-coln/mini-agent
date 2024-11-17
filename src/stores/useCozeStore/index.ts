import { create } from "zustand";
import Taro from "@tarojs/taro";
import { invokeWorkflow } from "./invokeWorkflow";
import { uploadFile } from "./uploadFile";

type OptionalTokenFn<Func extends (opt: any) => any> = Omit<
  Parameters<Func>[0],
  "token"
> & { token?: string };

interface CozeStore {
  token: string;
  setToken(token: string): void;
  uploadFile(
    options: OptionalTokenFn<typeof uploadFile>,
  ): ReturnType<typeof uploadFile>;
  invokeWorkflow<T = any>(
    options: OptionalTokenFn<typeof invokeWorkflow>,
  ): Promise<T>;
}

export const useCozeStore = create<CozeStore>((set, get) => {
  const CozeStorage = {
    getToken() {
      return Taro.getStorageSync("coze.token");
    },
    setToken(val: string) {
      Taro.setStorageSync("coze.token", val);
    },
  };

  return {
    token: CozeStorage.getToken(),
    setToken(token) {
      CozeStorage.setToken(token);
      set({ token });
    },
    uploadFile(opts) {
      return uploadFile(preprocessOptions(opts));
    },
    invokeWorkflow<T = any>(opts) {
      return invokeWorkflow<T>(preprocessOptions(opts));
    },
  };

  function preprocessOptions<T extends { token?: string }>(
    option: T,
  ): T & { token: string } {
    if ("token" in option && option.token) {
      return option as T & { token: string };
    }
    const currentToken = get().token;
    if (currentToken) {
      return { token: currentToken, ...option };
    }
    throw new Error(`coze token not found`);
  }
});
