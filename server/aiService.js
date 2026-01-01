// server/aiService.js (MOCK MODE)

async function classifyEmail(subject, body) {
  console.log("⚠️  USING MOCK AI: Real Gemini API is currently bypassed.");
  
  // Simulate a short delay like a real AI server
  await new Promise(resolve => setTimeout(resolve, 800));

  const text = (subject + " " + body).toLowerCase();
  
  // Simple keyword logic to simulate "intelligence"
  let category = "Personal";
  let confidence = 75;

  if (text.includes("meeting") || text.includes("sprint") || text.includes("deadline") || text.includes("project")) {
    category = "Work";
    confidence = 92;
  } else if (text.includes("sale") || text.includes("discount") || text.includes("off") || text.includes("offer")) {
    category = "Promotions";
    confidence = 88;
  }

  return {
    category,
    confidence
  };
}

module.exports = { classifyEmail };