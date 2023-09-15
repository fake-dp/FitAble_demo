import {  ScrollView, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import {useStopTicket}from '../../../api/useTicketsApi';
import { COLORS } from '../../../constants/color';
import { useState } from 'react';

const SelectDatePicker = ({handleOutsideClick,setSelectedYear,setSelectedMonth,setSelectedDay}) => {
  const screenHeight = Dimensions.get('window').height;
  const itemHeight = screenHeight / 4; 
  const navigation = useNavigation();




  const preventBubble = (e) => {
    e.stopPropagation();
  };


  const years = [];
  const months = [];
  const days = [];

  for (let y = 1970; y <= new Date().getFullYear(); y++) {
    years.push(y);
  }

  for (let m = 1; m <= 12; m++) {
    months.push(m < 10 ? '0' + m : m.toString());
  }

  for (let d = 1; d <= 31; d++) {
    days.push(d < 10 ? '0' + d : d.toString());
  }

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };


  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <PickerContainer>
        <Container onPress={preventBubble}>
          <DateContainer style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <ScrollView
              nestedScrollEnabled={true}
              pagingEnabled
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              decelerationRate={0}
              snapToInterval={itemHeight}
              snapToAlignment="center"
              style={{ height: itemHeight, width: '30%' }}
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
              {years.map((year, index) => (
                <TextContainer key={index} style={{ height: itemHeight }}>
                  <PickerBtn onPress={() => handleYearChange(year)}>
                    <PickerText>{year}</PickerText>
                  </PickerBtn>
                </TextContainer>
              ))}
            </ScrollView>
            <ScrollView
              nestedScrollEnabled={true}
              pagingEnabled
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              decelerationRate={0}
              snapToInterval={itemHeight}
              snapToAlignment="center"
              style={{ height: itemHeight, width: '30%' }}
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
              {months.map((month, index) => (
                <TextContainer key={index} style={{ height: itemHeight }}>
                  <PickerBtn onPress={() => handleMonthChange(month)}>
                    <PickerText>{month}</PickerText>
                  </PickerBtn>
                </TextContainer>
              ))}
            </ScrollView>
            <ScrollView
              nestedScrollEnabled={true}
              pagingEnabled
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              decelerationRate={0}
              snapToInterval={itemHeight}
              snapToAlignment="center"
              style={{ height: itemHeight, width: '30%' }}
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
              {days.map((day, index) => (
                <TextContainer key={index} style={{ height: itemHeight }}>
                  <PickerBtn onPress={() => handleDayChange(day)}>
                    <PickerText>{day}</PickerText>
                  </PickerBtn>
                </TextContainer>
              ))}
            </ScrollView>
          </DateContainer>
        </Container>
      </PickerContainer>
    </TouchableWithoutFeedback>
  );
}
 

export default SelectDatePicker;

const PickerContainer = styled.View`
  position: absolute;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  /* height: ${props => props.screenHeight + 'px'}; */
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.TouchableOpacity`
    flex: 1;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #F2F2F7;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`;

const TextContainer = styled.View`
justify-content: center;
align-items: center;
background-color: #74748014;
width: 100%;
`

const PickerBtn = styled.TouchableOpacity`
    background-color: rgba(116, 116, 128, 0.08);
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
`

const PickerText = styled.Text`
color: rgba(60, 60, 67, 0.60);
font-size: 23px;
font-weight: 400;
line-height: 28px;
`

const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;