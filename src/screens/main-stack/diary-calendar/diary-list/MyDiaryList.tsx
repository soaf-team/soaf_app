import styled from "@emotion/native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ArrowIcon } from "assets";
import { PageLayout } from "components";
import { DiaryCard, YearMonthSelector } from "components/diary";
import { useMyDiaryListQuery } from "hooks/queries";
import { useState } from "react";
import { ScrollView } from "react-native";
import { MainStackParamList } from "types/navigation";

type MyDiaryListProps = {
  route: RouteProp<MainStackParamList, "diary-list">;
};

export const MyDiaryList = ({ route }: MyDiaryListProps) => {
  const { date } = route.params;
  const navigation = useNavigation();

  const [currentDate, setCurrentDate] = useState<Date>(new Date(date));

  const { currentUserDiaryList, isLoading } = useMyDiaryListQuery(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

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
          <DiaryCard diary={diary} key={diary.id} />
        ))}
      </ScrollView>
    </PageLayout>
  );
};
