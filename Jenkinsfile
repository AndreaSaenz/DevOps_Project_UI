pipeline {
    agent any
    
    stages {       
        stage('Move to directory'){
            steps {
                sh 'cd DevOps_Project_UI'
            }
        } 

        stage('Install') {
            steps {
                // Instalar las dependencias de Node.js y Angular
                
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                // Compilar la aplicación Angular
                sh 'npm run build'
            }
        }
        
        // stage('Tests') {
        //     steps {
        //         // Ejecutar los casos de prueba
        //         sh 'npm run test'
        //     }
        // }

        stage('Call other Jenkinsfile') {
            steps {
                build job: 'DevOpsProject-UI-Deploy', parameters: [string(name: 'branch', value: "${GIT_BRANCH}"  ), string(name: 'buildNumber', value: "${BUILD_NUMBER}")]
            }
        }
    }
}