const CHAT_SESSIONS_KEY = 'myclean_chat_sessions';
let currentSessionId = null;

function getSessions() {
  return JSON.parse(localStorage.getItem(CHAT_SESSIONS_KEY)) || {};
}

function saveSessions(sessions) {
  localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(sessions));
}

function renderChatList() {
  const chatList = document.getElementById('chatList');
  chatList.innerHTML = '';

  const sessions = getSessions();
  Object.keys(sessions).forEach(sessionId => {
    const session = sessions[sessionId];

    const li = document.createElement('li');
    li.className = `flex items-center justify-between px-2 py-2 rounded hover:bg-blue-100 group ${sessionId === currentSessionId ? 'bg-blue-200 font-semibold' : ''}`;

    // Session name (clickable)
    const nameSpan = document.createElement('span');
    nameSpan.textContent = session.name;
    nameSpan.className = 'cursor-pointer flex-1';
    nameSpan.addEventListener('click', () => {
      currentSessionId = sessionId;
      localStorage.setItem('myclean_current_session', sessionId);
      localStorage.setItem('selected_chat_index', sessionId);
      localStorage.setItem(`myclean_chat_history_${sessionId}`, JSON.stringify(session.messages));
      renderChatList();
      location.reload();
    });

    // Operation button area
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'flex items-center gap-2';

    // rename
    const renameBtn = document.createElement('button');
    renameBtn.textContent = '✏️';
    renameBtn.className = 'text-xs text-gray-600 hover:text-blue-600';
    renameBtn.title = 'Rename';
    renameBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const newName = prompt('Rename this chat:', session.name);
      if (newName && newName.trim()) {
        sessions[sessionId].name = newName.trim();
        saveSessions(sessions);
        renderChatList();
      }
    });

    // delete
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'text-xs text-gray-600 hover:text-red-600';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Delete this chat?')) {
        delete sessions[sessionId];
        localStorage.removeItem(`myclean_chat_history_${sessionId}`);
        saveSessions(sessions);

        const remaining = Object.keys(sessions);
        if (remaining.length > 0) {
          const first = remaining[0];
          currentSessionId = first;
          localStorage.setItem('myclean_current_session', first);
          localStorage.setItem('selected_chat_index', first);
          localStorage.setItem(`myclean_chat_history_${first}`, JSON.stringify(sessions[first].messages));
        } else {
          currentSessionId = null;
          localStorage.removeItem('myclean_current_session');
          localStorage.removeItem('selected_chat_index');
        }

        renderChatList();
        location.reload();
      }
    });

    actionsDiv.appendChild(renameBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(nameSpan);
    li.appendChild(actionsDiv);
    chatList.appendChild(li);
  });
}

function createNewChat() {
  const sessions = getSessions();
  const sessionId = Date.now(); 
  const sessionName = `Chat ${Object.keys(sessions).length + 1}`;

  const welcomeMessage = {
    text: "Hello! I'm the AI assistant from my clean. How can I assist you today?",
    isUser: false,
    isAgent: true,
    datetime: new Date().toISOString()
  };

  sessions[sessionId] = {
    name: sessionName,
    messages: [welcomeMessage]
  };

  saveSessions(sessions);
  currentSessionId = sessionId;

  localStorage.setItem('myclean_current_session', sessionId);
  localStorage.setItem('selected_chat_index', sessionId);
  localStorage.setItem(`myclean_chat_history_${sessionId}`, JSON.stringify([welcomeMessage]));

  renderChatList();
  location.reload();
}

document.getElementById('newChatBtn')?.addEventListener('click', createNewChat);

window.addEventListener('DOMContentLoaded', () => {
  const sessions = getSessions();
  const savedSession = localStorage.getItem('myclean_current_session');

  if (savedSession && sessions[savedSession]) {
    currentSessionId = savedSession;
    localStorage.setItem('selected_chat_index', savedSession);
    localStorage.setItem(`myclean_chat_history_${savedSession}`, JSON.stringify(sessions[savedSession].messages));
  } else {
    createNewChat();
  }

  renderChatList();
});
