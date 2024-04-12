import {COLORS} from '../../../constants/color';
import {styled} from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {getFitAbleInquiryList, postReview} from '../../../api/storeApi';
import {useEffect, useState} from 'react';
import {formatReplaceString} from '../../../utils/CustomUtils';
import {useRoute} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import GobackBlackGrid from '../../../components/grid/GobackBlackGrid'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
;

function ProductWriteReviewTemplate(props) {
  const item = props.route.params.product;
  const orderProduct = props.route.params;

  const navigation = useNavigation();
  const route = useRoute();
  const [fitableInquiryList, setFitableInquiryList] = useState([]);
  const [inquiryText, setInquiryText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  // const deleteInquiryBtn = async id => {
  //   console.log('deleteInquiryBtn id:', id);
  //   try {
  //     const response = await deleteFitAbleInquiry(id);
  //     // console.log('deleteInquiryBtn response:', response)
  //     if (response) {
  //       setFitableInquiryList(
  //         fitableInquiryList.filter(item => item.id !== id),
  //       );
  //       Alert.alert('문의가 삭제되었습니다');
  //     }
  //   } catch (error) {
  //     console.error('deleteInquiryBtn error:', error.response.data);
  //   }
  // };

  // useEffect(() => {
  //   getFitAbleInquiryListData();
  // }, []);

  // console.log('item', orderProduct.orderProductId);
  const inquiryTextChange = text => {
    setInquiryText(text);
  };

  const openImagePicker = () => {
    if (selectedImages.length > 3) {
      Alert.alert('알림', '이미지는 최대 3개까지만 선택 가능합니다.');
      return;
    }

    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 3 - selectedImages.length,
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(images => {
        console.log(images);
        if (images.length > 3) {
          Alert.alert('알림', '이미지는 최대 3개까지만 선택 가능합니다.');
          return;
        }
        if (selectedImages.length > 0) {
          setSelectedImages(
            selectedImages.concat(images.map(image => image.path)),
          );
        } else {
          setSelectedImages(images.map(image => image.path));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (selectedImages.length > 3) {
      Alert.alert('알림', '이미지는 최대 3개까지만 선택 가능합니다.');
      const image = selectedImages.slice(0, 3);
      return setSelectedImages(image);
    }
  }, [selectedImages]);

  const removeImage = index => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handleRegistBtn = () => {
    const formData = new FormData();
    const requestDto = {
      orderProductId: orderProduct.orderProductId,

      context: inquiryText,
    };
    formData.append('requestDto', JSON.stringify(requestDto)),
      // const imageFile = { uri: '', type: 'image/jpeg', name: 'image.jpg' };
      // formData.append("images", imageFile);
      // 이미지 파일 추가
      selectedImages.forEach((image, index) => {
        // 이미지 파일 이름을 지정하여 FormData에 추가
        formData.append('images', {
          uri: image, // 이미지 파일 경로 또는 URL
          type: 'image/jpeg', // 이미지 타입 (예: image/jpeg)
          name: `image${index}.jpg`, // 이미지 파일 이름
        });
      });

    // console.log('formData1111', formData);
    postCenterInquiryData(formData);

    // console.log('등록하였습니다.',inquiryText);
  };

  const postCenterInquiryData = async data => {
    try {
      const response = await postReview(data);

      // console.log(response);
      Alert.alert('리뷰등록 완료', '리뷰가 등록되었습니다', [
        {text: '확인', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      console.error('Error getting:', error);
      Alert.alert('리뷰등록 실패', '리뷰 등록에 실패하였습니다.', [
        {text: '확인'},
      ]);
    }
  };
  const goBackScreens = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Header>
        <GobackBlackGrid onPress={goBackScreens}>리뷰 작성하기</GobackBlackGrid>
      </Header>
      <ScrollView style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TitleText>구매 상품</TitleText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomImage source={{uri: item.mainImage}}></CustomImage>
          <View style={{marginLeft: 10}}>
            <SubText>{item.brand}</SubText>

            <TitleText style={{fontWeight: 500, fontSize: 14, marginTop: 10}}>
              {item.name}
            </TitleText>
          </View>
        </View>
        <Line />
        <Body>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 28,
              marginTop: 10,
            }}>
            {selectedImages.length < 3 && (
              <ImageAddButton
                onPress={() => {
                  openImagePicker();
                }}>
                <PlusButtonText>+</PlusButtonText>
              </ImageAddButton>
            )}
            {selectedImages.length > 0 ? (
              <ImgContainer>
                {selectedImages.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{position: 'relative', marginRight: 10}}
                    onPress={() => {
                      removeImage(index);
                    }}>
                    <SelectedImage source={{uri: image}} />
                    <ImageStyle source={require('../../../assets/img/x.png')} />
                  </TouchableOpacity>
                ))}
              </ImgContainer>
            ) : null}
          </View>

          <View style={{marginVertical: 15}}>
            <TitleText>내용</TitleText>
            <KeyboardAwareScrollView>

            <InputContainer
              multiline={true}
              textAlignVertical="top"
              placeholder="최소 25자 이상 작성해주세요."
              onChangeText={inquiryTextChange}
              />
              </KeyboardAwareScrollView>
          </View>
        </Body>
      </ScrollView>
      <View>
        {inquiryText.length > 24 ? (
          <SubmitButton onPress={() => handleRegistBtn()}>
            <SubmitButtonText>등록하기</SubmitButtonText>
          </SubmitButton>
        ) : (
          <SubmitButton style={{backgroundColor: '#F6F6F6'}}>
            <SubmitButtonText style={{color: '#707070'}}>
              등록하기
            </SubmitButtonText>
          </SubmitButton>
        )}
      </View>
    </Container>
  );
}

export default ProductWriteReviewTemplate;

const Container = styled.View`
  flex: 1;

  background-color: ${COLORS.white};
  padding: 20px;
  /* align-items: center;
  justify-content: center; */
`;

export const Body = styled.View`
  height: 55%;
  /* align-items: center;
  justify-content: center; */
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 28px 0;
`;
const Header = styled.View`
  /* flex: 1; */
  /* height: 100%; */
  /* padding: 0 20px; */
  margin-bottom: 26px;
  background-color: ${COLORS.white};
`;
const InputContainer = styled.TextInput`
  width: 100%;
  height: 250px;
  background-color: ${COLORS.gray_100};
  border-radius: 13px;
  margin-top: 10px;
  margin-bottom: 16px;
  /* padding-left: 16px; */
  /* padding-top: 16px; */
  padding: 16px;

  /* color: ${COLORS.gray_400}; */
`;

const ImgContainer = styled.View`
  /* margin-top: 10px; */
  justify-content: center;

  flex-direction: row;
  flex-wrap: wrap;
  /* position: absolute; */
  /* flex:1; */
`;

const ImageAddButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 10px;
  margin-right: 10px;
  background-color: #1f1f1f;
  /* background: var(--sub, #1f1f1f); */
  /* margin: 40px 0 28px 0; */
  justify-content: center;
  align-items: center;
`;

const PlusButtonText = styled.Text`
  color: ${COLORS.main};

  font-size: 35px;
  font-weight: 200;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  border-radius: 90px;
  background-color: #1f1f1f;

  justify-content: center;
  align-items: center;
  margin: 20px 0;

  /* background: var(--sub, #1f1f1f); */
`;

const SubmitButtonText = styled.Text`
  color: ${COLORS.white};

  font-size: 16px;
  font-weight: 600;
`;
const SelectedImage = styled.Image`
  width: 60px;
  height: 60px;
  /* margin-right: 10px;
  margin-bottom: 10px; */
  border-radius: 10px;
`;
const CustomImage = styled(FastImage)`
  margin-top: 12px;
  /* width: 100%; */
  width: 80px;
  height: 80px;
  background-color: ${COLORS.gray_100};

  /* height: 1606px; */
  /* height: 100%; */
  border-radius: 13px;
  resize: horizontal;
`;

const ImageStyle = styled.Image`
  width: 11px;
  height: 11px;
  position: absolute;
  margin: 6px 0px 0 40px;

  /* justify-content: flex-end; */
  /* align-items: center; */
`;
const TextStyle = styled.Text`
  color: ${COLORS.gray_400};

  /* body 2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  /* line-height: 160%; 22.4px */
  letter-spacing: -0.35px;
`;

const TitleText = styled.Text`
  color: ${COLORS.sub};

  /* H2 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.4px;
`;

const SubText = styled.Text`
  color: ${COLORS.gray_400};

  /* H3 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;

  letter-spacing: -0.3px;
`;

const InquiryInfoText = styled.TouchableOpacity`
  color: ${COLORS.gray_400};

  /* H3 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  /* line-height: 160%; 19.2px */
  letter-spacing: -0.3px;
`;

const NothingData = styled.View`
  width: 100%;
  height: ${props => props.windowHeight / 2}px;

  align-items: center;
  justify-content: center;
`;
