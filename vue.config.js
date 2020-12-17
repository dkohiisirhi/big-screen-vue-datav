const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'));
    config.plugin('html').tap(args => {
      args[0].title = '路易威森大数据平台'
      return args
    })
  },
}
