
import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import PriceProductGrid from '../../grid/PriceProductGrid';
import { useRoute } from '@react-navigation/native';
import ActiveMainBtn from '../../ui/buttonUi/ActiveMainBtn';
import CollsAbleGrid from '../../grid/CollsAbleGrid';
import SelectOptionGrid from '../../grid/SelectOptionGrid';
import React, { useState, useEffect } from 'react';
import SelectCouponGrid from '../../grid/SelectCouponGrid';
import PriceModal from '../../ui/modal/PriceModal';
import {getDetailTicketCenter} from '../../../api/useTicketsApi';
import {getIsExistCard} from '../../../api/cardApi';
function PTpriceTemplate(props) {

    const navigation = useNavigation();
    const route = useRoute();

    const cardId = route.params?.data;
    const images = route.params?.images;
    const trainerId = route.params?.trainerId;
    // console.log('trainerId',trainerId)
    const [showModal, setShowModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedOptionDetails, setSelectedOptionDetails] = useState({});
    const [isExist , setIsExist] = useState(false);
    const [detailData, setDetailData] = useState([]);

    const [totalPrice, setTotalPrice] = useState(detailData?.price);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    // const [salePrice, setSalePrice] = useState(0);
    // ... other code ...
//   console.log('cardId.id',cardId.id)
const goBackScreens = () => {
    navigation.goBack();
};

    const getDataDetailTicketCenter = async () => {
        try {
            const response = await getDetailTicketCenter(cardId.id);
            console.log('response',response);
            setDetailData(response);
        } catch (error) {
            console.error('Error getting!!:', error.response.data);
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

      const formattedOptions = Object.values(selectedOptionDetails).map(option => ({
        id: option.id,
        salePrice: option.price || 0 // 예시, 실제 데이터에 맞게 조정 필요
    }));



    const paymentInfoData = {
        ticket: {
            id: detailData?.id,
            salePrice: detailData?.price,
        },
        options:formattedOptions,
        totalPrice: totalPrice,
        trainerId: trainerId,
        couponId: selectedCoupon?.id,
    }
    console.log('@@subPaymentInfoData',paymentInfoData)

    // {
    //     "ticket": {
    //       "id": "279ab60a-c265-47ff-93ae-71bcb7017cef",
    //       "salePrice": 30000
    //     },
    //     "options": [
    //       {
    //         "id": "279ab60a-c265-47ff-93ae-71bcb7017cef",
    //         "salePrice": 30000
    //       }
    //     ],
    //     "trainerId": "f3i60a-c265-47ff-93ae-71bcb7017cef",
    //     "couponId": "2ei60a-c265-47ff-93ae-71bcb7017cef",
    //     "totalPrice": 320000,
    //   }


    const goPaymentScreens = () => {
        if(isExist){
            console.log('결제결제결제결제 바로결제결제')
            const paymentInfoData = {
                ticket: {
                    id: detailData?.id,
                    salePrice: detailData?.price,
                },
                options:formattedOptions,
                totalPrice: totalPrice,
                trainerId: trainerId,
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
            navigation.navigate('PaymentWebView', {paymentInfoData, totalPrice, goodsName: detailData.name});
        }else{  
            navigation.navigate('InfoCard', {text: 'isUseCard'});
        }
    }

    const closeModal = () => {
        setShowModal(false)
        // navigation.navigate('DetailCenter');
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

    useEffect(() => {
        isCardInfoData();
        getDataDetailTicketCenter()
    },[]);

   

  

    console.log('formattedOptions',formattedOptions)




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
        images={images[0]}
        pt={'pt'}
        />
{
    detailData.availableCenters && 
        <CollsAbleGrid availableCenters={detailData.availableCenters}/>
}
      
        <SelectOptionGrid 
             optionData={detailData.options}
            selectedOption={selectedOption}
            onSelectOption={handleOptionSelect}
        />

        <SelectCouponGrid 
        couponInfo={detailData?.couponInfo?.coupons}
        price={detailData.price}       
        selectedOptionDetails={selectedOptionDetails}
        totalPrice={totalPrice} 
        setTotalPrice={setTotalPrice}
        selectedCoupon={selectedCoupon}
        setSelectedCoupon={setSelectedCoupon}
        />

    </ScrollView>
        <ActiveMainBtn
        onPress={goPaymentScreens}
        >결제하기</ActiveMainBtn>
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

export default PTpriceTemplate;

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`

const GobackContainer = styled.View`
 padding: 0 20px;
`
