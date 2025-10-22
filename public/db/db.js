// db.js
import Dexie from "dexie";

export const db = new Dexie("chatbot");
db.version(1).stores({
  customization: "++id, bgColor, chatbotName,logoImage,websiteUrl,welcomeMsg",
});

