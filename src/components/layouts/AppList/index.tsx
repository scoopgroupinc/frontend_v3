import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});

const Item = ({ name, details }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text>{details}</Text>
  </View>
);

const List = (props: any) => {
  const renderItem = ({ item }: any) => {
    // when no input, show all
    if (props?.searchPhrase === "") {
      return <Item name={item.name} details={item.details} />;
    }
    // filter of the name
    if (
      item.name.toUpperCase().includes(props?.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
    // filter of the description
    if (
      item.details
        .toUpperCase()
        .includes(props?.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View>
        <FlatList data={props?.data} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </View>
    </SafeAreaView>
  );
};

export default List;
