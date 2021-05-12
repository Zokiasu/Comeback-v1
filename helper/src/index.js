import 'dotenv/config';
import axios from 'axios';
import firebase, { auth } from './firebase-service.js';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    return user;
  }
});

export const createUserAccount = (data) => {
  return axios
    .post('http://localhost:3000/users/auth/signup', data)
    .then((res) => console.log(res.data));
};

export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const CheckAuthentication = async () => {
  const username = 'imji';
  const email = 'zjimmm@makus.com';
  const password = 'password';
  await createUserAccount({
    username,
    email,
    password,
  });

  await loginUser(email, password);
  const token = await firebase.auth().currentUser.getIdToken();

  axios
    .get('http://localhost:3000/users', {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => console.log(res.data));
};

CheckAuthentication();
