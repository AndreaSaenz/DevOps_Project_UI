pipeline {
    agent any
    
    stages {       


        stage('Install') {
            steps {
                // Instalar las dependencias de Node.js y Angular
                sh 'cd DevOps_Project_UI'
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                // Compilar la aplicación Angular
                sh 'cd DevOps_Project_UI'
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