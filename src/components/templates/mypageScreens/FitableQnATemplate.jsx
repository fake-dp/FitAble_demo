import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import MyBtn from '../../ui/buttonUi/MyBtn';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import {postInquiry,postFitAbleInquiry} from '../../../api/mypageApi';
import { useRecoilState } from 'recoil';
import { inquiryListState ,myinfoState} from '../../../store/atom';
import { formatDate } from '../../../utils/CustomUtils';
function FitableQnATemplate(props) {
    const navigation = useNavigation();
    const route = useRoute();
    console.log('route.params', route.params?.centerId)

    const centerInquiryText = route.params?.text;
    const centerInquiryId = route.params?.centerId;

    const [inquiryText, setInquiryText] = useState('');
    const [inquiryList, setInquiryList] = useRecoilState(inquiryListState);
    const [myInfo, setMyInfo] = useRecoilState(myinfoState);

    console.log('inquiryList',inquiryList)

    const inquiryTextChange = (text) => {
        setInquiryText(text);
        console.log('inquiryText',inquiryText)
    };
    const goBackScreens = () => {
        if(inquiryText.length > 0){
            Alert.alert(
                "주의",
                "작성 중인 내용을 등록하지 않고 나가시겠습니까?",
                [
                    {text:'확인', onPress: () => navigation.goBack()},
                    {text:'취소', }
                ]
                );
            }else{
                navigation.goBack();
            }
        };
        
    const postCenterInquiryData = async (data) => {
        try {
            const response = await postInquiry(data);

            const newInquiry = {
                id: response.id,
                context: data.context,
                createAt: formatDate(response.createAt),
                isComment: false,
                comment: null,
                name: myInfo.name
            }

            setInquiryList([newInquiry, ...inquiryList]);

            Alert.alert(
                "문의 완료",
                "문의가 등록되었습니다",
                [{text:'확인', onPress: () => navigation.goBack()}]
                );

        } catch (error) {
            console.error('Error getting:', error);
            Alert.alert(
                "문의 실패",
                "문의 등록에 실패하였습니다.",
                [{text:'확인'}]
                );
        }
    };

    const fitableInquiryData = async (data) => {
        try {
            const response = await postFitAbleInquiry(data);
            console.log('응답성공',response)
         
            if(response){
                setInquiryText('')
            Alert.alert(
                "문의 완료",
                "문의가 등록되었습니다",

                [{text:'확인', onPress: () => handleAnswerListBtn()}]
                );
            }
            
        } catch (error) {
            console.error('Error getting:', error.response.data);
            Alert.alert(
                "문의 실패",
                "문의 등록에 실패하였습니다.",
                [{text:'확인'}]
                );
        }
    };



    const handleRegistBtn = (centerInquiryId, inquiryText) => {

        console.log('centerInquiryId, inquiryText',centerInquiryId, inquiryText)

        if(centerInquiryText){
            const data = {
                centerId: centerInquiryId,
                context: inquiryText
            }

            postCenterInquiryData(data);
        }else{
            const formData = new FormData();
            const requestDto = {
                context: inquiryText
            };
            formData.append("requestDto", JSON.stringify(requestDto));
            // const imageFile = { uri: '', type: 'image/jpeg', name: 'image.jpg' };
            // formData.append("images", imageFile);
            console.log('formData',formData)
            fitableInquiryData(formData);
      
        }
        // console.log('등록하였습니다.',inquiryText);
    };

    const handleAnswerListBtn = () => {
        navigation.navigate('ProductQnA');
    }


    const plusbtn = require('../../../assets/img/plusbtn.png');

    return (
        <Container>
            <GobackBlackGrid onPress={goBackScreens}>
            {
                centerInquiryText && centerInquiryId ? '센터 문의':'핏에이블 문의'
            }
            </GobackBlackGrid>

            {
                centerInquiryText && centerInquiryId ? null : (
                    <PlusBtnContainer>
                        <PlusBtnBox>
                            <PlusBtn source={plusbtn} />
                        </PlusBtnBox>
                    </PlusBtnContainer>
                )
            }

            <TitleText>내용</TitleText>
            <TextInputWrapper>
                <TextAreaInput
                    placeholder="문의하실 내용을 입력해주세요."
                    multiline={true}
                    // numberOfLines={15}
                    placeholderTextColor={COLORS.gray_300}
                    onChangeText={inquiryTextChange}
                    value={inquiryText}
                    // 리턴
                    returnKeyType="done"
                />
            </TextInputWrapper>

            {
                centerInquiryText && centerInquiryId ? null : (
                    <TextContainerBtn onPress={handleAnswerListBtn}>
                        <ChangeText>문의 내역 확인</ChangeText>
                    </TextContainerBtn>
                )
            }
                <MyBtn onPress={()=>handleRegistBtn(centerInquiryId, inquiryText)}>등록하기</MyBtn>
           
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



const SelectImageButton = styled.TouchableOpacity`
  background-color: ${COLORS.sub};
  padding: 12px 24px;
  border-radius: 8px;
  margin-top: 16px;
  align-self: center;
`;

// 이미지 선택 버튼 텍스트 스타일
const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: 600;
`;

// 선택한 이미지 표시 스타일
const SelectedImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-top: 16px;
  align-self: center;
`;