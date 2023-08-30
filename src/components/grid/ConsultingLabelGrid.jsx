import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import ConsultingLabelTag from './ConsultingLabelTag';

function ConsultingLabelGrid(
  {selectPurposeTags, setSelectPurposeTags,selectTimeTags, setSelectTimeTags,selectPromotionTags, setSelectPromotionTags}) {


  const TagDataPurpose = [
    {
      id: 0,
      title:'운동 목적',
      subtext:'최대 3개 선택 가능',
      tag:[
         '시설이용','개인레슨','그룹수업','다이어트','재활운동','체형교정','체력증가','건강유지','기타'],
      },
  ]
  
  const TagDataTime = [
  {
    id: 1,
    title:'희망 이용 시간',
    subtext:'최대 3개 선택 가능',
    tag:[
       '9시 이전','오전 9시~12시','오전 3시~6시','오후 6시~9시','오후 9시 이후'],
}]

const TagDataPromotion = [
{
    id: 2,
    title:'저희 센터를 어떻게 알게 되셨나요?',
    subtext:'최대 3개 선택 가능',
    tag:[
       '네이버 광고','간판','지인 소개','인스타그램','전단지','인터넷 검색','기타'],
}]

// console.log('tst',selectPurposeTags,selectTimeTags,selectPromotionTags)

  return (
    <>

        <Container>
          <ConsultingLabelTag TagData={TagDataPurpose} selectedTags={selectPurposeTags} setSelectedTags={setSelectPurposeTags}/>
          <ConsultingLabelTag TagData={TagDataTime} selectedTags={selectTimeTags} setSelectedTags={setSelectTimeTags}/>
          <ConsultingLabelTag TagData={TagDataPromotion} selectedTags={selectPromotionTags} setSelectedTags={setSelectPromotionTags}/>
        </Container>
 
    </>
  );
}

export default ConsultingLabelGrid;

const Container = styled.View`
  padding: 10px 0;
`;
