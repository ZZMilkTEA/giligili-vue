module.exports = {
  devServer: {
    port: 8493,
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
