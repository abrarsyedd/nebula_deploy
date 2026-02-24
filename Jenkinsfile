pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        GITHUB_CREDENTIALS = credentials('github-creds')
        APP_NAME = 'nebula-deploy'
        IMAGE_REPO = "syed048/${APP_NAME}"
        BACKEND_ENV_SECRET = credentials('nebula-backend-env')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git(
                    url: 'https://github.com/abrarsyedd/nebula_deploy.git',
                    credentialsId: "github-creds",
                    branch: 'main'
                )
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_REPO}:backend-${BUILD_NUMBER} -t ${IMAGE_REPO}:backend-latest ./backend"
                    sh "docker build -t ${IMAGE_REPO}:frontend-${BUILD_NUMBER} -t ${IMAGE_REPO}:frontend-latest ./frontend"
                    // Removed the DB build step!
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                    
                    sh "docker push ${IMAGE_REPO}:backend-${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_REPO}:frontend-${BUILD_NUMBER}"

                    sh "docker push ${IMAGE_REPO}:backend-latest"
                    sh "docker push ${IMAGE_REPO}:frontend-latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'cp $BACKEND_ENV_SECRET .env'
                    sh "docker rm -f nebula-frontend nebula-backend nebula-db || true"
                    sh "docker compose -p ${APP_NAME} pull frontend backend"
                    sh "docker compose -p ${APP_NAME} up -d frontend backend db"
                }
            }
        }
    }

    post {
        always {
            sh 'rm -f .env || true'
            echo 'Pipeline Finished'
        }
    }
}