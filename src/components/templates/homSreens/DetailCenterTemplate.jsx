import {Image , ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import GymBasicInfoGrid from '../../grid/GymBasicInfoGrid';
import ThreeBtnGrid from '../../grid/ThreeBtnGrid';
import OperatingProgram from '../../grid/OperatingProgram';
import OperaintgTime from '../../grid/OperatingTime';
import FacilitiesGrid from '../../grid/FacilitiesGrid';
import PhotoScrollGrid from '../../grid/PhotoScrollGrid';

import ActiveMainBtn from '../../ui/buttonUi/ActiveMainBtn';
import AboutChannel from '../../grid/AboutChannel';
import LongTextGrid from '../../grid/LongTextGrid';
import ShopTagGrid from '../../grid/ShopTagGrid';

import { useState } from 'react';
import BasicNpremiumCardGrid from '../../grid/BasicNpremiumCardGrid';
import MonthTicketGrid from '../../grid/MonthTicketGrid';
import PtUserListGrid from '../../grid/PtUserListGrid';

function DetailCenterTemplate(props) {

    const [btnName, setBtnName] = useState('');
    const [selectedCard, setSelectedCard] = useState(0);
    const [selectedMonthCard, setSelectedMonthCard] = useState(0);

    const handleBtnPress = (name) => {
        setBtnName(name);
    };


    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    const goConsultingScreens = () => {
        navigation.navigate('Consulting');
    };

    const testImg = require('../../../assets/img/detailTest.png');
    const backArrow = require('../../../assets/img/back_arrow.png');

    const ticketData = [
        {
            id: 0,
            title: 'Basic',
            contents : '선택한 센터에서만 사용가능',
            price: '30,000',
        },
        {
            id: 1,
            title: 'Premium',
            contents : '모든 센터 사용 가능',
            price: '119,000',
        },
    ]

    const monthTicketData = [
        {
            id: 0,
            title: '1개월 이용권',
            price: '70,000',
        },
        {
            id: 1,
            title: '3개월 이용권',
            price: '210,000',
        },
        {
            id: 2,
            title: '6개월 이용권',
            price: '420,000',
        },
        {
            id: 3,
            title: '12개월 이용권',
            price: '840,000',
        },
        {
            id: 4,
            title: '4개월 이용권+PT 이용권',
            price: '5,000,000',
        }
    ]

    return (
        <Container>
            <ScrollView
              bounces={false}
         
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            >
            <TestImg source={testImg}/>
            <GobackTouchable onPress={goBackScreens}>
            <Image source={backArrow}/>
            </GobackTouchable>

            <GymBasicInfoGrid 
            onPress={goConsultingScreens}
            />

        <ThreeBtnGrid
          onPressSubscribe={() => handleBtnPress('Subscribe')}
          onPressPT={() => handleBtnPress('PT')}
          onPressUse={() => handleBtnPress('Use')}
        />
        {btnName === 'Subscribe' && (
          <BasicNpremiumCardGrid 
          ticketData={ticketData} 
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          />
        )}

        {btnName === 'PT' && (
          <PtUserListGrid />
        )}

        {btnName === 'Use' && (
          <MonthTicketGrid 
          monthTicketData={monthTicketData} 
          selectedMonthCard={selectedMonthCard}
          setSelectedMonthCard={setSelectedMonthCard}
          />
        )}

        {btnName !== 'PT' && (
            <>
            <LongTextGrid />
            <ShopTagGrid />
            <OperatingProgram />
            <OperaintgTime />
            <FacilitiesGrid />
            <PhotoScrollGrid />
            <AboutChannel />
            </>
        )}            

        {btnName === 'Subscribe' && (
          <ActiveMainBtn>구독하기</ActiveMainBtn>
        )}

        {btnName === 'PT' && (
          <ActiveMainBtn>P.T 상담하기</ActiveMainBtn>
        )}

        {btnName === 'Use' && (
          <ActiveMainBtn>구매하기</ActiveMainBtn>
        )}

        {btnName !== 'Subscribe' && btnName !== 'PT' && btnName !== 'Use' && (
          <ActiveMainBtn>구독하기</ActiveMainBtn>
        )}


        </ScrollView>
        </Container>
    );
}

export default DetailCenterTemplate;


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
`


const TestImg = styled.Image`
    width: 100%;
`

const GobackTouchable = styled.TouchableOpacity`
position: absolute;
top: 56px;
left: 20px;
`;
