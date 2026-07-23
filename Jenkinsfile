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

    choice(
        name: 'ENV',
        choices: ['qa', 'preprod', 'prod'],
        description: 'Select execution environment'
    )

    string(
        name: 'TAGS',
        defaultValue: '',
        description: 'Cucumber tag expression (leave empty to run all scenarios)'
    )
}

    environment {
        CI = 'true'
        
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

        stage('Execution Details') {
    steps {
        echo "Environment : ${params.ENV}"
        echo "Tags        : ${params.TAGS ?: 'ALL'}"
    }
}

        // Note: no `npx playwright install` stage — Playwright's APIRequestContext
        // makes HTTP calls directly and does not need browser binaries.

        stage('Run API tests') {
            steps {
        sh 'rm -rf allure-results allure-report reports'

        script {

            currentBuild.displayName =
                "#${env.BUILD_NUMBER} | ${params.ENV.toUpperCase()}"

            def tagsArg = params.TAGS?.trim() ? "--tags '${params.TAGS}'" : ''

            echo "Running on ${params.ENV} with tags: ${params.TAGS ?: 'ALL'}"

            sh """
                ENV=${params.ENV} npm run test:cucumber -- ${tagsArg}
            """
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
