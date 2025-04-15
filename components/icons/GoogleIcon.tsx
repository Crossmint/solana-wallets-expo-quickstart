import * as React from "react";
import { Svg, Path } from "react-native-svg";

export default function GoogleIcon() {
	return (
		<Svg
			width={20}
			height={20}
			viewBox="0 0 20 20"
			accessibilityLabel="Google logo"
		>
			<Path
				fill="#4285F4"
				d="M19.6 10.2c0-.7-.1-1.4-.2-2h-9.4v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.2 3-7.1z"
			/>
			<Path
				fill="#34A853"
				d="M10 20c2.7 0 4.9-.9 6.6-2.4l-3.2-2.4c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H1.1v2.5C2.7 17.8 6.1 20 10 20z"
			/>
			<Path
				fill="#FBBC05"
				d="M4.4 11.9c-.2-.6-.3-1.2-.3-1.9 0-.7.1-1.3.3-1.9V5.6H1.1C.4 6.9 0 8.4 0 10s.4 3.1 1.1 4.4l3.3-2.5z"
			/>
			<Path
				fill="#EA4335"
				d="M10 3.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C14.9 1 12.7 0 10 0 6.1 0 2.7 2.2 1.1 5.6l3.3 2.5c.8-2.3 3-4.2 5.6-4.2z"
			/>
		</Svg>
	);
}
