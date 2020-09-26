const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = app => {
    app.use('/api',createProxyMiddleware({
        target: 'http://localhost:3000',
        changeOrigin: true
    }))
}

// http://localhost:3001/api/login -> http://localhost:3000/api/login