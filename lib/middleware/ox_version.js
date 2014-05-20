function create(options) {
    var url = require('url');
    var path = require('path');
    var fs = require('fs');

    var urlPath = options.urlPath;
    var verbose = options.verbose;

    var server;
    var protocol;

    if (options.server) {
        server = url.parse(options.server);
        if (server.protocol !== 'http:' && server.protocol !== 'https:') {
            console.error('Server must be an HTTP(S) URL');
            return;
        }
        protocol = server.protocol === 'https:' ? require('https') : require('http');
    }
    var newestBuild = options.prefixes
        .filter(fs.existsSync)
        .map(function (p) {
            return fs.statSync(p).mtime.getTime();
        })
        .reduce(function (acc, time) {
            return (acc < time) ? time : acc;
        }, 0);

    return function injectVersion(request, response, next) {
        if (request.url === urlPath ||
            request.url.slice(-8) === '/boot.js'
        ) {
            console.log('force version!');
            return next();
        }
        return next();
    };
}

module.exports = {
    create: create
};
