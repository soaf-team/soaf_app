import {
  Pressable,
  View,
  StyleSheet,
  Text,
  Keyboard,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";

import { token } from "constants/token";
import { DiaryFormType } from "types/diary";
import { LockBlackIcon, UnlockBlackIcon, AlbumIcon } from "assets";

interface AboveKeyboardBarProps {
  diary: DiaryFormType;
  onPublicChange: () => void;
  onSave: () => void;
}

export const AboveKeyboardBar = ({
  diary,
  onPublicChange,
  onSave,
}: AboveKeyboardBarProps) => {
  const bottomPadding = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardWillShow", (e) => {
      Animated.timing(bottomPadding, {
        toValue: 0,
        duration: e.duration,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHide = Keyboard.addListener("keyboardWillHide", (e) => {
      Animated.timing(bottomPadding, {
        toValue: 34, // 일반적인 iOS 하단 안전영역 높이
        duration: e.duration,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingBottom: bottomPadding,
        },
      ]}
    >
      <View style={styles.innerContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.leftSection}>
            <Pressable
              onPress={() => {
                /* 앨범 열기 */
              }}
            >
              <AlbumIcon />
            </Pressable>
            <Pressable onPress={onPublicChange}>
              {diary.isPublic ? <UnlockBlackIcon /> : <LockBlackIcon />}
            </Pressable>
          </View>
          <View style={styles.rightSection}>
            <Text
              style={[
                styles.countText,
                diary.content.length >= 2000 && styles.countTextWarning,
              ]}
            >
              {diary.content.length}/2000
            </Text>
            <Pressable onPress={onSave}>
              <Text style={styles.saveButton}>저장</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: token.colors.gray300,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  innerContainer: {
    paddingHorizontal: 18,
    height: 50,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  countText: {
    fontSize: 14,
    color: token.colors.gray300,
  },
  countTextWarning: {
    color: "#ff3c3c",
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "600",
    color: token.colors.gray800,
  },
});
