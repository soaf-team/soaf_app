import * as React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  StyleProp,
  ViewStyle,
  Text,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { token } from 'constants/token';
import { usePressEffect } from 'hooks';

type VariantType = 'primary' | 'secondary' | 'warn' | 'ghost';
type SizeType = 'md' | 'sm' | 'xs';

interface ButtonProps {
  variant?: VariantType;
  size?: SizeType;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
}

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      style,
      disabled,
      children,
      onPress,
      ...props
    },
    ref
  ) => {
    const { handlePressIn, handlePressOut, animatedStyle } = usePressEffect({});

    const getHeight = () => {
      switch (size) {
        case 'md':
          return 52;
        case 'sm':
          return 48;
        case 'xs':
          return 42;
        default:
          return 52;
      }
    };

    const getBackgroundStyle = () => {
      if (disabled) {
        return { backgroundColor: token.colors.gray100 };
      }

      switch (variant) {
        case 'primary':
          return null;
        case 'secondary':
          return { backgroundColor: token.colors.gray50 };
        case 'warn':
          return { backgroundColor: token.colors.warn };
        case 'ghost':
          return { backgroundColor: token.colors.gray50 };
        default:
          return null;
      }
    };

    const getTextColor = () => {
      if (disabled) {
        return token.colors.white;
      }

      switch (variant) {
        case 'primary':
          return token.colors.white;
        case 'secondary':
        case 'ghost':
          return token.colors.black;
        case 'warn':
          return token.colors.white;
        default:
          return token.colors.black;
      }
    };

    const buttonContent = (
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        {variant === 'primary' && !disabled ? (
          <LinearGradient
            colors={['#8CE3FF', '#57C2FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <View style={[styles.container, { height: getHeight() }, style]}>
              {typeof children === 'string' ? (
                <Text style={[styles.text, { color: getTextColor() }]}>
                  {children}
                </Text>
              ) : (
                children
              )}
            </View>
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.container,
              { height: getHeight() },
              getBackgroundStyle(),
              style,
            ]}
          >
            {typeof children === 'string' ? (
              <Text style={[styles.text, { color: getTextColor() }]}>
                {children}
              </Text>
            ) : (
              children
            )}
          </View>
        )}
      </Animated.View>
    );

    return (
      <Pressable
        ref={ref as any}
        disabled={disabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
        {...props}
      >
        {buttonContent}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  wrapper: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    borderRadius: 16,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

Button.displayName = 'Button';
