const express = require('express');
const pool = require('./db'); // 你的数据库连接模块
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 显示各页面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account.html'));
});
app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});
app.get('/setting', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'setting.html'));
});

// 存储聊天消息接口（不传 ChatMessage_ID，数据库自动生成）
app.post('/api/chat/message', async (req, res) => {
  try {
    const { content, sender, datetime, sessionId, userId } = req.body;

    const sql = `
      INSERT INTO ChatMessage 
      (ChatMessage_content, ChatMessage_sender, ChatMessage_datetime, ChatSession_ID, User_ID)
      VALUES (?, ?, ?, ?, ?)
    `;
    await pool.query(sql, [content, sender, datetime, sessionId, userId]);

    res.status(201).json({ message: 'Message saved successfully.' });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: err.message });
  }
});

// 获取聊天消息接口
app.get('/api/chat/messages', async (req, res) => {
  try {
    const { sessionId, userId } = req.query;

    const [rows] = await pool.query(`
      SELECT * FROM ChatMessage
      WHERE ChatSession_ID = ? AND User_ID = ?
      ORDER BY ChatMessage_datetime ASC
    `, [sessionId, userId]);

    res.json(rows);
  } catch (err) {
    console.error('Error retrieving messages:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
