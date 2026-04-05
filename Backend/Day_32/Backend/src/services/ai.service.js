import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  tool,
  createAgent,
} from "langchain";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  // model: "gemini-2.5-flash-lite",
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const mistralMedModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description:
    "Search the internet for relevant information to answer user queries.",
  schema: z.object({
    query: z
      .string()
      .describe(
        "The search query provided by the user. It should be a concise and clear question or statement that the user wants to find information about on the internet.",
      ),
  }),
});

const agent = createAgent({
  model: mistralMedModel,
  tools: [searchInternetTool],
});

export async function generateResponse(messages) {
  console.log(messages);

  const response = await agent.invoke({
    messages: [
      new SystemMessage(`
               You are a helpful and precise assistant.

For ANY query involving:
- latest news
- current events
- recent updates
- real-time information

You MUST use the "search_internet" tool.

DO NOT answer from memory for such queries.

After using the tool:
- Analyze the results
- Provide a clean, structured answer
- Summarize key insights

If no useful results are found, say you don't know.
`),
      ...messages.map((msg) => {
        if (msg.role == "user") {
          return new HumanMessage(msg.content);
        } else if (msg.role == "ai") {
          return new AIMessage(msg.content);
        }
      }),
    ],
  });
  console.log(JSON.stringify(response, null, 2));
  return response.messages[response.messages.length - 1].text;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
    `),
    new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
    `),
  ]);

  return response.text;
}
