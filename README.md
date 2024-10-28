# Nodejs-Application

## Explanation of Jenkinsfile Pipeline Stages
* Checkout: Checks out the latest code from the repository.
* Install Dependencies: Installs Node.js dependencies.
* Run Tests: Runs unit tests using Mocha and Chai.
* Build Docker Image: Builds a Docker image of the application.
* Push Docker Image: Pushes the Docker image to a container registry.
* Apply Terraform: Uses Terraform to provision infrastructure.
* Run Ansible Playbook: Configures the infrastructure using Ansible.
* Deploy to Kubernetes: Deploys the application to a Kubernetes cluster.

#### This setup provides a full CI/CD pipeline for a Node.js application, utilizing Jenkins for orchestration, Terraform for infrastructure, Ansible for configuration, and Kubernetes for deployment. By adding unit tests, the pipeline will automatically verify application behavior before deploying changes, ensuring a reliable deployment process.
