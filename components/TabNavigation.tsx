import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type TabItem = {
	key: string;
	label: string;
};

type TabNavigationProps = {
	tabs: TabItem[];
	activeTab: string;
	onTabPress: (key: string) => void;
};

export default function TabNavigation({
	tabs,
	activeTab,
	onTabPress,
}: TabNavigationProps) {
	return (
		<View style={styles.container}>
			{tabs.map((tab) => (
				<TouchableOpacity
					key={tab.key}
					style={styles.tab}
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
					{activeTab === tab.key && <View style={styles.activeIndicator} />}
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "#FFF",
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	tab: {
		paddingVertical: 16,
		marginRight: 24,
		position: "relative",
	},
	tabText: {
		fontSize: 14,
		color: "#666",
		paddingHorizontal: 8,
	},
	activeTabText: {
		color: "#000",
	},
	activeIndicator: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 2,
		backgroundColor: "#62C560",
	},
});
