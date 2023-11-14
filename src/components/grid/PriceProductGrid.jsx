import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function PriceProductGrid({priceProduct,productNames}) {

    const noImg = require('../../assets/img/noImg.png')

    return (
        <Container>
        <MainTitleText>구매 상품</MainTitleText>
        <ProductContainer >
            {
                priceProduct?.image ? (<ProductImage source={priceProduct?.image}/>):(<ProductImage source={noImg}/>)
            }
        <ProductPriceContainer>
            <ProductText>{priceProduct?.name}</ProductText>
            <ProductPriceText>{productNames}</ProductPriceText>
        </ProductPriceContainer>
        </ProductContainer>
        <ContainerLine/>
        </Container>
    );
}

export default PriceProductGrid;

const Container = styled.View`
    padding: 0 20px;
`

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.gray_500};
    padding: 0 20px;
    margin-top: 40px;
`

const MainTitleText = styled.Text`
margin-top: 40px;
font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
`

const ProductContainer = styled.View`
    flex-direction: row;
    margin-top: 12px;
`

const ProductImage = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 15px;
`



const ProductText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_300};
`

const ProductPriceContainer = styled.View`
    margin-left: 12px;
`

const ProductPriceText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.gray_300};

`
