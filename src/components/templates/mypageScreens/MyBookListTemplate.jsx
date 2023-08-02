import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import { BookCancelModal } from '../../ui/modal/MyPageCancelModal';
function MyBookListTemplate(props) {

    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const goBackScreens = () => {
        navigation.goBack();
    };

    const bookListData = [
        {
            id: 0,
            date: '2023.06.15',
            spot: '에이블짐 노원본점',
            title:'1:1 P.T 브이 트레이너',
            contents:'2023.06.18 / 11:00 ~ 11:50',
            isPending: false,
            isBookCancel: true,
        },
        {
            id: 1,
            date: '2023.06.15',
            spot: '에이블짐 노원본점',
            title:'1:1 P.T 브이 트레이너',
            contents:'2023.06.18 / 11:00 ~ 11:50',
            isPending: true,
            isBookCancel: false,
        },
        {
            id: 2,
            date: '2023.06.15',
            spot: '에이블짐 노원본점',
            title:'1:1 P.T 브이 트레이너',
            contents:'2023.06.18 / 11:00 ~ 11:50',
            isPending: false,
            isBookCancel: false,
        },
        {
            id: 3,
            date: '2023.06.15',
            spot: '에이블짐 노원본점',
            title:'1:1 P.T 브이 트레이너',
            contents:'2023.06.18 / 11:00 ~ 11:50',
            isPending: false,
            isBookCancel: false,
        },
        {
            id: 4,
            date: '2023.06.15',
            spot: '에이블짐 노원본점',
            title:'1:1 P.T 브이 트레이너',
            contents:'2023.06.18 / 11:00 ~ 11:50',
            isPending: false,
            isBookCancel: false,
        },
    ];

    const handleClickModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const text = {
        title: '예약 취소',
        content: '수업 예약을 취소하시겠어요?',
        checkText: '네',
        closeText: '아니오',
    }

    return (
     <Container>
        <GobackBlackGrid onPress={goBackScreens}>전체 예약 목록</GobackBlackGrid>
            <ScrollView>
            <BookListContainer>
                {
                    bookListData.map((item, index) => (
                        <BookListWrapper key={index}>
                            
                            <BookListTitle>
                                <BookListTitleDate>{item.date}</BookListTitleDate>
                            </BookListTitle>

                            <BookFlexContainer>

                            <BookListContents>
                                <BookListTitleText>{item.spot}</BookListTitleText>
                                <BookListContentsText>{item.title}</BookListContentsText>
                                <BookListContentsText>{item.contents}</BookListContentsText>
                            </BookListContents>

                            <BookBtnContainer>
                                {
                                    item.isPending ? (
                                        <BookListBtnContainer onPress={handleClickModal}>
                                            <BookListBtnText>예약취소</BookListBtnText>
                                            </BookListBtnContainer> 
                                        ) : (
                                            item.isBookCancel ? (
                                                <BookListBtnContainer onPress={handleClickModal}>
                                                <BookListBtnText>대기취소</BookListBtnText>
                                                </BookListBtnContainer>
                                                ) : (
                                                    null
                                                    )
                                                    )
                                                }
                            </BookBtnContainer>
                        </BookFlexContainer>
                        </BookListWrapper>
                    ))


                }
            </BookListContainer>
            </ScrollView>
            {
            showModal ?
            <BookCancelModal 
            closeModal={closeModal}
            modalVisible={modalVisible}
            text={text}
            />
            :   
            null
            
        }
    </Container>
    );
}

export default MyBookListTemplate;


const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.white};
`;

const BookListContainer = styled.View`
    margin-top: 20px;
`;

const BookListWrapper = styled.View`
    
`;

const BookFlexContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const BookListTitle = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${COLORS.gray_100};
    padding-bottom: 12px;
    margin-bottom: 28px;
    margin-top: 20px;
`;

const BookListTitleDate = styled.Text`
    font-size: 16px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.sub};
`;

const BookListTitleText = styled.Text`
    font-size: 12px;
    font-weight: 500;
    line-height: 19.20px;
    color: ${COLORS.gray_300};
`;

const BookListContents = styled.View`
    margin-bottom: 10px;   
`;

const BookListContentsText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.sub};
`;

const BookBtnContainer = styled.View``;

const BookListBtnContainer = styled.TouchableOpacity`
    border: 1px solid ${COLORS.sub};
    border-radius: 100px;
    padding: 4px 11px;
`;


const BookListBtnText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.sub};
`;




const BookListBtnTextPending = styled.Text`
    font-size: 14px;

    font-weight: 700;
    line-height: 22.40px;

    color: ${COLORS.gray_400};
`;


