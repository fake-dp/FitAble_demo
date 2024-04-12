import {
  Alert,
  Dimensions,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as styles from './styles';
import {useEffect, useState} from 'react';
import {COLORS} from '../../../constants/color';
import {formatDate} from '../../../utils/CustomUtils';
import {
  getInquiryList,
  postInquiry,
  deleteInquiry,
  postFitableInquiry,
  deleteFitableInquiry,
} from '../../../api/storeApi';
import ImageViewer from 'react-native-image-zoom-viewer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import {ReviewDeclarationModal} from '../../../components/ui/modal/StoreReviewDeclaration';
import {useNavigation} from '@react-navigation/native';
import PhotoModal from '../../../components/ui/modal/PhotoModal';
import GobackBlackGrid from '../../../components/grid/GobackBlackGrid';

export default function ItemInquiryScreen(props) {
  const [currentPage, setCurrentPage] = useState('ItemInquiry');
  const navigation = useNavigation();

  console.log('props', props.route.params.path);
  const status = props.route.params.type;
  const id = props.route.params.id;

  useEffect(() => {
    if (props.route.params.path) {
      setCurrentPage('ItemInquiryList');
    }
  }, [props]);

  const goBackScreens = () => {
    navigation.goBack();
  };

  return (
    <styles.Container>
      <styles.Header>
        <GobackBlackGrid onPress={goBackScreens}>문의하기</GobackBlackGrid>
      </styles.Header>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('ItemInquiry');
          }}>
          <styles.TitleText
            style={[
              styles.title,
              currentPage === 'ItemInquiry'
                ? {color: COLORS.sub}
                : {color: COLORS.gray_300},
            ]}>
            문의 작성
          </styles.TitleText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 40}}
          onPress={() => {
            setCurrentPage('ItemInquiryList');
          }}>
          <styles.TitleText
            style={[
              styles.title,
              currentPage === 'ItemInquiryList'
                ? {color: COLORS.sub}
                : {color: COLORS.gray_300},
            ]}>
            문의 내역
          </styles.TitleText>
        </TouchableOpacity>
      </View>
      <styles.Line />
      {currentPage === 'ItemInquiry' ? (
        <WriteInquiry status={status} id={id} />
      ) : (
        <InquiryList inquiry={props.route.name} />
      )}
    </styles.Container>
  );
}

//문의 작성
const WriteInquiry = ({status, id}) => {
  const [inquiryText, setInquiryText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();

  console.log(selectedImages);
  const inquiryTextChange = text => {
    setInquiryText(text);
  };

  const handleRegistBtn = () => {
    const formData = new FormData();
    const requestDto = {
      type: status,
      id: id,
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
    if (status === 'fitableInquiry') {
      postFitableInquiryData(formData);
    } else {
      postCenterInquiryData(formData);
    }
  };

  const postFitableInquiryData = async data => {
    try {
      const response = await postFitableInquiry(data);

      console.log(response);
      Alert.alert('문의 완료', '문의가 등록되었습니다', [
        {text: '확인', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      console.error('Error getting:', error);
      Alert.alert('문의 실패', '문의 등록에 실패하였습니다.', [{text: '확인'}]);
    }
  };

  const postCenterInquiryData = async data => {
    try {
      const response = await postInquiry(data);

      console.log(response);
      Alert.alert('문의 완료', '문의가 등록되었습니다', [
        {text: '확인', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      console.error('Error getting:', error);
      Alert.alert('문의 실패', '문의 등록에 실패하였습니다.', [{text: '확인'}]);
    }
  };

  const changeKOR = () => {
    if (status === 'fitableInquiry') return '핏에이블 문의';
    if (status === 'PRODUCT') return '상품 문의';
    if (status === 'ORDER') return '주문 문의';
  };

  const removeImage = index => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
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

  console.log('...selectedImages', selectedImages);
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <styles.Text>문의 종류</styles.Text>
        <styles.Text>{changeKOR()}</styles.Text>
      </View>
      <styles.Body>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 28,
            marginTop: 30,
          }}>
          {selectedImages.length < 3 && (
            <styles.ImageAddButton
              onPress={() => {
                openImagePicker();
              }}>
              <styles.PlusButtonText>+</styles.PlusButtonText>
            </styles.ImageAddButton>
          )}
          {selectedImages.length > 0 ? (
            <styles.ImgContainer>
              {selectedImages.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={{position: 'relative', marginRight: 10}}
                  onPress={() => {
                    removeImage(index);
                  }}>
                  <styles.SelectedImage source={{uri: image}} />
                  <styles.ImageStyle
                    source={require('../../../assets/img/x.png')}
                  />
                </TouchableOpacity>
              ))}
            </styles.ImgContainer>
          ) : null}
        </View>

        <View>
          <styles.TitleText>내용</styles.TitleText>
          <KeyboardAwareScrollView>

          <styles.InputContainer
            multiline={true}
            textAlignVertical="top"
            placeholder="최소 25자 이상 작성해주세요."
            onChangeText={inquiryTextChange}
            />
            </KeyboardAwareScrollView>
        </View>
      </styles.Body>
      <View>
        {inquiryText.length > 24 ? (
          <styles.SubmitButton onPress={() => handleRegistBtn()}>
            <styles.SubmitButtonText>등록하기</styles.SubmitButtonText>
          </styles.SubmitButton>
        ) : (
          <styles.SubmitButton style={{backgroundColor: '#F6F6F6'}}>
            <styles.SubmitButtonText style={{color: '#707070'}}>
              등록하기
            </styles.SubmitButtonText>
          </styles.SubmitButton>
        )}
      </View>
    </View>
  );
};

//문의 내역
const InquiryList = inquiry => {
  console.log('inquiry', inquiry);
  const [status, setStatus] = useState('order');

  useEffect(() => {
    if (inquiry.inquiry === 'ItemInquiry') {
      setStatus('item');
    } else {
      setStatus('order');
    }
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 40,
        }}>
        <styles.Text>문의 종류</styles.Text>
        <View style={{flexDirection: 'row', marginLeft: 8}}>
          <styles.TapButton
            onPress={() => setStatus('order')}
            style={[
              styles.title,
              status === 'order'
                ? {backgroundColor: COLORS.sub}
                : {backgroundColor: COLORS.gray_100},
              ,
            ]}>
            <styles.ButtonText
              style={[
                styles.title,
                status === 'order'
                  ? {color: COLORS.white}
                  : {color: COLORS.sub},
                ,
              ]}>
              주문 문의
            </styles.ButtonText>
          </styles.TapButton>
          <styles.TapButton
            onPress={() => setStatus('item')}
            style={[
              styles.title,
              status === 'item'
                ? {backgroundColor: COLORS.sub}
                : {backgroundColor: COLORS.gray_100},
            ]}>
            <styles.ButtonText
              style={[
                styles.title,
                status === 'item' ? {color: COLORS.white} : {color: COLORS.sub},
                ,
              ]}>
              상품 문의
            </styles.ButtonText>
          </styles.TapButton>
          <styles.TapButton
            onPress={() => setStatus('fitable')}
            style={[
              styles.title,
              status === 'fitable'
                ? {backgroundColor: COLORS.sub}
                : {backgroundColor: COLORS.gray_100},
            ]}>
            <styles.ButtonText
              style={[
                styles.title,
                status === 'fitable'
                  ? {color: COLORS.white}
                  : {color: COLORS.sub},
                ,
              ]}>
              핏에이블 문의
            </styles.ButtonText>
          </styles.TapButton>
        </View>
      </View>
      <ScrollView
        style={{
          marginBottom: 150,
        }}>
        {status === 'order' && <OrderInquiry status={status} />}
        {status === 'item' && <ItemInquiry status={status} />}
        {status === 'fitable' && <FitableInquiry status={status} />}
      </ScrollView>
    </View>
  );
};

// ----------------------- //

//주문 문의
const OrderInquiry = ({status}) => {
  const [orderInquiry, setOrderInquiry] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');

  const getOrderInquiryList = async () => {
    try {
      const res = await getInquiryList('ORDER');
      console.log('res1', res);
      if (res) {
        setOrderInquiry(res.content);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (status === 'order') getOrderInquiryList();
  }, [status]);

  const closeModal = () => {
    setShowModal(false);
  };

  const modalText = {
    title: '삭제',
    content: '해당 문의를 삭제하시겠습니까?',
    checkText: '삭제하기',
    closeText: '취소',
  };

  const postDeclarationBtn = () => {
    delInquiry();
  };

  const delInquiry = async () => {
    try {
      const response = await deleteInquiry(id);

      if (response) {
        console.log(response);
        setShowModal(false);
        Alert.alert('삭제되었습니다');
        getOrderInquiryList();
      } else {
        return;
      }
      // 화면으로 이동
    } catch (error) {
      console.error('err', error);
    }
  };

  return (
    <View>
      {showModal && (
        <ReviewDeclarationModal
          postDeclarationBtn={() => postDeclarationBtn()}
          closeModal={closeModal}
          text={modalText}
        />
      )}
      {orderInquiry && orderInquiry.length === 0 && <NotionData />}

      {orderInquiry &&
        orderInquiry.map((inquiry, index) => (
          <View key={index}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <styles.InquiryText>Q. {inquiry.context}</styles.InquiryText>
              {inquiry.isComment ? (
                <Text>답변완료</Text>
              ) : (
                <Text>답변대기</Text>
              )}
            </View>
            {/* <View style={{flexDirection: 'row'}}>
              {inquiry.images &&
                inquiry.images.map((img, index) => (
                  // <TouchableOpacity
                  //   onPress={() => {
                  //     console.log('image clicked!');
                  //   }}>
                  <styles.CustomImage
                    key={index}
                    style={{marginEnd: 10}}
                    source={{uri: img}}
                  />
                  // </TouchableOpacity>
                ))}
            </View> */}
            {inquiry.images && <PhotoModal images={inquiry?.images} />}

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 40,
                marginTop: 16,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <styles.InquiryInfoText>
                  {inquiry.member} |{' '}
                </styles.InquiryInfoText>
                <styles.InquiryInfoText>
                  주문번호 {inquiry.code} |{' '}
                </styles.InquiryInfoText>
                <styles.InquiryInfoText>
                  {formatDate(inquiry.createAt)}
                </styles.InquiryInfoText>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                  setId(inquiry.id);
                }}>
                <styles.InquiryInfoText
                  style={{textDecorationLine: 'underline'}}>
                  삭제
                </styles.InquiryInfoText>
              </TouchableOpacity>
            </View>
            {inquiry.isComment && (
              <View>
                <Text>A.{inquiry.comment.context}</Text>
                <View style={{flexDirection: 'row', marginTop: 12}}>
                  <styles.InquiryInfoText>
                    {inquiry.comment.name} |
                  </styles.InquiryInfoText>
                  <styles.InquiryInfoText>
                    {formatDate(inquiry.comment.createAt)}
                  </styles.InquiryInfoText>
                </View>
              </View>
            )}
            <styles.Line />
          </View>
        ))}
    </View>
  );
};

//상품 문의
const ItemInquiry = ({status}) => {
  const [inquiry, setInquiry] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log(isViewerVisible);
  const getItemInquiryList = async () => {
    try {
      const res = await getInquiryList('PRODUCT');
      console.log('res12', res);
      if (res) {
        setInquiry(res.content);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (status === 'item') getItemInquiryList();
  }, [status, showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  const modalText = {
    title: '삭제',
    content: '해당 문의를 삭제하시겠습니까?',
    checkText: '삭제하기',
    closeText: '취소',
  };

  const postDeclarationBtn = () => {
    delInquiry();
  };

  const delInquiry = async () => {
    try {
      const response = await deleteInquiry(id);

      if (response) {
        console.log(response);
        setShowModal(false);
        Alert.alert('삭제되었습니다');
        getItemInquiryList();
      } else {
        return;
      }
      // 화면으로 이동
    } catch (error) {
      console.error('err', error);
    }
  };

  return (
    <View>
      {showModal && (
        <ReviewDeclarationModal
          postDeclarationBtn={() => postDeclarationBtn()}
          closeModal={closeModal}
          text={modalText}
        />
      )}
      {inquiry && inquiry.length === 0 && <NotionData />}
      {inquiry &&
        inquiry.map((inquiry, index) => (
          <View key={index}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <styles.InquiryText>Q. {inquiry.context}</styles.InquiryText>
              {inquiry.isComment ? (
                <Text>답변완료</Text>
              ) : (
                <Text>답변대기</Text>
              )}
            </View>
            {inquiry.images && <PhotoModal images={inquiry?.images} />}
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 40,
                marginTop: 16,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <styles.InquiryInfoText>
                  {inquiry.member} |{' '}
                </styles.InquiryInfoText>
                <styles.InquiryInfoText>
                  상품번호 {inquiry.code} |{' '}
                </styles.InquiryInfoText>
                <styles.InquiryInfoText>
                  {formatDate(inquiry.createAt)}
                </styles.InquiryInfoText>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                  setId(inquiry.id);
                }}>
                <styles.InquiryInfoText
                  style={{textDecorationLine: 'underline'}}>
                  삭제
                </styles.InquiryInfoText>
              </TouchableOpacity>
            </View>
            {inquiry.isComment && (
              <View>
                <Text>A.{inquiry.comment.context}</Text>
                <View style={{flexDirection: 'row', marginTop: 12}}>
                  <styles.InquiryInfoText>
                    {inquiry.comment.name} |
                  </styles.InquiryInfoText>
                  <styles.InquiryInfoText>
                    {formatDate(inquiry.comment.createAt)}
                  </styles.InquiryInfoText>
                </View>
              </View>
            )}
            <styles.Line></styles.Line>
          </View>
        ))}
    </View>
  );
};

//핏에이블 문의
const FitableInquiry = ({status}) => {
  const [inquiry, setInquiry] = useState('');
  const windowHeight = Dimensions.get('window').height;
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');

  const getFitableInquiryList = async () => {
    try {
      const res = await getInquiryList('FITABLE');
      console.log('res123', res);
      if (res) {
        setInquiry(res.content);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log(inquiry);
  useEffect(() => {
    if (status === 'fitable') getFitableInquiryList();
  }, [status]);

  const closeModal = () => {
    setShowModal(false);
  };

  const modalText = {
    title: '삭제',
    content: '해당 문의를 삭제하시겠습니까?',
    checkText: '삭제하기',
    closeText: '취소',
  };

  const postDeclarationBtn = () => {
    delInquiry();
  };

  const delInquiry = async () => {
    try {
      const response = await deleteFitableInquiry(id);

      if (response) {
        console.log(response);
        setShowModal(false);
        Alert.alert('삭제되었습니다');
        getFitableInquiryList();
      } else {
        return;
      }
      // 화면으로 이동
    } catch (error) {
      console.error('err', error);
    }
  };

  return (
    <View>
      {showModal && (
        <ReviewDeclarationModal
          postDeclarationBtn={() => postDeclarationBtn()}
          closeModal={closeModal}
          text={modalText}
        />
      )}
      {inquiry && inquiry.length === 0 && <NotionData />}

      {inquiry &&
        inquiry.map((inquiry, index) => (
          <View key={index}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <styles.InquiryText>Q. {inquiry.context}</styles.InquiryText>
              {inquiry.isComment ? (
                <Text>답변완료</Text>
              ) : (
                <Text>답변대기</Text>
              )}
            </View>
            {/* {inquiry.images &&
              inquiry.images.map((img, index) => (
                <View key={index}>
                  <styles.CustomImage source={img} />
                </View>
              ))} */}
            {inquiry.images && <PhotoModal images={inquiry?.images} />}

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 40,
                marginTop: 16,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <styles.InquiryInfoText>
                  {inquiry.member} |{' '}
                </styles.InquiryInfoText>

                <styles.InquiryInfoText>
                  {formatDate(inquiry.createAt)}
                </styles.InquiryInfoText>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                  setId(inquiry.id);
                }}>
                <styles.InquiryInfoText
                  style={{textDecorationLine: 'underline'}}>
                  삭제
                </styles.InquiryInfoText>
              </TouchableOpacity>
            </View>
            {inquiry.isComment && (
              <View>
                <Text>A.{inquiry.comment.context}</Text>
                <View style={{flexDirection: 'row', marginTop: 12}}>
                  <styles.InquiryInfoText>
                    {inquiry.comment.name} |
                  </styles.InquiryInfoText>
                  <styles.InquiryInfoText>
                    {formatDate(inquiry.comment.createAt)}
                  </styles.InquiryInfoText>
                </View>
              </View>
            )}
            <styles.Line></styles.Line>
          </View>
        ))}
    </View>
  );
};

const NotionData = () => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <styles.NothingData windowHeight={windowHeight}>
      <Text>등록된 문의가 없습니다</Text>
    </styles.NothingData>
  );
};
