module.exports = {
  // tell Jest to handle `*.vue` files
  moduleFileExtensions: ["js", "json", "vue"],
  watchman: false,
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
    "^~~/(.*)$": "<rootDir>/$1",
    "^@/(.*)$": "<rootDir>/$1"
  },
  transform: {
    // process js with `babel-jest`
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/Chartbar.vue",
    "<rootDir>/components/ChartBarLine.vue",
    "<rootDir>/components/ChartDoughnut.vue",
    "<rootDir>/components/ChartPengajuanByLayanan.vue",
    "<rootDir>/components/ChartStatistikAktifitas.vue",
    "<rootDir>/components/ChartStatistikSLA.vue"
    // "<rootDir>/components/**/*.vue",
    // "<rootDir>/pages/**/*.vue"
    // "<rootDir>/pages/index.vue",
    // "<rootDir>/components/ChartBar.vue",
    // "<rootDir>/components/Pagination.vue",
  ]
};