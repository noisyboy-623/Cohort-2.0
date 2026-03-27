import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
model: "mistral-small-latest",
temperature: 0
});

export async function testMistralAi(){
    model.invoke("Why do parrots talk?").then((response)=>{
        console.log(response.text)
    })
}

