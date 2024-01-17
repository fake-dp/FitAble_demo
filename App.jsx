import AppInner from './AppInner';
import { RecoilRoot } from 'recoil';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import {fcmTokenState} from './src/store/atom';
import { useRecoilState } from 'recoil';



import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});



function App() {
  const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);

  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      Alert.alert('FCM message arrived!', JSON.stringify(remoteMessage));
    });

    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN@@@@:", token);
        setFcmToken(token.token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    
        // process the action
      },
    
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
    
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
    
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    return () => {
      unsubscribeOnMessage();
    };
  }, []);


console.log('fcmToken',fcmToken)
  
  
    useEffect(() => {
      requestUserPermission();
  
      // Foreground 상태에서 메시지를 받는 경우
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
  
      return unsubscribe;
    }, []);

    useEffect(() => {
      messaging().getToken().then(token => {
        console.log("FCM Token1 >>> ", token);
        setFcmToken(token);
      });
    }, []);

    useEffect(() => {
      return messaging().onTokenRefresh(token => {
        console.log("FCM Token Refresh >>> ", token);
        setFcmToken(token);
      });
    }, []);
    
    

  return <AppInner />;
}

const Main = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

export default Main;
