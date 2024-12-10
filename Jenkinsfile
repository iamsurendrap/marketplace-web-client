pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo "Building Docker image for production..."
                sh 'docker-compose -f docker-compose.prod.yml build'
            }
        }
        stage('Push') {
            steps {
                echo "Pushing Docker image to Docker Hub Repo..."
                withCredentials([usernamePassword(credentialsId: 'Docker-hub-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh 'docker-compose -f docker-compose.prod.yml push'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying the application to EC2..."
                sshagent(credentials: ['ec2-pem-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@18.222.1.197 "mkdir -p ~/server"
                        scp -o StrictHostKeyChecking=no docker-compose.prod.yml ec2-user@18.222.1.197:~/docker-compose.prod.yml
                        scp -o StrictHostKeyChecking=no ./server/.env ec2-user@18.222.1.197:~/server/.env
                        ssh -o StrictHostKeyChecking=no ec2-user@18.222.1.197 '
                            docker-compose -f ~/docker-compose.prod.yml pull
                            docker-compose -f ~/docker-compose.prod.yml up -d
                        '
                    """
                }
            }
        }
    }
}
