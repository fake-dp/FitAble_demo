import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';


function SelectCouponGrid(props) {
    return (
        <Container>
            <MainTitleText>쿠폰 선택</MainTitleText>
        </Container>
    );
}

export default SelectCouponGrid;

const Container = styled.View`
  padding: 0 20px;
`;

const MainTitleText = styled.Text`
  margin-top: 40px;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  color: ${COLORS.white};
`;