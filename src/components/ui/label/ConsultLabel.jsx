import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";
import ConsultInput from '../inputUi/ConsultInput';

function ConsultLabel({ tag, selected, onPress,customTag, setCustomTag }) {


  const [showTextInput, setShowTextInput] = useState(false);
  // const [customTag, setCustomTag] = useState("");

  const handleTagClick = () => {
    if (tag === "기타") {
      setShowTextInput((prevShowTextInput) => !prevShowTextInput);
      // onPress(tag);
    } else {
      onPress(tag);
    }
  };

  const handleTextInputChange = (text) => {
    setCustomTag(text);
  };

  const handleTextInputSubmit = () => {
    console.log('dpsxj')
    if (customTag.trim() !== "") {
      onPress(customTag.trim());
      // setShowTextInput(false);
      // setCustomTag("");
    }
  };

  return (
    <>
    <TouchableOpacity onPress={handleTagClick}>
    <Container selected={selected || (tag === "기타" && showTextInput)}>
        <TagTitle selected={selected || (tag === "기타" && showTextInput)}>
          {tag}
        </TagTitle>
      </Container>
    </TouchableOpacity>
    {showTextInput && (
          <ConsultInput
            value={customTag}
            onChangeText={handleTextInputChange}
            onSubmitEditing={handleTextInputSubmit}
            placeholder="기타 사항 입력"
          />
      )}
    </>
  );
}

export default ConsultLabel;

const Container = styled.View`
  margin-bottom: 10px;
  padding: 8px 13px;

  background-color: ${({ selected }) =>
    selected ? COLORS.box : COLORS.box_two};
  border-radius: 80px;
  margin-right: 8px;
`;

const TagTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 22.40px;
  color: ${({ selected }) => 
    selected ? COLORS.main : COLORS.gray_400};
`;
