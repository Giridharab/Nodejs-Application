pipeline {
    agent any

    parameters {
        string(name: 'DOCKER_IMAGETAG', defaultValue: 'latest', description: 'Docker ImageTag')
    }

    environment {
        REGISTRY = 'girib1608'
        APP_IMAGE = "${REGISTRY}/node-app"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
                    sh 'terraform init'
                    sh 'terraform apply -auto-approve'
                }
            }

        stage('Deploy to Kubernetes') {
            steps {
                kubernetesDeploy(configs: 'k8s-deployment.yaml', kubeconfigId: 'kube-config')
            }
        }
       stage('Clear Workspace') {
            steps {
                cleanWs() //clear the workspace
            }
        }
    }
}


