import React from "react";
import styled from "@emotion/native";

import { DiaryType } from "types";
import { token } from "constants/token";
import { LockIcon, UnlockIcon } from "assets";

import { EmotionSticker } from "components/diary";
import { Typo } from "components";
import { View } from "react-native";
import { Skeleton } from "components/fallbacks";

type DiaryDetailHeaderProps = {
  diary: DiaryType;
};

export const DiaryDetailHeader = ({ diary }: DiaryDetailHeaderProps) => {
  const monthDay = new Date(diary.date).toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  });
  const week = new Date(diary.date).toLocaleDateString("ko-KR", {
    weekday: "long",
  });

  return (
    <View>
      <EmotionSticker emotion={diary.emotions[0]} />
      <TitleArea>
        <Typo
          size={22}
          weight="bold"
          color={token.colors.gray300}
          style={{
            lineHeight: 32,
            marginTop: 10,
            marginBottom: 4,
          }}
        >
          {monthDay} {week}
        </Typo>
        {diary.isPublic ? <UnlockIcon /> : <LockIcon />}
      </TitleArea>
      <Typo
        size={22}
        weight="bold"
        color={token.colors.black}
        numberOfLines={3}
        ellipsizeMode="tail"
        style={{
          lineHeight: 32,
        }}
      >
        {diary.title}
      </Typo>
    </View>
  );
};

export const DiaryDetailHeaderSkeleton = () => {
  return (
    <View>
      <Skeleton width={42} height={42} variant="circle" />

      <TitleArea>
        <Skeleton
          width={150}
          height={32}
          style={{ marginTop: 10, marginBottom: 4 }}
        />
        <Skeleton width={24} height={24} style={{ marginLeft: 6 }} />
      </TitleArea>

      <View>
        <Skeleton width="90%" height={32} style={{ marginBottom: 4 }} />
        <Skeleton width="60%" height={32} />
      </View>
    </View>
  );
};

const TitleArea = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;
