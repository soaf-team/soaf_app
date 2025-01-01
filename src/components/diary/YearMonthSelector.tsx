import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React, { useRef } from "react";
import { getYearMonthString } from "utils";
import { token } from "constants/token";
import RBSheet from "react-native-raw-bottom-sheet";
import { PrimaryCheckIcon, TriangleIcon } from "assets";
import { Typo } from "components/Typo";

type RBSheetRef = {
  open: () => void;
  close: () => void;
};

const YEAR_MONTH_LIST_LENGTH = 36;

type YearMonthSelectProps = {
  currentDate: Date;
  handleCurrentDate: (newDate: Date) => void;
};

export const YearMonthSelector = ({
  currentDate,
  handleCurrentDate,
}: YearMonthSelectProps) => {
  const refRBSheet = useRef<RBSheetRef>(null);

  console.log(refRBSheet);

  const yearMonthArray = Array.from(
    { length: YEAR_MONTH_LIST_LENGTH },
    (_, i) => {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth() - i);
    }
  );
  const selectedIndex = yearMonthArray.findIndex(
    (date) => getYearMonthString(date) === getYearMonthString(currentDate)
  );
  const currentYearMonth = getYearMonthString(currentDate);

  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => {
          refRBSheet.current?.open();
        }}
      >
        <Typo size={18} weight="medium">
          {currentDate.getFullYear()}.
          {currentDate.getMonth() + 1 < 10
            ? `0${currentDate.getMonth() + 1}`
            : `${currentDate.getMonth() + 1}`}
        </Typo>
        <TriangleIcon />
      </Pressable>
      <RBSheet
        ref={refRBSheet}
        // useNativeDriver={true}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customStyles={{
          draggableIcon: {
            backgroundColor: token.colors.gray200,
          },
          container: {
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            paddingTop: 24,
            height: "auto",
          },
        }}
      >
        <View style={styles.drawerContainer}>
          <Text style={styles.title}>월 선택하기</Text>
          <View style={styles.scrollContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {yearMonthArray.map((yearMonth, i) => {
                const thisYearMonth = getYearMonthString(yearMonth);
                const isSelected = currentYearMonth === thisYearMonth;

                return (
                  <Pressable
                    onPress={() => {
                      handleCurrentDate(yearMonth);
                      refRBSheet.current?.close();
                    }}
                    style={styles.yearMonthButton}
                    key={i}
                  >
                    <Text
                      style={[
                        styles.yearMonthText,
                        isSelected && styles.selectedYearMonthText,
                      ]}
                    >
                      {yearMonth.toLocaleString("default", {
                        year: "numeric",
                        month: "long",
                      })}
                    </Text>
                    {isSelected && (
                      <View style={styles.checkIconContainer}>
                        <PrimaryCheckIcon />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
            <LinearGradient
              colors={["transparent", "white"]}
              style={styles.gradient}
              pointerEvents="none"
            />
          </View>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    height: 28,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
  },
  triangleIcon: {
    width: 8,
    height: 5,
  },
  drawerContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  scrollContainer: {
    height: 330,
    width: "100%",
    position: "relative",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    gap: 16,
  },
  yearMonthButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    position: "relative",
  },
  yearMonthText: {
    fontSize: 16,
    lineHeight: 24,
  },
  selectedYearMonthText: {
    color: token.colors.primary,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 28,
  },
  checkIconContainer: {
    position: "absolute",
    right: -30,
  },
  gradient: {
    position: "absolute",
    bottom: 38,
    height: 50,
    width: "100%",
  },
});
