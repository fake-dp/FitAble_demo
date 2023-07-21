import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

function CollsAbleGrid(props) {
  const caretdown = require('../../assets/img/caretdown.png');
  const initialTextLimit = 1; // 초기에 보이는 텍스트 줄 수
  const [showAllText, setShowAllText] = useState(false);

  const toggleShowAllText = () => {
    setShowAllText((prevShowAllText) => !prevShowAllText);
  };

  return (
    <Container>
      <MainTitleText>이용 가능 센터</MainTitleText>
      <SubTextContainer>
        <MainSubTextWrapper showAllText={showAllText}>

        <MainSubText numberOfLines={showAllText ? undefined : initialTextLimit}
       
        >
          노원본점, 노원역점, 수유점, 압구정로데오점, 삼성중앙역점, 신논현역점, 강남역점, 교대역점, 종합운동장역점, 이태원점, 어린이대공원점, 한양대점, 잠실역점, 장안점, 용두역점, 암사역점, 창신역점, 천호역점, 신촌점, 길동역점, 사가정점, 상봉역점, 홍대입구역점, 돈암점, 위례점, 응암점, 먹골역점, 영등포역점, 구로디지털단지역점, 대림역점, 발산역점, 상암점, 불광점, 신정네거리역점, 마곡 수명산파크점, 중계점, 마곡나루센터, 신방화역점
        </MainSubText>
        </MainSubTextWrapper>
        {!showAllText && (
              <TouchableOpacity onPress={toggleShowAllText}>
              <DownImg source={caretdown} resizeMode="contain" />
            </TouchableOpacity>
        )}
      </SubTextContainer>
      <ContainerLine />
    </Container>
  );
}

export default CollsAbleGrid;

const MainSubTextWrapper = styled.View`
  overflow: hidden;
`;

const Container = styled.View`
 padding: 0 20px;

`

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.gray_500};
    padding: 0 20px;
    margin-top: 40px;
`

const MainTitleText = styled.Text`
margin-top: 40px;
font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
`

const SubTextContainer = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`

const DownImg = styled.Image`
margin-top: 5px;
`

const MainSubText = styled.Text`
font-size: 16px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_200};
margin-top: 4px;
`
