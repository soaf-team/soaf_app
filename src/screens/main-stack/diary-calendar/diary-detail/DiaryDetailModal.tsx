import styled from "@emotion/native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { token } from "constants/token";
import { DiaryType } from "types";
import { DiaryDetailHeader } from "./DiaryDetailHeader";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LINK } from "constants/link";
import { MainStackNavigationType } from "types/navigation";

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

  const navigation = useNavigation<MainStackNavigationType>();

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
        <Pressable
          onPress={() => {
            bottomSheetModalRef.current?.dismiss();
            navigation.navigate(LINK.main.diaryCalendar.detail, {
              diaryId: diary.id,
            });
          }}
        >
          <DiaryDetailHeader diary={diary} />
        </Pressable>
      </ModalContainer>
    </BottomSheetModal>
  );
};

const ModalContainer = styled(BottomSheetView)`
  padding-bottom: 12px;
  padding-top: 13px;
  height: 210px;
`;
