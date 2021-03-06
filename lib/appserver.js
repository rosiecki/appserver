module.exports = {
    create: require('./server').create,
    tools: {
        unifyOptions: require('./server').unifyOptions
    },
    middleware: {
        appsload: require('./middleware/appsload').create,
        localfiles: require('./middleware/localfiles').create,
        manifests: require('./middleware/manifests').create,
        login: require('./middleware/login').create,
        proxy: require('./middleware/proxy').create
    }
};
