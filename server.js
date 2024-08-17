const express = require('express');
const path = require('path');
const app = express();
const PORT = 5500;
const dotenv = require('dotenv');
console.log('env:', dotenv.config().parsed);

// 静态文件服务
app.use(express.static(path.join(__dirname)));

// API 路由
app.get('/projects/mine', (req, res) => {
    console.log("现在在这里，请注意，这是一个API路由");
    const userId = req.query.user_id;
    // 这里处理项目数据的逻辑
    res.json({ projects: [/* 项目数据 */] });
});

// 所有其他路由都返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

