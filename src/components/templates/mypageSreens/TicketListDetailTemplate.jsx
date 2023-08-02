import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import React, { useEffect, useState } from 'react';
import { View,Text, ScrollView, SafeAreaView ,TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import MyBtn from '../../ui/buttonUi/MyBtn';
function TicketListDetailTemplate(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const { data } = route.params;
  
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      console.log('Received Data:', data);
    }, [data]);
   
    const goBackScreens = () => {
        navigation.goBack();
    };

    const goExerciseScreens = () => {
        navigation.navigate('Exercise');
    };

    const toggleContent = () => {
        setShowContent(!showContent);
    };

    const ticketListData = [
        {
            id: 0,
            title: '잔여횟수',
            content: '2회/총 3회',
        },
        {
            id: 1,
            title: '수업시간',
            content: '30분',
        },
        {
            id: 2,
            title: '주간이용',
            content: '무제한',
        },
        {
            id: 3,
            title: '1일 이용',
            content: '0회 남음 | 일 2회',
        },
        {
            id: 4,
            title: '최대 예약권(예약 최대 가능 횟수)',
            content: '무제한',
        },
        {
            id: 5,
            title: '예약 취소권(예약 취소 가능 횟수)',
            content: '무제한',
        },
        {
            id: 6,
            title: '중지권',
            content: '2개(7일권, 2주권)',
        },
        {
            id: 7,
            title: '옵션',
            content: '개인 락커 30번(55일 남음)',
        },
        {
            id: 8,
            title: '운동복',
            content: '55일 남음',
        },
    ]

    const downIcon = require('../../../assets/img/downcoupon.png');
    const upIcon = require('../../../assets/img/upcoupon.png');

    return (
        <Container>
            <SafeAreaView/>
            <HeaderContainer>
                <GobackContainer>
                 <GobackGrid onPress={goBackScreens}/>
                </GobackContainer>

                <SpotTitleText>에이블짐 노원점</SpotTitleText>
                <UseTicketTitleText>
                    {data==='subscribe'? '시설 3개월 이용권':'1:1 P.T 30회 이용권'}
                    </UseTicketTitleText>
            <SubTextContainer>
                <SubText>2023.06.05~2023.09.05</SubText>
                <SubText>48일 남음</SubText>
            </SubTextContainer>
            </HeaderContainer>

            <TicketListContentsContainer>
                <ScrollView
                showsVerticalScrollIndicator={false}
                >
                {
                    ticketListData.map((item, index) => (
                        <TicketTextContainer key={index}>
                            <TicketTitleText>{item.title}</TicketTitleText>
                            <TicketContentsText>{item.content}</TicketContentsText>
                        </TicketTextContainer>
                    ))
                }
                 {
                    data==='subscribe' &&
                    <CenterListContainerBox onPress={toggleContent} activeOpacity={0.8}>
                        <CenterContainer>
                         <CenterListText>이용 가능 센터 30</CenterListText>
                         <UpdownImg source={showContent ? upIcon : downIcon} />
                        </CenterContainer>

                        {
                            showContent && (
                                <CenterListContainer>
                                    <CenterListLongText>노원본점, 노원역점, 수유점, 압구정로데오점, 삼성중앙역점, 신논현역점, 강남역점, 교대역점, 종합운동장역점, 이태원점, 어린이대공원점, 한양대점, 잠실역점, 장안점, 용두역점, 암사역점, 창신역점, 천호역점, 신촌점, 길동역점, 사가정점, 상봉역점, 홍대입구역점, 돈암점, 위례점, 응암점, 먹골역점, 영등포역점, 구로디지털단지역점, 대림역점, 발산역점, 상암점, 불광점, 신정네거리역점, 마곡 수명산파크점, 중계점, 마곡나루센터, 신방화역점</CenterListLongText>
                                </CenterListContainer>
                            )
                        }

                    </CenterListContainerBox>
                }
                </ScrollView>
                {
                    data !=='subscribe' && <MyBtn onPress={goExerciseScreens}>운동하기</MyBtn>
                }
            </TicketListContentsContainer>
        </Container>
    );
}


export default TicketListDetailTemplate;

const Container = styled.View`
  flex: 1;
  /* padding: 0 20px; */
  background-color: ${COLORS.white};
`;

const HeaderContainer = styled.View`
    width: 100%;
    height: 260px;
    background-color: ${COLORS.sub};
    padding: 0 20px;
`

const GobackContainer = styled.View`
     margin-top:40px ;
`

const SpotTitleText = styled.Text`
color: ${COLORS.gray_200};
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
margin-top: 52px;
margin-bottom: 20px;
`

const UseTicketTitleText = styled.Text`
font-size: 32px;
font-weight: 600;
line-height: 43.20px;
color: ${COLORS.main};
margin-bottom: 6px;
`

const SubTextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SubText = styled.Text`
font-size: 16px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.white};
`

const TicketListContentsContainer = styled.View`
    padding: 0 20px;
    margin-top: 26px;
    flex: 1;
    margin-bottom: 20px;
`

const TicketTextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 17px;
`

const TicketTitleText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.sub};
`

const TicketContentsText = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_400};
`

const CenterListContainerBox = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  border: 1px solid ${COLORS.gray_200};
`;
const CenterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 14px 14px;
  border-radius: 13px;
  justify-content: space-between;
`;

const UpdownImg = styled.Image``;

const CenterListText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
`

const CenterListContainer = styled.View`
    padding:0 15px;
    margin-bottom: 20px;
`

const CenterListLongText = styled.Text`
    color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`