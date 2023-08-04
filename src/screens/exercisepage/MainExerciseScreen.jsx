import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text } from "react-native";
import { COLORS } from '../../constants/color';
import ExerciseSearchCenterScreen from './ExerciseSearchCenterScreen';
import MainCalenderScreen from './MainCalenderScreen';


function MainExerciseSreen(props) {

  const testDate = [];
  const searchCenterText = '센터 찾기'

  return (
    <>
      {testDate.length > 0 ? <MainCalenderScreen /> : <ExerciseSearchCenterScreen searchCenterText={searchCenterText}/>}
    </>
  )}

export default MainExerciseSreen;
