import React from 'react';
import CustomCalendar from '../../ui/custom/CustomCalendar';
import { styled, css } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { ScrollView ,Image} from 'react-native';
function MainCalenderTemplate(props) {

    const downIcon = require('../../../assets/img/whitedownex.png');
    const reroad = require('../../../assets/img/reroad.png');
    const userIcon = require('../../../assets/img/userIcon.png');

    const centerData = [
        {
            id: 0,
            title: '소도구 필라테스',
            date: '9:00 ~ 9:50',
            teacher: '김하나 트레이너',
            location: '리포머',
            isBook: false,
            isCancel: false,
            isEnd: true,
            userCount: 1,
            recruitment: 1,
        },
        {
            id: 1,
            title: '소도구 필라테스',
            date: '9:00 ~ 9:50',
            teacher: '김하나 트레이너',
            location: '리포머',
            isBook: true,
            isCancel: false,
            isEnd: false,
            userCount: 1,
            recruitment: 1,
        },
        {
            id: 2,
            title: '소도구 필라테스',
            date: '9:00 ~ 9:50',
            teacher: '김하나 트레이너',
            location: '리포머',
            isBook: false,
            isCancel: true,
            isEnd: false,
            userCount: 1,
            recruitment: 8,
        },
        {
            id: 3,
            title: '소도구 필라테스',
            date: '9:00 ~ 9:50',
            teacher: '김하나 트레이너',
            location: '리포머',
            isBook: false,
            isCancel: false,
            isEnd: true,
            userCount: 1,
            recruitment: 1,
        },
        {
            id: 4,
            title: '소도구 필라테스',
            date: '9:00 ~ 9:50',
            teacher: '김하나 트레이너',
            location: '리포머',
            isBook: true,
            isCancel: false,
            isEnd: false,
            userCount: 1,
            recruitment: 1,
        },
        {
            id: 5,
            title: '소도구 필라테스',
            date: '9:00 ~ 9:50',
            teacher: '김하나 트레이너',
            location: '리포머',
            isBook: false,
            isCancel: true,
            isEnd: false,
            userCount: 1,
            recruitment: 8,
        },
        
    ]


 



    return (
        <Container>
             <TitleContainer>
                   <TitleText>에이블짐 노원본점</TitleText>
                   <DownIcon source={downIcon}/>
             </TitleContainer>
       <CustomCalendar />

        <ReroadContainer>
            <ReroadBtn>
                <ReroadIcon source={reroad}/>
                <ReroadText>새로고침</ReroadText>
            </ReroadBtn>
        </ReroadContainer>
        <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
        {
            centerData.map((item, index) => (
                
                <CenterListContainer key={index} isLastItem={index === centerData.length - 1}>
                    <CenterList>
                        <CenterListText>{item.title}</CenterListText>
                        <CenterListDate>{item.date}</CenterListDate>
                        <CenterListText>{item.teacher} | {item.location}</CenterListText>

                        <CenterRecruitContainer>
                        <Image source={userIcon}/>
                        <CenterRecruitmentText>{item.userCount} / {item.recruitment}</CenterRecruitmentText>
        

                        </CenterRecruitContainer>
                    </CenterList>

                    <CenterListRight>
                        <CenterListBtn>
                            <CenterListRightTopText
                            isBook={item.isBook}
                            isCancel={item.isCancel}
                            isEnd={item.isEnd}
                            >{item.isBook ? '예약' : item.isCancel ? '취소' : item.isEnd ? '종료' : ''}</CenterListRightTopText>
                        </CenterListBtn>
                    </CenterListRight>
                </CenterListContainer>
            ))
        }
        </ScrollView>

        </Container>
    );
}

export default MainCalenderTemplate;


const Container = styled.View`
    flex:1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`
const TitleContainer = styled.View`
    padding: 0 20px;
    margin-bottom: 42px;
    flex-direction: row;
    align-items: center;
`
const TitleText = styled.Text`
color: ${COLORS.white};
font-size: 20px;
font-weight: 600;
line-height: 28px;
`
const DownIcon = styled.Image`
margin-left: 8px;
`
const ReroadContainer = styled.View`
margin-top: 28px;
border-top-width: 1px;
border-color: #535258;
padding: 25px 20px;
background-color: ${COLORS.sub};
`
const ReroadBtn = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: flex-end;
`
const ReroadIcon = styled.Image`
width: 15px;
height: 15px;
margin-right: 8px;
`
const ReroadText = styled.Text`
font-size: 14px;
color: ${COLORS.white};
font-weight: 500;
line-height: 22.40px;
`
    
const CenterListContainer = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 20px 20px;
border-bottom-width: ${(props) => (props.isLastItem ? '0px' : '1px')};
border-color: #535258;
background-color: ${COLORS.sub};
`

const CenterList = styled.View`
flex: 1;
`

const CenterListText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_300};
font-weight: 400;
line-height: 22.40px;
margin-bottom: 4px;
`

const CenterListDate = styled.Text`
font-size: 20px;
color: ${COLORS.gray_300};
font-weight: 600;
line-height: 28px;
`

const CenterRecruitmentText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_300};
font-weight: 500;
line-height: 22.40px;
margin-left: 8px;
`

const CenterRecruitContainer = styled.View`
flex-direction: row;
align-items: center;
`



const CenterListRight = styled.View`
width: 30%;
align-items: flex-end;
`

const CenterListBtn = styled.TouchableOpacity`
background-color: ${COLORS.box};
border-radius: 100px;
padding: 9px 26px;
align-items: center;
justify-content: center;
`

const CenterListRightTopText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_400};
font-weight: 500;
line-height: 22.40px;
${(props) => 
    props.isBook && css`
      color: ${COLORS.main}; /* 예약일 때의 글자 색 */
    `}
  ${(props) => 
    props.isCancel && css`
      color: ${COLORS.white}; /* 취소일 때의 글자 색 */
    `}
  ${(props) => 
    props.isEnd && css`
      color: ${COLORS.gray_400}; /* 종료일 때의 글자 색 */
    `}
`;