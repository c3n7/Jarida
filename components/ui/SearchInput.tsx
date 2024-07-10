import { StyleSheet } from "react-native";
import InputText from "./InputText";
import { Ionicons } from "@expo/vector-icons";

export default function SearchInput({
  value,
  onChange = () => {},
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <InputText
      placeholder="Type to search..."
      leftSection={({ color }) => (
        <Ionicons name="search" size={19} color={color} />
      )}
      containerStyle={styles.searchInput}
      value={value}
      onChange={onChange}
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 18,
  },
});
