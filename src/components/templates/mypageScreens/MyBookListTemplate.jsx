import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { Dimensions , Alert, FlatList} from 'react-native';
import { useState, useEffect } from 'react';
import { BookCancelModal } from '../../ui/modal/MyPageCancelModal';
import {getReservations, cancelReservation} from '../../../api/lessonsApi';
import {ActivityIndicator, View} from 'react-native';

function MyBookListTemplate(props) {
    const windowHeight = Dimensions.get('window').height;
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [bookListData, setBookListData] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelId, setCancelId] = useState(null);

    const goBackScreens = () => {
        navigation.goBack();
    };
  

    const getReservationsData = async () => {
        try {
            const response = await getReservations();
            setBookListData(response.content);
        } catch (error) {
            console.error('Error getting:', error);
        } finally {
            setLoading(false);  // 데이터를 가져온 후에 로딩 상태를 false로 설정
        }
    };

    // console.log('bookListData',bookListData)

    const postCancelReservation = async (id) => {
        console.log('확인용아디',id)
        try {
            const response = await cancelReservation(id);
            console.log('response',response)
            if(response){
                console.log('예약 취소 확인용 콘솔',response)
                // setShowModal(false)
                navigation.goBack();
                // Alert.alert("알림","예약이 취소되었습니다.",['확인']);
            }else{
                Alert.alert("알림","예약이 실패하였습니다.",['확인']);
            }
            // [{ text: '확인', onPress: () => setIsLoggedIn(true) }]);

        } catch (error) {
            console.error('Error getting:', error);
        }
    };

    console.log('selectedDetail',selectedDetail, cancelId)

    const handleClickModal = (text, id) => {
        console.log('detail.status',text, id)
        setSelectedDetail({ status: text });
        setCancelId(id);
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }


    useEffect(() => {
        getReservationsData();
    },[])


    useEffect(() => {
        if(selectedDetail) {
            if(selectedDetail.status === "WAITING") {
                setModalVisible(cancelTextTwo);
            } else if(selectedDetail.status === "RESERVED") {
                setModalVisible(cancelTextOne);
            }
        }
    }, [selectedDetail]);
    

    const cancelTextOne = {
        title: '예약 취소',
        content: '수업 예약을 취소하시겠어요?',
        checkText: '네',
        closeText: '아니오',
    }

    const cancelTextTwo = {
        title: '대기 취소',
        content: '수업 대기를 취소하시겠어요?',
        checkText: '네',
        closeText: '아니오',
    }
                   

    const renderItem = ({ item, index }) => (
        <BookListWrapper>
                            
                            <BookListTitle>
                                <BookListTitleDate>{item.createAt}</BookListTitleDate>
                            </BookListTitle>

                            {
                                item.details.map((detail, index) => (
                                    <BookFlexContainer key={index}>
                                        <BookListContents>
                                            <BookListTitleText>{detail.centerName}
                                            </BookListTitleText>
                                            <BookListNameContainer>
                                            <BookListContentsText>{`${detail.name} ${detail.trainers.join(', ')}`.length > 18 ? `${detail.name} ${detail.trainers.join(', ')}`.substring(0, 18) + '...' : `${detail.name} ${detail.trainers.join(', ')}`}</BookListContentsText>
                                         
                                                    {/* <BookListContentsTrainerText>{detail.trainers.join(', ')}</BookListContentsTrainerText> */}
                                        
                                            </BookListNameContainer>
                                            <BookListMainContentsText>수업일 {detail.date} / {detail.startTime} ~ {detail.endTime}</BookListMainContentsText>
                                        </BookListContents>
                                        
                                        <BookBtnContainer>
                                                {
                                                    detail.status === "RESERVED" && (
                                                        <BookListBtnContainer onPress={()=>handleClickModal(detail.status ,detail.id)}>
                                                        <BookListBtnText>예약취소</BookListBtnText>
                                                        </BookListBtnContainer> 
                                                    )
                                                }
                                                {
                                                    detail.status === "WAITING" && (
                                                        <BookListBtnWContainer 
                                                        disabled={!detail.isAvailableCancel}
                                                        isAvailable={detail.isAvailableCancel}
                                                        onPress={()=>handleClickModal(detail.status, detail.id)}>
                                                        <BookListBtnWText
                                                        isAvailable={detail.isAvailableCancel}
                                                        >대기취소</BookListBtnWText>
                                                        </BookListBtnWContainer> 
                                                    )
                                                }
                                        </BookBtnContainer>
                                     </BookFlexContainer>
                                        ))                   
                            }
                        </BookListWrapper>
      );



    // if (loading) {
    //     return (
    //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:COLORS.white }}>
    //         <ActivityIndicator size="large" color={COLORS.sub} />
    //       </View>
    //     );
    //   }

    return (
     <Container>
        <GobackBlackGrid onPress={goBackScreens}>전체 예약 목록</GobackBlackGrid>
        
        {loading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
                    <ActivityIndicator size="large" color={COLORS.sub} />
                </View>
            )}
        <BookListContainer>
       
            <FlatList
             showsVerticalScrollIndicator={false}
                data={bookListData}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)} // 고유한 키를 제공합니다.
        ListEmptyComponent={(
          <NoListContainer windowHeight={windowHeight}>
            <NoListText>예약 내역이 없습니다.</NoListText>
          </NoListContainer>
        )}
      />
      
    </BookListContainer>
            {
    showModal && (
        <BookCancelModal 
            postCancelReservation={()=>postCancelReservation(cancelId)}
            closeModal={closeModal}
            modalVisible={modalVisible}
            text={selectedDetail.status === "WAITING" ? cancelTextTwo : cancelTextOne}
        />
    )
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
    margin-bottom: 30px;
    
`;

const BookListWrapper = styled.View`
    margin-bottom: 20px;
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
    margin-bottom: 30px;   
`;

const BookListContentsText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.sub};
    margin-right: 5px;
`;

const BookListContentsTrainerText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.sub};
`;

const BookListMainContentsText = styled.Text`
    font-size: 14.8px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.sub};
    margin-top: 5px;
`;

const BookBtnContainer = styled.View`
    margin-bottom: 40px;
`;

const BookListNameContainer = styled.View`
display: flex;
flex-direction: row;
align-items: center;
`;

const BookListBtnContainer = styled.TouchableOpacity`
    border: 1px solid  ${COLORS.sub};
    background-color: ${COLORS.white};
    border-radius: 100px;
    padding: 4px 11px;
`;

const BookListBtnWContainer = styled.TouchableOpacity`
border: 1px solid ${props => props.isAvailable ? COLORS.sub : COLORS.gray_300};
background-color: ${props => props.isAvailable ? COLORS.white : COLORS.gray_300};
border-radius: 100px;
padding: 4px 11px;
`;

const BookListBtnText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.sub};
`;

const BookListBtnWText = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${props => props.isAvailable ? COLORS.sub : COLORS.gray_400};
`;


const NoListContainer = styled.View`
    justify-content: center;
    align-items: center;
    height: ${props => props.windowHeight / 2}px;
`

const NoListText = styled.Text`
color: ${COLORS.gray_400};
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
`