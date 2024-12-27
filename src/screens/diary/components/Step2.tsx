import { useState } from 'react';

import { EmotionButtonList, PageLayout, Spacing } from 'components';
import { Button } from 'components/ui';
import { StepBox } from './StepBox';
import { DiaryFormType } from 'types/diary';
import { EmotionKey } from 'types/emotion';
import { ArrowIcon, XIcon } from 'assets';

const STEP_MAIN_MESSAGE = `좀 더 구체적인\n감정을 선택해주세요.`;
const STEP_SUB_MESSAGE = '가장 먼저 선택한 감정이 일기 캘린더에 표시돼요.';

interface Step2Props {
  diary: DiaryFormType;
  onPrevious: () => void;
  onNext: (emotion: EmotionKey[]) => void;
}

export const Step2 = ({ diary, onPrevious, onNext }: Step2Props) => {
  const [emotionList, setEmotionList] = useState<EmotionKey[]>(diary.emotions);

  return (
    <PageLayout
      header={{
        leftSlot: {
          component: <ArrowIcon onPress={onPrevious} />,
        },
        rightSlot: {
          component: <XIcon />,
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
        emotionList={emotionList}
        onEmotionButtonClick={(emotion: EmotionKey) => {
          setEmotionList((prev) => {
            if (emotionList.includes(emotion)) {
              return emotionList.filter((e) => e !== emotion);
            } else {
              return [...prev, emotion];
            }
          });
        }}
      />
      <Button
        disabled={emotionList.length === 0}
        onPress={() => {
          onNext(emotionList);
        }}
      >
        감정선택 완료
      </Button>
      <Spacing size={52} />
    </PageLayout>
  );
};
