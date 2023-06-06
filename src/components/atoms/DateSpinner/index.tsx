import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "./styles";
import { Typography } from "../../../utils";

export interface DateSpinnerType {
  getAge: (val: number) => void;
  getDate: (val: Date) => void;
}

export function DateSpinner({ getAge, getDate }: DateSpinnerType) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const onDateSelected = (e: Event, selectedDate: Date): void => {
    const modifiedDate = moment(selectedDate).format("YYYY-MM-DD");
    setDate(new Date(modifiedDate));
  };

  useEffect(() => {
    const age = moment().diff(date, "years");
    getAge(age);
    getDate(date);
  }, [date]);

  const handleConfirm = (selectedDate: any) => {
    const modifiedDate = moment(selectedDate).format("YYYY-MM-DD");
    setDate(new Date(modifiedDate));
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={showDatePicker}
      >
        <Text
          style={{
            color: "black",
            fontSize: 12,
            fontFamily: Typography.FONT_POPPINS_REGULAR,
          }}
        >
          Add your date of birth
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        backdropStyleIOS={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      />
    </View>
  );
}
