import { PrimaryButton, ScreenLayout, Typo } from "components";
import { AuthContext } from "providers/AuthContextProvider";
import { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";

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
        <Typo size={22} weight="bold">
          {nickname}님 환영합니다!
        </Typo>
        <Typo size={16} weight="medium" align="center" color="#A7ACBD">
          {`${nickname}님의 첫 일기를 작성하고\n소울프렌드를 찾아 볼까요?`}
        </Typo>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="완료" onPress={handleStartButtonPress} />
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
