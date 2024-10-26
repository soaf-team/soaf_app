import { useEffect, useState } from "react";
import {
  Dimensions,
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  Platform,
} from "react-native";

export const useKeyboardHeight = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const initialHeight = Dimensions.get("window").height;
    let keyboardShowListener: EmitterSubscription;
    let keyboardHideListener: EmitterSubscription;

    if (Platform.OS === "ios") {
      // iOS에서는 키보드 높이를 직접 얻을 수 있음
      keyboardShowListener = Keyboard.addListener(
        "keyboardWillShow",
        (e: KeyboardEvent) => {
          setIsKeyboardVisible(true);
          setScreenHeight(initialHeight - e.endCoordinates.height);
        }
      );

      keyboardHideListener = Keyboard.addListener("keyboardWillHide", () => {
        setIsKeyboardVisible(false);
        setScreenHeight(initialHeight);
      });
    } else {
      // Android에서는 화면 높이 변화를 통해 키보드 높이를 계산
      keyboardShowListener = Keyboard.addListener(
        "keyboardDidShow",
        (e: KeyboardEvent) => {
          setIsKeyboardVisible(true);
          setScreenHeight(initialHeight - e.endCoordinates.height);
        }
      );

      keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
        setIsKeyboardVisible(false);
        setScreenHeight(initialHeight);
      });
    }

    // 화면 회전이나 크기 변경 감지
    const dimensionsListener = Dimensions.addEventListener(
      "change",
      ({ window }) => {
        if (!isKeyboardVisible) {
          setScreenHeight(window.height);
        }
      }
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
      dimensionsListener.remove();
    };
  }, []);

  return { isKeyboardVisible, screenHeight };
};
