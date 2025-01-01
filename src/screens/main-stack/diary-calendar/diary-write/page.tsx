import { useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";

import { Step1, Step2, Step3 } from "./components";
import { useFunnel } from "hooks";
import { DiaryFormType } from "types/diary";
import { MainStackNavigationType, MainStackParamList } from "types/navigation";

export const DiaryWriteScreen = ({
  route,
}: {
  route: RouteProp<MainStackParamList, "diary-write">;
}) => {
  const navigation = useNavigation<MainStackNavigationType>();
  const [diary, setDiary] = useState<DiaryFormType>({
    rating: null,
    title: "",
    content: "",
    photos: [],
    emotions: [],
    reactions: {},
    date: route.params.date,
    isPublic: false,
  });

  const { Funnel, nextStep, prevStep } = useFunnel(["step1", "step2", "step3"]);

  const handleClose = () => {
    // 작성중일때 확인 모달 필요
    navigation.goBack();
  };

  return (
    <Funnel>
      <Funnel.Step name="step1">
        <Step1
          rating={diary.rating}
          onClose={handleClose}
          onNext={(rating) => {
            setDiary((prev) => ({
              ...prev,
              rating,
            }));
            nextStep();
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="step2">
        <Step2
          diary={diary}
          onPrevious={prevStep}
          onNext={(emotions) => {
            setDiary((prev) => ({
              ...prev,
              emotions,
            }));
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="step3">
        <Step3 initialDiary={diary} onPrevious={prevStep} />
      </Funnel.Step>
    </Funnel>
  );
};
