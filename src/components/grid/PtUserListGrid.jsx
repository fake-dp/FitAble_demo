import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function PtUserListGrid(props) {

    const ptUserList = [
        {
            id: 0,
            name: '김종국',
            src: require('../../assets/img/user1.png'),
            weekdaytime: '09:00 ~ 22:00',
            weekendtime: '10:00 ~ 18:00',
        },
        {
            id: 1,
            name: '브이',
            src: require('../../assets/img/user2.png'),
            weekdaytime: '09:00 ~ 22:00',
            weekendtime: '10:00 ~ 18:00',
        },
        {
            id: 2,
            name: '해머',
            src: require('../../assets/img/user3.png'),
            weekdaytime: '09:00 ~ 22:00',
            weekendtime: '10:00 ~ 18:00',
        },
        {
            id: 3,
            name: '김종국',
            src: require('../../assets/img/user1.png'),
            weekdaytime: '09:00 ~ 22:00',
            weekendtime: '10:00 ~ 18:00',
        },
        {
            id: 4,
            name: '김종국',
            src: require('../../assets/img/user1.png'),
            weekdaytime: '09:00 ~ 22:00',
            weekendtime: '10:00 ~ 18:00',
        },
        {
            id: 5,
            name: '브이',
            src: require('../../assets/img/user2.png'),
            weekdaytime: '09:00 ~ 22:00',
            weekendtime: '10:00 ~ 18:00',
        },
        {
            id: 6,
            name: '해머',
            src: require('../../assets/img/user3.png'),
            weekdaytime: '09:00 ~ 22:00',
            weekendtime: '10:00 ~ 18:00',
        },
        {
            id: 7,
            name: '김종국',
            src: require('../../assets/img/user1.png'),
            weekdaytime: '09:00 ~ 22:00',
            weekendtime: '10:00 ~ 18:00',
        },
    ]


    return (
        <Container>
             <SubTextContainer>
            <SubText>· 일반 이용권을 구매할 수 있습니다.</SubText>
            <SubText>· 헬스장 이용권과 PT 이용권, 이외의 운동을 커스텀하여 이용권을 구매할 수 있습니다.</SubText>
            </SubTextContainer>
            <MainTitleText>트레이너</MainTitleText>
            <ScrollView>
            {
                ptUserList.map((ptUser) => (
                    <PtUserContainer key={ptUser.id}>
                        <PtUserImage source={ptUser.src}/>
                        <PtUserTimeContainer>
                            <PtUserName>{ptUser.name}</PtUserName>
                            <PtTimeText>수업 가능 시간</PtTimeText>
                            <PtUserTimeText>평일 : {ptUser.weekdaytime}</PtUserTimeText>
                            <PtUserTimeText>주말 : {ptUser.weekendtime}</PtUserTimeText>
                        </PtUserTimeContainer>
                    </PtUserContainer>
                ))
            }
            </ScrollView>
        </Container>
    );
}

export default PtUserListGrid;

const Container = styled.View`
 padding: 0 20px;
`

const SubTextContainer = styled.View`
    margin-top:28px;
`

const SubText = styled.Text`
    font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_300};
`

const MainTitleText = styled.Text`
margin-top: 40px;
font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
`

const PtUserContainer = styled.View`
    flex-direction: row;
    margin-top: 20px;
`

const PtUserImage = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 15px;
`

const PtUserName = styled.Text`
    font-size: 16px;
    font-weight: 700;
    line-height: 22.40px;
    color: ${COLORS.white};

`

const PtTimeText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_300};
`

const PtUserTimeContainer = styled.View`
    margin-left: 12px;
`

const PtUserTimeText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.gray_300};

`

