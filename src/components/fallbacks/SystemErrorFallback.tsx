import { ErrorFallback } from "components/fallbacks/ErrorFallback";
import React from "react";

type Props = {
  onPress: () => void;
};

export const SystemErrorFallback = ({ onPress }: Props) => {
  return (
    <ErrorFallback
      title="시스템 오류가 발생했어요"
      description={`예상치 못한 에러가 발생했습니다.\n 잠시 후 다시 시도해 주세요.`}
      buttonTitle="다시 시도"
      onPress={onPress}
    />
  );
};
