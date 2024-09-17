import { useNavigation } from "@react-navigation/native";
import { PrimaryButton, ScreenLayout, Typo } from "components";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export const AgreementScreen = () => {
  const navigation = useNavigation();
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);

  function containsNumbers(arr: number[]) {
    const requiredNumbers = new Set([0, 1, 2, 3, 4, 5]);
    const arraySet = new Set(arr);

    for (let num of requiredNumbers) {
      if (!arraySet.has(num)) {
        return false;
      }
    }
    return true;
  }

  const isButtonActive = containsNumbers(checkedIndexes);

  const handleCheck = (index: number) => {
    if (checkedIndexes.includes(index)) {
      setCheckedIndexes(checkedIndexes.filter((i) => i !== index));
    } else {
      setCheckedIndexes([...checkedIndexes, index]);
    }
  };

  const handleAllCheck = () => {
    if (checkedIndexes.length === AGREEMENT_LIST.length) {
      setCheckedIndexes([]);
    } else {
      setCheckedIndexes(AGREEMENT_LIST.map((item) => item.id));
    }
  };

  return (
    <ScreenLayout>
      <Typo
        size={22}
        weight="bold"
        style={styles.title}
      >{`이용 약관에\n동의해 주세요`}</Typo>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.contentTitle}
          onPress={handleAllCheck}
          activeOpacity={0.9}
        >
          <Image
            source={
              AGREEMENT_LIST.length === checkedIndexes.length
                ? require("assets/images/checkbox-on.png")
                : require("assets/images/checkbox-off.png")
            }
            style={styles.checkbox}
          />
          <Typo size={18} weight="medium">
            필수 약관 전체동의
          </Typo>
        </TouchableOpacity>
        <View style={styles.contentListContainer}>
          {AGREEMENT_LIST.map((item) => (
            <View key={item.id} style={styles.contentList}>
              <TouchableOpacity
                style={styles.contentListLeft}
                onPress={() => handleCheck(item.id)}
                activeOpacity={0.9}
              >
                <Image
                  source={
                    checkedIndexes.includes(item.id)
                      ? require("assets/images/check-on.png")
                      : require("assets/images/check-off.png")
                  }
                  style={styles.icon}
                />
                <Typo size={16} weight="medium">
                  {item.title}
                </Typo>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(item.screen as never);
                }}
              >
                <Image
                  source={require("assets/images/right-arrow.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="동의하기"
          onPress={() => {
            navigation.navigate("RegisterNicknameScreen" as never);
          }}
          disabled={!isButtonActive}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 18,
  },
  title: {
    paddingTop: 18,
    paddingBottom: 24,
  },
  content: {
    flex: 1,
  },
  contentTitle: {
    flexDirection: "row",
    gap: 8,
    height: 60,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#8A91A820",
  },
  checkbox: {
    width: 28,
    height: 28,
  },
  contentListContainer: {
    marginTop: 16,
    gap: 4,
  },
  contentList: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    height: 40,
    alignItems: "center",
  },
  contentListLeft: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    height: "100%",
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    paddingBottom: 52,
  },
});

const AGREEMENT_LIST = [
  {
    id: 0,
    title: "[필수] 소프 이용약관",
    screen: "TermsOfUseAgreementScreen",
  },
  {
    id: 1,
    title: "[필수] 개인정보 수집·이용 동의",
    screen: "PrivacyPolicyAgreementScreen",
  },
  {
    id: 2,
    title: "[필수] 민감정보 수집·이용 동의",
    screen: "SensitiveInfoAgreementScreen",
  },
  {
    id: 3,
    title: "[필수] 개인정보 제 3자 제공 동의",
    screen: "PrivacyThirdPartyAgreement",
  },
  {
    id: 4,
    title: "[필수] 개인정보 국외 이전 동의",
    screen: "PrivacyTransferAgreementScreen",
  },
  {
    id: 5,
    title: "[필수] 만 14세 이상입니다.",
    screen: "AgeAgreementScreen",
  },
  {
    id: 6,
    title: "[선택] 마케팅 활용 동의",
    screen: "MarketingAgreementScreen",
  },
];
