# Comeback

- Launch the server locally

First you need to [Download PostgreSQL](https://www.postgresql.org/download/) on your machine
Then connnect to postgres with the password postgres and create a database named "comeback" like so

```
sudo -u postgres psql
postgres=# create database comeback;
```

when it's done, go to the project folder and do

```
cd server
npm start
```

Server is now running at http://localhost:3000/
