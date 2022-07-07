const path = require('path')

module.exports = (env) => ({
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        include: [
          path.resolve('../src'),
          path.join(env.projectDir, 'src'),
        ]
      }
    ]
  }
})
