
const express = require('express');
const path = require('path');
const bookingRoutes = require('./addBooking'); 
const pool = require('./db'); // Database connection module

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


// Static file directory
app.use(express.static(path.join(__dirname, 'public')));

// Registered User
app.post('/api/register', async (req, res) => {
  console.log('POST /api/register 接收到请求');
  console.log('register route hit');
  const { username, email, password } = req.body;

  try {
    const sql = `
      INSERT INTO User (User_name, User_email, User_password)
      VALUES (?, ?, ?)
    `;
    const [result] = await pool.query(sql, [username, email, password]);
    console.log('result:', result);
    res.status(201).json({ success: true, userId: result.insertId });
  } catch (err) {
    console.error('❌ Error during registration:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM User');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
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
      // Login successful, return User_ID
      res.json({ success: true, userId: rows[0].User_ID });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// ✅Register the booking route with the prefix /api
app.use('/api', bookingRoutes);

// Page Routing
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



// Chat message interface
app.post('/api/chat/message', async (req, res) => {
  try {
    let { content, sender, datetime, sessionId, userId } = req.body;

    // If sessionId is a string with a prefix, such as "session_1752729382520"
    if (typeof sessionId === 'string' && sessionId.startsWith('session_')) {
      sessionId = Number(sessionId.replace('session_', ''));
    } else {
      // Try converting directly to numbers
      sessionId = Number(sessionId);
    }

    userId = Number(userId); // Make sure userId is a number

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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});