module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@assets": "./assets",
            "@types": "./src/types",
            "@providers": "./src/providers",
            "@checkers": "./src/checkers",
          },
        },
      ],
    ],
  };
};
