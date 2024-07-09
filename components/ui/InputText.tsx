import ThemeColors from "@/constants/ThemeColors";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

export default function InputText({
  placeholder,
  leftSection,
  value,
  onChange,
  error,
  secureTextEntry,
  containerStyle,
}: {
  placeholder: string;
  leftSection?: ({ color }: { color: string }) => React.ReactNode;
  value?: string;
  onChange?: ((text: string) => void) | undefined;
  error?: string | false;
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View>
      <View
        style={[
          styles.container,
          containerStyle,
          error ? styles.errorContainer : styles.containerNormal,
        ]}
      >
        {leftSection && (
          <View style={styles.leftSection}>
            {leftSection({
              color: error ? ThemeColors.error : ThemeColors.baseContent,
            })}
          </View>
        )}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          style={[styles.input, error ? styles.inputError : styles.inputNormal]}
          placeholderTextColor={error ? ThemeColors.error : ThemeColors.gray500}
          secureTextEntry={secureTextEntry}
        />
      </View>

      {error && (
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  containerNormal: {
    borderColor: ThemeColors.baseContent,
  },
  errorContainer: {
    borderColor: ThemeColors.error,
  },
  input: {
    paddingVertical: 8,
    flex: 1,
  },
  inputNormal: {
    color: ThemeColors.baseContent,
  },
  inputError: {
    color: ThemeColors.error,
  },
  leftSection: {
    marginRight: 4,
  },
  errorTextContainer: {
    marginTop: 2,
  },
  errorText: {
    color: ThemeColors.error,
  },
});
