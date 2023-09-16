// webpack.config.js
const path = require('path');

module.exports = {
  entry: './public/javascript/script.js', // Entry point of your script
  output: {
    filename: 'bundle.js', // Output filename
    path: path.resolve(__dirname, 'public', 'dist'), // Output directory
  },
};