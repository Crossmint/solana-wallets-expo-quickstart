import React from "react";
import { View, StyleSheet } from "react-native";
import CrossmintLeaf from "./icons/CrossmintLeaf";

export default function Footer() {
	return (
		<View style={styles.container}>
			<CrossmintLeaf style={styles.leaf} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingVertical: 16,
	},
	leaf: {
		width: 120,
		height: 24,
	},
});
