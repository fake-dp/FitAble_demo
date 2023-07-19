import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { View , Text} from 'react-native';
import {bellList} from '../../../data/BellTestData'
import { FlatList } from 'react-native';
import BellList from '../../ui/list/BellList';



function BellTemplate(props) {

    console.log(bellList)

    return (
        <Container>
        <FlatList
             bounces={false}
         
             showsVerticalScrollIndicator={false}
             overScrollMode="never"

            data={bellList}
            renderItem={({ item }) => <BellList data={item.data} maindate={item.maindate} />}
            keyExtractor={(item) => item.id}
        />
        </Container>
    );
}

export default BellTemplate;

const Container = styled.View`
    flex:1;
    padding: 10px;
    background-color: ${COLORS.sub};
`