pipeline {
  agent any

  environment {
    // Define the SonarQube server declared in Jenkins -> Manage Jenkins -> Configure System
    SONARQUBE_SERVER = 'sonarqube Server'
  }

  stages {
    stage('Checkout') {
      steps {
        // Checkout the code from GitHub main branch.
        checkout scm
      }
    }

    stage('SonarQube Analysis') {
      environment {
        scannerHome = tool 'SonarQube Scanner'
      }
      steps {
        withSonarQubeEnv(SONARQUBE_SERVER) {
          sh '''${scannerHome}/bin/sonar-scanner
          -Dsonar.projectKey=sonarquebe-udp \
          -Dsonar.projectName=sonarquebe-udp \
          -Dsonar.sources=pages/
          '''
        }
      }
    }
  }

  post {
    always {
      // Wait for the SonarQube scan to complete
      waitForQualityGate abortPipeline: true
    }
  }
}
