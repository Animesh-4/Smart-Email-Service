const { classifyEmail } = require('./aiService');

async function test() {
  console.log("Asking Gemini...");
  
  const result = await classifyEmail(
    "Meeting Update", 
    "Hey team, can we move the sprint review to Thursday? Thanks."
  );
  
  console.log("Result:", result);
}

test();