node {
  stage('Static Analysis') {
    withSonarQubeEnv('sonarqube Server') 
    {
      sh 'mvn clean package sonar:sonar'
      echo 'Static Analysis Completed' 
    }
  }
  stage("Quality Gate"){
    timeout(time: 1, unit: 'HOURS') 
    {
      waitForQualityGate abortPipeline: true
      def qg= waitForQualityGate()
      if (qg.status!= 'OK'){
        error "Pipeline aborted due to quality gate failure: ${qg.status}"
      }
    }         
    echo 'Quality Gate Passed' 
  }
}
