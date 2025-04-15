import type { ReactNode } from "react";
import React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	View,
	ActivityIndicator,
} from "react-native";

type Props = {
	title: string;
	onPress: () => void;
	variant?: "primary" | "secondary";
	icon?: ReactNode;
	disabled?: boolean;
	loading?: boolean;
};

export default function Button({
	title,
	onPress,
	variant = "primary",
	icon,
	disabled = false,
	loading = false,
}: Props) {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				variant === "secondary" && styles.buttonSecondary,
				disabled && styles.buttonDisabled,
			]}
			onPress={onPress}
			disabled={disabled || loading}
		>
			{loading ? (
				<ActivityIndicator
					color={variant === "primary" ? "#fff" : "#000"}
					size="small"
				/>
			) : (
				<>
					{icon && <View style={styles.iconContainer}>{icon}</View>}
					<Text
						style={[
							styles.text,
							variant === "secondary" && styles.textSecondary,
						]}
					>
						{title}
					</Text>
				</>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 14,
		backgroundColor: "#05b959",
		borderRadius: 8,
		width: "100%",
	},
	buttonSecondary: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#E8E8E9",
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	iconContainer: {
		marginRight: 8,
	},
	text: {
		fontSize: 14,
		fontWeight: "500",
		color: "#fff",
	},
	textSecondary: {
		color: "#000",
	},
});
