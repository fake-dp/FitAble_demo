import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { Text, ScrollView ,Alert,Dimensions} from 'react-native';
import {getFitAbleInquiryList,deleteFitAbleInquiry} from '../../../api/mypageApi';
import { useEffect, useState } from 'react';
import {formatReplaceString} from '../../../utils/CustomUtils';
import { useRoute } from '@react-navigation/native';

function ProductQnATemplate(props) {
    const windowHeight = Dimensions.get('window').height;
    const navigation = useNavigation();
    const route = useRoute();
    const [fitableInquiryList, setFitableInquiryList] = useState([]);

    console.log('route.param23123123s', route.params?.path)

    const routeId = route.params?.path;
    console.log('ududud',routeId)
    const goBackScreens = () => {
        navigation.goBack();
    };

    const getFitAbleInquiryListData = async () => {
        try{
            const response = await getFitAbleInquiryList();
            if(routeId && response){
                const sortedList = response.content.sort((a, b) => {
                    return a.id === routeId ? -1 : b.id === routeId ? 1 : 0;
                  });
                setFitableInquiryList(sortedList);
                if (!sortedList.find(item => item.id === routeId)) {
                    Alert.alert('알림', '문의내역을  찾을 수 없습니다');
                  }
            }else{
                setFitableInquiryList(response.content);
            }
            // console.log('getFitAbleInquiryListData response:', response.content)
        }catch(error){
            console.error('getFitAbleInquiryListData error:', error.response.data)
        }
    }

    const deleteInquiryBtn = async (id) => {
        console.log('deleteInquiryBtn id:', id)
        try{
            const response = await deleteFitAbleInquiry(id);
            // console.log('deleteInquiryBtn response:', response)
            if(response){
                setFitableInquiryList(fitableInquiryList.filter(item => item.id !== id));
                Alert.alert('문의가 삭제되었습니다')
            }
        }catch(error){
            console.error('deleteInquiryBtn error:', error.response.data)
        }
    }

    useEffect(() => {
        getFitAbleInquiryListData();
    },[])
        

    return (
        <Container>
            <GobackBlackGrid onPress={goBackScreens}>핏에이블 문의</GobackBlackGrid>
            <QnAWraper>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                {
                    fitableInquiryList.length === 0 ? (
                        <NoListContainer windowHeight={windowHeight}>
                        <NoListText>문의 내역이 없습니다.</NoListText>
                        </NoListContainer>
                    ) : null
                }
                {
                    fitableInquiryList.map((item, index) => (
                        <ProductQnAListContainer 
                        key={index} 
                        isBorder={index===0 && routeId ===item.id}>
                            <ProductQnAListUserContainer>
                                <ProductQnAListText>Q.</ProductQnAListText>
                                <ProductQnAListAnswerLabelText>{item.isComment ? '답변완료' : '답변대기'}</ProductQnAListAnswerLabelText>
                            </ProductQnAListUserContainer>
                            <ProductQnAListTitleContainer>
                                <ProductQnAListQuestionText>{item.context}</ProductQnAListQuestionText>
                            </ProductQnAListTitleContainer>
                            <BtnWraper>
                            <ProductQnAListUserDateText>{item.name} | {formatReplaceString(item.createAt)}</ProductQnAListUserDateText>
                                <DeleteBtn onPress={() => {deleteInquiryBtn(item.id)}}>
                                    <DeleteText>삭제</DeleteText>
                                </DeleteBtn>
                            </BtnWraper>
                            {
                                item.isComment && item.comment ? (
                                <ProductQnAListAnswerContainer>
                                    <ProductQnAListAText>A.</ProductQnAListAText>
                                    <ProductQnAListAnswerText>{item.comment.context}</ProductQnAListAnswerText>
                                    <ProductQnAListUserDateText>{item.comment.name} | {formatReplaceString(item.comment.createAt)}</ProductQnAListUserDateText>
                                </ProductQnAListAnswerContainer>
                                ) : null
                            }
                        </ProductQnAListContainer>

                    ))
                }
            </ScrollView>
            </QnAWraper>
        </Container>
    );
}

export default ProductQnATemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.gray_100};
`;

const NoListContainer = styled.View`
    justify-content: center;
    align-items: center;
    height: ${props => props.windowHeight / 2}px;
`

const NoListText = styled.Text`
    font-size: 16px;
font-weight: 500;
letter-spacing: -0.4px;
`


const QnAWraper = styled.View`
margin-top: 38px;
margin-bottom: 38px;
`

const ProductQnAListContainer = styled.View`
    padding: 20px;
    background-color: ${COLORS.white};
    border-radius: 15px;
    margin-bottom: 8px;
    border: ${props => props.isBorder ? `1px solid #000` : 'none'};
`

const ProductQnAListTitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

const ProductQnAListQuestionText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: black;
`

const ProductQnAListUserDateText = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: ${COLORS.gray_300};
`

const ProductQnAListUserContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

const ProductQnAListText = styled.Text`
    font-size: 16px;
    font-weight: 700;
`

const ProductQnAListAText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    margin-top: 14px;
    margin-bottom: 8px;
`

const ProductQnAListAnswerLabelText = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: black;
`

const ProductQnAListAnswerText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: black;
    margin-bottom: 12px;
`

const ProductQnAListAnswerContainer = styled.View`
    margin-top: 10px;
`

// const ProductQnAListAnswerUserText = styled.Text`
//     font-size: 12px;
//     color: ${COLORS.gray_200};
//     margin-top: 5px;
// `

// const ProductQnAListAnswerDateText = styled.Text`
//     font-size: 12px;
//     color: ${COLORS.gray_200};
//     margin-top: 5px;
// `

const BtnWraper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const DeleteBtn = styled.TouchableOpacity`

`

const DeleteText = styled.Text`
    color: ${COLORS.gray_400};
font-size: 12px;
font-weight: 400;
text-decoration: underline;
line-height: 19.20px;
`