import ThemeColors from "@/constants/ThemeColors";
import { StyleSheet, Text, View } from "react-native";

export default function JournalCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What and of whom.</Text>
      <Text style={styles.date}>16 October 2024</Text>
      <View>
        <Text>
          Of my grandfather Verus I have learned to be gentle and meek, and to
          refrain from all anger and passion. From the fame and memory of him
          that begot me I have learned both shamefastness and manlike behaviour.
          Of my mother I have learned to be religious, and bountiful; and to
          forbear, not only to do, but to intend any evil; to content myself
          with a spare diet, and to fly all such excess as is incidental to
          great wealth...
        </Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryBadge}>Reflections</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.base100,
    padding: 12,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    color: ThemeColors.gray600,
    marginBottom: 6,
  },
  categoryContainer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: ThemeColors.primary200,
    color: ThemeColors.baseContent,
    borderRadius: 120,
  },
});
