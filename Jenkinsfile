pipeline {
  agent {
    docker {
      image "node:12"
      args "-u root:root"
      label "docker && linux && digitalocean"
    }
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
