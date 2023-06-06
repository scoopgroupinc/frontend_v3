module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": [
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "airbnb",
      "airbnb-typescript",
      "airbnb/hooks",
      "prettier",
      "prettier/react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
    },
    "plugins": [
      "react",
      "react-native",
      "react-hooks",
      "@typescript-eslint",
      "prettier",
      "prettier/react",
    ],
    "rules": {
    }
}
