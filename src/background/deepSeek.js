








async function main(messageArr) {
  const model = "deepseek/deepseek-chat-v3.1:free";
  const token = "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";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      model,          // just pass the model slug here
      messages: messageArr,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("Error:", data);
    throw new Error(data.error?.message || "Unknown API error");
  }

  console.log(data.choices?.[0]?.message?.content); 
  return {
    data,
    output: data.choices?.[0]?.message?.content,
  };
}


const arr = [
        {
          role: "user",
          content: "What is the meaning of life?",
        },
      ]; 

main(arr); 