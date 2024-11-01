import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "apis";
import { postFCMToken } from "apis/postFCMToken";
import { signup } from "apis/signup";
import { PrimaryButton, ScreenLayout, Typo } from "components";
import { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OauthType } from "types/global";
import { StackNavigationType } from "types/navigation";
import { setTokenToStorage } from "utils";

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
      console.log(nickname, password, email, sns);
      const response = await signup({ name: nickname, password, email, sns });

      const { accessToken, refreshToken } = await login({
        oAuthToken: token!,
        email,
        oAuthType: sns,
      });

      if (!accessToken || !refreshToken) {
        throw new Error("No tokens found in response headers");
      }

      setTokenToStorage(accessToken, refreshToken);

      const { _id } = response;
      const fcmToken = await AsyncStorage.getItem("fcmToken");
      if (fcmToken) {
        await postFCMToken({
          userId: _id,
          deviceToken: fcmToken,
          deviceType: Platform.OS as "ios" | "android",
        });
      }
      navigation.navigate("SignupCompleteScreen", {
        nickname,
      });
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenLayout>
        <View style={styles.headingContainer}>
          <Typo size={22} weight="bold" style={{ lineHeight: 40 }}>
            {`어떻게 불러드리는게\n좋을까요?`}
          </Typo>
        </View>
        <View style={styles.inputGroupContainer}>
          <Typo size={14} weight="medium" color="#6D7592">
            닉네임
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
              placeholder="사용할 닉네임을 적어주세요."
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
                <>
                  <Image
                    source={require("assets/images/alert-circle.png")}
                    style={styles.warnIcon}
                  />
                  <Typo size={12} weight="medium" color="#FF3737">
                    {errorMessage}
                  </Typo>
                </>
              )}
            </View>
            <Typo
              size={14}
              weight="medium"
              align="right"
              style={{
                paddingVertical: 7,
              }}
            >
              <Typo color="#8A91AB">{nickname.length}/</Typo>10
            </Typo>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="완료"
            onPress={handleSubmit}
            disabled={nickname.length < 2}
            isLoading={isSubmitting}
          />
        </View>
      </ScreenLayout>
    </SafeAreaView>
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
