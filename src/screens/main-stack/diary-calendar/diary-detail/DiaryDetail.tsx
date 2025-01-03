import { useDiaryDetailQuery } from "hooks/queries/diary";
import React from "react";
import {
  DiaryDetailHeader,
  DiaryDetailHeaderSkeleton,
} from "./DiaryDetailHeader";
import { token } from "constants/token";
import { Typo } from "components";
import { Skeleton } from "components/fallbacks";
import { View } from "react-native";
import styled from "@emotion/native";

type DiaryDetailProps = {
  diaryId: string;
};

export const DiaryDetail = ({ diaryId }: DiaryDetailProps) => {
  const { diary } = useDiaryDetailQuery(diaryId);

  return (
    <>
      <DiaryDetailHeader diary={diary} />
      <Typo size={16} weight="regular" color={token.colors.black}>
        {diary.content}
      </Typo>
    </>
  );
};

export const DiaryDetailSkeleton = () => {
  return (
    <>
      <DiaryDetailHeaderSkeleton />
      <ContentSkeletonContainer>
        <Skeleton width="100%" height={24} />
        <Skeleton width="100%" height={24} />
        <Skeleton width="100%" height={24} />
        <Skeleton width="100%" height={24} />
        <Skeleton width="100%" height={16} />
      </ContentSkeletonContainer>
    </>
  );
};

const ContentSkeletonContainer = styled.View`
  gap: 4px;
`;
