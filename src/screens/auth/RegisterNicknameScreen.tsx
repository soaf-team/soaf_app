import { login } from "apis";
import { signup } from "apis/signup";
import { PrimaryButton, ScreenLayout, Typo } from "components";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { OauthType } from "types/global";
import { StackNavigationType } from "types/navigation";
import { setTokenToStorage } from "utils";
import { getErrorMessage } from "utils/getErrorMessage";

const TITLE = "어떻게 불러드리는게\n좋을까요?";
const INPUT_LABEL = "닉네임";
const INPUT_PLACEHOLDER = "사용할 닉네임을 적어주세요.";
const INPUT_MAX_LENGTH = 10;
const BUTTON_TITLE = "완료";

type RegisterNicknameScreenProps = {
  navigation: StackNavigationType;
  route: {
    params: {
      password: string;
      email: string;
      sns: OauthType;
      token: string;
    };
  };
};

export const RegisterNicknameScreen = ({
  navigation,
  route,
}: RegisterNicknameScreenProps) => {
  const { password, email, sns, token } = route.params;
  const [nickname, setNickname] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNicknameChange = (text: string) => {
    setNickname(text);
    setErrorMessage("");
  };

  const handleResetNickname = () => {
    setNickname("");
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await signup({ name: nickname, password, email, sns });

      const response = await login({
        oAuthToken: token!,
        email,
        oAuthType: sns,
      });
      const resultCase = response.resultCase;

      if (resultCase === "login") {
        await setTokenToStorage(response.accessToken, response.refreshToken);
        navigation.navigate("SignupCompleteScreen", {
          nickname,
        });
      } else {
        Alert.alert("로그인에 실패했습니다.");
      }
    } catch (error: unknown) {
      Alert.alert("로그인에 실패했습니다.", getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenLayout>
      <View style={styles.headingContainer}>
        <Typo variant="head3" style={{ lineHeight: 40 }}>
          {TITLE}
        </Typo>
      </View>
      <View style={styles.inputGroupContainer}>
        <Typo variant="label3" color="grey400">
          {INPUT_LABEL}
        </Typo>
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: isFocused ? "#57C2FF" : "#E0E0E0",
            },
          ]}
        >
          <TextInput
            value={nickname}
            onChangeText={handleNicknameChange}
            placeholder={INPUT_PLACEHOLDER}
            placeholderTextColor="#A7ACBD"
            style={styles.input}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            cursorColor="#57C2FF60"
          />
          {nickname.length > 0 && (
            <TouchableOpacity onPress={handleResetNickname} activeOpacity={1}>
              <Image
                source={require("assets/images/text-reset.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bottomTextContainer}>
          <View style={styles.warningTextContainer}>
            {!!errorMessage && (
              <React.Fragment>
                <Image
                  source={require("assets/images/alert-circle.png")}
                  style={styles.warnIcon}
                />
                <Typo variant="label4" color="red">
                  {errorMessage}
                </Typo>
              </React.Fragment>
            )}
          </View>
          <Typo
            variant="label3"
            align="right"
            color="grey300"
            style={{
              paddingTop: 4,
              paddingBottom: 8,
            }}
          >
            {nickname.length}/
            <Typo variant="label3" color="black">
              {INPUT_MAX_LENGTH}
            </Typo>
          </Typo>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title={BUTTON_TITLE}
          onPress={handleSubmit}
          disabled={nickname.length < 2}
          isLoading={isSubmitting}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    paddingTop: 18,
    paddingBottom: 24,
  },
  inputGroupContainer: {
    paddingTop: 18,
    paddingBottom: 4,
  },
  input: {
    padding: 0,
    height: 28,
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "white",
    color: "#121212",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 2,
    alignItems: "center",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  warningTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  warnIcon: {
    width: 13,
    height: 13,
  },
  buttonContainer: {
    width: "100%",
  },
});

RegisterNicknameScreen.displayName = "RegisterNicknameScreen";
