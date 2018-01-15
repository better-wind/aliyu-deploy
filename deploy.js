var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/gitdeploy', secret: 'fenghou' })
var handlerVi = createHandler({ path: '/gitdeployV', secret: 'vivi' })

var process = require('child_process');
var dirPath ='/admin/fenghou/www/aliyun-blog/';
var dirPathVi ='/admin/fenghou/www/vv-blog/';

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
    console.log('========= pull master start ==========');
    process.exec('cd '+dirPath+' && git pull origin master', function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        console.log('========= pull master ok ==========');
    });
})
http.createServer(function (req, res) {
    handlerVi(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777)

handlerVi.on('error', function (err) {
    console.error('Error:', err.message)
})

handlerVi.on('push', function (event) {
    console.log('========= pull master start ==========');
    process.exec('cd '+dirPathVi+' && git pull origin master', function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        console.log('========= pull master ok ==========');
    });
})
