import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";

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
  async function getFCMToken() {
    try {
      await messaging().requestPermission();
      const token = await messaging().getToken();
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
      await onDisplayNotification({ title, body });
    });

    return unsubscribe;
  }, []);
}
