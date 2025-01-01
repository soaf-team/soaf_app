import { View, Text, StyleSheet } from "react-native";

import { token } from "constants/token";

interface StepProps {
  currentStep: number;
  totalStep: number;
  mainMessage?: string;
  subMessage?: string;
}

export const StepBox = ({
  currentStep,
  totalStep,
  mainMessage,
  subMessage,
}: StepProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>
        STEP {currentStep}/{totalStep}
      </Text>
      {!!mainMessage && <Text style={styles.mainMessage}>{mainMessage}</Text>}
      {!!subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  stepText: {
    fontSize: 16,
    color: token.colors.gray300,
    textAlign: "center",
    marginBottom: 6,
  },
  mainMessage: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  subMessage: {
    fontSize: 14,
    color: token.colors.gray800,
    textAlign: "center",
    paddingVertical: 8,
  },
});
