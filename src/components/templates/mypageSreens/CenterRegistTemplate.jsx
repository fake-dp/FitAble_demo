import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import { useState } from 'react';
import SearchListBoxGrid from '../../grid/SearchListBoxGrid';
import { ScrollView, View } from 'react-native';
import PriceModal from '../../ui/modal/PriceModal';
function CenterRegistTemplate(props) {
    const [showModal, setShowModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null); 
    const [searchList, setSearchList] = useState([
        {
            id: 0,
            title: '에이블짐 노원본점',
            map: '서울 노원구 상계로 77',
            srcimg: require('../../../assets/img/searchlist_1.png'),
            tag:[
                '헬스','P.T','필라테스','요가'
            ]
        },
        {
            id: 1,
            title: '에이블짐 수유점',
            map: '서울 노원구 상계로 77',
            srcimg: require('../../../assets/img/searchlist_2.png'),
            tag:[
                '헬스','P.T',
            ]
        },
        {
            id: 2,
            title: '에이블짐 천호역점',
            map: '서울 노원구 상계로 77',
            srcimg: require('../../../assets/img/searchlist_3.png'),
            tag:[
                '헬스','P.T','골프',
            ]
        },
        {
            id: 3,
            title: '에이블짐 마곡역점',
            map: '서울 노원구 상계로 77',
            srcimg: require('../../../assets/img/searchlist_4.png'),
            tag:[
                '헬스',
            ]
        },
        {
            id: 4,
            title: '에이블짐 삼성역점',
            map: '서울 노원구 상계로 77',
            srcimg: require('../../../assets/img/searchlist_1.png'),
            tag:[
                '골프',
            ]
        },
    ]);

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    const handleRegistCenterBtn = (itemId) => {
        console.log('등록하기 버튼 클릭')
        setShowModal(true)
        setSelectedItemId(itemId);
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedItemId(null);
    }

    const goHomeScreens = () => {
        setShowModal(false)
    };
   
    const text = {
        title: '대표 센터으로 등록',
        content: '선택하신 센터을 대표 센터으로 등록하시겠어요?',
        closeText: '닫기',
        goHomeText: '등록',
    }

    return (
        <Container>
            <GobackGrid onPress={goBackScreens}>대표 센터 등록</GobackGrid>

            <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            >
            <RegistContainer>
            {searchList.map((item) => (
                <SearchListBoxGrid 
                key={item.id}
                onPress={handleRegistCenterBtn}
                searchListData={item}
                isSelected={selectedItemId === item.id}
                />
            ))}
            </RegistContainer>
            </ScrollView>
            {
            showModal ?
            <PriceModal
            closeModal={closeModal}
            goHomeScreens={goHomeScreens}
            modalVisible={modalVisible}
            text={text}
            />
            :   
            null
            
        }
        </Container>
        
    );
}

export default CenterRegistTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.sub};
`;

const RegistContainer = styled.View`
    margin-top:36px;
`