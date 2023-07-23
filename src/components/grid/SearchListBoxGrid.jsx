import {Image } from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function SearchListBoxGrid({searchListData}) {

    const {id, title, map, tag, srcimg} = searchListData;
    
    const mapIcon = require('../../assets/img/map.png');

    return (
        <Container key={id}>

            <ContentsBox>
            <TitleText>{title}</TitleText>
            <SubTextContainer>

            <MapIcon
                source={mapIcon}
                />
            <MapText>{map}</MapText>
                </SubTextContainer>
            
            <TagContainer>
                {
                    tag.map((item, index) => {
                        return (<TagBox
                            key={index}
                        ><TagText key={index}>{item}</TagText></TagBox>)
                        }
                    )
                }
            </TagContainer>
            </ContentsBox>

            <Image
                source={srcimg}
            />

        </Container>
    );
}

export default SearchListBoxGrid;

const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 37px;
`

const ContentsBox = styled.View`
    /* flex-direction: row; */
`

const TitleText = styled.Text`
color: ${COLORS.white};
font-size: 20px;
font-weight: 600;
line-height: 30px;
`

const SubTextContainer = styled.View`
flex-direction: row;
align-items: center;
margin-top: 8px;
`

const MapIcon = styled.Image`
width: 15px;
height: 15px;
margin-right: 4px;
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
margin-top: 23px;
`

const TagBox = styled.View`
padding: 3px 7px;
border : 1px solid ${COLORS.gray_200};
border-radius: 50px;
margin-right: 4px;

`

const TagText = styled.Text`
font-size: 12px;
color: ${COLORS.gray_200};
font-weight: 400;
`