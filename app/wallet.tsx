import React, { useEffect, useState } from "react";

import type { TabItem } from "../components/TabNavigation";
import MainLayout from "../components/MainLayout";
import Transfer from "./transfer";
import DelegatedSigners from "./delegate-signer";
import Balance from "./balance";

import { useCrossmintAuth } from "@crossmint/client-sdk-react-native-ui";
import { router } from "expo-router";

const TABS: TabItem[] = [
	{ key: "wallet", label: "Balance" },
	{ key: "transfer", label: "Transfer" },
	{ key: "delegated", label: "Delegated" },
];

type TabKey = "wallet" | "transfer" | "delegated";

export default function Wallet() {
	const { user } = useCrossmintAuth();
	const [activeTab, setActiveTab] = useState<TabKey>("wallet");

	useEffect(() => {
		if (user == null) {
			router.push("/login");
		}
	}, [user]);

	return (
		<MainLayout
			tabs={TABS}
			activeTab={activeTab}
			onTabPress={(tab) => setActiveTab(tab as TabKey)}
		>
			{activeTab === "wallet" && <Balance />}
			{activeTab === "transfer" && <Transfer />}
			{activeTab === "delegated" && <DelegatedSigners />}
		</MainLayout>
	);
}
