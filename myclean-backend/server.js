
const express = require('express');
const path = require('path');
const bookingRoutes = require('./addBooking'); 
const pool = require('./db'); // 数据库连接模块

const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


// 静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 注册用户
app.post('/api/register', async (req, res) => {
  console.log('POST /api/register 接收到请求');
  console.log('register route hit');
  const { username, email, password } = req.body;

  try {
    const sql = `
      INSERT INTO User (User_fname, User_email, User_password)
      VALUES (?, ?, ?)
    `;
    const [result] = await pool.query(sql, [username, email, password]);
    console.log('插入结果:', result);
    res.status(201).json({ success: true, userId: result.insertId });
  } catch (err) {
    console.error('❌ Error during registration:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT User_ID FROM User WHERE User_email = ? AND User_password = ?',
      [email, password]
    );

    if (rows.length === 1) {
      // 登录成功，返回 User_ID
      res.json({ success: true, userId: rows[0].User_ID });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// ✅ 注册 booking 路由，前缀为 /api
app.use('/api', bookingRoutes);

// 页面路由
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



// 聊天消息接口
app.post('/api/chat/message', async (req, res) => {
  try {
    let { content, sender, datetime, sessionId, userId } = req.body;

    // 如果 sessionId 是带前缀的字符串，比如 "session_1752729382520"
    if (typeof sessionId === 'string' && sessionId.startsWith('session_')) {
      sessionId = Number(sessionId.replace('session_', ''));
    } else {
      // 尝试直接转换成数字
      sessionId = Number(sessionId);
    }

    userId = Number(userId); // 确保 userId 是数字

    if (isNaN(sessionId) || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid sessionId or userId' });
    }

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

app.get('/api/chat/messages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ChatMessage ORDER BY ChatMessage_datetime DESC LIMIT 10');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching chat messages:', err);
    res.status(500).json({ error: err.message });
  }
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});