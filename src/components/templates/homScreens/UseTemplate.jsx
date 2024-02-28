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
import {postPaymentInfo} from '../../../api/cardApi';
import {getDetailTicketCenter} from '../../../api/useTicketsApi';
import { useFocusEffect } from '@react-navigation/native';
import PaymentAgreementGrid from '../../grid/PaymentAgreementGrid';
import MainBtn from '../../ui/buttonUi/MainBtn';
import { useRecoilState } from 'recoil';
import {mainCenterIdState} from '../../../store/atom';
function UseTemplate(props) {

    const navigation = useNavigation();
    const route = useRoute();
    const cardId = route.params?.data;      
   const [mainCenterId, setMainCenterId] = useRecoilState(mainCenterIdState);
    // console.log('detailDat111a@@',cardId)
    const [showModal, setShowModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    // const [selectedOption, setSelectedOption] = useState([]);
    const [detailData, setDetailData] = useState([]);
    const [selectedOptionDetails, setSelectedOptionDetails] = useState({});
    const [selectedOption, setSelectedOption] = useState([]);
    const [totalPrice, setTotalPrice] = useState(detailData?.price);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    // 결제 이용약관 상태 동의
    const [isInfoAgree, setIsInfoAgree] = useState(false);
    const [isRefundAgree, setIsRefundAgree] = useState(false);
    const [isCenterAgree, setIsCenterAgree] = useState(false);

    const handleToggleInfoAgree = () => {
        setIsInfoAgree(!isInfoAgree);
    }

    const handleToggleRefundAgree = () => {
        setIsRefundAgree(!isRefundAgree);
    }

    const handleToggleCenterAgree = () => {
        setIsCenterAgree(!isCenterAgree);
    }


    // ... other code ...
    // console.log('cardId.id',cardId.id)

    // const postInfoPaymentId = async (paymentInfoData) => {
    //     try {
    //       const response = await postPaymentInfo(paymentInfoData);
    //         if(response){
    //             navigation.navigate('PaymentWebView', {
    //                 paymentInfoData, 
    //                 totalPrice, 
    //                 goodsName: detailData.name,
    //                 memberTicketId: response.memberTicketId,
    //                 moid: response.moid
    //              });
    //          }
    //     } catch (error) {
    //       console.error('Error getting:', error);
    //     }
    //  }

     

    const getDataDetailTicketCenter = async () => {
        try {
            const response = await getDetailTicketCenter(cardId.id);
            // console.log('response',response);
            setDetailData(response);
        } catch (error) {
            console.error('Error getting:', error.response.data);
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

    const closeModal = () => {
        setShowModal(false)
        navigation.navigate('DetailCenter',{id:mainCenterId});
    }

    const goHomeScreens = () => {
        navigation.navigate('Home');
    };


    useFocusEffect(
        useCallback(() => {
            getDataDetailTicketCenter()
        },[]));


        const formattedOptions = Object.values(selectedOptionDetails).map(option => ({
            id: option.id,
            salePrice: option.price || 0 // 예시, 실제 데이터에 맞게 조정 필요
        }));
    
    
    


    const goPaymentScreens = () => {
            console.log('결제결제결제결제 바로결제결제')
            const paymentInfoData = {
                ticket: {
                    id: detailData?.id,
                    salePrice: detailData?.price,
                },
                options:formattedOptions,
                totalPrice: totalPrice,
                couponId: selectedCoupon?.id,
                authInfo: {
                    authToken: "",
                    amount: "",
                    tid: ""
                }
            }
            Object.keys(paymentInfoData).forEach(key => {
                if (paymentInfoData[key] === undefined || paymentInfoData[key] === null) {
                    delete paymentInfoData[key];
                }
            });
            console.log('@@subPaymentInfoData',paymentInfoData)
            console.log(';@@@detailData@@@',totalPrice, detailData.name)
            navigation.navigate('PaymentWebView', {paymentInfoData, totalPrice, goodsName: detailData.name});
            // postInfoPaymentId(paymentInfoData)
    }
    console.log(';@@@detailData@@@',totalPrice, detailData.name)
    // orderId: '49b74bb1-08e3-46c7-bb0b-70c76cb41037',
    // amount: 1004,
    // goodsName: '나이스페이-상품'

    const text = {
        title: '결제 완료',
        content: '결제되었습니다. 운동을 시작해주세요!',
        closeText: '닫기',
        goHomeText: '홈으로 가기',
    }

    const isActiveBtn = isInfoAgree && isRefundAgree && isCenterAgree && totalPrice !== 0 ? true : false;

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
            onSelectOption={handleOptionSelect}/>

        <SelectCouponGrid
            couponInfo={detailData?.couponInfo?.coupons}
            price={detailData.price}
            selectedOptionDetails={selectedOptionDetails}
            totalPrice={totalPrice} 
            setTotalPrice={setTotalPrice}
            selectedCoupon={selectedCoupon}
            setSelectedCoupon={setSelectedCoupon}
            />

        <PaymentAgreementGrid 
                    handleToggleInfoAgree={handleToggleInfoAgree}
                    handleToggleRefundAgree={handleToggleRefundAgree}
                    handleToggleCenterAgree={handleToggleCenterAgree}
                    isInfoAgree={isInfoAgree}
                    isRefundAgree={isRefundAgree}
                    isCenterAgree={isCenterAgree}
        />
        <MainBtn
                colorProp={isActiveBtn}
                onPress={goPaymentScreens}>결제하기</MainBtn>
        {/* <ActiveMainBtn onPress={goPaymentScreens}>결제하기</ActiveMainBtn> */}
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
