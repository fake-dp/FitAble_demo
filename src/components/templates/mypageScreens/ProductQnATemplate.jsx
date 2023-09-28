import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { Text, ScrollView ,Alert} from 'react-native';
import {getFitAbleInquiryList,deleteFitAbleInquiry} from '../../../api/mypageApi';
import { useEffect, useState } from 'react';
import {formatReplaceString} from '../../../utils/CustomUtils';
function ProductQnATemplate(props) {

    const navigation = useNavigation();

    const [fitableInquiryList, setFitableInquiryList] = useState([]);


    const goBackScreens = () => {
        navigation.goBack();
    };

    const getFitAbleInquiryListData = async () => {
        try{
            const response = await getFitAbleInquiryList();
            setFitableInquiryList(response.content);
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
                Alert.alert('문의가 삭제되었습니다.')

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
            <ScrollView>
                {
                    fitableInquiryList.map((item, index) => (
                        <ProductQnAListContainer key={index}>
                            
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

const QnAWraper = styled.View`
margin-top: 38px;
margin-bottom: 38px;
`

const ProductQnAListContainer = styled.View`
    padding: 20px;
    background-color: ${COLORS.white};
    border-radius: 15px;
    margin-bottom: 8px;
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