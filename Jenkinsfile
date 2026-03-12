pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/auliapuspa/CURD.git'
            }
        }

        stage('Load ENV File') {
            steps {
                withCredentials([file(credentialsId: 'DOTENV_FILE', variable: 'DOTENV_FILE')]) {
                    bat '''
                    copy %DOTENV_FILE% .env
                    '''
                }
            }
        }

        stage('Stop Old Containers') {
            steps {
                bat 'docker-compose down'
            }
        }

        stage('Build Containers') {
            steps {
                bat 'docker-compose build'
            }
        }

        stage('Start Containers') {
            steps {
                bat 'docker-compose up -d'
            }
        }

    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Containers running successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}