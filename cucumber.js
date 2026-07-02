module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'features/step_definitions/**/*.ts',
      'features/support/**/*.ts',
    ],
    paths: ['features/**/*.feature'],
    format: ['progress-bar', 'summary', 'allure-cucumberjs/reporter'],
    parallel: 4,
    publishQuiet: true

  },
};