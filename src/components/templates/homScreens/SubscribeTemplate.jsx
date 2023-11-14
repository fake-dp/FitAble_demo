import {ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import PriceProductGrid from '../../grid/PriceProductGrid';

import ActiveMainBtn from '../../ui/buttonUi/ActiveMainBtn';
import CollsAbleGrid from '../../grid/CollsAbleGrid';
import SelectOptionGrid from '../../grid/SelectOptionGrid';
import React, { useState, useEffect } from 'react';
import SelectCouponGrid from '../../grid/SelectCouponGrid';
import {getIsExistCard} from '../../../api/cardApi';
import { useRoute } from '@react-navigation/native';
import {getDetailTicketCenter} from '../../../api/useTicketsApi';
function SubscribeTemplate(props) {

    const navigation = useNavigation();
    const route = useRoute();

    const cardId = route.params?.data;
    const [selectedOption, setSelectedOption] = useState([]);
    const [isExist , setIsExist] = useState(false);
    const [detailData, setDetailData] = useState([]);

    const getDataDetailTicketCenter = async () => {
        try {
            const response = await getDetailTicketCenter(cardId.id);
            // console.log('response@@',response);
            setDetailData(response);
        } catch (error) {
            console.error('Error getting:', error.response.data);
        }
    }

    console.log('inpo', detailData?.couponInfo?.coupons)
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

    const isCardInfoData = async () => {
        try {
            const response = await getIsExistCard();
            console.log('response',response);
            setIsExist(response.isExist);
        } catch (error) {
            console.error('Error getting:', error);
        }
    }

    useEffect(() => {
        isCardInfoData();
        getDataDetailTicketCenter()
    },[]);
    

    const goCardInfoScreens = () => {
        // if(isExist){
        //     console.log('결제결제결제결제 바로결제결제')
        // }else{  
        //     navigation.navigate('InfoCard', {text: 'isCard'});
        // }
        navigation.navigate('InfoCard', {text: 'isCard'});
    }


    return (
        <Container>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          overScrollMode="never">
            <GobackContainer>
              <GobackGrid onPress={goBackScreens}>결제하기</GobackGrid>
            </GobackContainer>

        <PriceProductGrid 
            priceProduct={detailData?.centerInfo}
            productNames={detailData?.name}
        />

        <CollsAbleGrid availableCenters={detailData?.availableCenters}/>
      
        <SelectOptionGrid 
            optionData={detailData?.options}
            selectedOption={selectedOption}
            onSelectOption={handleOptionSelect}
        />

        <SelectCouponGrid 
            couponInfo={detailData?.couponInfo?.coupons}
            price={detailData?.price}
        />

    </ScrollView>
        <ActiveMainBtn
        onPress={goCardInfoScreens}
        >구독하기</ActiveMainBtn>
    </Container>
    );
}

export default SubscribeTemplate;

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`

const GobackContainer = styled.View`
 padding: 0 20px;
`


