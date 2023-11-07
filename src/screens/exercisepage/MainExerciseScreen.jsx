import React, { useEffect, useState } from 'react';
import ExerciseSearchCenterScreen from './ExerciseSearchCenterScreen';
import MainCalenderScreen from './MainCalenderScreen';
import {getValidCenterName} from '../../api/mypageApi';
import {ActivityIndicator, View} from 'react-native';
import { COLORS } from '../../constants/color';
function MainExerciseSreen(props) {


  const [centerName, setCenterName] = useState('');
  const [loading, setLoading] = useState(true);

  const getValidCenterNameData = async () => {
      try {
          const response = await getValidCenterName();
          console.log('response@@@@@',response);
          setCenterName(response);
      } catch (error) {
          console.error('Error getting:', error);
      } finally {
          setLoading(false);  // 데이터를 가져온 후에 로딩 상태를 false로 설정
      }
  }

  useEffect(() => {
    getValidCenterNameData();
  },[])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:COLORS.sub }}>
        <ActivityIndicator size="large" color={COLORS.main} />
      </View>
    );
  }

  return (
    <>
      <MainCalenderScreen /> 
    </>
  )}

export default MainExerciseSreen;
