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

export const subscribeState = atom({
  key: 'subscribeState',
  default: {
    tickets: [],
    description: '',
  },
});

export const ticketState = atom({
  key: 'ticketState',
  default: {
    tickets: [],
    description: '',
  },
});


export const ptState = atom({
  key: 'ptState',
  default: {
    tickets: [],
    description: '',
  },
});