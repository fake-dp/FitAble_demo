import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import PriceProductGrid from '../../grid/PriceProductGrid';

import ActiveMainBtn from '../../ui/buttonUi/ActiveMainBtn';
import CollsAbleGrid from '../../grid/CollsAbleGrid';
import SelectOptionGrid from '../../grid/SelectOptionGrid';
import React, { useState, useCallback } from 'react';
import SelectCouponGrid from '../../grid/SelectCouponGrid';
import PriceModal from '../../ui/modal/PriceModal';
import { useRoute } from '@react-navigation/native';
import {getIsExistCard} from '../../../api/cardApi';
import {getDetailTicketCenter} from '../../../api/useTicketsApi';
import { useFocusEffect } from '@react-navigation/native';
function UseTemplate(props) {

    const navigation = useNavigation();
    const route = useRoute();

    const cardId = route.params?.data;
   
    console.log('detailDat111a',cardId)
    const [showModal, setShowModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState([]);
    const [isExist , setIsExist] = useState(false);
    const [detailData, setDetailData] = useState([]);
    // ... other code ...
  
    const getDataDetailTicketCenter = async () => {
        try {
            const response = await getDetailTicketCenter(cardId.id);
            console.log('response',response);
            setDetailData(response);
        } catch (error) {
            console.error('Error getting:', error.response.data);
        }
    }

    const handleOptionSelect = (id) => {
      setSelectedOption(id);
    // if (id === 2) {
    //     // "사용 안 함" 옵션을 선택한 경우, 다른 옵션들을 모두 선택 해제
    //     setSelectedOption([]);
    //   } else {
    //     // 다른 옵션들을 선택한 경우, "사용 안 함" 옵션을 선택 해제
    //     setSelectedOption((prevSelected) =>
    //       prevSelected.includes(id)
    //         ? prevSelected.filter((optionId) => optionId !== id)
    //         : [...prevSelected, id]
    //     );
    //   }
    };

    const goBackScreens = () => {
        navigation.goBack();
    };

    const goTestModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        navigation.navigate('DetailCenter');
    }

    const goHomeScreens = () => {
        navigation.navigate('Home');
    };

    const isCardInfoData = async () => {
        try {
            const response = await getIsExistCard();
            console.log('response',response);
            setIsExist(response.isExist);
        } catch (error) {
            console.error('Error getting:', error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            isCardInfoData();
            getDataDetailTicketCenter()
        },[]));


    const goCardInfoScreens = () => {
        if(isExist){
            console.log('결제결제결제결제 바로결제결제')
            navigation.navigate('PaymentWebView')
        }else{  
            navigation.navigate('InfoCard', {text: 'isUseCard'});
        }
    }
    console.log(';detailData',detailData)

    const optionData = [
        {
            id: 0,
            title: '개인 락커',
            price: '3,000',
            img: require('../../../assets/img/option_lockers.png'),
        },
        {
            id: 1,
            title: '운동복',
            price: '10,000',
            img: require('../../../assets/img/option_t.png'),
        },
        {
            id: 2,
            title: '사용 안 함',
            price: '',
            img: require('../../../assets/img/option_none.png'),
        }
    ]


    const text = {
        title: '결제 완료',
        content: '결제되었습니다. 운동을 시작해주세요!',
        closeText: '닫기',
        goHomeText: '홈으로 가기',
    }

    return (
        <Container>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        >
            <GobackContainer>
              <GobackGrid onPress={goBackScreens}>결제하기</GobackGrid>
            </GobackContainer>

        <PriceProductGrid 
             priceProduct={detailData.centerInfo}
             productNames={detailData.name}
        />

        <CollsAbleGrid availableCenters={detailData.availableCenters}/>
      
        <SelectOptionGrid 
            optionData={detailData.options}
            selectedOption={selectedOption}
            onSelectOption={handleOptionSelect}
        />

        <SelectCouponGrid
         couponInfo={detailData?.couponInfo?.coupons}
            price={detailData.price} 
            />
        <ActiveMainBtn
        onPress={goCardInfoScreens}
        >결제하기</ActiveMainBtn>
    </ScrollView>
        {
            showModal ?
            <PriceModal 
            closeModal={closeModal}
            goHomeScreens={goHomeScreens}
            modalVisible={modalVisible}
            text={text}
            />
            :   
            null
            
        }
    </Container>
    );
}

export default UseTemplate;

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`

const GobackContainer = styled.View`
 padding: 0 20px;
`
