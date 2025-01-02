import { RouteProp, useNavigation } from "@react-navigation/native";
import { ArrowIcon } from "assets";
import { PageLayout } from "components";
import { DiaryCard, YearMonthSelector } from "components/diary";
import { LINK } from "constants/link";
import { useMyDiaryListQuery } from "hooks/queries";
import { useState } from "react";
import { ScrollView } from "react-native";
import { MainStackNavigationType, MainStackParamList } from "types/navigation";

type MyDiaryListProps = {
  route: RouteProp<MainStackParamList, "diary-list">;
};

export const MyDiaryList = ({ route }: MyDiaryListProps) => {
  const { date } = route.params;
  const navigation = useNavigation<MainStackNavigationType>();

  const [currentDate, setCurrentDate] = useState<Date>(new Date(date));

  const { currentUserDiaryList, isLoading } = useMyDiaryListQuery(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  const handleDiaryPress = (diaryId: string) => {
    navigation.navigate(LINK.main.diaryCalendar.detail, { diaryId });
  };

  return (
    <PageLayout
      header={{
        leftSlot: {
          component: <ArrowIcon onPress={() => navigation.goBack()} />,
        },
      }}
      style={{
        gap: 6,
      }}
    >
      <YearMonthSelector
        currentDate={currentDate}
        handleCurrentDate={setCurrentDate}
      />

      <ScrollView contentContainerStyle={{ gap: 12, paddingTop: 16 }}>
        {currentUserDiaryList.map((diary) => (
          <DiaryCard
            diary={diary}
            key={diary.id}
            onPress={() => handleDiaryPress(diary.id)}
          />
        ))}
      </ScrollView>
    </PageLayout>
  );
};
