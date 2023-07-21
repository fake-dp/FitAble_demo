import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { View,Text, SafeAreaView } from "react-native";
function MainExerciseSreen(props) {
    const [selected, setSelected] = useState('');

    return (
        <SafeAreaView>

      <Calendar
        onDayPress={day => {
            setSelected(day.dateString);
        }}
        markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
        />
        </SafeAreaView>
    );
  };

export default MainExerciseSreen;