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
import { useNavigation } from '@react-navigation/native';

function HomeMainTemplate(props) {

    const navigation = useNavigation();

    const goDetailCenterScreen = () => {
        navigation.navigate('DetailCenter');
      };

    const goSearchCenterScreen = () => {
        navigation.navigate('SearchCenter');
      }

    return (
        <Container>
        <HomeMainBanner />

        <SubContainer>
        <HomeSubBanner />
        <TitleText>현재 내 이용권</TitleText>
        </SubContainer>
 {
    // 센터 등록하기 이용권 없을때
    userCardData.length === 0 ?
    <UserTicketNoneCard 
    onPress={goSearchCenterScreen}
    />
    :
    <>
    <ScrollView
    horizontal={true}
    bounces={false}

    showsVerticalScrollIndicator={false}
    overScrollMode="never"
    >
    {userCardData.map((item, index) => (
        <UserTicketCard
        key={index}
        userCardData={item}
        />
        ))}
    </ScrollView>
    <FloatingBtn onPress={goDetailCenterScreen} />
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