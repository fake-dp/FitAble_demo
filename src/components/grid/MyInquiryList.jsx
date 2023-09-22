import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {formatDate} from '../../utils/CustomUtils';

function MyInquiryList({ inquiryList,centerId }) {
    console.log('inquiryList',inquiryList)
    const navigation = useNavigation();
    const [openInquiryIds, setOpenInquiryIds] = useState([]);

    const toggleInquiryOpen = (id) => {
      setOpenInquiryIds(prevOpenInquiryIds => {
        if (prevOpenInquiryIds.includes(id)) {
          return prevOpenInquiryIds.filter(openId => openId !== id);
        } else {
          return [...prevOpenInquiryIds, id];
        }
      });
    };

    const goInquiryScreens = () => {
        navigation.navigate('FitableQnA',{text:'문의하기',centerId:centerId});
    };

    


const commentup = require('../../assets/img/listup.png');
const commentdown = require('../../assets/img/listdown.png');

  return (
    <NoticeListTextContainer>
      
        <MainTitleContainer>
             <NoticeListText>센터 문의사항</NoticeListText>
            <InquiryListTextBtnContainer onPress={goInquiryScreens}>
                <InquiryListTextBtnText>문의하기</InquiryListTextBtnText>
                </InquiryListTextBtnContainer>
        </MainTitleContainer>
        {inquiryList.length === 0 && (
        <MainTitleContainer>
            <NoListText>등록된 문의사항이 없습니다.</NoListText>
        </MainTitleContainer>
        )}
      {inquiryList.map((inquiry) => (
        <InquiryItem key={inquiry.id}>
            <QnAListContainer>
            <QnAListText>Q.</QnAListText>
            <QnAListAnswerLabelText>{inquiry.isComment ? '답변완료' : '답변대기'}</QnAListAnswerLabelText>
            </QnAListContainer>

            <QnAListTitleContainer>
            <QnAListQuestionText>{inquiry.context}</QnAListQuestionText>
            </QnAListTitleContainer>

            <QnAListTitleContainer>
            <QnAListUserDateText>{inquiry.name}  |  {inquiry.createAt}</QnAListUserDateText>
            {
                inquiry.isComment && (
                    <OnpressContainer onPress={() => toggleInquiryOpen(inquiry.id)}>
                         <IconImg source={openInquiryIds.includes(inquiry.id) ? commentup : commentdown}/>
                     </OnpressContainer>
                )
            }
            </QnAListTitleContainer>


            {openInquiryIds.includes(inquiry.id) && inquiry.comment && (
            <CommentContainer>
   
            <QnAListText>A.</QnAListText>
            <IsCommentTextContainer>
            <QnAListQuestionText>{inquiry.comment.context}</QnAListQuestionText>
            </IsCommentTextContainer>

            <QnAListUserDateText>{inquiry.comment.name}  |  {inquiry.comment.createAt}</QnAListUserDateText>
           
            </CommentContainer>
          )}
 
        </InquiryItem>
      ))}
    </NoticeListTextContainer>
  );
}

export default MyInquiryList;

const NoticeListTextContainer = styled.View`
  margin-top: 63px;
`;

const MainTitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 34px;
    padding: 0 20px;
`;

const NoticeListText = styled.Text`
  font-size: 16px;
  color: ${COLORS.sub};
  font-weight: 500;
  line-height: 22.40px;
`;

const InquiryItem = styled.View`
  background-color: ${COLORS.white};
  margin-bottom: 28px;
`;


const QnAListContainer = styled.View`
    background-color: ${COLORS.white};
    border-radius: 15px;
    margin-bottom: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`

const QnAListText = styled.Text`
    font-size: 16px;
    font-weight: 700;
`

const QnAListAnswerLabelText = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: black;
`

const QnAListTitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 20px;
`

const QnAListQuestionText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: black;
`

const QnAListUserDateText = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: ${COLORS.gray_300};
    /* padding-bottom: 9px; */
`

const OnpressContainer = styled.TouchableOpacity`
`;

const IconImg = styled.Image`
    width: 16px;
    height: 16px;
    `;

const CommentContainer = styled.View`
    background-color: ${COLORS.gray_100};
    padding:16px 20px;
`

const IsCommentTextContainer = styled.View`
    margin-top: 8px;
    margin-bottom: 12px;
`

const InquiryListTextBtnContainer = styled.TouchableOpacity`
background-color: ${COLORS.sub};
padding: 6px 16px;
border-radius: 90px;
`

const InquiryListTextBtnText = styled.Text`
color: ${COLORS.white};
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
`

const NoListContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`

const NoListText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: ${COLORS.gray_400};
line-height: 22.40px;
`
