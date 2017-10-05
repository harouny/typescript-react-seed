const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CommonsChunkPlugin } = require('webpack').optimize;
const outputPath = path.join(process.cwd(), "dist");
const sourcePath = path.join(process.cwd(), "src");

module.exports = {
    entry: {
        bundle: ['./src/index.tsx']
      }, 
    
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: outputPath
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.ts(x?)$/, exclude: /node_modules/, use: ['babel-loader', 'ts-loader'] },
            { enforce: "pre", test: /\.js$/, use: ['source-map-loader'] },
            { test: /\.js$/, use:['babel-loader'], exclude: /node_modules/ },
            { test: /\.scss$/, use: [
                'style-loader', 
                {
                    loader: 'css-loader',
                    options: 
                    {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                }, 
              'sass-loader'] }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            "template": path.join(sourcePath, "index.html"),
            "filename": path.join(outputPath, "index.html"),
          }),
          new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => module.context.indexOf && module.context.indexOf('node_modules') !== -1,
          })
        ],
    devServer: {
        "contentBase": "./dist",
    }
};