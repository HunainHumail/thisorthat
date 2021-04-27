//  import firebase from "react-native-firebase";
// import {Platform} from "react-native";
//import {store} from '../../store/'

// const channel = new firebase.notifications.Android.Channel('traer', 'traer', firebase.notifications.Android.Importance.Max)
//     .setDescription('Traer Channel');
// firebase.notifications().android.createChannel(channel);
// export default class Service {
//     static listener;

//     static notificationListener = () => {
//         Service.listener = firebase.notifications().onNotification((notification) => {
//             console.log('notification', notification)
//             if(Platform.OS == "android"){
//                 notification.android.setChannelId("traer")
//                 notification.android.setSmallIcon("ic_launcher")
//             }
//             firebase.notifications().displayNotification(notification)

//         })
//     }
//     static getToken = () => {
//         return new Promise ((res,rej)=>{
//             firebase.messaging().hasPermission()
//             .then(enabled => {
//                 if (enabled) {
//                     // user has permissions
//                     firebase.messaging().requestPermission()
//                         .then(() => {
//                             // User has authorised
//                             firebase.messaging().getToken()
//                                 .then(fcmToken => {
//                                     if (fcmToken) {
//                                         // user has a device token
//                                         res(fcmToken)
//                                     } else {
//                                         res("")

//                                         // user doesn't have a device token yet
//                                     }
//                                 });
//                         })
//                         .catch(error => {
//                             res("")
//                             // User has rejected permissions
//                         });
//                 } else {
//                     // res("")
//                     firebase.messaging().requestPermission()
//                         .then(() => {
//                             // User has authorised
//                             firebase.messaging().getToken()
//                                 .then(fcmToken => {
//                                     if (fcmToken) {
//                                         // user has a device token
//                                         res(fcmToken)
//                                     } else {
//                                         res("")

//                                         // user doesn't have a device token yet
//                                     }
//                                 });
//                         })
//                         .catch(error => {
//                             res("")
//                             // User has rejected permissions
//                         });
//                     // user doesn't have permission
//                 }
//             });
//         })
//     }
// }

//test start for remote notification
import { Platform } from "react-native"
import { store } from '../../store/';
import { AuthActions } from '../../store/actions';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { NavigationService } from "..";

export var myToken = '';

async function checkPermission() {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    return getToken();
  } else {
    return requestPermission();
  }
}

async function requestPermission() {
  try {
    await messaging().requestPermission();
    return getToken();
  }
  catch (err) {
    throw err
  }
}

async function getToken() {
  let fcmToken = await messaging().getToken();
  if (fcmToken) {
    return fcmToken
  }
}

async function savetoken() {
  try {
    let token = await checkPermission()
    console.log("token", token)
    myToken = { token }
  }
  catch (err) {
    console("token error", err)
  }
}


const NotificationService = () => {

  savetoken()
  if (Platform.OS == 'ios') {
    PushNotificationIOS.addEventListener("notification", (notification) => {
      console.log("IOS____________notification", notification)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    })
  }

  messaging().onMessage((notification) => {
    console.log("Messaging+++++++IOS____________notification", notification)
    if (Platform.OS == 'ios') {
      PushNotificationIOS.addNotificationRequest({
        id: notification?.messageId || "01",
        title: notification?.notification?.title,
        body: notification?.notification?.body
      });
    }
    else {
      PushNotification.localNotification({
        title: notification?.notification?.title,
        body: notification?.notification?.body,
      });
    }
  })

  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      if(Platform.OS == "android" && !notification?.foreground ){
        setTimeout(() => { NavigationService.navigate("NotificationScreen") }, 2600 )
        PushNotification.cancelAllLocalNotifications()
        PushNotification.removeAllDeliveredNotifications()
      }

      if (notification?.userInteraction || notification?.data?.userInteraction) {
        if (Platform.OS == 'ios') {
          PushNotificationIOS.removeAllDeliveredNotifications()
        }
        else{
          PushNotification.cancelAllLocalNotifications()
          PushNotification.removeAllDeliveredNotifications()
        }
        setTimeout(() => { NavigationService.navigate("NotificationScreen") }, notification?.foreground ? 500 : 2600 )
      }
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

      // process the action
    },
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    senderID: '6615838368',
    popInitialNotification: true,
    requestPermissions: true,
  });
  console.disableYellowBox = true;
};

export default NotificationService;
