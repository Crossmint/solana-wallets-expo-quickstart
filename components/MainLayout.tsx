import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import TabNavigation from "./TabNavigation";
import type { TabItem } from "./TabNavigation";
import type { PropsWithChildren } from "react";

interface MainLayoutProps {
	tabs?: TabItem[];
	activeTab?: string;
	onTabPress?: (tab: string) => void;
	showTabs?: boolean;
}

export default function MainLayout({
	children,
	tabs = [],
	activeTab = "",
	onTabPress,
}: PropsWithChildren<MainLayoutProps>) {
	return (
		<SafeAreaView style={styles.container}>
			<Header />

			<View style={styles.mainContent}>
				<View style={styles.card}>
					<TabNavigation
						tabs={tabs}
						activeTab={activeTab}
						onTabPress={(tab) => onTabPress?.(tab)}
					/>

					<ScrollView contentContainerStyle={styles.scrollContent}>
						{children}
					</ScrollView>
				</View>
			</View>

			<Footer />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mainContent: {
		flex: 1,
		paddingVertical: 16,
	},
	card: {
		flex: 1,
		backgroundColor: "#FFF",
		borderWidth: 1,
		borderColor: "#e2e8f0",
		borderRadius: 16,
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 0.5 },
		shadowOpacity: 0.2,
		shadowRadius: 0.5,
		elevation: 1,
		overflow: "visible",
	},
	scrollContent: {
		paddingVertical: 16,
		flexGrow: 1,
	},
});
