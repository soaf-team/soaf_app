import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { ListIcon, PlusIcon } from "assets";
import { token } from "constants/token";
import { useMyDiaryListQuery } from "hooks/queries";
import { DiaryType, MainStackNavigationType } from "types";
import { getDateStatus } from "utils";

import { Calendar, EmotionSticker, YearMonthSelector } from "components/diary";
import { PageLayout, Typo } from "components";
import { LINK } from "constants/link";
import { DiaryDetailModal } from "./diary-detail";

export const DiaryCalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDiary, setSelectedDiary] = useState<DiaryType | null>(null);
  const navigation = useNavigation<MainStackNavigationType>();
  const diaryDetailModalRef = useRef<BottomSheetModal>(null);

  const { currentUserDiaryList } = useMyDiaryListQuery(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const handleDateClick = (
    diaryAtDate: DiaryType | undefined,
    isFuture: boolean,
    date: string
  ) => {
    if (diaryAtDate) {
      setSelectedDiary(diaryAtDate);

      setTimeout(() => {
        diaryDetailModalRef.current?.present();
      }, 100);
      return;
    }
    if (isFuture || diaryAtDate) return;

    navigation.navigate(LINK.main.diaryCalendar.write, {
      date,
    });
  };

  const handleSnapToIndex = (index: number) => {
    if (index === 1) {
      setSelectedDiary(null);
      navigation.navigate(LINK.main.diaryCalendar.detail, {
        diaryId: selectedDiary?.id,
      });
    }
  };

  const handleListClick = () => {
    navigation.navigate(LINK.main.diaryCalendar.list, {
      date: dayjs(currentDate).format("YYYY-MM-DD"),
    });
  };

  return (
    <PageLayout
      header={{
        leftSlot: null,
        rightSlot: {
          component: <ListIcon onPress={handleListClick} />,
        },
      }}
      style={{ gap: 22 }}
    >
      <YearMonthSelector
        currentDate={currentDate}
        handleCurrentDate={setCurrentDate}
      />
      <Calendar
        currentDate={currentDate}
        render={(day, index, isToday) => {
          const isFuture = day && getDateStatus(day, new Date()) === "future";
          const diaryAtDate = currentUserDiaryList.find(
            (diary: DiaryType) =>
              day && getDateStatus(new Date(diary.date), day) === "today"
          );
          const diaryMainEmotion = diaryAtDate?.emotions[0];

          if (day == null) return <View key={index} />;

          return (
            <DayContainer>
              <DayTextWrapper isToday={isToday}>
                <Typo
                  size={12}
                  color={isToday ? token.colors.white : token.colors.gray300}
                >
                  {day?.getDate()}
                </Typo>
              </DayTextWrapper>
              <DayCircle
                key={index}
                isFuture={isFuture}
                onPress={() =>
                  handleDateClick(
                    diaryAtDate,
                    isFuture,
                    dayjs(day).format("YYYY-MM-DD")
                  )
                }
                disabled={isFuture}
              >
                {diaryMainEmotion && (
                  <EmotionSticker emotion={diaryAtDate?.emotions[0]} />
                )}
                {isToday && !diaryMainEmotion && <PlusIcon />}
              </DayCircle>
            </DayContainer>
          );
        }}
      />

      <DiaryDetailModal
        bottomSheetModalRef={diaryDetailModalRef}
        diary={selectedDiary}
        onSnapToIndex={handleSnapToIndex}
      />
    </PageLayout>
  );
};

const DayContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  padding-vertical: 8px;
`;

const DayTextWrapper = styled.View<{
  isToday: boolean;
}>`
  width: 30px;
  height: 17px;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background-color: ${({ isToday }) =>
    isToday ? token.colors.gray600 : "transparent"};
`;

const DayCircle = styled.Pressable<{
  isFuture: boolean;
}>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ isFuture }) =>
    isFuture ? "rgba(240, 241, 244, 0.4)" : token.colors.gray50};
`;
