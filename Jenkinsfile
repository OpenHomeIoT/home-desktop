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
        sh "pushd app; npm install; popd"
      }
    }

    stage("Build") {
      steps {
        sh "pushd app; npm run build; popd"
      }
    }
  }
}
