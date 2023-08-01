import React from "react";
import { TextInput, View, Keyboard, Text, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { styles } from "./styles";

const SearchFilter = (props: any) => (
  <View style={styles.container}>
    <View style={!props?.clicked ? styles.searchBar__unclicked : styles.searchBar__clicked}>
      <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={props?.searchPhrase}
        onChangeText={props?.setSearchPhrase}
        onFocus={() => {
          props?.setClicked(true);
        }}
      />

      {props?.clicked && (
        <Entypo
          name="cross"
          size={20}
          color="black"
          style={{ padding: 1 }}
          onPress={() => {
            props?.setSearchPhrase("");
          }}
        />
      )}
    </View>
    {props?.clicked && (
      <View
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            props?.setClicked(false);
          }}
        >
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

export default SearchFilter;
