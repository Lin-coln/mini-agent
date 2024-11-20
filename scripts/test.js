void main();
async function main() {
  const fetch = await import("node-fetch").then((x) => x.default);

  const token =
    "pat_rWrGNMaHR5Mrqu8xARQDrl1PAh0q9nRNgukyvpnU77gemW41yP3jpKh2hfKha9M3";

  const resp = await fetch(`https://api.coze.cn/v3/chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bot_id: `7438451296971341860`,
      // bot_id: `7436789319987904547`,
      user_id: `123456789`,
      stream: true,
      auto_save_history: false,
      additional_messages: [
        {
          role: "user",
          content_type: "object_string",
          content: JSON.stringify([
            { type: "image", file_id: `7439011189184610339` },
            // { type: "text", text: `test` },
          ]),
        },
      ],
    }),
  });

  if (!resp.ok || resp.status !== 200) {
    throw new Error(resp.statusText);
  }

  if (resp.headers.get("content-type") !== "text/event-stream") {
    throw new Error(
      `unexpected content-type: ${resp.headers.get("content-type")}`,
    );
  }

  const result = await new Promise((resolve) => {
    const result = {};
    resp.body.on("readable", () => {
      let chunk;
      while (true) {
        chunk = resp.body.read();
        if (chunk === null) break;
        resolveChunk(chunk);
        if (!!result.usage) {
          resolve(result);
          break;
        }
      }
    });
    function resolveChunk(chunk) {
      let [event, data] = chunk.toString().split("\n");
      event = event.slice("event:".length);
      data = JSON.parse(data.slice("data:".length));
      handleEventStream(event, data);
    }
    function handleEventStream(event, data) {
      if (event === `conversation.message.delta`) return;
      console.log(event, data);
      if (event === `conversation.message.completed`) {
        if (data.type === `tool_response`) {
          result.content = data.content;
        }
      }
      if (event === `conversation.chat.completed`) {
        result.usage = data.usage;
      }
    }
  });

  console.log(JSON.stringify(result));
}
