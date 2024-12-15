import React from 'react';
import { View, ViewStyle } from 'react-native';

type SpacingProps = {
  size?: number;
  direction?: 'vertical' | 'horizontal';
};

export const Spacing = ({
  size = 10,
  direction = 'vertical',
}: SpacingProps) => {
  const style: ViewStyle =
    direction === 'vertical'
      ? { height: size, width: 0 }
      : { width: size, height: 0 };

  return <View style={style} />;
};
