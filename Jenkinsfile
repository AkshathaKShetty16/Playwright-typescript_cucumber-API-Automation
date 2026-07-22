// Jenkinsfile — Playwright (API testing) + TypeScript + Cucumber BDD + Allure
// Windows agents: replace `sh` with `bat`, and `rm -rf` with `rmdir /s /q`

pipeline {
    agent any

    tools {
        // Name must match your NodeJS installation in Manage Jenkins → Tools
        nodejs 'Nodejs-25'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '15'))
        disableConcurrentBuilds()
    }

    parameters {
    string(
        name: 'TAGS',
        defaultValue: '',
        description: 'Cucumber tag expression (leave empty to run all scenarios)'
    )
}

    environment {
        CI = 'true'
        // Read process.env.TEST_ENV in your config/world to pick the right base URL, users, etc.
        //TEST_ENV = "${params.TEST_ENV}"

        // Or expose the base URL directly if your framework reads it:
        // BASE_URL = "https://${params.TEST_ENV}-api.yourdomain.com"

        // Secrets: store in Jenkins credentials (Manage Jenkins → Credentials), never in the repo.
        // This exposes API_TOKEN (and API_TOKEN_USR / API_TOKEN_PSW for user-pass credentials):
        // API_TOKEN = credentials('api-token-qa')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        // Note: no `npx playwright install` stage — Playwright's APIRequestContext
        // makes HTTP calls directly and does not need browser binaries.

        stage('Run API tests') {
            steps {
                // Clear stale results so the report reflects only this run
                sh 'rm -rf allure-results allure-report'
                script {
                    def tagsArg = params.TAGS?.trim() ? "--tags '${params.TAGS}'" : ''
                    // Swap for your npm script if you prefer, e.g. sh "npm test -- ${tagsArg}"
                    sh 'npm run test:cucumber'
                }
            }
        }
    }

    post {
        always {
            // Publishes the Allure report on the build page.
            // Requires the Allure Jenkins Plugin + an Allure Commandline tool configured in Jenkins.
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
            // Keep raw results as a build artifact too (handy for debugging or regenerating locally)
            archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
        }
    }
}
