import { forwardRef } from "react";
import { TouchableOpacity, Text, StyleSheet, type View } from "react-native";

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button = forwardRef<View, ButtonProps>(
  ({ onPress, title, variant = "primary", disabled }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={[
          styles.button,
          variant === "secondary" && styles.buttonSecondary,
          disabled && styles.buttonDisabled,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[
            styles.text,
            variant === "secondary" && styles.textSecondary,
            disabled && styles.textDisabled,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00C853",
    padding: 16,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#00C853",
  },
  buttonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  textSecondary: {
    color: "#00C853",
  },
  textDisabled: {
    color: "#9E9E9E",
  },
});

export default Button;
