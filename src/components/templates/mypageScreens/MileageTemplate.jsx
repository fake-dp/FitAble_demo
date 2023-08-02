import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import MileageList from '../../ui/list/MileageList';
import { FlatList } from 'react-native';
function MileageTemplate(props) {
    
    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };


    const close = require('../../../assets/img/close.png');


    // 지워
    const MileageListData = [
        {
        id: 0,
        title: '스토어 뉴프로틴 구매',
        date: '2023.06.15 10:10',
        price: 100,
        isPlus: true,
        },
        {
            id: 1,
            title: '스토어 마일리지 차감',
            date: '2023.06.15 10:10',
            price: 1000,
            isPlus: false,
        },
        {
            id: 2,
            title: '스토어 상품명 구매',
            date: '2023.06.15 10:10',
            price: 100,
            isPlus: true,
        },
        {
            id: 3,
            title: '스토어 폼롤러 구매',
            date: '2023.06.15 10:10',
            price: 100,
            isPlus: true,
        },
        {
            id: 4,
            title: '스토어 폼롤러 구매',
            date: '2023.06.15 10:10',
            price: 100,
            isPlus: true,
        },
        {
            id: 5,
            title: '스토어 폼롤러 구매',
            date: '2023.06.15 10:10',
            price: 100,
            isPlus: true,
        },
        {
            id: 6,
            title: '스토어 마일리지 차감',
            date: '2023.06.15 10:10',
            price: 1000,
            isPlus: false,
        },
        {
            id: 7,
            title: '스토어 뉴프로틴 구매',
            date: '2023.06.15 10:10',
            price: 100,
            isPlus: true,
        },
        {
            id: 8,
            title: '스토어 뉴프로틴 구매',
            date: '2023.06.15 10:10',
            price: 100,
            isPlus: true,
        },
        {
            id: 9,
            title: '스토어 뉴프로틴 구매',
            date: '2023.06.15 10:10',
            price: 100,
            isPlus: true,
        },
        {
            id: 10,
            title: '스토어 뉴프로틴 구매',
            date: '2023.06.15 10:10',
            price: 100,
            isPlus: true,
        },
        {
            id: 11,
            title: '스토어 마일리지 차감',
            date: '2023.06.15 10:10',
            price: 1000,
            isPlus: false,
        },
        {
            id: 12,
            title: '스토어 뉴프로틴 구매',
            date: '2023.06.15 10:10',
            price: 100,
            isPlus: true,
        },
        {
            id: 13,
            title: '스토어 뉴프로틴 구매',
            date: '2023.06.15 10:10',
            price: 100,
            isPlus: true,
        },

    ]


    return (
        <Container>
            <CloseBtn onPress={goBackScreens}>
            <CloseImg source={close}/>
            </CloseBtn>

            <PriceText>20,000원</PriceText>
            <TitleText>핏에이블 마일리지</TitleText>

            <GridLine />

                <ListTitleText>내역</ListTitleText>


            <FlatList
             bounces={false}
         
             showsVerticalScrollIndicator={false}
             overScrollMode="never"
            data={MileageListData}
            renderItem={({ item }) => <MileageList data={item} />}
            keyExtractor={(item) => item.id.toString()}
        />
        </Container>
    );
}

export default MileageTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.white};
`


const CloseBtn = styled.TouchableOpacity`
  align-items: flex-end;
  margin-right: 11px;
  margin-bottom: 41px;
`

const CloseImg = styled.Image`
    width: 32px;
    height: 32px;
`

const PriceText = styled.Text`
font-size: 28px;
color: ${COLORS.sub};
font-weight: 400;
line-height: 37.80px;
`
const TitleText = styled.Text`
font-size: 20px;
font-weight: 600;
line-height: 28px;
color: ${COLORS.gray_400};
`

const GridLine = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${COLORS.gray_200};
    margin-bottom: 20px;
    margin-top: 36px;
`

const ListTitleText = styled.Text`
color: ${COLORS.sub};
font-size: 20px;
font-weight: 700;
line-height: 30px;
margin-bottom: 30px;
`


