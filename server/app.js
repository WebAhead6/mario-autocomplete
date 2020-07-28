const http = require('http')
const router = require('./router')

http.createServer(router).listen(process.env.PORT || 4000, () => {
    console.log('server is running')
})