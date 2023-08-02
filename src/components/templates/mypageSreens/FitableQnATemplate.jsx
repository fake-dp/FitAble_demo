import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import MyBtn from '../../ui/buttonUi/MyBtn';

function FitableQnATemplate(props) {
    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    const handleRegistBtn = () => {
        console.log('등록하였습니다.');
    };

    const handleAnswerListBtn = () => {
        console.log('문의 내역 확인');
    }

    const plusbtn = require('../../../assets/img/plusbtn.png');

    return (
        <Container>
            <GobackBlackGrid onPress={goBackScreens}>핏에이블 문의</GobackBlackGrid>

            <PlusBtnContainer>
                <PlusBtnBox>
                <PlusBtn source={plusbtn} />
                </PlusBtnBox>
            </PlusBtnContainer>

            <TitleText>내용</TitleText>
            <TextInputWrapper>
                <TextAreaInput
                    placeholder="문의하실 내용을 입력해주세요."
                    multiline={true}
                    // numberOfLines={15}
                    placeholderTextColor={COLORS.gray_300}
                />
            </TextInputWrapper>

            <TextContainerBtn
                onPress={handleAnswerListBtn}
            >
                <ChangeText>문의 내역 확인</ChangeText>
            </TextContainerBtn>

         
                <MyBtn onPress={handleRegistBtn}>등록하기</MyBtn>
           
        </Container>
    );
}

export default FitableQnATemplate;

const Container = styled.View`
    flex: 1;
    padding: 0 20px;
    background-color: ${COLORS.white};
    position: relative;
`;

const PlusBtnContainer = styled.TouchableOpacity`
margin-top: 36px;
`
    
const PlusBtnBox = styled.View`
    background-color: ${COLORS.sub};
    align-items: center;
    justify-content: center;
    padding: 18px;
    border-radius: 10px;
    width: 17%;
`

const PlusBtn = styled.Image`
    width: 24px;
    height: 24px;
`;

const TitleText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    line-height: 22.40px;
    color: ${COLORS.sub};
    margin-top: 28px;
`;

const TextInputWrapper = styled.View`
    width: 100%;
    height: 250px;
    margin-top: 12px;
`;

const TextAreaInput = styled.TextInput.attrs({
  textAlignVertical: 'top', 
})`
    flex: 1;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 15px;
    padding: 26px 16px;
    background-color: ${COLORS.gray_100};
    font-size: 14px;
    color: ${COLORS.gray_400};
`;

const TextContainerBtn = styled.TouchableOpacity`
    margin-top: 24px;
`;

const ChangeText = styled.Text`
    color: ${COLORS.gray_400};
    font-size: 14px;
    font-weight: 400;
    text-decoration: underline;
    line-height: 22.40px;
`;

