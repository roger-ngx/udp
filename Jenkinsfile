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
        steps {
            script {
                // Run sonar scanner. Modify sonar properties according to your needs.
                def scannerHome = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation';
                withSonarQubeEnv(SONARQUBE_SERVER) {
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=sonarquebe-udp -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000"
                }
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
