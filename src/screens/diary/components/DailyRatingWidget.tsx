import React from 'react';
import { View, Image, StyleSheet, Animated, Pressable } from 'react-native';

import { MOOD_RATING_ARRAY } from 'constants/mood';
import { MoodRating } from 'types/diary';

type DailyRatingWidgetProps = {
  selectedRating: MoodRating | null;
  handleSelectRating: (index: MoodRating | null) => void;
};

export const DailyRatingWidget = ({
  selectedRating,
  handleSelectRating,
}: DailyRatingWidgetProps) => {
  const animatedScales = MOOD_RATING_ARRAY.map(() => new Animated.Value(1));

  const handlePressIn = (index: number) => {
    Animated.spring(animatedScales[index], {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(animatedScales[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {MOOD_RATING_ARRAY.map((level, index) => {
        const isSelected = selectedRating === index + 1;

        return (
          <Pressable
            key={index}
            onPressIn={() => handlePressIn(index)}
            onPressOut={() => handlePressOut(index)}
            onPress={() => handleSelectRating((index + 1) as MoodRating)}
          >
            <Animated.View
              style={[
                styles.imageContainer,
                {
                  transform: [{ scale: animatedScales[index] }],
                },
              ]}
            >
              <Image
                source={level}
                style={[styles.image, { opacity: isSelected ? 1 : 0.3 }]}
                resizeMode="contain"
              />
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  imageContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
