import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function PriceProductGrid(props) {

    const priceProduct = [
        {
            title: '프리미엄',
            src: require('../../assets/img/pricetestproduct.png'),
            products: '정기구독 Premium',
        },
    ]


    return (
        <Container>
        <MainTitleText>구매 상품</MainTitleText>
        <ProductContainer>
        <ProductImage source={priceProduct[0].src}/>
        <ProductPriceContainer>
            <ProductText>{priceProduct[0].title}</ProductText>
            <ProductPriceText>평일 : {priceProduct[0].products}</ProductPriceText>
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
