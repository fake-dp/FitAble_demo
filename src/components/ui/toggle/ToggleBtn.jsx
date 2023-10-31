import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';

function ToggleBtn({ isActive, toggleActive }) {

  console.log('isActive',isActive)

    const handleToggle = () => {
        if (toggleActive) {
            toggleActive();
        }
    };

    return (
        <ToggleContainer isActive={isActive} onPress={handleToggle}>
            <ToggleBall isActive={isActive} />
        </ToggleContainer>
    );
}

export default ToggleBtn;

const ToggleContainer = styled.TouchableOpacity`
  width: 50px;
  height: 30px;
  background-color: ${(props) => (props.isActive ? '#1F1F1F' : COLORS.gray_200)};
  border-radius: 34px;
  justify-content: center;
  align-items: ${(props) => (props.isActive ? 'flex-end' : 'flex-start')};
  padding: 3px;
`;

const ToggleBall = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${COLORS.white};
`;
