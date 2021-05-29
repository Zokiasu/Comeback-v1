# Comeback

- Launch the server locally

First you need to [Download PostgreSQL](https://www.postgresql.org/download/) on your machine
Then connnect to postgres with the password postgres and create a database named "comeback" like so

```
sudo -u postgres psql
postgres=# create database comeback;
```

Make a dotenv file and fill with your credientials like so at server/.env

```
PORT=3000
DATABASE=databasename
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
FIREBASE_PROJECT_ID=xxxxx-xxxxx
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----XXXXXXXX-----END PRIVATE KEY-----
FIREBASE_CLIENT_EMAIL=xxxxxx-xxxxxx-xxxxxx@xxxxxx-xxxxxx.xxxx.xxxxxxx.xxx  
```

when it's done, go to the project folder and do

```
cd server
npm start
```

Server is now running at http://localhost:3000/

- Queries

You can sort by fields and use :asc or :desc for ascending or descending data like so
https://comeback-api.herokuapp.com/artists?sortby=name:desc

Also you can use limit and offset to set up some pagination in your application
https://comeback-api.herokuapp.com/artists?limit=1&offset=2

