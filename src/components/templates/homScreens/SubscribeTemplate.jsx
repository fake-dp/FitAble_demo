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
import {getIsExistCard,postPaymentSubscription} from '../../../api/cardApi';
import { useRoute } from '@react-navigation/native';
import {getDetailTicketCenter} from '../../../api/useTicketsApi';
import { useRecoilState } from 'recoil';
import { showSubModalState } from '../../../store/atom';
import SubPaymentModal from '../../ui/modal/SubPaymentModal';

function SubscribeTemplate(props) {

    const navigation = useNavigation();
    const route = useRoute();

    const cardId = route.params?.data;
    const [selectedOption, setSelectedOption] = useState([]);
    const [isExist , setIsExist] = useState(false);
    const [detailData, setDetailData] = useState([]);

    const [paymentModal, setPaymentModal] = useRecoilState(showSubModalState);
    const [paymentModalData, setPaymentModalData] = useState('');

    const getDataDetailTicketCenter = async () => {
        try {
            const response = await getDetailTicketCenter(cardId.id);
            console.log('response@@',response);
            setDetailData(response);
        } catch (error) {
            console.error('Error getting:', error.response.data);
        }
    }

    console.log('inpo', detailData?.id)
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


    // 구독권 결제 데이터
    const subPaymentInfoData = {
        ticket: {
            id: detailData?.id,
            salePrice: null,
        },
        totalPrice: detailData?.price,
    }
    

    const goCardInfoScreens = async() => {
        if(isExist){
            console.log('결제결제결제결제 바로결제결제')
            const data = {
                ticket: {
                    id: detailData?.id,
                    salePrice: 0,
                },
                totalPrice: detailData?.price,
            }
      
            try{
                const response = await postPaymentSubscription(data);
                console.log('response',response)
                if(response){
                    setPaymentModalData(response);
                    setPaymentModal(true);
                }
            }catch(error){
                console.error('Error getting:', error.response.data.code);
            }finally{
                setTimeout(() => {
                    setPaymentModal(false);
                }, 3000);
            }

        }else{  

            const subPaymentInfoData = {
                ticket: {
                    id: detailData?.id,
                    salePrice: 0,
                },
                totalPrice: detailData?.price,
            }
            console.log('@@subPaymentInfoData',subPaymentInfoData)
            navigation.navigate('InfoCard', {text: 'isCard', subPaymentInfoData});
        }
}

// console.log('detailDatadetailData',detailData,subPaymentInfoData)
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
        {
            paymentModal && (
                <SubPaymentModal 
                paymentModalData={paymentModalData}
                />
            )
        }
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


