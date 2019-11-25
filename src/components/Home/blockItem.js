import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";

const BlockItem = props => {
  const itemText = item => (
    <View styles={styles.itemTextContainer}>
      <Text style={styles.itemTextTitle}>{item.title}</Text>
      <Text style={styles.itemTextPrice}>$ {item.price}</Text>
    </View>
  );

  const itemImage = () => (
    <View>
      <Image
        resizeMode={"cover"}
        style={styles.itemImage}
        source={{ uri: "https://picsum.photos/200/300" }}
      />
    </View>
  );

  const block = ({ item, i }) => (
    <View style={styles.blockRow}>
      <TouchableOpacity
        onPress={() => {
          props.goto(item.blockOne);
        }}
        style={{ flex: 2 }}
      >
        <View style={[styles.blockGridStyle, styles.blockGridStyleLeft]}>
          {itemImage()}
          {itemText(item.blockOne)}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.goto(item.blockTwo);
        }}
        style={{ flex: 2 }}
      >
        <View style={[styles.blockGridStyle, styles.blockGridStyleRight]}>
          {itemImage()}
          {itemText(item.blockTwo)}
        </View>
      </TouchableOpacity>
    </View>
  );

  return <View>{block(props)}</View>;
};

const styles = StyleSheet.create({
  blockRow: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between"
  },
  itemImage: {
    width: "100%",
    height: 180,
    borderRadius: 10
  },
  itemTextContainer: {
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#a9a9a9"
  },
  itemTextTitle: {
    fontFamily: "Avenir-Black",
    color: "#4c4c4c",
    marginBottom: 5
  },
  itemTextPrice: {
    fontFamily: "Avenir-Roman",
    color: "#6b0000"
  },
  blockGridStyle: {
    borderRadius: 10,
    backgroundColor: "#e3e3e3"
  },
  blockGridStyleLeft: {
    marginRight: 2.5
  },
  blockGridStyleRight: {
    marginLeft: 2.5
  }
});

export default BlockItem;
