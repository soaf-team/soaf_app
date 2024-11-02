import { PrimaryButton, ScreenLayout, Typo } from "components";
import { AuthContext } from "providers/AuthContextProvider";
import { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";

const WELCOME = "님 환영합니다!";
const WELCOME_DESCRIPTION =
  "님의 첫 일기를 작성하고\n소울프렌드를 찾아 볼까요?";
const BUTTON_TITLE = "소프 시작하기";

type SignupCompleteScreenProps = {
  route: {
    params: {
      nickname: string;
    };
  };
};

export const SignupCompleteScreen = ({ route }: SignupCompleteScreenProps) => {
  const { nickname } = route.params;
  const { setIsValidUser } = useContext(AuthContext);

  const handleStartButtonPress = async () => {
    setIsValidUser(true);
  };

  return (
    <ScreenLayout header={null}>
      <View style={styles.centerContainer}>
        <Image
          source={require("assets/images/complete.png")}
          style={styles.completeImage}
        />
        <Typo variant="head3">{nickname + WELCOME}</Typo>
        <Typo variant="body2m" align="center" color="grey300">
          {nickname + WELCOME_DESCRIPTION}
        </Typo>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={BUTTON_TITLE} onPress={handleStartButtonPress} />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  completeImage: {
    width: 52,
    height: 52,
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 52,
  },
});

SignupCompleteScreen.displayName = "SignupCompleteScreen";
