import {
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import * as styles from './styles';
import {useEffect, useState} from 'react';
import {formatCommaNumber} from '../../../utils/CustomUtils';
import {useNavigation, useRoute} from '@react-navigation/native';
import {postReport, getReviewList} from '../../../api/storeApi';
import {ReviewDeclarationModal} from '../../../components/ui/modal/StoreReviewDeclaration';
import PhotoModal from '../../../components/ui/modal/PhotoModal';
import GobackBlackGrid from '../../../components/grid/GobackBlackGrid';

export default function ItemReviewScreen(id) {
  const productid = id.route.params;
  const pathid = id.route.params.path;

  const navigation = useNavigation();

  const [reviewData, setReview] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reviewid, seReveiwtId] = useState('');
  const windowHeight = Dimensions.get('window').height;

  const getStoreProductReviewList = async id => {
    try {
      const res = await getReviewList(id);
      console.log('res123123', res);
      if (res) {
        setReview(res.content);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (pathid) {
      getStoreProductReviewList(pathid);
    } else {
      getStoreProductReviewList(productid);
    }
  }, []);

  const MiddleStar = name => {
    const middleIndex = Math.floor(name.length / 2);
    let processedName = '';

    if (name.length <= 2) {
      return <Text>{name.slice(0, 1)}*</Text>;
    }

    if (name.length > 2) {
      processedName =
        name.length % 2 === 0
          ? name.slice(0, middleIndex - 1) + '**' + name.slice(middleIndex + 1)
          : name.slice(0, middleIndex) + '*' + name.slice(middleIndex + 1);
      return <Text>{processedName}</Text>;
    }
  };

  // 환불 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  const modalText = {
    title: '신고하기',
    content: '해당 리뷰를 신고하시겠습니까?',
    checkText: '신고하기',
    closeText: '취소',
  };

  const postDeclarationBtn = () => {
    reportPost();
  };

  const reportPost = async () => {
    try {
      const response = await postReport(reviewid);

      if (response) {
        console.log(response);
        setShowModal(false);
        Alert.alert('신고되었습니다');
        filteredData();
      } else {
        return;
      }
      // 화면으로 이동
    } catch (error) {
      console.error('err', error);
    }
  };

  const goBackScreens = () => {
    navigation.goBack();
  };

  const filteredData = () => {
    setReview(reviewData.filter(item => item.id !== reviewid));
  };

  return (
    <styles.Container>
      {showModal && (
        <ReviewDeclarationModal
          postDeclarationBtn={() => postDeclarationBtn()}
          closeModal={closeModal}
          text={modalText}
        />
      )}
      <styles.Header>
        <GobackBlackGrid onPress={goBackScreens}>리뷰보기</GobackBlackGrid>
      </styles.Header>
      <styles.Body>
        {reviewData.length > 0 ? (
          reviewData.map((review, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <styles.NameText>
                  {MiddleStar(review.memberName)}
                </styles.NameText>
                <styles.DateText>{review.createAt}</styles.DateText>
              </View>
              <styles.NameText>{review.context}</styles.NameText>
              {/* <View style={{flexDirection: 'row', marginTop: 26}}>
              {review.images &&
                review.images.map((img, index) => (
                  <styles.SelectedImage
                    key={index}
                    source={{uri: img}}></styles.SelectedImage>
                ))}
            </View> */}
              {review.images && <PhotoModal images={review?.images} />}

              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                  seReveiwtId(review.id);
                }}
                style={{marginVertical: 26}}>
                <styles.NameText>신고하기</styles.NameText>
              </TouchableOpacity>
              {review.comment && (
                <View>
                  <View style={{flexDirection: 'row', marginBottom: 16}}>
                    <Text>답변</Text>
                    <styles.DateText style={{marginLeft: 2, fontSize: 14}}>
                      1개
                    </styles.DateText>
                  </View>
                  <View>
                    <styles.AnswerArea>
                      <View style={{flexDirection: 'row', marginBottom: 12}}>
                        <Text style={{marginRight: 12}}>
                          {review.comment.name}
                        </Text>
                        <styles.DateText>
                          {review.comment.createAt}
                        </styles.DateText>
                      </View>
                      <styles.NameText>
                        {review.comment.context}
                      </styles.NameText>
                    </styles.AnswerArea>
                  </View>
                </View>
              )}
              <styles.Line></styles.Line>
            </View>
          ))
        ) : (
          <styles.NothingData windowHeight={windowHeight}>
            <Text>등록된 리뷰가 없습니다</Text>
          </styles.NothingData>
        )}
      </styles.Body>
    </styles.Container>
  );
}
