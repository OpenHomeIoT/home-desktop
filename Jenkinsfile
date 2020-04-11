pipeline {
  agent {
    docker {
      image "node:12"
      args "-u root:root"
    }
  }

  environment {
    CI = 'true'
  }

  stages {
    stage("Install") {
      steps {
        dir("app") {
          sh "npm install"
        }
      }
    }

    stage("Build") {
      steps {
        dir("app") {
          sh "npm run build"
        }
      }
    }
  }
}
