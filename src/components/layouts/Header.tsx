import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
  Text,
} from 'react-native';

export type HeaderProps = {
  leftSlot?: {
    component?: React.ReactNode;
    style?: ViewStyle;
  };
  title?: React.ReactNode;
  rightSlot?: {
    component?: React.ReactNode;
    style?: ViewStyle;
  };
} & ViewProps;

export const Header = ({
  leftSlot,
  title,
  rightSlot,
  style,
  ...props
}: HeaderProps) => {
  const { goBack } = useNavigation();

  return (
    <View style={[styles.header, style]} {...props}>
      <View style={styles.leftContainer}>
        {leftSlot ? (
          <View style={[styles.leftSlot, leftSlot.style]}>
            {leftSlot.component}
          </View>
        ) : (
          <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
            <Image
              source={require('assets/images/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        {typeof title === 'string' ? (
          <Text style={styles.titleText}>{title}</Text>
        ) : (
          title
        )}
      </View>

      <View style={styles.rightContainer}>
        {rightSlot && (
          <View style={[styles.rightSlot, rightSlot.style]}>
            {rightSlot.component}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: 'white',
    zIndex: 50,
    paddingHorizontal: 18,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  leftSlot: {
    justifyContent: 'center',
  },
  rightSlot: {
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});
