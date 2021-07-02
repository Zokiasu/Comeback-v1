import admin from 'firebase-admin'

const config = {"apiKey":"AIzaSyC7827CjkYuT3MvcGIPjXwFtM-5XsakQoY","authDomain":"comeback-65643.firebaseapp.com","projectId":"comeback-65643","storageBucket":"comeback-65643.appspot.com","messagingSenderId":"62874869818","appId":"1:62874869818:web:cff1a37d8484785de15503","measurementId":"G-795498CRNX"}

const simulateUserRecord = ({
  uid,
  email,
  email_verified: emailVerified,
  name: displayName
}) => ({
  uid,
  email,
  emailVerified,
  displayName
})

if (!admin.apps.length) {
  admin.initializeApp(config)
}

export default async ({ req, res }) => {
  if (!req || !req.headers.authorization) {
    return
  }

  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || ''
  const components = authorizationHeader.split(' ')
  const idToken = components.length > 1 ? components[1] : ''

  try {
    // Try to verify the id token, additionally checking if the token was revoked
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    if (decodedToken.uid) {
      const authUser = simulateUserRecord(decodedToken)

      res.locals = {
        ...res.locals,
        user: {
          ...authUser,
					allClaims: decodedToken,
					idToken,
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}
