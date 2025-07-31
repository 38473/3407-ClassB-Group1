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

// Agent status
function isAgentOnline() {
  const now = new Date();
  const currentHour = now.getHours();
  return currentHour >= 9 && currentHour < 17;
}
function updateAgentStatus() {
  if (isAgentOnline()) {
    statusIndicator.style.backgroundColor = 'green';
    statusText.textContent = 'Online';
  } else {
    statusIndicator.style.backgroundColor = 'red';
    statusText.textContent = 'Offline';
  }
}

// Save chat history
// Save chat history
function saveChatHistory() {
  const messages = Array.from(chatBox.children).map(msg => {
    const bubble = msg.querySelector('div');
    return {
      text: bubble.textContent,
      isUser: msg.classList.contains('text-right'),
      isAgent: bubble.classList.contains('bg-green-100'),
      datetime: new Date().toISOString() // Save timestamp for each message
    };
  });

  // Save to localStorage
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));

  // Retrieve session and user info from localStorage
  const sessionId = localStorage.getItem('myclean_current_session');
  const userId = localStorage.getItem('myclean_user_id');

  if (sessionId && userId && messages.length > 0) {
    const latest = messages[messages.length - 1]; // Get the latest message

    // Send the latest message to the backend API for database insertion
    fetch('/api/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: latest.text,                      // Message text
        sender: latest.isUser ? 'user' : 'bot',    // Sender (user or bot)
        datetime: latest.datetime,                 // Timestamp
        sessionId: sessionId,                      // Chat session ID
        userId: userId                             // User ID
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        console.log('✅ Message saved successfully:', data.message);
      } else {
        console.error('❌ Failed to save message:', data.error);
      }
    })
    .catch(err => console.error('❌ Save chat error:', err));
  }
}


// Load chat history (仅恢复，不加欢迎语)
function loadChatHistory() {
  const saved = localStorage.getItem(CHAT_HISTORY_KEY);
  if (saved) {
    const messages = JSON.parse(saved);
    messages.forEach(msg => addMessage(msg.text, msg.isUser, msg.isAgent));
  }
}

// Add message
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

  saveChatHistory();
}

// Typing animation
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

// AI reply logic
function aiReply(userMessage) {
  const isChinese = /[\u4e00-\u9fa5]/.test(userMessage); // 检查是否包含中文
  const msg = userMessage.trim();

  const serviceKeywords = isChinese
    ? ["服务", "你们提供", "有哪些服务", "清洁服务", "打扫", "保洁", "家政", "清理"]
    : ["services", "what do you offer", "what services", "cleaning services", "do you provide", "what kind of cleaning"];

  if (serviceKeywords.some(k => msg.includes(k))) {
    const serviceLines = isChinese
      ? [
          "我们致力于为您打造干净、无忧的生活与工作环境。",
          "我们提供多种专业清洁服务，满足不同需求：",
          "✓ 家庭清洁 – 日常或定期打扫公寓、住宅和别墅。",
          "✓ 深度清洁 – 对厨房、浴室等高频区域进行彻底清理。",
          "✓ 搬入/搬出清洁 – 让您轻松入住或退房。",
          "✓ 办公室与商业清洁 – 保持办公场所整洁与专业。",
          "✓ 宠物友好清洁 – 适用于有宠物的家庭，去除毛发与异味。",
          "✓ 定制套餐与订阅 – 灵活安排，省心省力。"
        ]
      : [
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

  if (msg.toLowerCase().includes("transfer to agent") || msg.includes("转人工")) {
    if (isAgentOnline()) {
      addMessage(isChinese ? "[人工客服] 您已连接上客服人员。" : "[Agent] You are now connected with a live agent.", false, true);
    } else {
      addMessage(isChinese ? "客服目前离线，我们的工作时间是每天 9:00 至 17:00。" : "The support team is currently offline. Our working hours are from 9 AM to 5 PM.", false);
    }
    return;
  }

  const knownKeywords = isChinese
    ? ["清洁", "打扫", "保洁", "价格", "费用", "服务", "预约", "时间", "地点", "付款", "支付", "退款", "聊天", "人工"]
    : ["cleaning", "price", "service", "book", "schedule", "appointment", "location", "available", "hours", "support", "chat", "payment", "refund"];

  const isRecognized = knownKeywords.some(keyword => msg.toLowerCase().includes(keyword));

  setTimeout(() => {
    if (isRecognized) {
      const reply = isChinese
        ? "您好，我是 My Clean 智能助理，很高兴为您服务！"
        : "Hello! I'm the AI assistant from My Clean. How can I assist you today?";
      addMessage(reply, false);
    } else {
      const fallback = isChinese
        ? "对不起，我没太明白您的意思，可以换一种方式问我吗？"
        : "I'm sorry, I didn't fully understand that. Could you please rephrase?";
      addMessage(fallback, false);
    }
  }, 800);
}

// Form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    addMessage(text, true);
    aiReply(text);
    input.value = '';
  }
});

// === Init ===
updateAgentStatus();
loadChatHistory();
setInterval(updateAgentStatus, 60000);
