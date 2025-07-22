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

    // 左侧：会话名（可点击切换）
    const nameSpan = document.createElement('span');
    nameSpan.textContent = session.name;
    nameSpan.className = 'cursor-pointer flex-1';
    nameSpan.addEventListener('click', () => {
      currentSessionId = sessionId;
      localStorage.setItem('myclean_current_session', sessionId);
      localStorage.setItem('myclean_chat_history', JSON.stringify(session.messages));
      renderChatList();
      location.reload();
    });

    // 右侧：操作按钮区域
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'flex items-center gap-2';

    // ✏️ Rename
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

    // 🗑️ Delete
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'text-xs text-gray-600 hover:text-red-600';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Delete this chat?')) {
        delete sessions[sessionId];
        saveSessions(sessions);

        // 如果删除的是当前会话，切换到第一个
        const remaining = Object.keys(sessions);
        if (remaining.length > 0) {
          currentSessionId = remaining[0];
          localStorage.setItem('myclean_current_session', currentSessionId);
          localStorage.setItem('myclean_chat_history', JSON.stringify(sessions[currentSessionId].messages));
        } else {
          currentSessionId = null;
          localStorage.removeItem('myclean_current_session');
          localStorage.removeItem('myclean_chat_history');
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
  const sessionId = Number(Date.now()); 
  const sessionName = `Chat ${Object.keys(sessions).length + 1}`;
  sessions[sessionId] = {
    name: sessionName,
    messages: []
  };
  saveSessions(sessions);
  currentSessionId = sessionId;
  localStorage.setItem('myclean_current_session', sessionId);
  localStorage.setItem('myclean_chat_history', JSON.stringify([]));
  renderChatList();
  location.reload();
}

document.getElementById('newChatBtn')?.addEventListener('click', createNewChat);

window.addEventListener('DOMContentLoaded', () => {
  const sessions = getSessions();
  const savedSession = localStorage.getItem('myclean_current_session');
  if (savedSession && sessions[savedSession]) {
    currentSessionId = savedSession;
    localStorage.setItem('myclean_chat_history', JSON.stringify(sessions[savedSession].messages));
  } else {
    createNewChat();
  }
  renderChatList();
});
