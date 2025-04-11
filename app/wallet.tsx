import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import type { TabItem } from "@/app/components/ui/TabNavigation";
import AppLayout from "@/app/components/layout/AppLayout";
import WalletInfo from "@/app/components/WalletInfo";
import TransferForm from "@/app/components/TransferForm";
import DelegatedSignerForm from "@/app/components/DelegatedSignerForm";
import TabNavigation from "@/app/components/ui/TabNavigation";
import { useCrossmintAuth } from "@crossmint/client-sdk-react-native-ui";
const TABS: TabItem[] = [
	{ key: "wallet", label: "Wallet" },
	{ key: "transfer", label: "Transfer" },
	{ key: "delegated", label: "Delegated" },
];

type TabKey = "wallet" | "transfer" | "delegated";

export default function WalletScreen() {
	const { logout } = useCrossmintAuth();
	const [activeTab, setActiveTab] = useState<TabKey>("wallet");

	return (
		<AppLayout>
			<TabNavigation
				tabs={TABS}
				activeTab={activeTab}
				onTabPress={(tab) => setActiveTab(tab as TabKey)}
			/>

			<ScrollView style={styles.container}>
				{activeTab === "wallet" && <WalletInfo onLogout={logout} />}

				{activeTab === "transfer" && <TransferForm />}

				{activeTab === "delegated" && <DelegatedSignerForm />}
			</ScrollView>
		</AppLayout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
