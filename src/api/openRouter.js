import axios from "axios";

const openRouter = axios.create({
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost:5173", // or your actual deployed URL
      "X-Title": "Baymax Assistant",
    },
  });
export const sendMessageToOpenRouter = async (message) => {
  try {
    const res = await openRouter.post("/chat/completions", {
      model: "openai/gpt-3.5-turbo", // or try 'meta-llama/llama-2-13b-chat'
      messages: [
        {
          role: "system",
          content: "You are Baymax, a kind and caring healthcare assistant. Help users with their health-related queries.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return res.data.choices[0].message.content;
  } catch (err) {
    console.error("OpenRouter Error:", err);
    return "Sorry, I couldn't respond right now.";
  }
};
