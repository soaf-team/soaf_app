import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';

import { EMOTIONS } from 'constants/emotion';
import { EmotionKey } from 'types/emotion';

interface EmotionButtonProps {
  emotion: EmotionKey;
  selected?: boolean;
  onClick?: (emotion: EmotionKey) => void;
}

export const EmotionButton = ({
  emotion,
  selected,
  onClick,
}: EmotionButtonProps) => {
  const animatedScale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onClick?.(emotion)}
    >
      <Animated.View
        style={[
          styles.buttonContainer,
          selected ? styles.selectedButton : styles.unselectedButton,
          { transform: [{ scale: animatedScale }] },
        ]}
      >
        <View style={[styles.emotionButton]}>
          <Text
            style={[
              styles.emotionText,
              selected ? styles.selectedText : styles.unselectedText,
            ]}
          >
            {EMOTIONS[emotion].label}
          </Text>
          <View
            style={[
              styles.imgContainer,
              selected
                ? {
                    display: 'flex',
                  }
                : {
                    display: 'none',
                  },
            ]}
          >
            {EMOTIONS[emotion].icon}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

interface EmotionButtonListProps {
  emotionList: EmotionKey[];
  onEmotionButtonClick: (emotion: EmotionKey) => void;
}

export const EmotionButtonList = ({
  emotionList,
  onEmotionButtonClick,
}: EmotionButtonListProps) => {
  return (
    <View style={styles.container}>
      {(Object.keys(EMOTIONS) as EmotionKey[]).map((emotion) => {
        const isSelected = emotionList.includes(emotion);

        return (
          <EmotionButton
            key={emotion}
            emotion={emotion}
            selected={isSelected}
            onClick={onEmotionButtonClick}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 90,
  },
  buttonContainer: {
    borderRadius: 16,
  },
  emotionButton: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 163,
    height: 52,
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imgContainer: {
    position: 'absolute',
    right: -8,
    height: 60,
    width: 60,
  },
  selectedButton: {
    backgroundColor: 'white',
    // iOS shadow
    shadowColor: '#626262',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    // Android shadow
    elevation: 8,
  },
  unselectedButton: {
    backgroundColor: '#F0F1F4',
  },
  emotionText: {
    zIndex: 10,
  },
  selectedText: {
    color: 'black',
  },
  unselectedText: {
    color: '#666',
  },
  emotionIcon: {
    position: 'absolute',
    right: -8,
    height: 60,
    width: 60,
    zIndex: 10,
  },
});
