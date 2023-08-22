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
  

export const detailCenterState = atom({
    key: 'detailCenterState',
    default: {
      address: "",
      description: "",
      facilities: "",
      id: "",
      images: [],
  links: {
    blog: "",
    homepage: "",
    instagram: "",
    kakao: "",
  },
  mainImage: "",
  name: "",
  operationTimes: [],
  phone: "",
  programs: "",
  pt: false,
  subscription: false,
  tags: [],
  ticket: false,
    },
});