import { View } from "react-native";
import { styled } from "styled-components";
import { COLORS } from "../../../constants/color";
function HomeSubBanner({centersBanners}) {
    
    const bannerLogo = require("../../../assets/img/bannerLogo.png");

    return (
        <BannerContainer>
            <BannerLogo source={bannerLogo} />
            <View>
            <MainText>핏에이블은 처음이신가요?</MainText>
            <SubText>편리하게 이용하실 수 있는 방법을 알려드릴게요!</SubText>
            </View>
        </BannerContainer>
    );
}

export default HomeSubBanner;

const BannerContainer = styled.View`
    width: 100%;
    height: 80px;
    background-color: ${COLORS.box};
    border-radius: 13px;
    flex-direction: row;
    align-items: center;
`

const BannerLogo = styled.Image`
    margin: 0 23px 0 21px;
`

const MainText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.white};
`

const SubText = styled.Text`
font-size: 12px;
font-weight: 400;
line-height: 16.80px;
color: ${COLORS.gray_100};
`