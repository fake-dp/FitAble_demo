// 로그인 상태관리
import { atom } from 'recoil';
export const isLoginState = atom({
    key: 'isLoginState',
    default: false,
});

export const phoneState = atom({
    key: 'phoneState',
    default: '',
  });
  