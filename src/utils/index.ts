import Taro from "@tarojs/taro";

export async function promiseWithToast<T = any>(
  opts: {
    loading: string;
    success?: string;
  },
  promiseOrAsyncFunc: Promise<T> | (() => Promise<T>),
): Promise<T> {
  await Taro.showLoading({ title: opts.loading, mask: true });

  let result: any;
  try {
    const promise =
      typeof promiseOrAsyncFunc === "function"
        ? promiseOrAsyncFunc()
        : promiseOrAsyncFunc;
    result = await promise;
  } finally {
    Taro.hideLoading();
  }
  if (opts.success) {
    await Taro.showToast({
      title: opts.success,
      icon: "success",
      duration: 1000,
    });
  }
  return result;
}
