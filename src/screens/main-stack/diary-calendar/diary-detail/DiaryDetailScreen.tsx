import { RouteProp } from "@react-navigation/native";
import { DotsVerticalIcon } from "assets";
import {  BackButton, PageLayout } from "components";
import React, { Suspense } from "react";
import { MainStackParamList } from "types/navigation";
import { DiaryDetail, DiaryDetailSkeleton } from "./DiaryDetail";

type DiaryDetailProps = {
  route: RouteProp<MainStackParamList, "diary-detail">;
};

export const DiaryDetailScreen = ({ route }: DiaryDetailProps) => {
  const { diaryId } = route.params;

  return (
    <PageLayout
      header={{
        leftSlot: {
          component: <BackButton />,
        },
        rightSlot: {
          component: <DotsVerticalIcon />,
        },
      }}
      style={{
        gap: 16,
      }}
    >
      <Suspense fallback={<DiaryDetailSkeleton />}>
        <DiaryDetail diaryId={diaryId} />
      </Suspense>
    </PageLayout>
  );
};
