# React City Itinerary App

A MERN app that uses the Atlas Mongo DB service, React, TypeScript, Node.js and Bootstrap to display cities and itineraries with activities for these cities. Users can register and post cities, as well as itineraries with activities, and more.

## Live Version

Will be published soon.

## Installation

1. git clone this repo
2. npm install inside the folders "front-end" and "back-end"
3. create a .env file in the folder "back-end" and enter your Mongo DB URI (you need to create that if you don't have one) as "MONGO_URI"
4. to the same .env file, add a JWT key as "JWT_KEY"
5. for the front-end to find the back-end, create an environmental variable called "BACKEND_URL" with the base url to the back-end
6. set up netlify locally, set up heroku locally
7. add env vars on heroku and netlify (on heroku mongo and jwt, on netlify the backend url for heroku)
8. check package.json in /back-end for available commands

