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
        NOTIFY_EMAIL = 'akshathak2903@gmail.com'
        
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

            // Continue even if tests fail
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                sh """
                    ENV=${params.ENV} npm run test:cucumber -- ${tagsArg}
                """
            }

            echo "Generating Cucumber HTML Report..."

            sh "npm run report:html"
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

            publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'reports/html-report',
            reportFiles: 'index.html',
            reportName: 'Cucumber HTML Report'
])
            // Keep raw results as a build artifact too (handy for debugging or regenerating locally)
            archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true

            emailext(
            to: "${env.NOTIFY_EMAIL}",

            subject: "Playwright API Automation | ${params.ENV.toUpperCase()} | ${currentBuild.currentResult} | Build #${env.BUILD_NUMBER}",

            mimeType: 'text/html',

            body: """
            <html>
            <body>

            <h2>Playwright API Automation Execution Summary</h2>

            <table border="1" cellpadding="8" cellspacing="0">
                <tr>
                    <td><b>Build Number</b></td>
                    <td>#${env.BUILD_NUMBER}</td>
                </tr>
                <tr>
                    <td><b>Build Status</b></td>
                    <td>${currentBuild.currentResult}</td>
                </tr>
                <tr>
                    <td><b>Environment</b></td>
                    <td>${params.ENV}</td>
                </tr>
                <tr>
                    <td><b>Tags</b></td>
                    <td>${params.TAGS?.trim() ? params.TAGS : 'ALL'}</td>
                </tr>
                <tr>
                    <td><b>Duration</b></td>
                    <td>${currentBuild.durationString}</td>
                </tr>
            </table>

            <br>

            <b>Reports</b>

             <ul>
                <li><a href="${env.BUILD_URL}allure">Allure Report</a></li>
                <li><a href="${env.BUILD_URL}Cucumber_HTML_Report/">Cucumber HTML Report</a></li>
                <li><a href="${env.BUILD_URL}console">Console Output</a></li>
            </ul>

            <br>

            Regards,<br>
            Jenkins CI

            </body>
            </html>
            """
        )

        }
    }
}
