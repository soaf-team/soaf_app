import React, { useCallback, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import styled from "@emotion/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

import { getYearMonthString } from "utils";
import { PrimaryCheckIcon, TriangleIcon } from "assets";
import { token } from "constants/token";

import { Typo } from "components/Typo";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  SCREEN_HEIGHT,
} from "@gorhom/bottom-sheet";

const YEAR_MONTH_LIST_LENGTH = 36;
const HEADER_TITLE = "월 선택하기";

type YearMonthSelectProps = {
  currentDate: Date;
  handleCurrentDate: (newDate: Date) => void;
};

export const YearMonthSelector = ({
  currentDate,
  handleCurrentDate,
}: YearMonthSelectProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const yearMonthArray = Array.from(
    { length: YEAR_MONTH_LIST_LENGTH },
    (_, i) => {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth() - i);
    }
  );

  const currentYearMonth = getYearMonthString(currentDate);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <YearMonthSelectorButton onPress={handlePresentModalPress}>
        <Typo size={18} weight="semibold">
          {currentDate.getFullYear()}.
          {currentDate.getMonth() + 1 < 10
            ? `0${currentDate.getMonth() + 1}`
            : `${currentDate.getMonth() + 1}`}
        </Typo>
        <TriangleIcon />
      </YearMonthSelectorButton>

      <YearMonthSelectModal
        bottomSheetModalRef={bottomSheetModalRef}
        yearMonthArray={yearMonthArray}
        currentYearMonth={currentYearMonth}
        handleCurrentDate={handleCurrentDate}
      />
    </>
  );
};

type YearMonthSelectModalProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  yearMonthArray: Date[];
  currentYearMonth: string;
  handleCurrentDate: (newDate: Date) => void;
};

const YearMonthSelectModal = ({
  bottomSheetModalRef,
  yearMonthArray,
  currentYearMonth,
  handleCurrentDate,
}: YearMonthSelectModalProps) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backgroundStyle={{ backgroundColor: token.colors.white }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.6}
        />
      )}
      handleIndicatorStyle={{
        backgroundColor: token.colors.gray200,
        width: 40,
        height: 3,
      }}
    >
      <ModalContainer>
        <Typo size={18} weight="semibold">
          {HEADER_TITLE}
        </Typo>
        <ScrollView
          style={[
            styles.scrollContainer,
            {
              height: SCREEN_HEIGHT / 2 - top - bottom,
            },
          ]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {yearMonthArray.map((yearMonth, i) => {
            const thisYearMonth = getYearMonthString(yearMonth);
            const isSelected = currentYearMonth === thisYearMonth;

            return (
              <YearMonthButton
                onPress={() => {
                  handleCurrentDate(yearMonth);
                  bottomSheetModalRef.current?.close();
                }}
                key={i}
              >
                <Typo
                  size={16}
                  weight={isSelected ? "bold" : "regular"}
                  color={isSelected ? token.colors.primary : token.colors.black}
                >
                  {yearMonth.toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "long",
                  })}
                </Typo>
                {isSelected && (
                  <CheckIconContainer>
                    <PrimaryCheckIcon />
                  </CheckIconContainer>
                )}
              </YearMonthButton>
            );
          })}
        </ScrollView>
        <GradientContainer
          colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.5]}
          pointerEvents="none"
        />
      </ModalContainer>
    </BottomSheetModal>
  );
};

const YearMonthSelectorButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 28px;
`;

const ModalContainer = styled(BottomSheetView)`
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-bottom: 12px;
  padding-top: 13px;
`;

const YearMonthButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 28px;
`;

const CheckIconContainer = styled.View`
  position: absolute;
  right: -30px;
`;

const GradientContainer = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  height: 80px;
  width: 100%;
`;

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    position: "relative",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    gap: 16,
  },
});
