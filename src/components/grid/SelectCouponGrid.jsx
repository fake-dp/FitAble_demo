import React, { useState } from 'react';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Image, TouchableOpacity } from 'react-native';

function SelectCouponGrid({price,couponInfo}) {
  const downcoupon = require('../../assets/img/downcoupon.png');
  const upcoupon = require('../../assets/img/upcoupon.png');

  const [showIcon, setShowIcon] = useState(false);

  const [isCouponOpen, setIsCouponOpen] = useState(false);

  const toggleCoupon = () => {
    setIsCouponOpen((prev) => !prev);
  };

  const couponList = [
    {
        id: 0,
        title: '선택안함',
    },
    {
        id: 1,
        title: '[노원본점] 1,000원 할인권',
        date: '~2021.07.07',
    },
    {
        id: 2,
        title: '[ALL] 10% 할인권',
        date: '~2021.07.07',
    }
  ]

  return (
    <Container>
      <MainTitleText>쿠폰 선택</MainTitleText>
      
      <SelectCouponContainerBox>

      <SelectCouponContainer>
        <TouchableOpacity onPress={toggleCoupon} activeOpacity={0.8}>
          <SelectCouponText>쿠폰 선택</SelectCouponText>
        </TouchableOpacity>
        {
          couponInfo && couponInfo.length===0 ? '' :  (
                <TouchableOpacity onPress={toggleCoupon} activeOpacity={0.8}>
                <SelectCouponImg source={isCouponOpen ? upcoupon : downcoupon} />
              </TouchableOpacity>
            )
        }
      </SelectCouponContainer>
      { isCouponOpen && (
          <>
          {
            
            couponInfo && couponInfo.map((item) => (
                <TouchableOpacity key={item.id}>
                <CouponListContainer>
                    <CouponListText>{item.centerName}</CouponListText>
                    <CouponListText>{item.endDate}</CouponListText>
             
                </CouponListContainer>
                </TouchableOpacity>
                ))
          }
         
        </>
      )}
      </SelectCouponContainerBox>
      <ContainerLine />

          <PriceListContainer>
          <PriceListText>구독권</PriceListText>
          <PriceListText>{price}원</PriceListText>
          </PriceListContainer>

            <ContainerSubLine />

            <PriceListContainer>
          <PriceListTotalText>총 결제 금액</PriceListTotalText>
          <PriceListTotalText>119,000원</PriceListTotalText>
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
`;
const SelectCouponContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 16px;
  background-color: ${COLORS.box};
  border-radius: 13px;
  justify-content: space-between;
`;

const SelectCouponImg = styled.Image``;

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
margin-top: 20px;
margin-bottom: 20px;
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
  border-top-width: 1px;
  border-top-color: ${COLORS.box};
`;
