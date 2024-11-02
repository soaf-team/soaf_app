import { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WEBVIEW_BASE_URL } from "constants/url";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const title = remoteMessage.notification?.title;
  const body = remoteMessage.notification?.body;
  await onDisplayNotification({ title, body });
});

const onDisplayNotification = async ({
  title = "",
  body = "",
}: {
  title?: string;
  body?: string;
}) => {
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      smallIcon: "ic_launcher",
      largeIcon: "ic_launcher",
    },
  });
};

export function usePushNotification() {
  const [currentUrl, setCurrentUrl] = useState<string>(WEBVIEW_BASE_URL);

  async function getFCMToken() {
    try {
      await messaging().requestPermission();
      const token = await messaging().getToken();
      await AsyncStorage.setItem("fcmToken", token);
      return token;
    } catch (error) {
      console.error("FCM 토큰을 가져오는 데 실패했습니다:", error);
      return null;
    }
  }

  useEffect(() => {
    getFCMToken();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const title = remoteMessage.notification?.title;
      const body = remoteMessage.notification?.body;
      // setCurrentUrl(remoteMessage.notification?.link);
      await onDisplayNotification({ title, body });
    });

    return unsubscribe;
  }, []);

  return { currentUrl };
}
