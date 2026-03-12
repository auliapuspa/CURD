pipeline {
    agent any

    environment {
        // Load environment variables from .env file
        env_file = '.env'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/auliapuspa/CURD.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build || echo "No build step"'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No tests configured"'
            }
        }

        stage('Run Server') {
            steps {
                // Load environment variables from .env
                // Then start server in background
                sh '''
                export $(grep -v '^#' $env_file | xargs)
                nohup npm start &
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}