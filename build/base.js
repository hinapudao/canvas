const path = require('path');
const webpack = require('webpack');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const autoprefixer = require('autoprefixer');

const resolvePath = (dir) => {
    return path.resolve(__dirname, '../', dir);
};

let baseConfig = {
    resolve: {
        alias: {
            src: resolvePath('src')
        },
        extensions: ['.js', '.vue', '.scss', '.css', '.json']
    },
    stats: {
        chunks: false,
        children: false,
        entrypoints: false,
        modules: false
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|svg)(\?[a-z0-9#]*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            name: 'fonts/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=jsbabel'
            }
        ]
    },
    plugins: [
        new ProgressBarWebpackPlugin(),
        new VueLoaderPlugin(),
        new HappyPack({
            id: 'jsbabel',
            loaders: [
                'babel-loader?cacheDirectory=true'
            ],
            threadPool: happyThreadPool,
            verbose: true
        })
    ]
};

module.exports = baseConfig;
