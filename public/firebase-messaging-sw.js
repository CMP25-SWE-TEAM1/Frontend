if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/firebase-messaging-sw.js")
  })
}

// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js")

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBU8-zNFY_WQ9OZjre5HsFg4ynUFEazXY8",
  authDomain: "push-notification-test-342a7.firebaseapp.com",
  projectId: "push-notification-test-342a7",
  storageBucket: "push-notification-test-342a7.appspot.com",
  messagingSenderId: "237962392808",
  appId: "1:237962392808:web:1a860746f4b2fb2033855d",
  measurementId: "G-6XCKMCL56J",
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload)
  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
