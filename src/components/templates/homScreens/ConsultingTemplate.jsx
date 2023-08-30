import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {Image , ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import ConsultingLabelGrid from '../../grid/ConsultingLabelGrid';

import { useState } from 'react';
import {consultingListData} from '../../../data/ConsultingData';
import ConsultBigBtn from '../../ui/buttonUi/ConsultBigBtn';
import { useRoute } from '@react-navigation/native';
import { getTrainersName } from '../../../api/homeApi';
function ConsultingTemplate(props) {
    const route = useRoute();
    const centerId = route.params?.centerId;
    const trainerId = route.params?.trainerId;
    const selectedName = route.params?.selectedName;

    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [trainerName, setTrainerName] = useState([]);
    const [selectTrainer, setSelectTrainer] = useState(selectedName);

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
          console.log('트레이너 이름',response, '트레이너 상태',trainerName)
        } catch (error) {
          console.error("Error fetching search", error);
          // 적절한 에러 처리 로직
        }
      };

      const selectTrainerNameBtn = (name) => {
        setSelectTrainer(name);
        setIsBoxOpen(false);
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
            <ConsultingLabelGrid consultingListData={consultingListData}/>

            {
                trainerId && <TrainerInfoContainer>
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
                                 <TouchableOpacity key={item.id} onPress={()=>selectTrainerNameBtn(item.name)}>
                                 <ListContainer>
                                     <ListText>{item.name}</ListText>
                                 </ListContainer>
                                 </TouchableOpacity>
                                 ))
                           } 
                         </>
                        )}
                        </SelectContainerBox>
                </TrainerInfoContainer>
            }

            <ConsultBigBtn>상담요청</ConsultBigBtn>
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

const TrainerInfoContainer = styled.View`
    margin-top: 20px;
    border-top-width: 1px;
    border-color: ${COLORS.gray_500};
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