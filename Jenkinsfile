pipeline {
    agent any

    parameters {
        string(name: 'DOCKER_IMAGETAG', defaultValue: 'latest', description: 'Docker ImageTag')
    }

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

        stage('Docker-Build') {
            steps {
                script{
                    // This step should not normally be used in your script. Consult the inline help for details.
                    withDockerRegistry(credentialsId: 'dockerhub-cred') {
                    sh "docker build -t $APP_IMAGE:${params.DOCKER_IMAGETAG} ."
                    }
                }
            }
        }

        stage('Docker-Push') {
            steps {
                script{
                    // This step should not normally be used in your script. Consult the inline help for details.
                    withDockerRegistry(credentialsId: 'dockerhub-cred') {
                    sh "docker push $APP_IMAGE:${params.DOCKER_IMAGETAG}"
                    }
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


