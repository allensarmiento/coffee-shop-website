# Coffee-Shop-Website
This project implements a coffee shop website. Users can log in, sign up and order from the menu. Popular items ordered are displayed on the homepage.

## Built With
* CSS, HTML, JavaScript, Bootstrap 4
* Node.js, Express, MongoDB, Mongoose

## How to execute:
1. Start mongo server
```
sudo service mongod start
```
2. Open up a mongo shell to view database
3. Use Coffee Shop database
```
mongo
use Coffee_Shop
```
6. Add all npm dependencies
```
npm install
```
7. While database server is running and in project directory execute the following:
```
node app.js
```

## Limitations
  * This is a mock up site, so to prevent an infinite amount of users, then number of users that can exist in the database is 100. This can be changed by editing the seeds.js file.
  * No changing of username and password has been implemented.
  * Admin accounts were not created during the first iteration, so changing the items and stores information would require editing the seeds.js file and restarting the server.

## Challenges
  * Hiding of buttons needed to be handled to prevent users from placing orders of nothing.
  * Understanding how callbacks worked to be able to update the invoices and push all items from the cart to the invoice schema.
