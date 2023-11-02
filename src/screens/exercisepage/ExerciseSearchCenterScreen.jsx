import React from 'react';
import ExerciseSearchCenterTemplate from '../../components/templates/exerciseScreens/ExerciseSearchCenterTemplate';

function ExerciseSearchCenterScreen() {

    const searchCenterText = '센터 찾기'
    const labelText = ['• 자주 이용하는 대표 센터를 지정해주세요\n','• 대표 센터는 언제든 변경 가능합니다']

    return (
        <ExerciseSearchCenterTemplate 
        searchCenterText={searchCenterText}
        labelText={labelText}
        />
    );
}

export default ExerciseSearchCenterScreen;