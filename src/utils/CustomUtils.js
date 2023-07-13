// 비밀번호 정규식
export function validatePassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,16}$/i;
    return pattern.test(password);
  }
  