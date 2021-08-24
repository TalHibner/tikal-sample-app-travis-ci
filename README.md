###Prerequisites | Materials Needed
Tools / Online account(s) needed to perform this exercise
1. Github
2. Travis-ci - Ci server / online service - build based on code change
3. Docker container knowledge - containerize your sample app
4. Configuration Management tool (Terraform / ansible) - install system requirements
5. Deployment tool - deploy latest code - we'll use Travis-ci for simplicity + AWS Elastic Beanstalk
6. Cloud provider - AWS

###Objectives  
1. Setup a CI flow for a well known tool - any program language, but must have some level
   of unit testing.
2. Build & Deploy a service as a Docker container.

##First of all! AWS - Infrastructure provisioning  
- Amazon S3 — Travis CI will transmit our code from github to an S3 bucket for setting up the deployment process.
- AWS Elastic Beanstalk — It is basically an incredibly easy tool of AWS to deploy applications on the cloud in a matter of seconds without the need of setting up machines manually.  
  Travis is going to be deploying our server side code on it only.  
  https://aws.amazon.com/elasticbeanstalk/  
- AWS IAM — By the use of IAM, we will get some credentials which will add in our .travis.yml and hence, whenever travis would try to deploy our code on AWS, AWS will know that it’s authorized to do so because of the credentials.  
  ** Now we'll jump to a second repository for this infrastructure provisioning -
  https://github.com/TalHibner/tikal-provisioning

##So, what’s going to be the flow of our CI/CD pipeline   
1). A commit and push happens at GitHub:  
Here you will find all the code and configuration files:    
https://github.com/TalHibner/tikal-sample-app-travis-ci  

First, cloning the github repository so you can change the code and then commit & push to trigger travis-ci:
- open a terminal inside your nodejs project directory.  
- Enter 'git init'  
- Then, Enter 'git remote add origin https://github.com/TalHibner/tikal-sample-app-travis-ci.git'.
- Enter 'git add' . This will make all your files in the project directory (apart from gitignored files) ready for a commit.
- Enter 'git commit . -m “first commit”' This commits your files and tells git about the new changes in the files.
- Finally, enter 'git push origin master' This pushes and uploads your code on GitHub.

2). Travis detects that code change on GitHub, gets triggered and sends the code for testing => Continuous Integration
You can see it online here:  
https://app.travis-ci.com/github/TalHibner/tikal-sample-app-travis-ci    
(There is a stage of testing and later the deployment - the next part)  
3). After the testing is done, Travis sends this new code to our Amazon S3 bucket and our AWS Elastic Beanstalk specified in the .travis.yml which we are going to setup => Continuous Deployment  
For tests and example you can find some screenshots in the screenshots folder
For documentation see : https://docs.travis-ci.com/user/deployment-v2/providers/elasticbeanstalk/  

4). And Boom! We will have our server on cloud updated just by a mere git push :D  
See it here:
http://helloworld-env.eba-ikpnwypc.us-east-1.elasticbeanstalk.com/  
We will even get an email alert for ERROR or PASS!

** Note: You can run "Restart build" in the right up corner of the failed job if needed.

   
###How I implemented it?  
- Created a very basic NodeJS — Hello, World! app the is surprisingly called helloworld. (app.js + package.json)  
- Wrote a small test for it using mocha and chai frameworks. (tests.js + package.json)  
- Dockerize the above code - main and dev. (dockerfile/dockerfile.dev)  
- Push the above project on a github repo for version control.   
  This would be the starting point of the CI/CD pipeline.
- Then, link our project with Travis CI from the website travis-ci.com.
- Wrote a small travis.yml file which will make sure that on every git push, travis runs the test and if it succeeds, the code gets uploaded on our AWS Elastic Beanstalk hence, making everything sweet and fast.  

Connecting the dots:    
I wrote a travis.yml file for our project to connect all the above steps, making sure that after every subsequent “git push” of new code, Travis CI verifies the code by running the test and correspondingly deploys and updates the code at our AWS Elastic Beanstalk.  

##The application  
This code basically makes GET / route on port number 8000 which when called, produces the following output:
{
meta: {
status: true,
message: "Michael Scott is the world's best boss!",
code: 200
}
}  

Test:  
make a GET request at the route /, if produces an error, the error is going to be in the variable “err” and if executes successfully, the response will be stored in the variable “output”.  
There comes the two cases:  
   - First one, when an error occurs (“ if (err) ”), we make sure that the code closes with a numerical code(1) specifying that the code exited due to some error (“process.exit(1)”).  
   - The second case, is when no error occurs and response (“res”) gets received and status code 200.  
  
** Don't forget to update the package.json for the relevant dependencies and scripts.  

