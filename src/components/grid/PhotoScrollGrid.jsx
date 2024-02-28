import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Modal, TouchableOpacity,ScrollView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useState } from 'react';
import FastImage from 'react-native-fast-image'
function PhotoScrollGrid({images}) {
    const [isViewerVisible, setIsViewerVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const imageUrls = images.map(image => ({ url: image }));
  
    const renderHeader = () => (
        <CloseBtnContainer 
            onPress={() => setIsViewerVisible(false)}
        >
            <CloseBtnText>닫기</CloseBtnText>
        </CloseBtnContainer>
    );

    return (
        <Container>
            <MainTitleText>시설 사진</MainTitleText>
            <ScrollView
               horizontal={true}
               bounces={false}
               showsVerticalScrollIndicator={false}
               overScrollMode="never"
            >
                <PhotoScrollContainer>
                    {images && images.map((image, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            setCurrentImageIndex(index);
                            setIsViewerVisible(true);
                        }}>
                            <PhotoScrollImg 
                            // resizeMode={FastImage.resizeMode.contain}
                            source={{ uri: image }} />
                        </TouchableOpacity>
                    ))}
                </PhotoScrollContainer>
            </ScrollView>
            <Modal visible={isViewerVisible} transparent={true}>
                <ImageViewer
                    imageUrls={imageUrls}
                    index={currentImageIndex}
                    renderHeader={renderHeader}
                    onSwipeDown={() => setIsViewerVisible(false)}
                    enableSwipeDown={true}
                />
            </Modal>
            <ContainerLine/>
        </Container>
    );
}

export default PhotoScrollGrid;

const Container = styled.View`
 padding: 0 20px;
 `

const ContainerLine = styled.View`
     border-top-width: 1px;
     border-top-color: ${COLORS.gray_500};
     padding: 0 20px;
     margin-top: 35px;
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

const PhotoScrollImg = styled(FastImage)`
width: 90px;
height: 90px;
border-radius: 13px;
margin-right: 8px;
`

const CloseBtnContainer = styled.TouchableOpacity`
    position: absolute;
    top: 80px;
    right: 2px;
    z-index: 10;
    padding : 10px 20px;
`

const CloseBtnText = styled.Text`
    color : ${COLORS.white};
    font-size: 20px;
`