module.exports = {
  presets: [
    "next/babel",
    ["@babel/env", { targets: { "node": "current" } }],
    "@babel/react",
    "@babel/typescript"
  ]
}