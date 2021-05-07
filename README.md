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
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----XXXXXXXX-----END PRIVATE KEY-----\n                                                                                                FIREBASE_CLIENT_EMAIL=xxxxxx-xxxxxx-xxxxxx@xxxxxx-xxxxxx.xxxx.xxxxxxx.xxx  
```

when it's done, go to the project folder and do

```
cd server
npm start
```

Server is now running at http://localhost:3000/
