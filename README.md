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
3. Create a mongo database
4. Run the database server and create a Coffee Shop database
```
mongo
use Coffee_Shop
```
5. Add all items from db_items folder
6. Add all npm dependencies
```
npm install
```
7. While server is running and in project directory execute the following:
```
node app.js
```

## Challenges

## Things to fix:
- Text in homepage slider bar gets off place as the window size gets smaller [Done] 
- When going to new page, the navigation highlight needs to be changed to appropriate page [Done]
- Update username when logged in [Done]
- Possibly fix the account/signUp route to /signUp 
- Work on updating the cart, storage the information needed to update the cart page
