import Taro from "@tarojs/taro";

export async function uploadFile(opts: {
  token: string;
  filePath: string;
}): Promise<{
  file_name: string;
  id: string;
  created_at: number;
  bytes: number;
}> {
  const prefix = `[coze.uploadFile]`;
  const result = await new Promise<{
    code: number;
    msg: string;
    data: {
      file_name: string;
      id: string;
      created_at: number;
      bytes: number;
    };
  }>((resolve, reject) => {
    console.log(prefix, `uploading`);
    Taro.uploadFile({
      url: `https://api.coze.cn/v1/files/upload`,
      filePath: opts.filePath,
      name: "file",
      header: {
        Authorization: `Bearer ${opts.token}`,
      },
      success: (res) => {
        console.log(prefix, `success`, res);
        resolve(JSON.parse(res.data));
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

  return result.data;
}

async function getFilesRetrieve(options) {
  const result = await new Promise<any>((resolve, reject) => {
    console.log(`[coze::request] requesting...`);
    Taro.request({
      method: "GET",
      url: `https://api.coze.cn/v1/files/retrieve`,
      data: {
        file_id: options.file_id,
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
  return result;
}
