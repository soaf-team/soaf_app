import styled from "@emotion/native";
import { View, Text, Image, Pressable } from "react-native";
import dayjs from "dayjs";

import { DiaryType } from "types";
import { token } from "constants/token";
import { WEEKDAY_MAP } from "constants/day";
import { removeHtmlTags } from "utils";

import { EmotionSticker } from "./EmotionSticker";
import { CheckBox } from "components/ui";
import { Typo } from "components/Typo";

interface Props {
  diary: DiaryType;
  isCheckable?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
  isFriend?: boolean;
}

export const DiaryCard = ({
  diary,
  isCheckable = false,
  isSelected = false,
  onPress,
  isFriend = false,
}: Props) => {
  return (
    <StyledCard
      isSelected={isSelected}
      isCheckable={isCheckable}
      onPress={onPress}
    >
      <DateContainer>
        <Typo
          size={16}
          weight="black"
          color="#6D7592"
          style={{
            lineHeight: 16,
          }}
        >
          {dayjs(diary.date).format("DD")}
        </Typo>
        <Typo
          size={10}
          weight="semibold"
          color="#A7ACBD"
          style={{
            lineHeight: 10,
          }}
        >
          {WEEKDAY_MAP[dayjs(diary.date).day()]}
        </Typo>
      </DateContainer>

      <ContentContainer>
        <UpperContainer>
          <TitleContainer>
            <Typo
              size={16}
              weight="medium"
              color={token.colors.black}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {diary.title}
            </Typo>
            <View style={{ flexDirection: "row" }}>
              {diary.emotions.map((emotion, index) => (
                <EmotionSticker
                  key={index}
                  emotion={emotion}
                  size="sm"
                  style={{
                    transform: [{ translateX: -index * 5 }],
                    zIndex: diary.emotions.length - index,
                  }}
                />
              ))}
            </View>
          </TitleContainer>

          {isCheckable && <CheckBox isChecked={isSelected} onPress={onPress} />}
        </UpperContainer>

        <Divider />

        <BodyContainer>
          <BodyText numberOfLines={3}>{removeHtmlTags(diary.content)}</BodyText>
          {diary.photos.length > 0 && (
            <PhotoContainer>
              <PhotoImage
                source={{ uri: diary.photos[0] }}
                resizeMode="cover"
              />
            </PhotoContainer>
          )}
        </BodyContainer>
      </ContentContainer>
    </StyledCard>
  );
};

const StyledCard = styled(Pressable)<{
  isSelected?: boolean;
  isCheckable?: boolean;
}>`
  flex-direction: row;

  min-height: 152px;
  gap: 12px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  ${({ isCheckable }) =>
    isCheckable
      ? `
          shadow-color: #000;
          shadow-offset: 0px 2px;
          shadow-opacity: 0.25;
          shadow-radius: 3.84px;
          elevation: 5;
          border-width: 2px;
          border-color: transparent;
          margin-horizontal: 5px;
        `
      : `
        border-width: 1px;
        border-color: #e5e5e5;
      `}
  ${({ isSelected, isCheckable }) =>
    isSelected &&
    isCheckable &&
    `
    border-width: 2px;
    border-color: ${token.colors.primary};
  `}
`;

const DateContainer = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #f0f1f4;
  border-radius: 8px;
`;

const ContentContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  gap: 15px;
`;

const UpperContainer = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  position: relative;
`;

const TitleContainer = styled(View)`
  flex: 1;
  align-items: flex-start;
`;

const Divider = styled(View)`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
`;

const BodyContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 17px;
`;

const BodyText = styled(Text)`
  flex: 1;
  font-size: 14px;
  line-height: 20px;
  color: #333;
`;

const PhotoContainer = styled(View)`
  width: 48px;
  min-width: 48px;
  height: 48px;
  border-radius: 10px;
  background-color: #f5f5f5;
  overflow: hidden;
`;

const PhotoImage = styled(Image)`
  width: 100%;
  height: 100%;
`;
