const path = require("path");
// export const devServer = {
//   proxy: {
//     "/api": {
//       target: "http://localhost:8000/api",
//     },
//   },
// };
module.exports = {
  outputDir: path.resolve(__dirname, "./server/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
      },
    },
  },
};
