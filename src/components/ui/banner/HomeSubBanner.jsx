import React, { useRef, useEffect, useState } from "react";
import { ScrollView, View, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native"; // styled-components 임포트 오타 수정
import { COLORS } from "../../../constants/color";
const { width } = Dimensions.get("window");

function HomeSubBanner({ centersBanners }) {
    const bannerLogo = require("../../../assets/img/bannerLogo.png");
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (centersBanners && centersBanners.length > 0) {
      const interval = setInterval(() => {
        setCurrentPage((prevPage) => {
          const nextPage = (prevPage + 1) % centersBanners.length;
          scrollRef.current?.scrollTo({ x: nextPage * width, animated: true });
          return nextPage;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [centersBanners]);


  const handleBannerPress = (banner) => {
    console.log('Banner Pressed',banner);
    // 여기서 웹뷰 관련 비즈니스 로직 작성하기
  };

  // console.log('centersBanners',centersBanners)


  return (
    <>
        {
         centersBanners.length !==0 ? (
            <BannerContainer>
                <ScrollView
                horizontal
                pagingEnabled
                ref={scrollRef}
                onMomentumScrollEnd={(e) => { // onScroll 대신 onMomentumScrollEnd 사용
                    const newPage = Math.floor(e.nativeEvent.contentOffset.x / width);
                    if (newPage !== currentPage) {
                      setCurrentPage(newPage);
                    }
                  }}
                    scrollEventThrottle={16} 
                    >
                {centersBanners.map((banner, index) => (
                           <TouchableOpacity key={banner.id} onPress={() => handleBannerPress(banner)}>
                    <BannerImageContainer>
                             <BannerImage key={index} source={{ uri: banner.imageUrl }} resizeMode="cover" />
                    </BannerImageContainer>
                           </TouchableOpacity>
                    ))}
              </ScrollView>
                    </BannerContainer>
            ) : (
                <BannerContainer>
                <BannerLogo source={bannerLogo} />
                <View>
                  <MainText>핏에이블은 처음이신가요?</MainText>
                  <SubText>편리하게 이용하실 수 있는 방법을 알려드릴게요!</SubText>
                </View>
                </BannerContainer>
            )
        }
          
      <DotContainer>
        {centersBanners.map((_, index) => (
            <Dot key={index} active={index === currentPage} />
            ))}
      </DotContainer>
    </>
  );
}

export default HomeSubBanner;

const BannerContainer = styled.View`
  width: 100%;
  height: 80px;
  background-color: ${COLORS.box};
  border-radius: 13px;
  flex-direction: row;
  align-items: center;
`;



const BannerLogo = styled.Image`
  margin: 0 23px 0 21px;
`;

const MainText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.white};
`;

const SubText = styled.Text`
font-size: 12px;
font-weight: 400;
line-height: 16.80px;
color: ${COLORS.gray_100};
`;

const BannerImage = styled.Image`
/* width: ${Dimensions.get('window').width}px; */
  width: 90%;
  height: 80px;
  border-radius: 13px;
  `;

const BannerImageContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 80px;
  background-color: transparent;
  
`;

const DotContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 0 10px;
`;

const Dot = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${props => props.active ? COLORS.main : COLORS.gray_300};
  border-radius: 5px;
  margin: 0 5px;
`;
