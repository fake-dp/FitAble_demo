import {Image ,View, TouchableOpacity, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function PtUserListGrid({handleUserClick,ptData,trainersData}) {

    const detailPtTrainer = (id) => {
        handleUserClick(id);
    }


    return (
        <Container>
             <SubTextContainer>
            <SubText>{ptData.description}</SubText>
 
            </SubTextContainer>
            <MainTitleText>트레이너</MainTitleText>
            <ScrollView>
            {
                trainersData.content.map((ptUser) => (
                    <TouchableOpacity key={ptUser.id} onPress={() => detailPtTrainer(ptUser.id)}>
                    <PtUserContainer>
                        <PtUserImageContainer>
                        <PtUserImage source={ptUser.image ? {uri: ptUser.image} : require('../../assets/img/user1.png')} resizeMode="cover"/>
                        </PtUserImageContainer>
                        <PtUserTimeContainer>
                            <PtUserName>{ptUser.name}</PtUserName>
                            <PtTimeText>수업 가능 시간</PtTimeText>
                            {
                                ptUser.times.map((time) => (
                                    <PtUserTimeText key={time.id}>{time.type} {time.startTime} : {time.endTime}</PtUserTimeText>
                                ))
                            }
                        </PtUserTimeContainer>
                    </PtUserContainer>
                    </TouchableOpacity>
                ))
            }
            </ScrollView>
        </Container>
    );
}

export default PtUserListGrid;

const Container = styled.View`
 padding: 0 20px;
`

const SubTextContainer = styled.View`
    margin-top:28px;
`

const SubText = styled.Text`
    font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_300};
`

const MainTitleText = styled.Text`
margin-top: 40px;
font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
`

const PtUserContainer = styled.View`
    flex-direction: row;
    margin-top: 20px;
`

const PtUserImageContainer = styled.View`
    border-radius: 15px;
    background-color: ${COLORS.gray_500};
`

const PtUserImage = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 15px;
`

const PtUserName = styled.Text`
    font-size: 16px;
    font-weight: 700;
    line-height: 22.40px;
    color: ${COLORS.white};

`

const PtTimeText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_300};
`

const PtUserTimeContainer = styled.View`
    margin-left: 12px;
`

const PtUserTimeText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.gray_300};

`

