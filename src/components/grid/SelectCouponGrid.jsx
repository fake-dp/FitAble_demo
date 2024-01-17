import React, { useState,useEffect } from 'react';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Image, TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil';
import { threeBtnState } from '../../store/atom';
import {formatCommaNumber} from '../../utils/CustomUtils';
import { getPaymentSubscriptionTotal } from '../../api/cardApi';
import FastImage from 'react-native-fast-image'
function SelectCouponGrid({price,couponInfo,selectedOptionDetails,totalPrice, setTotalPrice,text,selectedCoupon, setSelectedCoupon,salePrice, setSalePrice}) {
  const downcoupon = require('../../assets/img/downcoupon.png');
  const upcoupon = require('../../assets/img/upcoupon.png');
  const [threeBtn, setThreeBtn] = useRecoilState(threeBtnState);

  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [subPrice, setSubPrice] = useState(0);

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsCouponOpen(false); // 쿠폰 선택 후 목록 닫기
  };

  const toggleCoupon = () => {
    setIsCouponOpen((prev) => !prev);
  };

  const noneCouponInfo = {
    id: 'none',
    centerName: '선택 안함',
    discountRate: null,
   
  };
  // {"centerName": "유나유의 센터 전지점", 
  // "discountAmount": null, 
  // "discountRate": 1, 
  // "endDate": "2023-12-15", 
  // "id": "1110970c-e2ac-4eea-b6ab-e8eab52f7af1", 
  // "isUsable": true},
  const updateCouponInfoData = [noneCouponInfo,...couponInfo ??[]];


// 선택된 옵션의 총 금액 계산
const totalOptionPrice = selectedOptionDetails 
  ? Object.values(selectedOptionDetails).reduce((total, option) => total + option.price, 0)
  : 0;

// 쿠폰 할인 금액 계산
let couponDiscount = 0;
if (selectedCoupon && selectedCoupon.centerName !== '선택 안함') {
  if (selectedCoupon.discountRate != null) {
    couponDiscount = price * selectedCoupon.discountRate / 100;
  } else if (selectedCoupon.discountAmount != null) {
    couponDiscount = selectedCoupon.discountAmount;
  }
}

const getPaymentSubscriptionTotalData = async (price) => {
  if (price === undefined || price ===null) {
    return;
  }
  try {
      const response = await getPaymentSubscriptionTotal(price);
      console.log('response@!@#!@#',response);
      setSalePrice(response.price);
      const newTotalPrice = response.price + totalOptionPrice - couponDiscount;
      setTotalPrice(newTotalPrice);
  } catch (error) {
      console.error('Error getting123123:', error.response);
  } 
}
// console.log('selectedCoupon',selectedCoupon)

// 총 결제 금액 계산


useEffect(() => {
  if(text === 'sub'){
    getPaymentSubscriptionTotalData(price);
  }else{
    const newTotalPrice = price + totalOptionPrice - couponDiscount;
    setTotalPrice(newTotalPrice);
  }
}, [price, totalOptionPrice, couponDiscount,text]);

console.log('subPrice',subPrice)

  return (
    <Container>
      <MainTitleText>쿠폰 선택</MainTitleText>
      
      <SelectCouponContainerBox onPress={toggleCoupon}>

      <SelectCouponContainer onPress={toggleCoupon} activeOpacity={0.8}>
        <TouchableOpacity onPress={toggleCoupon}>

          <SelectCouponInnerContainer>
          {
            selectedCoupon ? (
              <>
              {
                selectedCoupon.centerName === '선택 안함' ? (
                  <SelectCouponText>{selectedCoupon?.centerName}</SelectCouponText>
                ) : (
                  <SelectCouponText>[{selectedCoupon?.centerName}] {selectedCoupon?.couponName}</SelectCouponText>
                )
              }
              {/* <SelectCouponText>[{selectedCoupon?.centerName}] {selectedCoupon?.couponName}</SelectCouponText> */}
              {/* <SelectCouponText>{selectedCoupon.endDate}</SelectCouponText> */}
              </>
            ):(<SelectCouponText>쿠폰을 선택해주세요</SelectCouponText>)
          }

          </SelectCouponInnerContainer>

        </TouchableOpacity>
        {
          couponInfo && updateCouponInfoData.length===0 ? '' :  (
                <LeftContainer onPress={toggleCoupon} activeOpacity={0.8}>
                     <SelectCouponText>{selectedCoupon?.endDate}</SelectCouponText>
                <SelectCouponImg 
                resizeMode={FastImage.resizeMode.contain}
                source={isCouponOpen ? upcoupon : downcoupon} />
              </LeftContainer>
            )
        }
      </SelectCouponContainer>
      { isCouponOpen && (
          <>
          {
            
            couponInfo && updateCouponInfoData.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => handleSelectCoupon(item)}>
                <CouponListContainer>
                  {
                    item.centerName === '선택 안함' ? (
                      <CouponListText>{item.centerName}</CouponListText>
                    ):(
                      <>
                      <CouponListText>[{item.centerName}] {item.couponName}</CouponListText>
                      <CouponListText>{item.endDate}</CouponListText>
                      </>
                    )
                  }

             
                </CouponListContainer>
                </TouchableOpacity>
                ))
          }
         
        </>
      )}
      </SelectCouponContainerBox>
      <ContainerLine />


{/* 결제 금액 합게 */}
          <PriceListContainer>
          <PriceListText>
            {
              threeBtn === 'SUBSCRIBE' ? '구독권' :
              threeBtn === 'PT' ? 'PT권' : '이용권'
            }
            </PriceListText>

       
            {
              text==='sub'? (
                <PriceListText>{formatCommaNumber(Math.floor(salePrice))}원</PriceListText>
              ):(
                <PriceListText>{formatCommaNumber(Math.floor(price))}원</PriceListText>
              )
            }
    
            
      
          
          </PriceListContainer>

          {/* 이용권 */}
          {
        selectedOptionDetails && Object.values(selectedOptionDetails).length > 0 && 
          Object.values(selectedOptionDetails).map((item, index) => (
        <PriceListContainer key={index}>
          <PriceListText>{item.type === 'RENTAL_LOCKER' ? item.lockerName :'운동복'}</PriceListText>
          <PriceListText>+{formatCommaNumber(item.price)}원</PriceListText>
        </PriceListContainer>
       ))
        }
          {/* 쿠폰 */}
          {
            selectedCoupon && selectedCoupon.centerName !== '선택 안함' &&
          <PriceListContainer>
           <PriceListText>{selectedCoupon?.centerName && '쿠폰'}</PriceListText>
           {
             selectedCoupon?.discountRate === null ? (
                 <PriceListText>{selectedCoupon?.discountAmount}원</PriceListText>
               ):(
                 <PriceListText>-{formatCommaNumber(Math.floor(price*(selectedCoupon?.discountRate)/100))}원</PriceListText>
               )
           }
           </PriceListContainer>
          }

            <ContainerSubLine />

            <PriceListContainer>
          <PriceListTotalText>총 결제 금액</PriceListTotalText>
          <PriceListTotalText>{formatCommaNumber(Math.floor(totalPrice))}원</PriceListTotalText>
          </PriceListContainer>
    </Container>
  );
}

export default SelectCouponGrid;

const Container = styled.View`
  padding: 0 20px;
`;

const MainTitleText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  color: ${COLORS.white};
`;
const SelectCouponContainerBox = styled.View`
  margin-top: 10px;
  background-color: ${COLORS.box};
  border-radius: 13px;
  width: 100%;
`;
const SelectCouponContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px 16px;
  background-color: ${COLORS.box};
  border-radius: 13px;
  justify-content: space-between;
`;

const LeftContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const SelectCouponInnerContainer = styled.View`
flex:1;
  flex-direction: row;
  align-items: center;
  justify-content : space-between;
`

const SelectCouponImg = styled(FastImage)`
  margin-left: 10px;
`;

const SelectCouponText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22.40px;
  color: ${COLORS.gray_300};
  margin-left: 8px;
`;

const ContainerLine = styled.View`
  border-top-width: 1px;
  border-top-color: ${COLORS.gray_500};
  padding: 0 20px;
  margin-top: 40px;
  margin-bottom: 10px;
`;

const CouponListContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 16px;
  background-color: ${COLORS.box};
  border-radius: 13px;
  justify-content: space-between;
`;

const CouponListText = styled.Text`
    font-size: 14px;
color: ${COLORS.gray_100};
font-weight: 400;
line-height: 22.40px;
`

const PriceListContainer = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-top: 10px;
margin-bottom: 10px;
`

const PriceListText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_200};
font-weight: 700;
line-height: 22.40px;
`

const PriceListTotalText = styled.Text`
    font-size: 16px;
color: ${COLORS.white};
font-weight: 700;
line-height: 22.40px;
`

const ContainerSubLine = styled.View`
margin-top: 10px;
margin-bottom: 10px;
  border-top-width: 1px;
  border-top-color: ${COLORS.box};
`;
