pipeline {  
    agent any  
    options{
        disableConcurrentBuilds()
    }
    stages {  
        stage('Install Dependencies') {  
            steps {  
               sh 'npm i --force'
            }
        }  
        stage('Build') {  
            steps {  
                echo 'Running Build......'
            }
        }
        stage('Test') {  
             steps {  
                 sh 'npm run test'
                echo "Running Tests......"
             }
        }
        stage('E2E') {  
            steps {  
                echo 'Running E2E Tests.....'
                // sh 'npm run start:test'
            }
        }
        stage('Deploy') {  
            steps {  
                  sh  'docker compose -f docker-compose.yml build'
                  sh  'docker compose -f docker-compose.yml push'
                  sh  'docker compose -f docker-compose.yml up -d'
                  sh  'docker system prune --force'

             }
         } 
    }  
    post {   
        success {  
            echo 'Everything went smoothly!'  
        }  
        failure {  
            echo 'Failure'
            mail bcc: '', body: "<b>Failure</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br>", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "sheshtawy321@gmail.com";  
        }  
        changed {  
            script{
                if(currentBuild.result == 'SUCCESS' && currentBuild.getPreviousBuild().result == 'FAILURE') {
                    mail bcc: '', body: "<b>Back to work</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br>", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "Successful CI: Project name -> ${env.JOB_NAME}", to: "sheshtawy321@gmail.com";    
                }
            }  
        }  
   }
}
