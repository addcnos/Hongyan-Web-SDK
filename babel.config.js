module.exports = {
    presets: [
        // ["@babel/preset-env", {
        //     "useBuiltIns": "usage",
        //     "corejs": 3,
        //     "targets": ["> 0.5%, last 2 versions, not dead", "ie >= 11"]
        // }],
        "@babel/preset-typescript"
    ],
    plugins: ["@babel/plugin-proposal-class-properties"],
}