import {Image } from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import {TouchableOpacity} from 'react-native';
function SearchListBoxGrid({searchListData,onPress, isSelected}) {

    const {id, name, address, programs, mainImage} = searchListData;

    const mapIcon = require('../../assets/img/map.png');
    const noSearchimg = require('../../assets/img/noImg.png');
    return (
        <TouchableOpacity   
        onPress={() => onPress(id)}>
            
        <Container key={id} isSelected={isSelected}>
            <ContentsBox>
            <TitleText isSelected={isSelected}>{name}</TitleText>
            <SubTextContainer>
            <MapIcon
                source={mapIcon}
                />
            <MapText>{address}</MapText>
            </SubTextContainer>
            
            <TagContainer>
                {
                    programs?.map((item, index) => {
                        return (<TagBox
                            key={index}
                        ><TagText key={index}>{item}</TagText></TagBox>)
                        }
                    )
                }
            </TagContainer>
            </ContentsBox>

           {
            mainImage ? (
                <MainSpotImage
                // source={{uri:mainImage}} 
                source={{ uri: mainImage }}
                resizeMode="cover" 
                />
                ): (
                <MainSpotImage
                source={noSearchimg}
                resizeMode="cover"
                />
                )
           }
        </Container>
        </TouchableOpacity>
    );
}

export default SearchListBoxGrid;

const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 37px;
    border-radius: ${(props) => (props.isSelected ? '15px': '0')};
    padding:${(props) => (props.isSelected ? '15px 5px': '0')};
    background-color: ${(props) => (props.isSelected ? COLORS.box : 'transparent')}; 
    box-shadow: ${(props) => (props.isSelected ? '0px 2px 4px rgba(0, 0, 0, 0.3)' : '0px 0px 0px rgba(0, 0, 0, 0)')}; 
 
` 

const ContentsBox = styled.View`
    /* flex-direction: row; */
    width: 50%;
`

const TitleText = styled.Text`
color: ${(props) => (props.isSelected ? COLORS.main : COLORS.white)};
font-size: 20px;
font-weight: 600;
line-height: 30px;
`

const SubTextContainer = styled.View`
flex-direction: row;
/* align-items: center; */
margin-top: 8px;
`

const MapIcon = styled.Image`
width: 15px;
height: 15px;
margin-right: 4px;
margin-top: 2px;
`

const MapText = styled.Text`
font-size: 12px;
color: ${COLORS.gray_200};
font-weight: 400;
line-height: 19.20px;
`

const TagContainer = styled.View`
flex-direction: row;
flex-wrap: wrap;
width: 184px;
margin-top: 23px;
`

const TagBox = styled.View`
padding: 3px 7px;
border : 1px solid ${COLORS.gray_200};
border-radius: 50px;
margin-right: 4px;
margin-bottom: 4px;
`

const TagText = styled.Text`
font-size: 12px;
color: ${COLORS.gray_200};
font-weight: 400;
`

const MainSpotImage = styled.Image`
width: 130px;
height: 106px;
border-radius: 15px;
`