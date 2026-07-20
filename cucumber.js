module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'features/step_definitions/**/*.ts',
      'features/support/**/*.ts'
    ],
    paths: ['features/**/*.feature'],
     format: [
      'progress-bar',
      'allure-cucumberjs/reporter',
      'json:reports/cucumber-report.json'
    ]
  }
};
