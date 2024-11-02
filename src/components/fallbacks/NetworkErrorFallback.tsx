import { ErrorFallback } from "components";
import React from "react";

type Props = {
  onPress: () => void;
};

export const NetworkErrorFallback = ({ onPress }: Props) => {
  return (
    <ErrorFallback
      title="현재 연결이 불안해요"
      description="네트워크 연결상태가 좋지 않습니다.일시적인 현상이니 잠시 후 다시 시도해 주세요."
      buttonTitle="다시 시도"
      onPress={onPress}
    />
  );
};
