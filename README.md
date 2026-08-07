Playwright API Automation Framework
Overview

This repository contains a scalable API automation framework built using Playwright, TypeScript, and Cucumber. The framework follows a modular design, making it easy to add new APIs, manage test data, generate reports, and integrate with CI/CD pipelines.

Tech Stack
Technology	Purpose
Playwright	API Testing
TypeScript	Programming Language
Cucumber	BDD Framework
Allure	Test Reporting
Faker	Dynamic Test Data
Winston	Logging
Jenkins	CI/CD
dotenv	Environment Configuration

Features
Playwright APIRequestContext implementation
BDD using Cucumber
Modular API client
Centralized request execution
Dynamic test data using Faker
Environment-based configuration
Reusable request headers
Winston logging
Allure reports
HTML Cucumber reports
Jenkins pipeline support
TypeScript support
Easy scalability


Prerequisites
Node.js 20+
npm
Git


Installation
git clone <repository-url>
cd <repository-name>
npm install

Running Tests

Run all tests:

npm run test:cucumber

Run specific tags:

npm run test:cucumber -- --tags "@user"

Reports

After execution:

Allure Report
Multiple Cucumber HTML Report

Generate Allure report:

allure serve allure-results



Author
Akshatha Shetty
Senior SDET | Playwright | API Automation | TypeScript | Cucumber