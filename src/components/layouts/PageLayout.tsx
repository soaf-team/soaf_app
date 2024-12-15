import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from './Header';

type PageLayoutProps = {
  children: React.ReactNode;
  header?: {
    title?: React.ReactNode;
    leftSlot?: {
      component?: React.ReactNode;
      style?: ViewStyle;
    };
    rightSlot?: {
      component?: React.ReactNode;
      style?: ViewStyle;
    };
    headerStyle?: ViewStyle;
  };
  style?: ViewStyle;
  containerStyle?: ViewStyle;
};

export const PageLayout = ({
  children,
  header,
  style,
  containerStyle,
}: PageLayoutProps) => {
  return (
    <SafeAreaView style={[styles.safeArea, containerStyle]} edges={['top']}>
      <View style={[styles.container]}>
        {header ? (
          <Header
            leftSlot={header.leftSlot}
            rightSlot={header.rightSlot}
            title={header.title}
            style={header.headerStyle}
          ></Header>
        ) : null}
        <ScrollView
          style={[styles.content, style]}
          contentContainerStyle={styles.scrollContent}
        >
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
  },
});
