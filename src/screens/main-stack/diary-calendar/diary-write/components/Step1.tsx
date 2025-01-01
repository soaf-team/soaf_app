import { useState } from "react";

import { PageLayout, Spacing } from "components";
import { StepBox } from "./StepBox";
import { DailyRatingWidget } from "./DailyRatingWidget";
import { MoodRating } from "types/diary";
import { XIcon } from "assets";

interface Step1Props {
  rating: MoodRating | null;
  onClose: () => void;
  onNext: (rating: MoodRating) => void;
}

export const Step1 = ({ rating, onClose, onNext }: Step1Props) => {
  return (
    <PageLayout
      header={{
        leftSlot: {
          component: "",
        },
        rightSlot: {
          component: <XIcon onPress={onClose} />,
        },
      }}
    >
      <StepBox
        currentStep={1}
        totalStep={2}
        mainMessage={`뽀송하루님,\n오늘 하루는 어떠셨나요?`}
      />
      <Spacing size={24} />
      <DailyRatingWidget
        selectedRating={rating}
        handleSelectRating={(rating) => {
          onNext(rating as MoodRating);
        }}
      />
    </PageLayout>
  );
};
