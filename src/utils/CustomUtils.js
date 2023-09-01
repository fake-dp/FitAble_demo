// 비밀번호 정규식
export function validatePassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,16}$/i;
    return pattern.test(password);
  }


// 핸드폰 번호 하이폰 정규식
export function formatPhoneNumber(phone){
    if (phone.length === 10) {
        return `${phone.substring(0, 3)}-${phone.substring(3, 6)}-${phone.substring(6)}`;
    } else if (phone.length === 11) {
        return `${phone.substring(0, 3)}-${phone.substring(3, 7)}-${phone.substring(7)}`;
    } else {
        return phone;
    }
};