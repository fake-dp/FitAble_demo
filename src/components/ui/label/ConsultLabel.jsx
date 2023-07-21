import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";
import ConsultInput from '../inputUi/ConsultInput';

function ConsultLabel({ tag, selected, onPress }) {
  const [showTextInput, setShowTextInput] = useState(false);
  const [customTag, setCustomTag] = useState("");

  const handleTagClick = () => {
    if (tag === "기타") {
      setShowTextInput((prevShowTextInput) => !prevShowTextInput);
    } else {
      onPress(tag);
    }
  };

  const handleTextInputChange = (text) => {
    setCustomTag(text);
  };

  const handleTextInputSubmit = () => {
    onPress(customTag);
    setShowTextInput(false);
    setCustomTag("");
  };

  return (
    <>
    <TouchableOpacity onPress={handleTagClick}>
      <Container selected={selected} isEtc={tag === "기타"}>
        <TagTitle selected={selected} isEtc={tag === "기타"}>
          {tag}
        </TagTitle>
      </Container>
    </TouchableOpacity>
    {showTextInput && (
          <ConsultInput
            value={customTag}
            onChangeText={handleTextInputChange}
            onSubmitEditing={handleTextInputSubmit}
            placeholder="기타 태그 입력"
          />
      )}
    </>
  );
}

export default ConsultLabel;

const Container = styled.View`
  margin-bottom: 10px;
  padding: 8px 13px;
  background-color: ${({ selected, isEtc }) =>
    selected ? COLORS.main : isEtc ? COLORS.box : COLORS.box_two};
  border-radius: 80px;
  margin-right: 8px;
`;

const TagTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 22.40px;
  color: ${({ selected, isEtc }) => {
    if (selected) return COLORS.box;
    return isEtc ? COLORS.main : COLORS.gray_400;
  }};
`;
