import React, { useState,useEffect,useCallback } from 'react';
import { Calendar, LocaleConfig,ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { COLORS } from '../../../constants/color';
import { themeStyled } from '../../../constants/calendarTheme';
import styled, { css } from 'styled-components/native';

import {getAvailableDates,getAvailableLessons} from '../../../api/lessonsApi';
import { useRecoilState } from 'recoil';
import {selectTodayState} from '../../../store/atom';
import { useIsFocused } from '@react-navigation/native';
import CalenderClassList from '../list/CalenderClassList';
LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'ko';

function CustomCalendar({selectedItem,showModal,classList,closeModal,handleBtn,handleCanceBtn,mainCenterId,handleReload,setClassList,weekView,mainCenter,isReserveButtonDisabled, isCancelButtonDisabled}) {
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
    // console.log('Available dates:', availableDates);
    
    // if (!availableDates[day.dateString]) {
    //     console.log('This date is not available for selection.');
    //     return;
    // }
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
      // console.log('Updated availableDates:', updatedAvailableDates);
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
        {/* <CalenderToggleBtn isActive={isActive} setIsActive={setIsActive}/> */}
      </Container>
    );
  };
 

  return (
    <>
<CalendarProvider
          date={selected}
        theme={themeStyled}
        hideExtraDays={true}
    >
      {weekView ? (
        <WeekCalendar  
        firstDay={0} markedDates={availableDates}
        hideExtraDays={false}
        />
      ) : (
        <>
   
        <ExpandableCalendar
        disableAllTouchEventsForDisabledDays={true}
        hideExtraDays={true}
        style={{
            ...Platform.select({
              ios: {
                shadowColor: 'transparent',
                zIndex: 99,
                backgroundColor: '#fff',
              },
              android: {
                elevation: 0
              },
              
            })
        }}
        renderHeader={renderCustomHeader}
        hideArrows
        markedDates={{
          ...availableDates,
          ...{[selected]: { selected: true, disableTouchEvent: true,selectedColor: COLORS.main,selectedTextColor: COLORS.sub }},
          // ...{[todayString]: { dotColor: '#FF7A00',marked: true, selected: selected === todayString}},
          ...{[todayString]: selected === todayString ? 
            { selected: true, selectedColor: COLORS.main, selectedTextColor: COLORS.sub, dotColor: '#FF7A00', marked: true } : 
            { dotColor: '#FF7A00', marked: true }
        },
        }}
          onDayPress={handleDayPress}
          theme={themeStyled&&themeStyled}
          onMonthChange={(month) => {
            setCurrentMonth(`${month.year}.${String(month.month).padStart(2, '0')}`);
        }}
          firstDay={0}

        />
      </>
      )
      }
      <CalenderLine/>

      <CalenderClassList 
      mainCenterId={mainCenterId}
      mainCenter={mainCenter}
      handleReload={handleReload}
      handleCanceBtn={handleCanceBtn}
      handleBtn={handleBtn}
      closeModal={closeModal}
      classList={classList}
      showModal={showModal}
      selectedItem={selectedItem}
      isReserveButtonDisabled={isReserveButtonDisabled}
      isCancelButtonDisabled={isCancelButtonDisabled}
      />
    </CalendarProvider>
  

    </>
    
  );
}

export default CustomCalendar;


const Container = styled.View`
    background-color: ${COLORS.sub};
    margin-bottom: 12px;
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

const CalenderLine = styled.View`
border-top-width: 1px;
border-color: #535258;
margin-top: 30px;
padding: 0 20px;
`

const TestView = styled.View`

`
const TestText = styled.Text`
`