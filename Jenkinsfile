pipeline {
    agent any

    environment {
        REGISTRY = 'girib1608'
        APP_IMAGE = "${REGISTRY}/node-app:latest"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $APP_IMAGE .'
            }
        }

        stage('Push Docker Image') {
            steps {
               withDockerRegistry(credentialsId: 'dockerhub-cred') {
                    sh 'docker push $APP_IMAGE'
                }
            }
        }

        stage('Apply Terraform') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                kubernetesDeploy(configs: 'k8s-deployment.yaml', kubeconfigId: 'kube-config')
            }
        }
        post {
        always {
            cleanWs()
        }
    }
    }
}


