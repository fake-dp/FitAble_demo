import React, { useState,useEffect } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text } from "react-native";
import { COLORS } from '../../../constants/color';
import { themeStyled } from '../../../constants/calendarTheme';
import styled from 'styled-components/native';
import ToggleBtn from '../toggle/ToggleBtn';
import CalenderToggleBtn from '../toggle/CalenderToggleBtn';
LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'ko';

function CustomCalendar(props) {
  const [selected, setSelected] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    // 현재 날짜 정보를 가져와서 초기 월과 년도 설정
    const currentDate = new Date();
    setCurrentMonth(`${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}`);
  }, []);

  const renderCustomHeader = () => {
    return (
      <Container>
        <TitleText>{currentMonth}</TitleText>
        <CalenderToggleBtn />
      </Container>
    );
  };

  
  const renderDay = (day) => {
    // 현재 월의 날짜가 아니면 빈 셀을 반환
    const isCurrentMonth = day.month === parseInt(currentMonth.split('.')[1]);
    if (!isCurrentMonth) {
      return <View />;
    }
    // 현재 월의 날짜라면 기본 렌더링
    return (
      <View>
        <Text>{day.day}</Text>
        {selected === day.dateString && <Dot />} {/* 선택한 날짜에 점 표시 */}
      </View>
    );
  };

  const Dot = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: orange;
    position: absolute;
    top: 0;
    right: 0;
  `;


  return (
    <>

    <Calendar
    onMonthChange={(month) => {
        // month에 현재 월 정보가 들어있음
        setCurrentMonth(`${month.year}.${String(month.month).padStart(2, '0')}`);
    }}
    onDayPress={day => {
        setSelected(day.dateString);
    }}
    markedDates={{
        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
    }}
    theme={themeStyled}
    renderHeader={renderCustomHeader} // 커스텀 헤더 적용
    enableSwipeMonths={true} // 좌우 스크롤로 월 넘기기
    hideArrows={true} // 화살표 숨기기
    renderDay={renderDay} // 커스텀 날짜 적용
    />
    </>
  );
}

export default CustomCalendar;


const Container = styled.View`
    background-color: ${COLORS.sub};
    margin-bottom: 39px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 5px;
`

const TitleText = styled.Text`
    color: ${COLORS.white};
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
`