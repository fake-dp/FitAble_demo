import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useFocusEffect, useNavigation,useRoute } from '@react-navigation/native';
import MyBtn from '../../ui/buttonUi/MyBtn';
import { useState, useEffect } from 'react';
import { Alert,TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import {postInquiry,postFitAbleInquiry} from '../../../api/mypageApi';
import { useRecoilState } from 'recoil';
import { inquiryListState ,myinfoState} from '../../../store/atom';
import { formatDate } from '../../../utils/CustomUtils';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image'

function FitableQnATemplate(props) {
    const navigation = useNavigation();
    const route = useRoute();
    console.log('route.params', route.params?.centerId)

    const centerInquiryText = route.params?.text;
    const centerInquiryId = route.params?.centerId;
    console.log('centerInquiryText',centerInquiryText,centerInquiryId)
    const [inquiryText, setInquiryText] = useState('');
    const [inquiryList, setInquiryList] = useRecoilState(inquiryListState);
    const [myInfo, setMyInfo] = useRecoilState(myinfoState);
    // const [selectedImage, setSelectedImage] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]); 
    // console.log('inquiryList',inquiryList,selectedImages)
           

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                setInquiryText('');
                setSelectedImages([]);
            };
        }, [])
    );


    const inquiryTextChange = (text) => {
        setInquiryText(text);
        console.log('inquiryText',inquiryText)
    };
    const goBackScreens = () => {
        if(inquiryText.length > 0 || selectedImages.length > 0){
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
            // console.error('Error getting:123', error);
            Alert.alert(
                "문의 실패",
                "문의 등록에 실패하였습니다.",
                [{text:'확인'}]
                );
        }
    };

    const fitableInquiryData = async (data) => {
        console.log('datadata',data)
        try {
            const response = await postFitAbleInquiry(data);
            // console.log('응답성공',response)
         
            if(response){
                setInquiryText('')
            Alert.alert(
                "문의 완료",
                "문의가 등록되었습니다",

                [{text:'확인', onPress: () => handleAnswerListBtn()}]
                );
            }
            
        } catch (error) {
            // console.error('Error getting:22', error.response.data);
            Alert.alert(
                "문의 실패",
                "문의 등록에 실패하였습니다.",
                [{text:'확인'}]
                );
        }
    };



const handleCenterRegisterBtn = (centerInquiryId, inquiryText) => {
    // console.log('centerInquiryId, inquiryText',centerInquiryId, inquiryText,centerInquiryText)
    if(centerInquiryText){
        const data = {
            centerId: centerInquiryId,
            context: inquiryText
        }
        // console.log('data',data)
        if(inquiryText.length < 10){
            Alert.alert(
                "문의 실패",
                "문의 내용을 10자 이상 입력해주세요.",
                [{text:'확인'}]
                );
        }else{
            postCenterInquiryData(data);
        }
    }
}

const handleFitableRegisterBtn = (inquiryText) => {
    const formData = new FormData();
    const requestDto = {
        context: inquiryText
    };
    formData.append("requestDto", JSON.stringify(requestDto));
    // const imageFile = { uri: '', type: 'image/jpeg', name: 'image.jpg' };
    // formData.append("images", imageFile);
        // 이미지 파일 추가
    selectedImages.forEach((image, index) => {
    // 이미지 파일 이름을 지정하여 FormData에 추가
    formData.append('images', {
        uri: image, // 이미지 파일 경로 또는 URL
        type: 'image/jpeg', // 이미지 타입 (예: image/jpeg)
        name: `image${index}.jpg` // 이미지 파일 이름
    });
});
     
    console.log('formData1111',formData)
    fitableInquiryData(formData);
}

    // const handleRegistBtn = (centerInquiryId, inquiryText) => {
    //     console.log('centerInquiryId, inquiryText',centerInquiryId, inquiryText)
    //     if(centerInquiryText){
    //         const data = {
    //             centerId: centerInquiryId,
    //             context: inquiryText
    //         }
    //         postCenterInquiryData(data);
    //     }else{
    //         const formData = new FormData();
    //         const requestDto = {
    //             context: inquiryText
    //         };
    //         formData.append("requestDto", JSON.stringify(requestDto));
    //         // const imageFile = { uri: '', type: 'image/jpeg', name: 'image.jpg' };
    //         // formData.append("images", imageFile);
    //             // 이미지 파일 추가
    //         selectedImages.forEach((image, index) => {
    //         // 이미지 파일 이름을 지정하여 FormData에 추가
    //         formData.append('images', {
    //             uri: image, // 이미지 파일 경로 또는 URL
    //             type: 'image/jpeg', // 이미지 타입 (예: image/jpeg)
    //             name: `image${index}.jpg` // 이미지 파일 이름
    //         });
    //     });
             
    //         console.log('formData1111',formData)
    //         fitableInquiryData(formData);
      
    //     }
    //     // console.log('등록하였습니다.',inquiryText);
    // };

    const handleAnswerListBtn = () => {
        navigation.navigate('ProductQnA');
    }
 
    const openImagePicker = () => {

        // if (selectedImages.length >= 3) {
        //     Alert.alert("알림", "이미지는 최대 3개까지만 선택 가능합니다.");
        //     return;
        // }

      ImagePicker.openPicker({
        multiple: true, 
        maxFiles: 3, 
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
        compressImageMaxWidth: 750,
        compressImageMaxHeight: 750,
      })
        .then(images => {
          console.log(images);
          setSelectedImages(images.map(image => image.path));
        })
        // .then(newImages => {
        //     console.log(newImages);
        //     // 새 이미지들을 기존 이미지 배열에 추가
        //     const updatedImages = [...selectedImages, ...newImages.map(image => image.path)];
        //     setSelectedImages(updatedImages);
        // })
        
        .catch(error => {
          console.log(error);
        });
    };

    const plusbtn = require('../../../assets/img/plusbtn.png');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>

            <GobackBlackGrid onPress={goBackScreens}>
            {
                centerInquiryText && centerInquiryId ? '센터 문의':'핏에이블 문의'
            }
            </GobackBlackGrid>
            <KeyboardAwareScrollView>
           
            {
                centerInquiryText && centerInquiryId ? null : (
                    <>
                    <PlusBtnContainer>
                        <PlusBtnBox onPress={openImagePicker}>
                            <PlusBtn source={plusbtn} />
                        </PlusBtnBox>
                    </PlusBtnContainer>
                 
                    {
                selectedImages.length > 0 ? (
                    <ImgContainer>
                   
                            {
                                selectedImages.map((image, index) => (
                                    <SelectedImage 
                                    
                                    key={index} source={{ uri: image }} />
                                    ))
                                }
                        </ImgContainer>
                ):(null)
            }
          
                    </>
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
                    maxLength={1000}
                    // 리턴
                    // returnKeyType="done"
                />
            </TextInputWrapper>
            {
                centerInquiryText && centerInquiryId ? null : (
                    <TextContainerBtn onPress={handleAnswerListBtn}>
                        <ChangeText>문의 내역 확인</ChangeText>
                    </TextContainerBtn>
                )
            }
       
         
                </KeyboardAwareScrollView>
                {
                    centerInquiryText && centerInquiryId ? (
                         <MyBtn onPress={()=>handleCenterRegisterBtn(centerInquiryId, inquiryText)}>등록하기</MyBtn>
                    ):(
                        <MyBtn onPress={()=>handleFitableRegisterBtn(inquiryText)}>등록하기</MyBtn>
                    )
                }
        </Container>
            </TouchableWithoutFeedback>
    );
}

export default FitableQnATemplate;

const Container = styled.View`
    flex: 1;
    padding: 0 20px;
    background-color: ${COLORS.white};
    position: relative;
`;

const PlusBtnContainer = styled.View`
margin-top: 36px;
flex-direction: row;
`

const ImgContainer = styled.View`
margin-top: 16px;
flex-direction: row;
flex-wrap: wrap;
/* flex:1; */
`
const SelectedImage = styled.Image`
  width: 80px;
  height: 80px;
  margin-right: 10px;
    margin-bottom: 10px;
  border-radius: 10px;
`;
const PlusBtnBox = styled.TouchableHighlight`
    background-color: ${COLORS.sub};
    align-items: center;
    justify-content: center;
    padding: 18px;
    border-radius: 10px;
    width: 70px;
    height: 70px;
    margin-right: 10px;
`

const PlusBtn = styled(FastImage)`
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

