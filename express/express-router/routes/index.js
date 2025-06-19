// 创建路由
const express = require('express')
const router = express.Router()

/**
 * ? 1 字符串路径
 * @description 最简单的形式，直接匹配指定的url路径
 */
router.get('/', (req, res) => {
  res.send('hello world')
})

router.get('/about', (req, res) => {
  res.send('about page')
})

router.post('/submit', (req, res) => {
  console.log('header', req.headers)
  console.log('body', req.body)
  res.send('Form submitted')
})

module.exports = router
