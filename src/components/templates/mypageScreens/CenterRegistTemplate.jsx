import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import { useState, useEffect } from 'react';
import SearchListBoxGrid from '../../grid/SearchListBoxGrid';
import { ScrollView, View } from 'react-native';
import PriceModal from '../../ui/modal/PriceModal';
import {getValidCenter,postMainCenter} from '../../../api/mypageApi';
import { useRecoilState } from 'recoil';
import { myinfoState } from '../../../store/atom';

function CenterRegistTemplate(props) {
    const [showModal, setShowModal] = useState(false);
    const [initialSelectedItemId, setInitialSelectedItemId] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(''); 
    const [selectedItemName, setSelectedItemName] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [myInfo, setMyInfo] = useRecoilState(myinfoState);

    const navigation = useNavigation();

    
    const getValidCenterData = async () => {
        try {
            const response = await getValidCenter();
            // console.log('response@@@',myInfo)
            setSearchList(response.content);

            const mainCenter = response.content.find(item => item.isMainCenter);
        if(mainCenter) {
            setSelectedItemId(mainCenter.id);
            setInitialSelectedItemId(mainCenter.id);
        }
        } catch (error) {
            console.error('Error getting:', error); // 에러 로깅
        }
    };

    useEffect(() => {
        getValidCenterData();
    }, []);



    const goBackScreens = () => {
        navigation.goBack();
    };

    const handleRegistCenterBtn = (itemId, name) => {
        // console.log('등록하기 버튼 클릭11',itemId, name)
        setShowModal(true)
        setSelectedItemId(itemId);
        setSelectedItemName(name);
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedItemId(initialSelectedItemId);
    }

    const goMyScreens = async(id, name) => {
        console.log('등록하기 버튼 클릭22',id,name)
        try{
            const response = await postMainCenter(id);
            // console.log('response123',response)
            setMyInfo(prevState => ({
                ...prevState,
                mainCenterId: id,
                mainCenter: name
            }));
            setShowModal(false)
            // navigation.navigate('Mypage');
        }
        catch(error){
            console.error('Error getting:', error); // 에러 로깅
        }
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
                //  <React.Fragment key={item.id}>
                <SearchListBoxGrid 
                key={item.id}
                onPress={()=>handleRegistCenterBtn(item.id, item.name)}
                searchListData={item}
                isSelected={selectedItemId === item.id}
                />
                // </React.Fragment>
                ))}
            </RegistContainer>
            {
                    showModal ?
                    <PriceModal
                    closeModal={closeModal}
                    goHomeScreens={()=>goMyScreens(selectedItemId,selectedItemName)}
                    text={text}
                    />
                    :   
                    null
                    
                }
            </ScrollView>
          
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