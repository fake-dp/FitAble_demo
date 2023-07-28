import { View ,Text} from "react-native";
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';

function MileageList({data}) {
    return (
        <View>
                    <Container>
                        <ContentsBox>
                        <SubTextContainer>
                                <DateText>{data.date}</DateText>
                            </SubTextContainer>
                            <TitleText>{data.title}</TitleText>
                        </ContentsBox>
                        <PriceText isPlus={data.isPlus}>{
                        data.isPlus ? `+${data.price}` :  `-${data.price}`
                        }</PriceText>
                    </Container>
        </View>
    );
}

export default MileageList;

const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

const ContentsBox = styled.View`
    /* flex-direction: row; */
`

const TitleText = styled.Text`
color: ${COLORS.sub};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const SubTextContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

const DateText = styled.Text`
color: ${COLORS.gray_300};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const PriceText = styled.Text`
color: ${props => props.isPlus ? '#FF7A00' : COLORS.sub};
font-size: 20px;
font-weight: 600;
`

