import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {TextInput , ScrollView, TouchableOpacity, Platform,Keyboard} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import ConsultingLabelGrid from '../../grid/ConsultingLabelGrid';
import { useState, useEffect ,useRef} from 'react';
import ConsultBigBtn from '../../ui/buttonUi/ConsultBigBtn';
import { useRoute } from '@react-navigation/native';
import { getTrainersName,postConsulting } from '../../../api/homeApi';
import { Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView }from 'react-native-keyboard-aware-scroll-view';

function ConsultingTemplate(props) {
    const route = useRoute();
    const centerId = route.params?.centerId;
    const trainerId = route.params?.trainerId;
    const selectedName = route.params?.selectedName;

    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [trainerName, setTrainerName] = useState([]);
    const [selectTrainer, setSelectTrainer] = useState(selectedName);
    const [selectTrainerId, setSelectTrainerId] = useState(trainerId);
    // tag post 요청 상태 데이터
  const [selectPurposeTags, setSelectPurposeTags] = useState([]);
  const [selectTimeTags, setSelectTimeTags] = useState([]);
  const [selectPromotionTags, setSelectPromotionTags] = useState([]);
  const [writeCoution, setWriteCoution] = useState('');
const [isTextValid, setIsTextValid] = useState(false); 


const [isFocused, setIsFocused] = useState(false);
const scrollViewRef = useRef();
const inputRef = useRef();
const handleFocus = () => {
  // 스크롤뷰의 현재 위치로 스크롤
  scrollViewRef.current.scrollTo({ y: 200, animated: true });
};
const handleBlur = () => setIsFocused(false);

    const [postTagData, setPostTagData] = useState({
        centerId: centerId,
        trainerId: selectTrainerId,
        purpose: selectPurposeTags,
        time: selectTimeTags,
        promotion: selectPromotionTags,
        caution: writeCoution,
    });

    useEffect(() => {

        if(trainerId){
            console.log('트레이너 아이디',trainerId)
                  //  if (postTagData.purpose !== selectPurposeTags || postTagData.time !== selectTimeTags || postTagData.promotion !== selectPromotionTags) {
            setPostTagData({
                centerId: centerId,
                trainerId: selectTrainerId,
                purpose: selectPurposeTags,
                time: selectTimeTags,
                promotion: selectPromotionTags,
                caution: writeCoution,
            });
        // }
        }else{
            console.log('트레이너 아이디 없음')
                  //  if (postTagData.purpose !== selectPurposeTags || postTagData.time !== selectTimeTags || postTagData.promotion !== selectPromotionTags) {
            setPostTagData({
                centerId: centerId,
                purpose: selectPurposeTags,
                time: selectTimeTags,
                promotion: selectPromotionTags,
                caution: writeCoution,
            });
        // }
        }
       }, [selectPurposeTags, selectTimeTags, selectPromotionTags, centerId, trainerId,writeCoution]);

    console.log('postTagData',postTagData)

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };
    
    const getTrainersNameData = async (centerId) => {
        setIsBoxOpen((prev) => !prev);
        try {
          // console.log('id', id)
          const response = await getTrainersName(centerId);
          setTrainerName(response);
        //   console.log('트레이너 이름',response, '트레이너 상태',trainerName)
        } catch (error) {
          console.error("Error fetching search", error);
          // 적절한 에러 처리 로직
        }
      };


      const selectTrainerNameBtn = (name,id) => {
        setSelectTrainer(name);
        setSelectTrainerId(id)
        setIsBoxOpen(false);
        };

    const postConsultingBtn = async (postTagData) => {
        console.log('요청 버튼 클릭')
        if(
            selectPurposeTags.length === 0 ||
            selectTimeTags.length === 0 ||
            selectPromotionTags.length === 0
        ){
            Alert.alert('모든 항목을 선택해주세요. ', '', [{ text: '확인'}]);
            return;
        }else{
            try{
                const response = await postConsulting(postTagData);
                if(response){
                    console.log('상담요청 완료',response)
                    Alert.alert('상담요청이 완료되었습니다.', '', [{ text: '확인', onPress: () => navigation.goBack()  }]);
                  }
            }catch(error){
                console.error("Error fetching search", error);
            }
        }
    };

      const handleTextInputChange = (text) => {
        console.log('text',text)
        setWriteCoution(text);
      };

      const handleTextInputSubmit = (text) => {
        // 만약 writeCoution 값이 10자 이상이면 isTextValid 상태를 true로 변경
        if (text.length <= 50) {
            setIsTextValid(true);
        } else {
            setIsTextValid(false);
            Alert.alert('50글자 내외로 작성해주세요. ', '', [{ text: '확인', onPress:()=>setWriteCoution('')}]);
        }
    };
    console.log('writeCoution',writeCoution)
      const downIcon = require('../../../assets/img/upcoupon.png');
      const upIcon = require('../../../assets/img/downcoupon.png');

      const ScrollViewComponent = Platform.OS === 'ios' ? KeyboardAwareScrollView : ScrollView;

    return (
      // <KeyboardAwareScrollView 
      // enableOnAndroid={true}
      // showsVerticalScrollIndicator={false} // 스크롤 바 제거
      // bounces={false} 
      // extraScrollHeight={100}>
      <ScrollViewComponent
      bounces={false}
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      {...(Platform.OS === 'ios' && { enableOnAndroid: true, extraScrollHeight: 50 })}
  >
  


        <Container>
            <ScrollView
              bounces={false}
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              overScrollMode="never">
            <GobackGrid onPress={goBackScreens}>상담하기</GobackGrid>
            <ConsultingLabelGrid 
            selectPurposeTags={selectPurposeTags} 
            setSelectPurposeTags={setSelectPurposeTags}
            selectTimeTags={selectTimeTags} 
            setSelectTimeTags={setSelectTimeTags}
            selectPromotionTags={selectPromotionTags}
            setSelectPromotionTags={setSelectPromotionTags}
            />
            <InfoContainer>
                <Title>질병 및 유의사항</Title>
                <CoutionContainer focus={isFocused}>
                    <ConsultInputText
                    placeholder="질병 및 유의사항이 있다면 적어주세요" 
                    ref={inputRef}
                    maxLength={50}
                    onChangeText={handleTextInputChange}
                    onSubmitEditing={(e) => handleTextInputSubmit(e.nativeEvent.text)}
                    style={{marginLeft: 16, fontSize: 14, marginRight: 16, color: COLORS.white, fontWeight: '500'}}
                    onBlur={handleBlur}
                    value={writeCoution}
                    />
                </CoutionContainer>
            </InfoContainer>
            <Line></Line>
            {
                trainerId && <InfoContainer>
                    <Title>트레이너</Title>
                    <SelectContainerBox>
                    <SelectTrainerContainer>
                        <TouchableOpacity>
                          <SelectText>{selectTrainer}</SelectText>
                        </TouchableOpacity>
                        {
                             (
                                <TouchableOpacity onPress={()=>getTrainersNameData(centerId)} activeOpacity={0.8}>
                                <SelectCouponImg 
                                isProp={isBoxOpen}
                                resizeMode={FastImage.resizeMode.contain}
                                source={isBoxOpen ? upIcon : downIcon} />
                              </TouchableOpacity>
                            )
                        }
                        </SelectTrainerContainer>
                         { isBoxOpen && (
                           <>
                           {
                             trainerName && trainerName.map((item) => (
                                 <TouchableOpacity key={item.id} onPress={()=>selectTrainerNameBtn(item.name, item.id)}>
                                 <ListContainer>
                                     <ListText>{item.name}</ListText>
                                 </ListContainer>
                                 </TouchableOpacity>
                                 ))
                           } 
                         </>
                        )}
                        </SelectContainerBox>
                </InfoContainer>
            }

            <ConsultBigBtn
            // isActived={true}
                isActived={
                    selectPurposeTags.length > 0 &&
                    selectTimeTags.length > 0 &&
                    selectPromotionTags.length > 0
                }
                onPress={()=>postConsultingBtn(postTagData)}
            >상담요청</ConsultBigBtn>
            </ScrollView>
        </Container>
         </ScrollViewComponent>
    );
}

export default ConsultingTemplate;

const Container = styled.View`
     flex: 1;
    padding: 0 20px;
    background-color: ${ COLORS.sub };
`

const InfoContainer = styled.View`
    margin-top: 20px;
`

const Title = styled.Text`
    margin-top: 20px;
  font-size: 20px;
  color: ${COLORS.white};
  font-weight: 700;
  line-height: 30px;
`;


const SelectContainerBox = styled.View`
  margin-top: 10px;
  background-color: ${COLORS.box};
  border-radius: 13px;
`;
const SelectTrainerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 16px;
  background-color: ${COLORS.box};
  border-radius: 13px;
  justify-content: space-between;
`;

const SelectCouponImg = styled(FastImage)`
  width: 22px;
  height: 22px;
`;

const SelectText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22.40px;
  color: ${COLORS.gray_300};
  margin-left: 8px;
`;


const ListContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 16px;
  background-color: ${COLORS.box};
  border-radius: 13px;
  /* justify-content: center; */
  margin-left: 8px;
`;

const ListText = styled.Text`
    font-size: 14px;
color: ${COLORS.gray_100};
font-weight: 400;
line-height: 22.40px;
`

const CoutionContainer = styled.View`
    margin-top: 20px;
    background-color: ${COLORS.box};
    flex-direction: row;
    border-radius: 13px;
    height: 50px;
    align-items: center;
    margin-bottom: 20px;
`

const Line = styled.View`
    background-color: ${COLORS.gray_300};
    border-bottom-width : 1px;
    border-color: ${COLORS.gray_500};
    margin-top: 20px;
`

const ConsultInputText = styled(TextInput).attrs(() => ({
  placeholderTextColor: COLORS.gray_300,
}))`
  flex: 1;
  color: ${COLORS.white};
  font-size: 14px;
  font-weight: 500;
  /* line-height: 22.40px; */
`;