// addBooking.js
const express = require('express');
const pool = require('./db'); // 确保 db.js 存在并正确导出连接池

const router = express.Router();

router.post('/bookings', async (req, res) => {
  
  console.log('📡 [POST] /api/bookings 路由已触发');

  try {
    const { serviceType, address, mobile, datetime, userId } = req.body;

    console.log('📥 收到的数据：', {
      serviceType,
      address,
      mobile,
      datetime,
      userId
    });

    // 输入校验（可选）
    if (!serviceType || !address || !mobile || !datetime || !userId) {
      console.warn('⚠️ 有字段为空');
      return res.status(400).json({ success: false, message: '请填写所有字段' });
    }

    const sql = `
      INSERT INTO Reservation 
      (Reservation_address, Reservation_phone_number, Reservation_datetime, Reservation_service_type, User_ID)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [address, mobile, datetime, serviceType, userId];

    const [result] = await pool.execute(sql, values);
    console.log('✅ 插入成功，预订ID:', result.insertId);

    res.json({ success: true, insertId: result.insertId });

  } catch (err) {
    console.error('❌ 插入预订失败:', err);
    res.status(500).json({
      success: false,
      message: '服务器错误：无法插入预订',
      error: err.message
    });
  }
});

module.exports = router;
