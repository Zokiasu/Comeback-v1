

export default async function (session, firebase) {
  // Can only be initiated on client side
  if (!process.client) {
    return
  }

  await import(/* webpackChunkName: 'firebase-messaging' */'firebase/messaging')

  if (firebase.messaging.isSupported()) {
    const messagingService = session.messaging()

    return messagingService
  }
}
