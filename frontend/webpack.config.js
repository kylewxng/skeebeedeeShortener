const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './firebase.js',  
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true,  
    plugins: [
        new HtmlWebpackPlugin({
            template: './login.html',  
            filename: 'index.html'  
        })
    ]
};
