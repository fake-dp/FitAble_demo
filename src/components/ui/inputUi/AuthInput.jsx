import React, { useState } from 'react'; // React import 추가
import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";
import { TextInput, Image } from "react-native";
import FastImage from 'react-native-fast-image';

export const AuthInput = React.forwardRef(({
  value,
  onChangeText,
  placeholder,
  maxLength,
  onSubmitEditing,
  onFocus,
  onBlur,
}, ref) => { // ref를 여기로 옮김

    const [showPassword, setShowPassword] = useState(false);
    const isPasswordInput = placeholder === '비밀번호';

    const handlePasswordVisibilityChange = () => {
        setShowPassword(!showPassword);
    };

    return (
       <>
        {
            isPasswordInput ? (
                <AuthTextInputContainer isPasswordInput={isPasswordInput}>
                  {value.length > 0 && (
                    <TogglePasswordVisibility onPress={handlePasswordVisibilityChange}>
                      <SecretIcon 
                         resizeMode='contain'
                        source={showPassword ? require('../../../assets/img/eye_open.png') : require('../../../assets/img/eye_closed.png')} />
                    </TogglePasswordVisibility>
                  )}
                  <AuthTextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={!showPassword}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType='done'
                    ref={ref}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </AuthTextInputContainer>   
            ) : (
                <AuthTextInputContainer>
                  <AuthTextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    keyboardType="numeric"
                    ref={ref}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </AuthTextInputContainer>
            )
        }
       </>
    );
});



const TogglePasswordVisibility = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const AuthTextInputContainer = styled.View`
    width: 100%;
    height: 60px;
    background-color: ${COLORS.box};
    border-radius: 15px;
    margin-bottom: 8px;
    padding: 0 20px;
    ${props => props.isPasswordInput && `
   
    `}
`;

const SecretIcon = styled(FastImage)`
width :24px;
height: 24px;
`

const AuthTextInput = styled(TextInput).attrs(() => ({
    placeholderTextColor: COLORS.white,
}))`
    flex: 1;
    color: ${COLORS.white};
    font-size: 16px;
    font-weight: 500;
    line-height: 22.40px;
`;
