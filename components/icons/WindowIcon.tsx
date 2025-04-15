import * as React from "react";
import { Svg, Path } from "react-native-svg";

export default function WindowIcon() {
	return (
		<Svg
			width={16}
			height={16}
			viewBox="0 0 16 16"
			accessibilityLabel="Window icon"
		>
			<Path
				fillRule="evenodd"
				fill="#666"
				d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
			/>
		</Svg>
	);
}
