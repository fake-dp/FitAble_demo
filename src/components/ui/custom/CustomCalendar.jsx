import React, { useState,useEffect,useCallback } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { COLORS } from '../../../constants/color';
import { themeStyled } from '../../../constants/calendarTheme';
import styled, { css } from 'styled-components/native';
import ToggleBtn from '../toggle/ToggleBtn';
import CalenderToggleBtn from '../toggle/CalenderToggleBtn';
import {getAvailableDates,getAvailableLessons} from '../../../api/lessonsApi';
import { useRecoilState } from 'recoil';
import {selectTodayState} from '../../../store/atom';
import { useIsFocused } from '@react-navigation/native';
LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'ko';

function CustomCalendar({mainCenterId,classList,setClassList}) {
  const isFocused = useIsFocused();
// console.log('mainCenterId',mainCenterId)
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [selected, setSelected] = useState(todayString);
  const [selectedToday, setSelectedToday] = useRecoilState(selectTodayState);
  const [currentMonth, setCurrentMonth] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [availableDates, setAvailableDates] = useState([]);


  const handleDayPress = useCallback(day => {
    console.log('day',day)
    console.log('Selected day:', day.dateString);
    console.log('Available dates:', availableDates);
    
    if (!availableDates[day.dateString]) {
        console.log('This date is not available for selection.');
        return;
    }
    // 사용자가 선택한 날짜가 오늘 날짜이면 selected를 false로 설정하고, 그렇지 않으면 해당 날짜를 selected로 설정합니다.
    if (mainCenterId && day.dateString === todayString) {
      setSelected(todayString);
      setSelectedToday(todayString);
    } else {
      setSelected(day.dateString);
      setSelectedToday(day.dateString);
    }

    getAvailableLessons(mainCenterId, day.dateString)
    .then(data => {
      //  console.log('ddd응답',data.content)
       setClassList(data.content)
    })
    .catch(error => {
        console.error("Error fetching lesson list", error.response);
    });

    // if (!availableDates[day.dateString]) {
    //   // 이 날짜는 선택할 수 없음
    //   return;
    // }
  }, [todayString,mainCenterId,availableDates]);
 
 


  const getAvailableDatesData = () => {
    getAvailableDates(mainCenterId)
    .then((data) => {
      const updatedAvailableDates = data.reduce((acc, currItem) => {
        acc[currItem.date] = { 
          selectedTextColor: COLORS.white,
          selected: true,
          selectedColor: currItem.isExistReservedLesson ? COLORS.box : COLORS.sub,
        };
        return acc;
      }, {});
      console.log('Updated availableDates:', updatedAvailableDates);
      setAvailableDates(updatedAvailableDates);
    }).catch((error) => {
      console.log('error',error)
    })
  }
  
  const fetchLessons = (date = todayString) => {
    if (!mainCenterId) return;
    setSelectedToday(date);
    getAvailableLessons(mainCenterId, date)
        .then(data => {
          setClassList(data.content);
        })
        .catch(error => {
            console.error("Error fetching lesson list:", error);
        });
    };

    useEffect(() => {
        console.log("mainCenterId updated:", mainCenterId);
        if(mainCenterId){
          getAvailableDatesData();
        //   getAvailableLessons(mainCenterId, todayString)
        }
      }
      ,[mainCenterId])

    useEffect(() => {
        // 현재 날짜 정보를 가져와서 초기 월과 년도 설정
        const currentDate = new Date();
        setCurrentMonth(`${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}`);
      }, []);  
  
    useEffect(() => {
    if (isFocused) {
      setSelected(selected);
      fetchLessons(selected); // 오늘 날짜의 수업 목록을 불러옵니다.
  }
  }, [mainCenterId,isFocused]);


  const renderCustomHeader = () => {
    return (
      <Container>
        <TitleText>{currentMonth}</TitleText>
        <CalenderToggleBtn isActive={isActive} setIsActive={setIsActive}/>
      </Container>
    );
  };
 

  return (
    <>

    <Calendar
    current={selected}
  //  style={isActive ? { height: 320 } : { height: 150, backgroundColor: COLORS.sub }}

    onMonthChange={(month) => {
        // month에 현재 월 정보가 들어있음
        setCurrentMonth(`${month.year}.${String(month.month).padStart(2, '0')}`);
    }}

    onDayPress={handleDayPress}
    markedDates={{
      ...availableDates,
      ...{[selected]: { selected: true, disableTouchEvent: true,selectedColor: COLORS.main, }},
      ...{[todayString]: { dotColor: '#FF7A00',marked: true, selected: selected === todayString}},
    }}
    theme={{
      ...themeStyled,
      dotStyle:{
        marginTop: 10,
      }
    }}

    renderHeader={renderCustomHeader} // 커스텀 헤더 적용
    enableSwipeMonths={true} // 좌우 스크롤로 월 넘기기
    hideArrows={true} // 화살표 숨기기
    // renderDay={renderDay} // 커스텀 날짜 적용
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