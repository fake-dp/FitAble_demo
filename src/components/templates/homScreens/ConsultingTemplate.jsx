import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {Image , ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import ConsultingLabelGrid from '../../grid/ConsultingLabelGrid';

import { useState, useEffect } from 'react';
import ConsultBigBtn from '../../ui/buttonUi/ConsultBigBtn';
import { useRoute } from '@react-navigation/native';
import { getTrainersName,postConsulting } from '../../../api/homeApi';
import { Alert } from 'react-native';
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

    const [postTagData, setPostTagData] = useState({
        centerId: centerId,
        trainerId: selectTrainerId,
        purpose: selectPurposeTags,
        time: selectTimeTags,
        promotion: selectPromotionTags,
    });

    useEffect(() => {

        if(trainerId){
            console.log('트레이너 아이디',trainerId)
                   if (postTagData.purpose !== selectPurposeTags || postTagData.time !== selectTimeTags || postTagData.promotion !== selectPromotionTags) {
            setPostTagData({
                centerId: centerId,
                trainerId: selectTrainerId,
                purpose: selectPurposeTags,
                time: selectTimeTags,
                promotion: selectPromotionTags,
            });
        }
        }else{
            console.log('트레이너 아이디 없음')
                   if (postTagData.purpose !== selectPurposeTags || postTagData.time !== selectTimeTags || postTagData.promotion !== selectPromotionTags) {
            setPostTagData({
                centerId: centerId,
                purpose: selectPurposeTags,
                time: selectTimeTags,
                promotion: selectPromotionTags,
            });
        }
        }
       }, [selectPurposeTags, selectTimeTags, selectPromotionTags, centerId, trainerId]);

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

    const postConsultingBtn = async () => {
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
                console.log('상담요청',response)
                Alert.alert('상담요청이 완료되었습니다.', '', [{ text: '확인', onPress: () => navigation.goBack()  }]);
            }catch(error){
                console.error("Error fetching search", error);
            }
        }
    };

      const downIcon = require('../../../assets/img/downcoupon.png');
      const upIcon = require('../../../assets/img/upcoupon.png');


    return (
        <Container>
            <ScrollView
              bounces={false}
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
            </InfoContainer>
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
                                <SelectCouponImg source={isBoxOpen ? upIcon : downIcon} />
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
                isActived={
                    selectPurposeTags.length > 0 &&
                    selectTimeTags.length > 0 &&
                    selectPromotionTags.length > 0
                }
                onPress={postConsultingBtn}
            >상담요청</ConsultBigBtn>
            </ScrollView>
        </Container>
    );
}

export default ConsultingTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.sub};
`

const InfoContainer = styled.View`
    margin-top: 20px;
    /* border-top-width: 1px; */
    /* border-color: ${COLORS.gray_500}; */
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

const SelectCouponImg = styled.Image``;

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