import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function ShopTagGrid(props) {
    const shopTagData = [
        '#강남헬스',
        '#PT',
        '#필라테스',
        '#골프',
        '#선정릉역',
        '#신논현',
        '#시설 및 기구명',
        '#시설 및 기구명',
    ];

    return (
        <Container>
            <ShopTagItemContainer>
                {shopTagData.map((item, index) => {
                    return (
                        <ShopTagItem key={index}>
                            <ShopTagText>{item}</ShopTagText>
                        </ShopTagItem>
                    );
                })}
            </ShopTagItemContainer>
        </Container>
    );
}

export default ShopTagGrid;

const Container = styled.View`
  padding: 0 20px;
  margin-top: 30px;
  
  `;

const ShopTagItemContainer = styled.View`
width: 100%;
  flex-direction: row; 
  background-color: red;
`;

const ShopTagItem = styled.View`
  margin-right: 16px;

`;

const ShopTagText = styled.Text`
  font-size: 12px;
  font-weight: 400;
  line-height: 16.80px;
  color: ${COLORS.gray_300};
`;
