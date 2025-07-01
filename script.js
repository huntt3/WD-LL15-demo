
// Get references to the buttons and response div
const iceBtn = document.getElementById('iceBtn');
const factBtn = document.getElementById('factBtn');
const jokeBtn = document.getElementById('jokeBtn');
const weatherBtn = document.getElementById('weatherBtn');
const responseDiv = document.getElementById('response');

// This function sends a prompt to OpenAI and returns the response text
async function getOpenAIResponse(prompt) {
  // Show a fun loading message and emoji while waiting for the AI to respond
  const loadingMessages = [
    "Mixing up some icebreakers... 🧊",
    "Finding something fun to say... 🎉",
    "Warming up my brain... 🤖",
    "Getting ready to break the ice... 🧊😄",
    "Cooking up a cool response... 🍦"
  ];
  // Pick a random loading message
  const randomIndex = Math.floor(Math.random() * loadingMessages.length);
  responseDiv.textContent = loadingMessages[randomIndex];

  // Get the selected context from the dropdown
  const contextDropdown = document.getElementById('contextDropdown');
  let context = 'general';
  if (contextDropdown) {
    context = contextDropdown.value;
  }

  // Set the system message based on the selected context
  let systemContent = "You are Fillr, a friendly, positive, and helpful conversation starter bot. Keep responses short, fun, and easy for anyone to join in.";
  if (context === 'team') {
    systemContent = "You are Fillr, a friendly bot for team meetings. Help people connect, share, and feel comfortable. Keep it professional but fun!";
  } else if (context === 'classroom') {
    systemContent = "You are Fillr, a helpful classroom assistant. Make students feel welcome and encourage participation. Keep it school-appropriate and positive!";
  } else if (context === 'game') {
    systemContent = "You are Fillr, a fun bot for game night! Encourage laughter, playfulness, and friendly competition. Keep things light and energetic!";
  }

  // Call the OpenAI API using fetch
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${OPENAI_API_KEY}`
  };
  // Add a system message to control the bot's personality
  const systemMessage = {
    role: "system",
    content: systemContent
  };
  const userMessage = { role: "user", content: prompt };
  const body = JSON.stringify({
    model: "gpt-4.1",
    messages: [systemMessage, userMessage],
    max_tokens: 60
  });

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: body
    });

    const data = await res.json();

    // Get the response text from the API result
    const reply = data.choices && data.choices[0].message.content;
    return reply || "Sorry, I couldn't think of anything!";
  } catch (error) {
    // Show a friendly error message to the user
    responseDiv.textContent = "Uh oh! I couldn't reach the AI right now. Please try again in a moment. 🛠️";
    return "";
  }
}

// Add event listeners for each button
iceBtn.addEventListener('click', async () => {
  // Use a random icebreaker prompt for more variety
  const prompts = [
    "Share a unique icebreaker question that helps people get to know each other.",
    "What's a creative question to start a group conversation?",
    "Suggest a fun, unexpected icebreaker for a group of strangers.",
    "Give me a lighthearted question to help people open up.",
    "What's a silly or surprising question to break the ice?"
  ];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  const reply = await getOpenAIResponse(prompt);
  if (reply) {
    responseDiv.textContent = reply;
  }
});

factBtn.addEventListener('click', async () => {
  // Use a random fact prompt for more variety
  const prompts = [
    "Tell me a weird science fact that will surprise people.",
    "Share an unusual fact about animals or nature.",
    "What's a fun historical fact that sounds made up?",
    "Give me a fact that most people would find hard to believe.",
    "What's a quirky fact that makes people say 'wow'?"
  ];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  const reply = await getOpenAIResponse(prompt);
  if (reply) {
    responseDiv.textContent = reply;
  }
});

jokeBtn.addEventListener('click', async () => {
  // Use a random joke prompt for more variety
  const prompts = [
    "Tell me a short, clean joke that will make people smile.",
    "Share a pun or wordplay joke that's easy to understand.",
    "What's a silly joke for all ages?",
    "Give me a friendly, light-hearted joke for a group.",
    "Tell me a joke that's perfect for breaking the ice."
  ];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  const reply = await getOpenAIResponse(prompt);
  if (reply) {
    responseDiv.textContent = reply;
  }
});

weatherBtn.addEventListener('click', async () => {
  // Use a random weather prompt for more variety
  const prompts = [
    "Suggest a fun question to get people talking about the weather where they are.",
    "What's a creative way to ask someone about their local weather?",
    "Give me a weather-related conversation starter that's not boring.",
    "How can I ask about the weather in a way that leads to a fun story?",
    "Share a playful weather question to get people chatting."
  ];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  const reply = await getOpenAIResponse(prompt);
  if (reply) {
    responseDiv.textContent = reply;
  }
});
