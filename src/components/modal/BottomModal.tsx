import React, { ReactNode, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Button } from 'components/ui';

interface DialogProps {
  visible: boolean;
  children: ReactNode;
  leftButton?: {
    text: string;
    style?: StyleProp<ViewStyle>;
    onClick: () => void;
  };
  rightButton?: {
    text: string;
    style?: StyleProp<ViewStyle>;
    onClick: () => void;
  };
  onClose: () => void;
}

export const BottomModal = ({
  visible,
  children,
  leftButton,
  rightButton,
  onClose,
}: DialogProps) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      resetBottomSheet.start();
    }
  }, [visible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            { transform: [{ translateY: translateY }] },
          ]}
          {...panResponders.panHandlers}
        >
          <View style={styles.modalContent}>
            {children}
            <View style={styles.buttonContainer}>
              {leftButton && (
                <Button style={leftButton.style} onPress={leftButton.onClick}>
                  {leftButton.text}
                </Button>
              )}
              {rightButton && (
                <Button style={rightButton.style} onPress={rightButton.onClick}>
                  {rightButton.text}
                </Button>
              )}
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  modalContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});
