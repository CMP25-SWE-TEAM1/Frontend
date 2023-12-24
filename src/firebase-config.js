// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"

import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU8-zNFY_WQ9OZjre5HsFg4ynUFEazXY8",
  authDomain: "push-notification-test-342a7.firebaseapp.com",
  projectId: "push-notification-test-342a7",
  storageBucket: "push-notification-test-342a7.appspot.com",
  messagingSenderId: "237962392808",
  appId: "1:237962392808:web:1a860746f4b2fb2033855d",
  measurementId: "G-6XCKMCL56J",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
const analytics = getAnalytics(app)

export function requestPermission(callback) {
  console.log("Requesting permission...")
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      //   console.log("Notification permission granted.")
      getToken(messaging, { vapidKey: "BJL6hYmNbSjl7nWRN_DPkHaqkm-Ig9Bu82Q12cHGsxi4kj0Rcihd-9NH3COqxmGKIuo3Fdjliwc03bJSvjjkUrE" }).then((currentToken) => {
        if (currentToken) {
            console.log("Got FCM registration token:", currentToken)
          callback(currentToken, app)
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log("No registration token available. Request permission to generate one.")
          // ...
        }
      })
    }
  })
}
// requestPermission()

// messaging.serviceWorker.setBackgroundMessageHandler((payload) => {
//   console.log("Received background message ", payload)
// })

// onMessage((payload) => {
//   console.log("Received foreground message ", payload)
//   // Display notification or handle data as needed
// })

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload)

//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: payload.notification.body,
//   }

// //   registration.showNotification(notificationTitle, notificationOptions)
// })

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload)
//     })
//   })

navigator.serviceWorker.addEventListener("message", (message) => {
  console.log(message)
})
