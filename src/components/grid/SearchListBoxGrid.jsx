import {Image } from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import {TouchableOpacity, Platform} from 'react-native';
import FastImage from 'react-native-fast-image'
function SearchListBoxGrid({searchListData,onPress, isSelected,isRegistCenter}) {

    const {id, name, address, programs, mainImage,isMainCenter} = searchListData;

    const mapIcon = require('../../assets/img/map.png');
    const noSearchimg = require('../../assets/img/noImg.png');
    return (
        <TouchableOpacity   
        onPress={() => onPress(id)}>
            <InnerContainer isSelected={isSelected} isRegistCenter={isRegistCenter}>
        <Container key={id} isSelected={isSelected}>
            <ContentsBox>
            <TitleText isSelected={isSelected}>{name}</TitleText>
            <SubTextContainer>
            <MapIcon
                source={mapIcon}
                resizeMode={FastImage.resizeMode.contain}
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
                // resizeMode={FastImage.resizeMode.contain}
                />
                ): (
                <MainSpotImage
                source={noSearchimg}
                // resizeMode={FastImage.resizeMode.contain}
                />
                )
           }
        </Container>
        </InnerContainer>
        </TouchableOpacity>
    );
}

export default SearchListBoxGrid;

const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
`

const InnerContainer = styled.View`
    border-radius: ${(props) => (props.isSelected ? '15px': '0')};
    background-color: ${(props) => (props.isSelected ? COLORS.box : 'transparent')}; 
    box-shadow: ${(props) => (props.isSelected ? '0px 2px 4px rgba(0, 0, 0, 0.3)' : '0px 0px 0px rgba(0, 0, 0, 0)')};
    /* margin-bottom: 10px; */
    /* padding: 0 10px; */
    padding: ${(props) => (props.isRegistCenter ? '0 10px' : '0')};

`

const ContentsBox = styled.View`
    /* flex-direction: row; */
    width: ${Platform.OS === 'ios' ? '60%' : '64%'};
`

const TitleText = styled.Text`
color: ${(props) => (props.isSelected ? COLORS.main : COLORS.white)};
font-size: ${Platform.OS === 'ios' ? '20px' : '17px'};
font-weight: 600;
line-height: 30px;
`

const SubTextContainer = styled.View`
flex-direction: row;
/* align-items: center; */
width: 100%;
margin-top: 8px;
`

const MapIcon = styled(FastImage)`
width: 18px;
height: 18px;
margin-right: 4px;
margin-top: 2px;
`

const MapText = styled.Text`
flex: 1;
font-size: 14px;
color: ${COLORS.gray_200};
font-weight: 300;
line-height: 19.20px;
`;

const TagContainer = styled.View`
flex-direction: row;
flex-wrap: wrap;
width: 100%;
margin-top: 23px;
`;

const TagBox = styled.View`
padding: ${Platform.OS === 'ios' ? '4px 12px' : '2px 8px'};
border : 1px solid ${COLORS.gray_200};
border-radius: 40px;
margin-right: 4px;
margin-bottom: 4px;
`

const TagText = styled.Text`
font-size: ${Platform.OS === 'ios' ? '12px' : '10px'};
color: ${COLORS.gray_200};
font-weight: 400;
`

const MainSpotImage = styled(FastImage)`
/* width: 130px;
height: 114px; */
width: ${Platform.OS === 'ios' ? '110px' : '100px'};
height: ${Platform.OS === 'ios' ? '110px' : '100px'};
border-radius: 15px;
`