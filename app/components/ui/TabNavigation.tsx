import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type TabItem = {
  key: string;
  label: string;
};

type TabNavigationProps = {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabKey: string) => void;
};

export default function TabNavigation({
  tabs,
  activeTab,
  onTabPress,
}: TabNavigationProps) {
  return (
    <View style={styles.tabs}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabPress(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "100%",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "33.3%",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#00C853",
  },
  tabText: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  activeTabText: {
    color: "#00C853",
    fontWeight: "600",
  },
});
