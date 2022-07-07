const {NODE_ENV, BABEL_MODULES} = process.env

const useCommonJS = BABEL_MODULES === 'cjs' || NODE_ENV === 'test'

const presets = [
  [
    require.resolve('@babel/preset-env'),
    {
      modules: useCommonJS ? 'commonjs' : false,
      corejs: 3,
      useBuiltIns: 'entry'
    }
  ],
  require.resolve('@babel/preset-react'),
  require.resolve('@babel/preset-typescript')
]

const plugins = [
  require.resolve('@babel/plugin-proposal-class-properties'),
  require.resolve('@babel/plugin-proposal-object-rest-spread'),
  require.resolve('@babel/plugin-syntax-dynamic-import'),
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      alias: {
        "@clearc2/c2-form": "./src"
      }
    }

  ]
]

const ignore = []

if (NODE_ENV === 'production') {
  ignore.push('**/__tests__/*.js')
}

module.exports = {
  presets,
  plugins,
  ignore
}
