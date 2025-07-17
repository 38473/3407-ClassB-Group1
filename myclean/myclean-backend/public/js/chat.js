const chatBox = document.getElementById('chat-box');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');

const chatIndex = localStorage.getItem('selected_chat_index') || '0';
const CHAT_HISTORY_KEY = `myclean_chat_history_${chatIndex}`;


const aiResponses = [
  "Hello! I'm the AI assistant from my clean. How can I assist you today?",
  "We offer professional cleaning services for homes, offices, and special areas.",
  "Please let me know your needs, and I'll do my best to help.",
  "Is there anything specific you'd like to know about our cleaning services?"
];

// Check if the agent is online based on working hours (9 AM - 5 PM)
function isAgentOnline() {
  const now = new Date();
  const currentHour = now.getHours();
  return currentHour >= 9 && currentHour < 17;
}

// Update the agent status indicator and text
function updateAgentStatus() {
  if (isAgentOnline()) {
    statusIndicator.style.backgroundColor = 'green';
    statusText.textContent = 'Online';
  } else {
    statusIndicator.style.backgroundColor = 'red';
    statusText.textContent = 'Offline';
  }
}

// Save chat history to localStorage
function saveChatHistory() {
  const messages = Array.from(chatBox.children).map(msg => {
    const bubble = msg.querySelector('div');
    return {
      text: bubble.textContent,
      isUser: msg.classList.contains('text-right'),
      isAgent: bubble.classList.contains('bg-green-100'),
      datetime: new Date().toISOString()
    };
  });
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  const sessionId = localStorage.getItem('myclean_current_session');
  const userId = localStorage.getItem('myclean_user_id');
  if (sessionId && userId) {
    fetch('/api/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, userId, messages })
    })
    .then(res => res.json())
    .then(data => {
      if(data.message) {
        console.log(data.message);
      } else {
        console.error('Save chat failed:', data.error);
      }
    })
    .catch(err => console.error('Save chat error:', err));
  }
}

// Load chat history from localStorage
function loadChatHistory() {
  const saved = localStorage.getItem(CHAT_HISTORY_KEY);
  if (!saved) return;
  const messages = JSON.parse(saved);
  messages.forEach(msg => addMessage(msg.text, msg.isUser, msg.isAgent));
}

// Add a message bubble to the chat box
function addMessage(text, isUser = false, isAgent = false) {
  const message = document.createElement('div');
  message.className = isUser ? 'text-right' : 'text-left';

  const bubble = document.createElement('div');
  bubble.className = `${isUser
    ? 'bg-blue-500 text-white'
    : isAgent
      ? 'bg-green-100 text-gray-800'
      : 'bg-gray-200 text-gray-800'
  } inline-block p-3 rounded-lg whitespace-pre-line leading-relaxed max-w-[60vw] min-w-[80px] break-words`;
  bubble.textContent = text;
  message.appendChild(bubble);
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;

  saveChatHistory(); // Save after adding each message
}

// Simulate typing effect for AI responses split into multiple lines
function addTypingMessage(lines) {
  if (!lines || lines.length === 0) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'text-left';

  const bubble = document.createElement('div');
  bubble.className = 'bg-green-100 text-gray-800 inline-block p-3 rounded-lg whitespace-pre-line leading-relaxed max-w-[60vw] min-w-[80px] break-words';
  bubble.textContent = '';

  wrapper.appendChild(bubble);
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;

  let index = 0;
  let fullText = '';

  function typeLine() {
    if (index < lines.length) {
      fullText += lines[index] + '\n\n';
      bubble.textContent = fullText.trim();
      chatBox.scrollTop = chatBox.scrollHeight;
      index++;
      setTimeout(typeLine, 1000);
    } else {
      chatBox.removeChild(wrapper);
      addMessage(fullText.trim(), false, true);
    }
  }

  typeLine();
}

// AI reply logic based on user input
function aiReply(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("transfer to agent")) {
    if (isAgentOnline()) {
      addMessage("[Agent] You are now connected with a live agent.", false, true);
    } else {
      addMessage("The support team is currently offline. Our working hours are from 9 AM to 5 PM.", false);
    }
    return;
  }

  if (
    lowerMessage.includes("services") ||
    lowerMessage.includes("what do you offer") ||
    lowerMessage.includes("what services") ||
    lowerMessage.includes("cleaning services") ||
    lowerMessage.includes("do you provide") ||
    lowerMessage.includes("what kind of cleaning")
  ) {
    const serviceLines = [
      "We are committed to making your space spotless and stress-free.",
      "We offer a wide range of professional cleaning services tailored to your needs:",
      "✓ Home Cleaning – Regular or one-time cleaning for apartments, condos, and houses.",
      "✓ Deep Cleaning – Thorough top-to-bottom cleaning for kitchens, bathrooms, and other high-use areas.",
      "✓ Move-In / Move-Out Cleaning – Ensure a fresh start or smooth transition with detailed property cleaning.",
      "✓ Office & Commercial Cleaning – Keep your workplace clean, healthy, and professional.",
      "✓ Pet-Friendly Cleaning – Specialized care for homes with furry friends.",
      "✓ Custom Packages & Subscriptions – Flexible cleaning plans to fit your schedule and budget."
    ];
    addTypingMessage(serviceLines);
    return;
  }

  const knownKeywords = [
    "cleaning", "price", "service", "book", "schedule", "appointment",
    "location", "available", "hours", "support", "chat", "payment", "refund"
  ];

  const isRecognized = knownKeywords.some(keyword => lowerMessage.includes(keyword));

  setTimeout(() => {
    if (isRecognized) {
      const reply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addMessage(reply, false);
    } else {
      addMessage("I'm sorry, I didn't fully understand that. Could you please rephrase or ask something else?", false);
    }
  }, 1000);
}

// Handle form submit event for sending messages
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    addMessage(text, true);
    aiReply(text);
    input.value = '';
  }
});

updateAgentStatus();
loadChatHistory();
if (!localStorage.getItem(CHAT_HISTORY_KEY)) {
  addMessage(aiResponses[0], false);
}

setInterval(updateAgentStatus, 60000);
