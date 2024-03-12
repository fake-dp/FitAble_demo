import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";
import ConsultInput from '../inputUi/ConsultInput';

function ConsultLabel({  tag, selected, onPress, isCustomTagActive, customTag, setCustomTag, submitCustomTag }) {

  const [showTextInput, setShowTextInput] = useState(false);

  const handleTagClick = () => {
    if (tag === "기타") {
      setShowTextInput((prevShowTextInput) => !prevShowTextInput);
      onPress(tag);
    } else {
      onPress(tag);
    }
  };


    return (
      <>
          <TouchableOpacity onPress={handleTagClick}>
          <Container selected={selected || (tag === "기타" && isCustomTagActive)}>
                    <TagTitle selected={selected || (tag === "기타" && isCustomTagActive)}>{tag}</TagTitle>
              </Container>
          </TouchableOpacity>
          {isCustomTagActive && (
              <ConsultInput
                  value={customTag}
                  onChangeText={setCustomTag}
                  onEndEditing={submitCustomTag}
                  placeholder="기타 사항 입력"
              />
          )}
      </>
  );
}

export default ConsultLabel;

const Container = styled.View`
  margin-bottom: 10px;
  padding: ${Platform.OS === 'ios' ? '8px 12px' : '4px 10px'};
  background-color: ${({ selected }) =>
    selected ? COLORS.box : COLORS.box_two};
  border-radius: 80px;
  margin-right: ${Platform.OS === 'ios' ? '8px' : '4px'};
`;

const TagTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 22.40px;
  color: ${({ selected }) => 
    selected ? COLORS.main : COLORS.gray_400};
`;
