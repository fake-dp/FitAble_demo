import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { ScrollView } from 'react-native';

function PhotoScrollGrid(props) {

    const photo_one = require('../../assets/img/listtest_one.png');
    const photo_two = require('../../assets/img/listtest_two.png');
    const photo_three = require('../../assets/img/listtest_three.png');
    const photo_four = require('../../assets/img/listtest_four.png');

    return (
        <Container>
            <ContainerLine/>
            <MainTitleText>시설 사진</MainTitleText>
            <ScrollView
               horizontal={true} 
               bounces={false}
               showsVerticalScrollIndicator={false}
               overScrollMode="never"
            >
            <PhotoScrollContainer>
                <PhotoScrollImg source={photo_one}/>
                <PhotoScrollImg source={photo_two}/>
                <PhotoScrollImg source={photo_three}/>
                <PhotoScrollImg source={photo_four}/>
                <PhotoScrollImg source={photo_one}/>
                <PhotoScrollImg source={photo_two}/>
                <PhotoScrollImg source={photo_three}/>
                <PhotoScrollImg source={photo_four}/>
            </PhotoScrollContainer>
            </ScrollView>
        </Container>
    );
}

export default PhotoScrollGrid;

const Container = styled.View`
 padding: 0 20px;
 margin-top: 35px;
`

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.white};
    padding: 0 20px;
`

const MainTitleText = styled.Text`
margin-top: 40px;
font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
`

const PhotoScrollContainer = styled.View`
flex-direction: row;
margin-top: 20px;
`

const PhotoScrollImg = styled.Image`
width: 90px;
height: 90px;
border-radius: 13px;
margin-right: 8px;
`
