
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// Replace these placeholder values with the matching values
// from your existing Firebase configuration.
const firebaseConfig = {
  apiKey: "AIzaSyDUT9q0yKpseAtHeHWVoIR8uHvDv9dMJZA",
  authDomain: "reminder-bot-e0ab5.firebaseapp.com",
  databaseURL: "https://reminder-bot-e0ab5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reminder-bot-e0ab5",
  storageBucket: "reminder-bot-e0ab5.firebasestorage.app",
  messagingSenderId: "1052559567659",
  appId: "1:1052559567659:web:9d38eaaea4bc5f35dbb36e"
};

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title =
    payload.notification?.title || "Reminder Bot";

  const options = {
    body:
      payload.notification?.body ||
      payload.data?.body ||
      "You have a reminder!",
    icon: "/favicon.ico",
    data: {
      url: "/"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data?.url || "/")
  );
});

