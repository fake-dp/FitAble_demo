import React, { useRef } from 'react';
import {  ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import HomeMainBanner from '../../ui/banner/HomeMainBanner';
import HomeSubBanner from '../../ui/banner/HomeSubBanner';
import FloatingBtn from '../../ui/buttonUi/FloatingBtn';
import UserTicketCard from '../../ui/card/UserTicketCard';
import {userCardData} from '../../../data/UserTicketData'
import UserTicketNoneCard from '../../ui/card/UserTicketNoneCard';


function HomeMainTemplate(props) {

    const handleFloatingButtonPress = () => {
        // 플로팅 버튼을 눌렀을 때 실행될 동작을 구현합니다.
        console.log('Floating Button Pressed',userCardData);
      };

    return (
        <Container>
        <HomeMainBanner />

        <SubContainer>
        <HomeSubBanner />
        <TitleText>현재 내 이용권</TitleText>
        </SubContainer>
 {
    userCardData.length === 0 ?
    <UserTicketNoneCard />
    :
    <>
    <ScrollView
    horizontal={true}
    >
    {userCardData.map((item, index) => (
        <UserTicketCard
        key={index}
        userCardData={item}
        />
        ))}
    </ScrollView>
    <FloatingBtn onPress={handleFloatingButtonPress} />
    </>
 }

 </Container>
    );
}

export default HomeMainTemplate;

const Container = styled.View`
    flex:1;
    background-color: ${COLORS.sub};
`

const SubContainer = styled.View`
    padding: 0 20px;
    margin-top: 20px;
`

const TitleText = styled.Text`
font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
margin-top: 30px;
`