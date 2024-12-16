import { useState } from 'react';

import { PageLayout, Spacing } from 'components';
import { StepBox } from './StepBox';
import { DailyRatingWidget } from './DailyRatingWidget';
import { MoodRating } from 'types/diary';

export const Step1 = () => {
  const [selectedRating, setSelectedRating] = useState<MoodRating | null>(null);

  return (
    <PageLayout
      header={{
        leftSlot: {
          component: '',
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
        selectedRating={selectedRating}
        handleSelectRating={(rating) => setSelectedRating(rating)}
      />
    </PageLayout>
  );
};
