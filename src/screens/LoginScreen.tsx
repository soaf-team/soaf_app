import * as KakaoLogin from "@react-native-seoul/kakao-login";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { RippleButton, Typo } from "components";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants/key";
import { AuthContext } from "providers/AuthContextProvider";
import React, { useContext, useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { setAsyncStorage } from "utils";
import NaverLogin from "@react-native-seoul/naver-login";

GoogleSignin.configure({
  scopes: ["email"], // 요청할 권한
  webClientId:
    "174658533953-e5v5jaq8pf4lbt9iq7nb4leh8q6c132i.apps.googleusercontent.com", // Google 개발자 콘솔에서 얻은 웹 클라이언트 ID
});

NaverLogin.initialize({
  appName: "소프",
  consumerKey: "eJGGBmNunLFpm5PFxL3h",
  consumerSecret: "AiKdPtC6BZ",
  // serviceUrlSchemeIOS: "com.soaf",
  // disableNaverAppAuthIOS: true,
});

type OauthType = "kakao" | "apple" | "google" | "naver";

export const LoginScreen = () => {
  const { setAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const kakaoLogin = async () => {
    const response: KakaoLogin.KakaoOAuthToken = await KakaoLogin.login();
    const accessToken = response.accessToken;
    const refreshToken = response.refreshToken;
    if (accessToken) {
      setAsyncStorage(ACCESS_TOKEN, accessToken);
      setAsyncStorage(REFRESH_TOKEN, refreshToken);
      setAccessToken(accessToken);
    }
  };

  const googleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    const accessToken = response.data?.idToken;
    if (accessToken) {
      setAsyncStorage(ACCESS_TOKEN, accessToken);
      setAccessToken(accessToken);
    }
  };

  const naverLogin = async () => {
    const { successResponse } = await NaverLogin.login();
    const accessToken = successResponse?.accessToken;
    if (accessToken) {
      setAsyncStorage(ACCESS_TOKEN, accessToken);
      setAccessToken(accessToken);
    }
  };

  const onPress = async (oAuthType: OauthType) => {
    setIsLoading(true);
    switch (oAuthType) {
      case "kakao":
        await kakaoLogin();
        break;
      case "apple":
        // 애플 로그인
        break;
      case "google":
        await googleLogin();
        break;
      case "naver":
        await naverLogin();
        break;
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContent} />
      <View style={styles.centerContent}>
        <Image
          source={require("../../assets/images/emotion-group.png")}
          style={styles.image}
        />
        <Typo
          size={22}
          weight="bold"
          align="center"
          color="#121212"
        >{`소프에 오신것을\n환영해요!`}</Typo>
        <Typo size={16} weight="medium" align="center" color="#A7ACBD">
          감정과 취향이 맞는 소울프렌드를 찾아보세요
        </Typo>
      </View>
      <View style={styles.oauthContainer}>
        <OauthButton
          oAuthType="kakao"
          onPress={onPress}
          isLoading={isLoading}
        />
        <OauthButton
          oAuthType="google"
          onPress={onPress}
          isLoading={isLoading}
        />
        <OauthButton
          oAuthType="naver"
          onPress={onPress}
          isLoading={isLoading}
        />
        {Platform.OS === "ios" && (
          <OauthButton
            oAuthType="apple"
            onPress={onPress}
            isLoading={isLoading}
          />
        )}
      </View>
      {isLoading && <View style={styles.backdrop} />}
    </View>
  );
};

type OauthButtonProps = {
  oAuthType: OauthType;
  onPress: (oAuthType: OauthType) => Promise<void>;
  isLoading: boolean;
};

const OauthButton = ({ oAuthType, onPress, isLoading }: OauthButtonProps) => {
  return (
    <RippleButton
      onPress={() => onPress(oAuthType)}
      style={[
        styles.oauthButton,
        {
          backgroundColor: OAUTH_TYPE[oAuthType].backgroundColor,
          borderColor: OAUTH_TYPE[oAuthType].borderColor,
        },
      ]}
      disabled={isLoading}
    >
      <Image source={OAUTH_TYPE[oAuthType].icon} style={styles.oauthIcon} />
      <Typo size={16} weight="bold" color={OAUTH_TYPE[oAuthType].color}>
        {OAUTH_TYPE[oAuthType].text}
      </Typo>
    </RippleButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  topContent: {
    width: "100%",
    height: 100,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  image: {
    width: 104,
    height: 101,
  },
  oauthContainer: {
    width: "100%",
    gap: 8,
    paddingHorizontal: 18,
    paddingBottom: 54,
  },
  oauthButton: {
    width: "100%",
    height: 48,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    gap: 4,
  },
  oauthIcon: {
    width: 24,
    height: 24,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

const OAUTH_TYPE = {
  kakao: {
    text: "카카오로 시작하기",
    icon: require("../../assets/images/kakao.png"),
    backgroundColor: "#FEE500",
    borderColor: "#FEE500",
    color: "#121212",
  },
  apple: {
    text: "애플로 시작하기",
    icon: require("../../assets/images/apple.png"),
    backgroundColor: "#000000",
    borderColor: "#000000",
    color: "#FFFFFF",
  },
  google: {
    text: "구글로 시작하기",
    icon: require("../../assets/images/google.png"),
    backgroundColor: "#FFFFFF",
    borderColor: "#8A91AB20",
    color: "#121212",
  },
  naver: {
    text: "네이버로 시작하기",
    icon: require("../../assets/images/naver.png"),
    backgroundColor: "#03C75A",
    borderColor: "#03C75A",
    color: "#FFFFFF",
  },
};
