# React City Itinerary App

A MERN app that uses Atlas Mongo DB, AWS S3, React, TypeScript, Node.js, Express, and Bootstrap to display cities and itineraries with activities for cities. Users can register and post cities, as well as itineraries with activities.

## Live Version (front-end on Netlify, back-end on Heroku)

https://city-itinerary.netlify.com/

### Installation / Usage

1. git clone this repo
2. npm install inside the folders "front-end" and "back-end"
3. create a .env file in the folder "back-end" and enter your Mongo DB URI (you need to create that if you don't have one) as "MONGO_URI" to test locally
4. in the same .env file, add a JWT key as "JWT_KEY" (also to test locally)
5. set up netlify locally, set up heroku locally and set up sites (to deploy)
6. create AWS S3 bucket and a user that has access, and then create env variables for AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME, and AWS_DEFAULT_REGION locally
7. add all env vars on heroku
8. check package.json in /back-end for all available commands!
9. create a .env file locally with the content "REACT_APP_BACKEND_URL=http://localhost:5000/" and a .env.development file with the same variable but enter the heroku url there
10. deploy / develop locally
