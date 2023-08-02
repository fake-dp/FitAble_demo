import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { Text, ScrollView } from 'react-native';
function ProductQnATemplate(props) {

    const navigation = useNavigation();

   
    const goBackScreens = () => {
        navigation.goBack();
    };

    const productQnAData = [
        {
            id: 0,
            question:'배송 언제 되나요?',
            questionDate: '2023.06.27',
            user:'남주혁',
            isAnswer: true,
            answer: (
            <>
                <Text>
                    고객님, 안녕하세요~
                    {"\n"}
                    핏에이블입니다.
                    {"\n\n"}
                    금일 택배 발송되었습니다.
                    {"\n"}
                    기다려주셔서 진심으로 감사드리며, 다른 문의사항이 있으신 경우 언제든지 문의주세요
                </Text>
            </>
            ),
            answerUser:'핏에이블',
            answerDate: '2023.06.28',
        },
        {
            id: 1,
            question:'배송 언제 되나요?',
            questionDate: '2023.06.27',
            user:'남주혁',
            isAnswer: false,
            answer:null,
            answerUser:null,
            answerDate: null,
        },
        {
            id: 2,
            question:'배송 언제 되나요?',
            questionDate: '2023.06.27',
            user:'남주혁',
            isAnswer: false,
            answer:null,
            answerUser:null,
            answerDate: null,
        },
        {
            id: 3,
            question:'배송 언제 되나요?',
            questionDate: '2023.06.27',
            user:'남주혁',
            isAnswer: false,
            answer:null,
            answerUser:null,
            answerDate: null,
        },
        {
            id: 4,
            question:'배송 언제 되나요?',
            questionDate: '2023.06.27',
            user:'남주혁',
            isAnswer: false,
            answer:null,
            answerUser:null,
            answerDate: null,
        },
        {
            id: 5,
            question:'배송 언제 되나요?',
            questionDate: '2023.06.27',
            user:'남주혁',
            isAnswer: false,
            answer:null,
            answerUser:null,
            answerDate: null,
        },
    ]

    return (
        <Container>
            <GobackBlackGrid onPress={goBackScreens}>상품 문의</GobackBlackGrid>
            <QnAWraper>
            <ScrollView>
                {
                    productQnAData.map((item, index) => (
                        <ProductQnAListContainer key={index}>
                            
                            <ProductQnAListUserContainer>
                                <ProductQnAListText>Q.</ProductQnAListText>
                                <ProductQnAListAnswerLabelText>{item.isAnswer ? '답변완료' : '답변대기'}</ProductQnAListAnswerLabelText>
                            </ProductQnAListUserContainer>
                            <ProductQnAListTitleContainer>
                                <ProductQnAListQuestionText>{item.question}</ProductQnAListQuestionText>
                            </ProductQnAListTitleContainer>
                            <ProductQnAListUserDateText>{item.user} | {item.questionDate}</ProductQnAListUserDateText>
                            {
                                item.isAnswer ?
                                <ProductQnAListAnswerContainer>
                                     <ProductQnAListAText>A.</ProductQnAListAText>
                                    <ProductQnAListAnswerText>{item.answer}</ProductQnAListAnswerText>
                                    <ProductQnAListUserDateText>{item.user} | {item.questionDate}</ProductQnAListUserDateText>
                                </ProductQnAListAnswerContainer>
                                :
                                null
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

const ProductQnAListAnswerUserText = styled.Text`
    font-size: 12px;
    color: ${COLORS.gray_200};
    margin-top: 5px;
`

const ProductQnAListAnswerDateText = styled.Text`
    font-size: 12px;
    color: ${COLORS.gray_200};
    margin-top: 5px;
`

