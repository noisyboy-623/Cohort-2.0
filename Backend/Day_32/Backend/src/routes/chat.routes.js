import {Router} from "express"
import { sendMessageController, getChatsController, getMessagesController, deleteChatController } from "../controllers/chat.controller.js"
import { authUser } from "../middlewares/auth.middleware.js"

const chatRouter =  Router()

chatRouter.get("/", authUser, getChatsController)
chatRouter.post("/message", authUser, sendMessageController)
chatRouter.get("/:chatId/messages", authUser, getMessagesController)
chatRouter.delete("/delete/:chatId", authUser, deleteChatController)

export default chatRouter