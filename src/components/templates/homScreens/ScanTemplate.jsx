import {Image, TouchableOpacity } from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getHomeQrBanners } from '../../../api/homeApi';
import GobackGrid from '../../grid/GobackGrid';

function ScanTemplate(props) {

    const navigation = useNavigation();
    const [qrBanners, setQrBanners] = useState([]);

    const getUseHomeQrBanners = async () => {
        try {
            const response = await getHomeQrBanners();
            setQrBanners([response]);
        } catch (error) {
            console.error('Error getting home banners:', error.response.config.headers)
        }
    };

    useEffect(() => {
        getUseHomeQrBanners();
    }, []);


    const handleBannerPress = (banner) => {
        console.log('Banner Pressed',banner.id, banner.pathType, banner.path);
        // switch (banner.pathType) {
        //   case 'LINK':
        //   case 'NOTICE_DETAIL':
        //     // 웹뷰를 사용하여 해당 URL 열기
        //     navigation.navigate('BannerWebView', { uri: banner.path });
        //     break;
        //   case 'STORE':
        //   case 'STORE_DETAIL':
        //     // 일반 네비게이션을 통해 해당 페이지로 이동
        //     // navigation.navigate('StoreScreen', { storeId: banner.path });
        //     break;
        //   default:
        //     console.warn('Unknown pathType:', banner.pathType);
        //     break;
        // }
      };

      const closeIcon = require('../../../assets/img/whiteClose.png');

    return (
        <Container>
            <GobackContainer onPress={() => navigation.goBack()}>
          
            <Image source={closeIcon}/>
          
            </GobackContainer>
            <QrContainer>

            <MainContainer>
            <TitleText>입장하기</TitleText>
            <SubText>입장을 위해 QR코드를 인식해주세요</SubText>
            <Rectangular />
            <SubText>휴대폰을 흔들면 QR코드를 촬영할 수 있어요!</SubText>
            </MainContainer>
            {
                qrBanners.map((banner) => (
                    <ImgContainer key={banner.id} onPress={() => handleBannerPress(banner)}>
                        <BannerImage source={{ uri: banner.imageUrl }} resizeMode="cover" />
                        </ImgContainer>
                ))
            }
            </QrContainer>
        </Container>
    );
}

export default ScanTemplate;


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
`;

const GobackContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 20px;
`

const QrContainer = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    align-items: center;
    justify-content: center;
`

const MainContainer = styled.View`
   margin-bottom: 120px;
    align-items: center;
    justify-content: center;
`

const ImgContainer = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    width: 100%;
    /* height: 200px; */
`

const Rectangular = styled.View`
    width: 200px;
    height: 200px;
    border: 1px solid ${COLORS.white};
    margin-bottom: 26px;
`

const TitleText  = styled.Text`
    font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
`

const SubText = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_100};
margin-bottom: 26px;
`

const BannerImage = styled.Image`
    width: 100%;
    height: 140px;
`;
