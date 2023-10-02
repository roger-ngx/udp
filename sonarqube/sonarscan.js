const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'a2c104ed820764589c5fb629c382f1814072491a',
    options: {
      'sonar.projectName': 'sonarquebe-udp',
      'sonar.projectDescription': 'Here I can add a description of my project',
      'sonar.projectKey': 'sonarquebe-udp',
      'sonar.projectVersion': '0.0.1',
      'sonar.exclusions': '',
      'sonar.sourceEncoding': 'UTF-8'
    }
  },
  () => process.exit()
);
