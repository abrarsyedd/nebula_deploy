pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        GITHUB_CREDENTIALS = credentials('github-creds')
        APP_NAME = 'nebula-deploy'
        IMAGE_REPO = "syed048/${APP_NAME}"
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
                    sh "docker build -t ${IMAGE_REPO}:db-${BUILD_NUMBER} -t ${IMAGE_REPO}:db-latest -f ./db/Dockerfile-db ./db"
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                    
                    sh "docker push ${IMAGE_REPO}:backend-${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_REPO}:frontend-${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_REPO}:db-${BUILD_NUMBER}"

                    sh "docker push ${IMAGE_REPO}:backend-latest"
                    sh "docker push ${IMAGE_REPO}:frontend-latest"
                    sh "docker push ${IMAGE_REPO}:db-latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'nebula-backend-env', variable: 'ENV_FILE')]) {
                    script {
                        sh 'cp $ENV_FILE .env'
                        
                        // 1. Force remove the old app containers (leaves jenkins-server completely alone)
                        sh 'docker rm -f nebula-frontend nebula-backend nebula-db || true'
                        
                        // 2. Only pull and deploy the specific app services
                        sh "docker compose -p ${APP_NAME} pull frontend backend db"
                        sh "docker compose -p ${APP_NAME} up -d frontend backend db"
                    }
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