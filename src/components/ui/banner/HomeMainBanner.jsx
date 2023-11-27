import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Image, Dimensions, TouchableOpacity,Text } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';

function HomeMainBanner({fitablesBanners}) {

    const navigation = useNavigation();
    const scrollViewRef = useRef(null);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0); // 상태 값 추가




      console.log('Home banners response111211:', fitablesBanners); // 응답 로깅

      // useEffect(() => {
      //   if (fitablesBanners && fitablesBanners.length > 0) {
      //   const interval = setInterval(() => {
      //     const nextIndex = (activeButtonIndex + 1) % fitablesBanners.length;
      //     setActiveButtonIndex(nextIndex);
      //     if (scrollViewRef.current) {
      //       scrollViewRef.current.scrollTo({ x: nextIndex * Dimensions.get('window').width, animated: true });
      //     }
      //   }, 2000);
    
      //   return () => {
      //     clearInterval(interval);
      //   };
      // }
      // }, [activeButtonIndex,fitablesBanners]);


      const handleScrollToIndex = (index) => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: index * Dimensions.get('window').width, animated: true });
        }
        console.log('Scrolling to index:', index);
        setActiveButtonIndex(index);
      };

      // const gymIcon = require('../../../assets/img/gymIcon.png');


      const handleBannerPress = (banner) => {
        // console.log('Banner Pressed',banner.id);
        switch (banner.pathType) {
          case 'LINK':
            console.log('Banner Pressed@@@',banner.path);
            navigation.navigate('BannerWebView', { uri: banner.path });
            break;
          case 'STORE':
            navigation.navigate('Store');
            break;
          case 'NOTICE_DETAIL':
            navigation.navigate('DetailNotice', { noticeId: banner.path });
            console.log('Banner Pressed',banner.path);
            break;
          case 'STORE_DETAIL':
            // navigation.navigate('Store', { storeId: banner.path });
            navigation.navigate('Store', { storeId: banner.path });
            break;

          default:
            break;
        }
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
          setActiveButtonIndex(pageIndex); // 상태 업데이트
          }}
        >
          {fitablesBanners.map((banner) => (
            <TouchableOpacity key={banner.id} onPress={() => handleBannerPress(banner)}>

            <BannerImageContainer>
              <BannerImage source={{uri:banner.imageUrl}} resizeMode="cover" />
              
              
              <BannerMainContainer>
              {/* <Image source={gymIcon} /> */}
              {/* <BannerMainText>{' '}{' '}에이블짐 39호점</BannerMainText> */}
              </BannerMainContainer>
              {/* <BannerSubText>강남역점 오픈</BannerSubText> */}
            </BannerImageContainer>


            </TouchableOpacity>
          ))}
            
        </ScrollView>
  
        <ButtonBar>
   
          {fitablesBanners.map((_, index) => (
            <Button key={index} onPress={() => handleScrollToIndex(index)}
            active={index === activeButtonIndex}
            >

          </Button>
          ))}
        </ButtonBar>
      </BannerContainer>
    );
}

export default HomeMainBanner;



const BannerContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 250px;
  overflow: hidden;
  background-color: #fff;
`;

const BannerImageContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  aspect-ratio: 1;
`;

const BannerImage = styled.Image`
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

const BannerMainContainer = styled.Text`
    position: absolute;
    top: 136px;
    margin-left: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const BannerMainText = styled.Text`
    color: ${COLORS.white};
    font-size: 16px;
    font-weight: 500;
    line-height: 22.40px;
    padding-left: 8px;
`

const BannerSubText = styled.Text`
    color: ${COLORS.white};
    position: absolute;
    top: 161px;
    font-size: 32px;
font-weight: 700;
line-height: 43.20px;
margin-left: 30px;
`

const Button = styled(TouchableOpacity)`
  width: 20px;
  height: 2.5px;
  background-color: ${props => props.active ? COLORS.main : COLORS.gray_300};
`;
