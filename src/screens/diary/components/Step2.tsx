import { useState } from 'react';

import { EmotionButtonList, PageLayout, Spacing } from 'components';
import { StepBox } from './StepBox';

const STEP_MAIN_MESSAGE = `좀 더 구체적인\n감정을 선택해주세요.`;
const STEP_SUB_MESSAGE = '가장 먼저 선택한 감정이 일기 캘린더에 표시돼요.';

export const Step2 = () => {
  const [diary, setDiary] = useState({
    rating: null,
    title: '',
    content: '',
    photos: [],
    emotions: [],
    reactions: {},
    date: '',
    isPublic: false,
  });

  const handleEmotionButtonClick = (emotion: any) => {
    const newEmotions = diary.emotions.includes(emotion)
      ? diary.emotions.filter((e) => e !== emotion)
      : [...diary.emotions, emotion];

    setDiary((prev) => ({
      ...prev,
      emotions: newEmotions,
    }));
  };

  return (
    <PageLayout
      header={{
        leftSlot: {
          component: '',
        },
      }}
    >
      <StepBox
        currentStep={2}
        totalStep={2}
        mainMessage={STEP_MAIN_MESSAGE}
        subMessage={STEP_SUB_MESSAGE}
      />
      <Spacing size={20} />
      <EmotionButtonList
        diary={diary}
        handleEmotionButtonClick={handleEmotionButtonClick}
      />
    </PageLayout>
  );
};
