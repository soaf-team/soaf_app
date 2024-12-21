import React, { ReactNode } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

import { token } from 'constants/token';
import { Button } from 'components/ui';

interface DialogModalProps {
  visible: boolean;
  title: string;
  children: ReactNode;
  leftButton: {
    text: string;
    onClick: () => void;
  };
  rightButton: {
    text: string;
    onClick: () => void;
  };
}

export const DialogModal = ({
  visible,
  title,
  children,
  leftButton,
  rightButton,
}: DialogModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.description}>{children}</View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button variant="secondary" onPress={leftButton.onClick}>
                  {leftButton.text}
                </Button>
              </View>
              <View style={styles.button}>
                <Button variant="warn" onPress={rightButton.onClick}>
                  {rightButton.text}
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    maxWidth: 335,
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: token.colors.black,
  },
  description: {
    fontSize: 14,
    color: token.colors.gray500,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  button: {
    flex: 1,
  },
});
