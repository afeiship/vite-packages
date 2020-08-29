import {
  externals, inputs,
  outputs,

  plugins
} from '@feizheng/webpack-lib-kits';
import merge from 'webpack-merge';
import baseConfig from './base';

export default merge(baseConfig, {
  entry: inputs.build(),
  output: outputs.build({
    library: 'ReactAntFormSchema'
  }),
  devtool: 'source-map',
  externals: externals.node(),
  plugins: [
    plugins.clean(),
    plugins.banner(),
    plugins.copyStyles()
  ]
});
