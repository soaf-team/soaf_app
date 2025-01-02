import styled from "@emotion/native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LockIcon, UnlockIcon } from "assets";
import { Typo } from "components";
import { EmotionSticker } from "components/diary";
import { token } from "constants/token";
import { DiaryType } from "types";

type DiaryDetailModalProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  diary: DiaryType | null;
  onSnapToIndex: (index: number) => void;
};

export const DiaryDetailModal = ({
  bottomSheetModalRef,
  diary,
  onSnapToIndex,
}: DiaryDetailModalProps) => {
  if (!diary) return null;

  const monthDay = new Date(diary.date).toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  });
  const week = new Date(diary.date).toLocaleDateString("ko-KR", {
    weekday: "long",
  });

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backgroundStyle={{
        backgroundColor: token.colors.white,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowColor: "black",
        elevation: 10,
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0}
        />
      )}
      handleIndicatorStyle={{
        backgroundColor: token.colors.gray200,
        width: 40,
        height: 3,
      }}
      snapPoints={["100%"]}
      onChange={onSnapToIndex}
      style={{
        paddingHorizontal: 18,
      }}
    >
      <ModalContainer>
        <EmotionSticker emotion={diary.emotions[0]} />
        <TitleArea>
          <Typo size={22} weight="bold" color={token.colors.gray300}>
            {monthDay} {week}
          </Typo>
          {diary.isPublic ? <UnlockIcon /> : <LockIcon />}
        </TitleArea>
        <Typo
          size={22}
          weight="bold"
          color={token.colors.black}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {diary.title}
        </Typo>
      </ModalContainer>
    </BottomSheetModal>
  );
};

const ModalContainer = styled(BottomSheetView)`
  flex-direction: column;
  gap: 8px;
  padding-bottom: 12px;
  padding-top: 13px;
  height: 210px;
`;

const TitleArea = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;
