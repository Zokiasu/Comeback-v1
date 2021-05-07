import * as admin from 'firebase-admin';

const private_key = process.env.FIREBASE_PRIVATE_KEY.replace(
  /\\n/g,
  '\n',
);
console.log('env', private_key);
admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: 'http://localhost:300',
});

export default admin;
