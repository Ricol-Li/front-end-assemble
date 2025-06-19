const express = require('express')
const app = express()
const port = 8000

// app.get('/', (req, res) => {
// 	console.log(req.query)
// 	res.send('hello world')
// })

// 将public设置为静态资源目录以后会默认访问index.html
app.use(express.static('public')) 
app.use(express.static('images')) // 不指定路径，http://localhost:8000/success_icon.png
app.use('/images',express.static('images')) // 指定路径，http://localhost:8000/images/success_icon.png

app.get('/user/:id', (req, res) => {
	console.log('params', req.params)
	console.log('query', req.query)
	res.send(req.params.id)
})


app.listen(port, () => {
	console.log(`app is running at http://localhost:${port}`)
})

