import {Image ,Linking,TouchableOpacity,Text, Platform} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import ConsultBtn from '../ui/buttonUi/ConsultBtn';

function GymBasicInfoGrid({onPress,address,phone,name}) {
    
    const phoneIcon = require('../../assets/img/phone.png');
    const mapIcon = require('../../assets/img/map.png');

    const dialCall = (number) => {
        let phoneNumber = `tel:${number}`;
        Linking.openURL(phoneNumber);
      };

    return (
        <Container>
            <MainTitleText>{name}</MainTitleText>
            {
                address && (
                <SubTextContainer>
                    <Image source={mapIcon}/>
                    <SubText>{address}</SubText>
                </SubTextContainer>
                )
            }
            {
                phone && (
                <SubTextContainer onPress={() => dialCall(phone)}>
                    <Image source={phoneIcon}/>
                    <SubText>{phone}</SubText>
                </SubTextContainer>
                )
            }
            <ConsultBtn 
            onPress={onPress}
            />
            <ContainerLine />
        </Container>
    );
}

export default GymBasicInfoGrid;

const Container = styled.View`
    /* background-color: ${COLORS.main}; */
    padding: 0px 20px 0px 20px;
    margin-top: 35px;

`

const ContainerLine = styled.View`
  border-top-width: 1px;
  border-top-color: ${COLORS.gray_500};
  padding: 0 20px;
  margin-top: 35px;
`;

const MainTitleText = styled.Text`
    color: ${COLORS.white};
    font-size: 24px;
    font-weight: 700;
    line-height: 32.40px;
    margin-bottom: 12px;
`

const SubTextContainer = styled.TouchableOpacity`
    flex-direction: row;
    /* align-items: center; */
`

const SubText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.gray_100};
    margin-left: 8px;
`
