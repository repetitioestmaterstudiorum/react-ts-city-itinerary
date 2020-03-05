# React City Itinerary App

A MERN app that uses the Atlas Mongo DB service, React, TypeScript, Node.js and Bootstrap to display cities and itineraries with activities for cities. Users can register and post cities, as well as itineraries with activities.

## Live Version (front-end on Netlify, back-end on Heroku)

https://friendly-leakey-05373b.netlify.com/

### Installation / Usage

1. git clone this repo
2. npm install inside the folders "front-end" and "back-end"
3. create a .env file in the folder "back-end" and enter your Mongo DB URI (you need to create that if you don't have one) as "MONGO_URI" to test locally
4. in the same .env file, add a JWT key as "JWT_KEY" (also to test locally)
5. set up netlify locally, set up heroku locally and set up sites (to deploy)
6. add env vars on heroku (mongo and jwt)
7. check package.json in /back-end for all available commands!
8. replace all references to the heroku url (contexts, log in, create account, add city, add itinerary components)
9. deploy, enjoy
