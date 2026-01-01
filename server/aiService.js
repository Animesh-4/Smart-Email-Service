async function classifyEmail(subject, body) {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const text = (subject + " " + body).toLowerCase();
  
  let category = "Personal";
  let confidence = 75;

  // 1. Logic for WORK
  if (text.includes("jira") || text.includes("bug") || text.includes("meeting") || text.includes("project") || text.includes("deadline")) {
    category = "Work";
    confidence = 92;
  } 
  // 2. Logic for PROMOTIONS
  else if (text.includes("sale") || text.includes("pizza") || text.includes("offer") || text.includes("discount") || text.includes("free")) {
    category = "Promotions";
    confidence = 88;
  }

  return { category, confidence };
}

module.exports = { classifyEmail };