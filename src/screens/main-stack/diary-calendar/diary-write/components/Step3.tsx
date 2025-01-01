import { cloneElement, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";

import { PageLayout, Spacing } from "components";
import { AboveKeyboardBar } from "./AboveKeyboardBar";
import { EMOTIONS } from "constants/emotion";
import { token } from "constants/token";
import { DiaryFormType } from "types/diary";
import { ArrowIcon, XIcon, LockIcon, UnlockIcon } from "assets";

interface Step3Props {
  initialDiary: DiaryFormType;
  onPrevious: () => void;
}

export const Step3 = ({ initialDiary, onPrevious }: Step3Props) => {
  const [diary, setDiary] = useState<DiaryFormType>(initialDiary);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <PageLayout
          header={{
            leftSlot: {
              component: <ArrowIcon onPress={onPrevious} />,
            },
            rightSlot: {
              component: <XIcon />,
            },
          }}
        >
          <View>
            {cloneElement(EMOTIONS[initialDiary.emotions[0]].icon, {
              width: 48,
              height: 48,
            })}
          </View>
          <Spacing size={8} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: token.colors.gray300,
              }}
            >
              12월 26일 일요일
            </Text>
            {initialDiary.isPublic ? <LockIcon /> : <UnlockIcon />}
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            {diary.emotions
              .map((emotion) => EMOTIONS[emotion].label)
              .join(", ")}
          </Text>
          <Spacing size={16} />
          <TextInput
            style={{
              fontSize: 16,
            }}
            multiline
            placeholder="오늘 하루는 어땠나요?"
            placeholderTextColor={token.colors.gray300}
            value={diary.content}
            onChangeText={(text) => {
              setDiary((prev) => ({
                ...prev,
                content: text,
              }));
            }}
          />
        </PageLayout>
        <AboveKeyboardBar
          diary={diary}
          onPublicChange={() => {}}
          onSave={() => {}}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
