import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text } from "react-native";

LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'ko';

function MainExerciseSreen(props) {
  const [selected, setSelected] = useState('');

  const renderDay = (day, item) => {
    return (
      <View style={{ backgroundColor: 'black' }}>
        <Text style={{ color: 'gray' }}>{day.day}</Text>
      </View>
    );
  };

  return (
    <Calendar
      style={{ backgroundColor: 'black' }}
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
      }}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
      renderDay={renderDay} // 커스텀 날짜 컴포넌트 적용
    />
  );
}

export default MainExerciseSreen;
