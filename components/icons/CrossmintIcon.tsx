import * as React from "react";
import { Svg, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import type { ViewStyle } from "react-native";

type Props = {
	style?: ViewStyle;
	width?: number;
	height?: number;
};

export default function CrossmintIcon({
	style,
	width = 32,
	height = 32,
}: Props) {
	return (
		<Svg
			width={width}
			height={height}
			viewBox="0 0 82 82"
			accessibilityLabel="Crossmint icon"
			style={style}
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M66.757 46.088c-6.87-3.516-16.037-4.698-21.421-5.098 7.328-.543 21.67-2.535 27.672-9.892C82.404 24.065 81.957.27 81.957.27S59.41-2.217 49.566 9.01C43.45 15.099 41.554 25.676 41 33.042c-.553-7.357-2.45-17.944-8.567-24.033C22.59-2.227.043.27.043.27s-.276 14.838 4.231 24.548c2.22 4.784 6.28 8.682 10.968 11.083C22.113 39.417 31.28 40.6 36.664 41c-5.384.4-14.551 1.582-21.422 5.099-4.688 2.401-8.747 6.299-10.968 11.083-4.507 9.7-4.23 24.538-4.23 24.538s22.546 2.487 32.39-8.738C38.55 66.89 40.446 56.304 41 48.947c.553 7.357 2.449 17.944 8.567 24.034 9.843 11.225 32.39 8.738 32.39 8.738s.285-14.837-4.231-24.548c-2.22-4.784-6.28-8.681-10.969-11.083Zm.753 20.813c-.114-.029-11.883-3.383-26.987-23.557-4.43 3.459-15.56 12.607-26.157 25.1l-.477.563.19-.715c.03-.124 3.479-12.245 24.49-27.683-2.029-3.012-6.803-9.94-25.232-26.264l-.41-.362.543.076c.39.058 9.863 1.544 27.168 23.843 0 0 .219.305.62.839 2.439-1.687 9.5-6.7 25.375-24.634l.363-.41-.077.543c-.057.391-1.543 9.816-23.699 27.055 4.184 5.28 12.836 15.476 24.443 25.31l.571.486-.714-.19h-.01Z"
				fill="url(#gradient)"
			/>
			<Defs>
				<LinearGradient
					id="gradient"
					x1="0.158"
					y1="0.156"
					x2="81.845"
					y2="81.831"
					gradientUnits="userSpaceOnUse"
				>
					<Stop offset="0" stopColor="#5EDD4D" />
					<Stop offset="1" stopColor="#05CE6C" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}
