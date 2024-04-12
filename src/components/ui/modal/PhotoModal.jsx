import {styled} from 'styled-components/native';
import {COLORS} from '../../../constants/color';
import {Modal, TouchableOpacity, ScrollView} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useState} from 'react';
import FastImage from 'react-native-fast-image';

function PhotoModal({images}) {
  console.log('이미지', images);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageUrls = images.map(image => ({url: image}));

  console.log('imageUrls', imageUrls);
  const renderHeader = () => (
    <CloseBtnContainer onPress={() => setIsViewerVisible(false)}>
      <CloseBtnText>닫기</CloseBtnText>
    </CloseBtnContainer>
  );

  return (
    <Container>
      <ScrollView
        horizontal={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never">
        <PhotoScrollContainer>
          {images &&
            images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setCurrentImageIndex(index);
                  setIsViewerVisible(true);
                }}>
                <PhotoScrollImg
                  // resizeMode={FastImage.resizeMode.contain}
                  source={{uri: image}}
                />
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
    </Container>
  );
}

export default PhotoModal;

const Container = styled.View`
  padding: 0 20px;
`;

const PhotoScrollContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const PhotoScrollImg = styled(FastImage)`
  width: 60px;
  height: 60px;
  border-radius: 13px;
  margin-right: 8px;
`;

const CloseBtnContainer = styled.TouchableOpacity`
  position: absolute;
  top: 80px;
  right: 30px;
  z-index: 10;
`;

const CloseBtnText = styled.Text`
  color: ${COLORS.white};
  font-size: 20px;
`;
