const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// These are the most common model names currently active
const candidates = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-001",
  "gemini-1.5-flash-8b",
  "gemini-pro",
  "gemini-1.0-pro"
];

async function scan() {
  console.log("🔍 Scanning for a working model...");
  
  for (const name of candidates) {
    try {
      process.stdout.write(`Testing model: "${name}"... `);
      const model = genAI.getGenerativeModel({ model: name });
      
      // Try to send a tiny prompt
      await model.generateContent("Hello");
      
      console.log("\n✅ SUCCESS! This model works.");
      console.log(`👉 PLEASE UPDATE aiService.js TO USE: "${name}"`);
      return; 
    } catch (e) {
      console.log("❌ Failed (404)");
    }
  }
  
  console.log("\n⚠️ All models failed. This usually means the API Key is invalid or the 'Generative Language API' is not enabled in your Google Cloud Console.");
}

scan();