# DevOps Exercise [CI/D]
exercise Plan  
Author: Tikal DevOps Team Date: 2021  
###Overview & Purpose  
This exercise was designed to provide Tikal’s DevOps to better position the DevOps candidate into a
Technological route.  
###Prerequisites | Materials Needed
Tools / Online account(s) needed to perform this exercise
1. Github
2. Travis-ci - Ci server / online service - build based on code change
3. Docker container knowledge - containerize your app
4. Configuration Management tool (Terraform / ansible) - install system requirements
5. Deployment tool - deploy latest code - we'll use Travis-ci for simplicity + AWS Elastic Beanstalk
6. Cloud provider - AWS


###Objectives
1. Setup a CI flow for a well know tool - any program language, but must have some level
   of unit testing [ we can provide an example if needed ].
2. Build & Deploy a service as a Docker container. 
   
###Activity
   High level guidance for the candidate
1. Create / Clone an existing project on Github - please choose an existing open source
   project which doesn’t have a Docker distro already, alternatively improve an existing one (and explain
   why in your project's README.md)
2. Containerize your service 
3. Setup or Use an online CI-service
   (e.g travis-ci) 
4. Supply a deploy directory which includes some configuration management tool |
   Deployment tool - which deploys your docker container on a docker enabled host. 
5. Compose a susinct
   README.md which will enable any new commer to follow a step
   by step explanation from the ‘git clone’ untile the ‘running sample’
   
###Implementation
- Created a very basic NodeJS — Hello, World! app the is surprisingly called helloworld.
- Wrote a small test for it using mocha and chai frameworks.
- Dockerize the above code - main and dev.
- Push the above project on a github repo for version control.   
  This would be the starting point of the CI/CD pipeline.
- Then, link our project with Travis CI from the website travis-ci.com
- Wrote a small travis.yml file which will make sure that on every git push, travis runs the test and if it succeeds, the code gets uploaded on our Amazon EC2 instance hence, making everything sweet and fast.