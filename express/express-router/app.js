// 创建 express 服务
const express = require('express')
const app = express()
const indexRouter = require('./routes/index')

app.use(express.json()) // 解析JSON请求体 post请求 content-type: application/json
app.use(express.urlencoded({ extended: true })) // 解析URL编码请求体 post请求 application/x-www-form-urlencoded
// 使用路由中间件
app.use('/', indexRouter)
app.get('/user/:subpath', (req, res) => {
  res.send(`User subpath: ${req.params.subpath}`)
})
const port = 8000
app.listen(port, () => {
  console.log(`app is running at http://localhost:${port}`)
})
