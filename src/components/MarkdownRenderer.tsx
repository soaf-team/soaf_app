import React from "react";
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Markdown from "react-native-markdown-display";

type MarkdownRendererProps = {
  content: string;
  style?: StyleProp<ViewStyle>;
};

const MarkdownRenderer = ({ content, style }: MarkdownRendererProps) => {
  return (
    <FlatList
      style={[styles.container, style]}
      data={content.split("\n")}
      renderItem={({ item }) => (
        <Markdown style={markdownStyles}>{item}</Markdown>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={<View style={{ height: 32 }} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: "#333",
    fontSize: 16,
  },
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  heading2: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  heading3: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 6,
  },
  link: {
    color: "#0000FF",
    textDecorationLine: "underline",
  },
});

export default MarkdownRenderer;
