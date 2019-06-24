const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
      '@clearc2/c2-form': path.resolve('../src')
    }
  }
})
