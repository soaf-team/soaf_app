import { useState } from 'react';

import { Step1, Step2 } from './components';
import { useFunnel } from 'hooks';
import { DiaryFormType } from 'types/diary';

export const Main = () => {
  const [diary, setDiary] = useState<DiaryFormType>({
    rating: null,
    title: '',
    content: '',
    photos: [],
    emotions: [],
    reactions: {},
    date: '',
    isPublic: false,
  });

  const { Funnel, nextStep, prevStep } = useFunnel(['step1', 'step2']);

  return (
    <Funnel>
      <Funnel.Step name="step1">
        <Step1
          rating={diary.rating}
          onClose={() => {}}
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
    </Funnel>
  );
};
