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
          -Dsonar.login=a2c104ed820764589c5fb629c382f1814072491a
          Dsonar.host.url=http://localhost:9000
          -Dsonar.projectKey=sonarquebe-udp \
          -Dsonar.projectName=sonarquebe-udp \
          -Dsonar.sources=pages/'''
        }
      }
    }
  }
}
