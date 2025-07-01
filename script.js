
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

  // Call the OpenAI API using fetch
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${OPENAI_API_KEY}`
  };
  // Add a system message to control the bot's personality
  const systemMessage = {
    role: "system",
    content: "You are Fillr, a friendly, positive, and helpful conversation starter bot. Keep responses short, fun, and easy for anyone to join in."
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
  // Ask for an icebreaker question
  const prompt = "Give me a fun, friendly icebreaker question for a group.";
  const reply = await getOpenAIResponse(prompt);
  // Show the response on the page
  responseDiv.textContent = reply;
});

factBtn.addEventListener('click', async () => {
  // Ask for a weird fact
  const prompt = "Tell me a surprising, weird fact that most people don't know.";
  const reply = await getOpenAIResponse(prompt);
  // Show the response on the page
  responseDiv.textContent = reply;
});

jokeBtn.addEventListener('click', async () => {
  // Ask for a friendly joke
  const prompt = "Tell me a short, friendly joke anyone can enjoy.";
  const reply = await getOpenAIResponse(prompt);
  // Show the response on the page
  responseDiv.textContent = reply;
});

weatherBtn.addEventListener('click', async () => {
  // Ask for a weather-related conversation starter
  const prompt = "Give me a weather-related question that gets people to share what the weather is like where they are.";
  const reply = await getOpenAIResponse(prompt);
  // Show the response on the page
  responseDiv.textContent = reply;
});
