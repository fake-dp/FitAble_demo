import {ScrollView} from 'react-native';
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
import {getIsExistCard,postPaymentSubscription,getPaymentSubscriptionTotal} from '../../../api/cardApi';
import { useRoute } from '@react-navigation/native';
import {getDetailTicketCenter} from '../../../api/useTicketsApi';
import { useRecoilState } from 'recoil';
import { showSubModalState } from '../../../store/atom';
import SubPaymentModal from '../../ui/modal/SubPaymentModal';
import { useFocusEffect } from '@react-navigation/native';
function SubscribeTemplate(props) {

    const navigation = useNavigation();
    const route = useRoute();

    const cardId = route.params?.data;
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedOptionDetails, setSelectedOptionDetails] = useState({});
    const [isExist , setIsExist] = useState(false);
    const [detailData, setDetailData] = useState([]);

    const [paymentModal, setPaymentModal] = useRecoilState(showSubModalState);
    const [paymentModalData, setPaymentModalData] = useState('');
    const [totalPrice, setTotalPrice] = useState(detailData?.price);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [salePrice, setSalePrice] = useState(0);

    const getDataDetailTicketCenter = async () => {
        try {
            const response = await getDetailTicketCenter(cardId.id);
            console.log('response@@',response);
            setDetailData(response);
        } catch (error) {
            console.error('Error getting:1', error.response.data);
        }
    }

    const handleOptionSelect = (id) => {
        if (id === 'none') {
          setSelectedOption([]);
          setSelectedOptionDetails({});
        } else {
          if (selectedOption.includes(id)) {
              setSelectedOption(selectedOption.filter(optionId => optionId !== id));
            const updatedDetails = { ...selectedOptionDetails };
            delete updatedDetails[id];
            setSelectedOptionDetails(updatedDetails);
          } else {
              setSelectedOption([...selectedOption, id]);
            const optionData = detailData.options.find(option => option.id === id);
            setSelectedOptionDetails({
              ...selectedOptionDetails,
              [id]: optionData
            });
          }
        }
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
            console.error('Error getting:3', error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            isCardInfoData();
            getDataDetailTicketCenter()
        },[]));

        console.log('selecselectedCoupontedCoupo11n',selectedCoupon?.discountAmount)
        console.log('selecselectedCoupontedCoupo11n',selectedCoupon?.discountRate)
    // 구독권 결제 데이터
    const subPaymentInfoData = {
        ticket: {
            id: detailData?.id,
            salePrice: null,
        },
        totalPrice: detailData?.price,
    }

    // 구독권 결제 합계 데이터
    const formattedOptions = Object.values(selectedOptionDetails).map(option => ({
        id: option.id,
        salePrice: option.price || 0 // 예시, 실제 데이터에 맞게 조정 필요
    }));

    console.log('formattedOptions',formattedOptions)

    let couponDiscount = 0;
    if (selectedCoupon?.discountRate != null) {
        couponDiscount = detailData?.price * selectedCoupon?.discountRate / 100;
      } else if (selectedCoupon?.discountAmount != null) {
        couponDiscount = selectedCoupon?.discountAmount;
      }
    console.log('couponDiscount',couponDiscount)
    const goCardInfoScreens = async() => {
        console.log('dd클릭')
  
        if(isExist){
            console.log('결제결제결제결제 바로결제결제')
            const data = {
                ticket: {
                    id: detailData?.id,
                    salePrice: salePrice - couponDiscount,
                },
                options:formattedOptions,
                totalPrice: totalPrice,
                couponId: selectedCoupon?.id,
            }
    //   console.log('totalPrice',totalPrice)
            try{
                const response = await postPaymentSubscription(data);
                console.log('response',response)
                if(response){
                    setPaymentModalData(response);
                    setPaymentModal(true);
                }
            }catch(error){
                console.error('Error getting1111:', error.response.data);
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
                options:formattedOptions,
                totalPrice: totalPrice,
                couponId: selectedCoupon?.id,
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
            selectedOptionDetails={selectedOptionDetails}
            totalPrice={totalPrice} 
            setTotalPrice={setTotalPrice}
            selectedCoupon={selectedCoupon}
            setSelectedCoupon={setSelectedCoupon}
            text={'sub'}
            salePrice={salePrice}
            setSalePrice={setSalePrice}
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


