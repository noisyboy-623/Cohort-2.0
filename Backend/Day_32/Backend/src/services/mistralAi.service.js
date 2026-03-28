//Mistral
import { ChatMistralAI } from "@langchain/mistralai";

const mistralModel = new ChatMistralAI({
model: "mistral-small-latest",
temperature: 0
});

export async function testMistralAi(){
    model.invoke("Why do parrots talk?").then((response)=>{
        console.log(response.text)
    })
}

//Gemini
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAi(){
    model.invoke("Why do parrots talk?").then((response)=>{
        console.log(response.text)
    })
}