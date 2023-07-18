import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import HomeInnerNavi from './HomeInnerNavi';

function HomeScreen({navigation}) {

 

    return (
      <HomeInnerNavi 
      navigation={navigation}
      />
    );
}

export default HomeScreen;

