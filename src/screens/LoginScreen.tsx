import { Typo } from "components";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export const LoginScreen = () => {
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
        <OauthButton oAuthType="kakao" />
        <OauthButton oAuthType="google" />
        <OauthButton oAuthType="naver" />
        {Platform.OS === "ios" && <OauthButton oAuthType="apple" />}
      </View>
    </View>
  );
};

type OauthButtonProps = {
  oAuthType: "kakao" | "apple" | "google" | "naver";
};

const OauthButton = ({ oAuthType }: OauthButtonProps) => {
  const onPress = () => {
    switch (oAuthType) {
      case "kakao":
        // 카카오 로그인
        break;
      case "apple":
        // 애플 로그인
        break;
      case "google":
        // 구글 로그인
        break;
      case "naver":
        // 네이버 로그인
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.oauthButton,
        {
          backgroundColor: OAUTH_TYPE[oAuthType].backgroundColor,
          borderColor: OAUTH_TYPE[oAuthType].borderColor,
        },
      ]}
    >
      <Image source={OAUTH_TYPE[oAuthType].icon} style={styles.oauthIcon} />
      <Typo size={16} weight="bold" color={OAUTH_TYPE[oAuthType].color}>
        {OAUTH_TYPE[oAuthType].text}
      </Typo>
    </TouchableOpacity>
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
