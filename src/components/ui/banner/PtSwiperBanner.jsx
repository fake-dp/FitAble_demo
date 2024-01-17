import React, { useState, useRef } from 'react';
import { Modal, ScrollView, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import FastImage from 'react-native-fast-image'
function PtSwiperBanner({ images }) {
    const scrollViewRef = useRef(null);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0); // 여기를 추가합니다.
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleImageTap = (index) => {
        setActiveImageIndex(index);
        setModalVisible(true);
    };

    const handleScrollToIndex = (index) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: index * Dimensions.get('window').width, animated: true });
        }
        setActiveButtonIndex(index);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <BannerContainer>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const pageIndex = Math.floor(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
                    setActiveButtonIndex(pageIndex);
                }}
            >
                {images && images.map((imageUrl, index) => (
                    <TouchableOpacity key={index} onPress={() => handleImageTap(index)}>
                        <BannerImageContainer>
                            <BannerImage source={{ uri: imageUrl }} />
                        </BannerImageContainer>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ButtonBar>
                {images && images.map((_, index) => (
                    <Button key={index} onPress={() => handleScrollToIndex(index)} active={index === activeButtonIndex} />
                ))}
            </ButtonBar>

            {modalVisible && (
               
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={closeModal}>

                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(event) => {
                            const pageIndex = Math.floor(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
                            setActiveButtonIndex(pageIndex);
                        }}
                        style={{ backgroundColor: '#000' }}
                        >
                        {images && images.map((imageUrl, index) => (
                            <FastImage key={index} source={{ uri: imageUrl }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'contain' }} />
                            ))}
                    </ScrollView>

                    <TouchableOpacity style={{ position: 'absolute', top: 50, right: 20 }} onPress={closeModal}>
                        <Text style={{color:'#fff', fontWeight:800, fontSize:18}}>닫기</Text>
                    </TouchableOpacity>
                </Modal>
                            
            )}
        </BannerContainer>
    );
}
export default PtSwiperBanner;


const BannerContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 250px;
  overflow: hidden;
  background-color: #000;
`;

const BannerImageContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  aspect-ratio: 1;
`;

const BannerImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

const ButtonBar = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 10px 0;
  position: absolute;
  top: 227px;
    /* bottom: 135px; */
  left: 0;
  right: 0;
`;


const Button = styled(TouchableOpacity)`
  width: 20px;
  height: 2.5px;
  background-color: ${props => props.active ? COLORS.main : COLORS.gray_300};
`;
