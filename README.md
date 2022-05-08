# CS 546 Final Project: Split

Welcome to Split.com, we are a group of developers that are passionate about video games and the speedrunning commmunity that surrounds them. As such we have created a lightweight version of a speedrunning website that allows users to post their speedruns and take part in friendly forum posts. 

To start the website simply download the repository and run the following commands in your terminal.

npm install,
npm run seed,
npm start

Please note that seeding the database may take a minute or two as there is a lot of data and encryption that needs to occur.

Also all picture links need to be to images hosted on the internet to work i.e. starting with https, as for uploading a link to a YouTube video when posting a new run, that link must be an embed YouTube link which can be easily gotten my clicking share on a video and then pressing embed and copying the supplied link.

For the node mailer package to work properly you must add a .env file inside of the folder structure, this loads the username and password of the site's email account into environment variables for security purposes.

The contents of the .env file are as follows:
NODE_MAILER_USER = "split.noreply@yahoo.com"
NODE_MAILER_PASS = "password"
