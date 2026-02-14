const token =
  "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";

async function main() {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [
          { role: "user", content: "can you explain what life meant to you" },
        ],
      }),
    },
  );

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content;
  console.log(data, output);
  return { data, output };
}

main();
