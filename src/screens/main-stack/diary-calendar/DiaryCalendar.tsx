import { ListIcon, PlusIcon } from "assets";
import { PageLayout, Typo } from "components";
import { Calendar, EmotionSticker, YearMonthSelector } from "components/diary";
import { token } from "constants/token";
import dayjs from "dayjs";
import { useMyDiaryListQuery } from "hooks/queries";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { DiaryType } from "types";
import { getDateStatus } from "utils";

export const DiaryCalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDiary, setSelectedDiary] = useState<DiaryType | null>(null);

  const { currentUserDiaryList } = useMyDiaryListQuery(
    dayjs().year(),
    dayjs().month() + 1
  );

  const handleDateClick = (
    diaryAtDate: DiaryType | undefined,
    isFuture: boolean,
    date: string
  ) => {
    if (diaryAtDate) {
      setSelectedDiary(diaryAtDate);
    }
    if (isFuture || diaryAtDate) return;

    // 일기 작성 페이지로 이동
  };

  return (
    <PageLayout
      header={{
        leftSlot: null,
        rightSlot: {
          component: <ListIcon />,
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
            <View key={index} style={styles.dayContainer}>
              <View
                style={[
                  styles.dayText,
                  {
                    backgroundColor: isToday
                      ? token.colors.gray600
                      : "transparent",
                  },
                ]}
              >
                <Typo
                  size={12}
                  color={isToday ? token.colors.white : token.colors.gray300}
                >
                  {day?.getDate()}
                </Typo>
              </View>
              <Pressable
                key={index}
                onPress={() =>
                  handleDateClick(
                    diaryAtDate,
                    isFuture,
                    dayjs(day).format("YYYY-MM-DD")
                  )
                }
                style={[
                  styles.circle,
                  {
                    backgroundColor: isFuture
                      ? "rgba(240, 241, 244, 0.4)"
                      : token.colors.gray50,
                  },
                ]}
                disabled={isFuture}
              >
                {diaryMainEmotion && (
                  <EmotionSticker emotion={diaryAtDate?.emotions[0]} />
                )}
                {isToday && !diaryMainEmotion && <PlusIcon />}
              </Pressable>
            </View>
          );
        }}
      />
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
    paddingVertical: 8,
  },
  dayText: {
    width: 30,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
