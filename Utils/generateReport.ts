import { Config } from "../config/config";

const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports",

  reportPath: "reports/html-report",

  pageTitle: "API Automation Report",

  reportName: "Playwright Cucumber API Automation",

  displayDuration: true,

  displayReportTime: true,

  openReportInBrowser: true,

  metadata: {
    browser: {
      name: "API",
      version: "N/A"
    },
    device: "Local Machine",
    platform: {
      name: process.platform,
      version: process.version
    }
  },

  customData: {
    title: "Execution Information",

    data: [
      { label: "Project", value: "API Automation" },
      { label: "Framework", value: "Playwright + Cucumber + TypeScript" },
      { label: "Environment", value: Config.environment || "UAT" },
      { label: "Executed By", value: "Akshatha Shetty" }
    ]
  }
});