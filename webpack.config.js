const {VueLoaderPlugin} = require('vue-loader');
module.exports = {
    entry: {
        index: './src/app/index.js',
        admin: './src/app/admin.js',
        customer: './src/app/customer.js',
        order: './src/app/order.js'
    },
    output: {
        path: __dirname + '/src/public/javascripts',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};