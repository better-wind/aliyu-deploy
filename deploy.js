var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/gitdeploy', secret: 'fenghou' })
var process = require('child_process');
var dirPath ='/admin/fenghou/www/aliyun-blog/';

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777)

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', function (event) {
    console.log('========= pull pull ==========');
    process.exec('cd '+dirPath+' && git pull origin master', function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        console.log('========= pull master ok ==========');
    });
})
