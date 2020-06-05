const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');


var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
 entry: {
    headNav: './srcWebi/headNav.js',
    index: './srcWebi/index.js',
       
  },

  target: 'node',
  mode:'development',
  output: {
    path: path.resolve(__dirname, 'distWebi'),
    filename: '[name].js'
  },
   externals: nodeModules,

  devServer: {
    contentBase: path.join(__dirname, 'distWebi'),
    compress: true,
    port: 9000
  },
plugins:[
  new HtmlWebpackPlugin({
     filename: 'AjouterDocument.html',
     template: 'srcWebi/AjouterDocument.html',
     
  
  }),
  new HtmlWebpackPlugin({
	
     filename: 'index.html',
      template: 'srcWebi/index.html',
 
  }),
   new HtmlWebpackPlugin({
     filename: 'check.html',
      template: 'srcWebi/check.html',
      
  }),

   new HtmlWebpackPlugin({
     filename: 'inscription.html',
     template: 'srcWebi/inscription.html'
   
  }),
      new HtmlWebpackPlugin({
     filename: 'login.html',
     template: 'srcWebi/login.html'
   
  }),
       new HtmlWebpackPlugin({
     filename: 'historique.html',
     template: 'srcWebi/historique.html'
   
  }),
          new HtmlWebpackPlugin({
     filename: 'removeOrg.html',
     template: 'srcWebi/removeOrg.html'
   
  }),
              new HtmlWebpackPlugin({
     filename: 'enlev.html',
     template: 'srcWebi/enlev.html'
   
  }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
    template: 'srcWebi/index.html'
  })

  ],
   module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },



   {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
              name: '[1]-[name].[ext]',
            },
          },
        ],
      },
      
    ],
  },
  
};
