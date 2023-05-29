module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src/"],
          alias: {
            "@atoms": ".src/components/atoms",
            src: "./src",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
