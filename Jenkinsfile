node {
  try{  
    stage('Static Analysis') {
      withSonarQubeEnv('SonarQube Scanner') 
      {
        bat 'mvn clean package sonar:sonar
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
}
