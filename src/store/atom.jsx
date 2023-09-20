// 로그인 상태관리
import { atom } from 'recoil';
export const isLoginState = atom({
    key: 'isLoginState',
    default: false,
});


export const signUpInfoState = atom({
  key: 'signUpInfoState',
  default: {
    name: '',
    birthDay: '',
    gender: '',
    phone: '',
    password: '',
    fcmToken: 'testtoken',
    agreements: {
      marketing: false,
      pushAlarm: false,
      storeMarketing: false,
    },
  },
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

export const threeBtnState = atom({
  key: 'threeBtnState',
  default: '',
});

export const btnActiveState = atom({
  key: 'btnActiveState',
  default: '',
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

export const centerIdState = atom({
  key: 'centerIdState',
  default: '',
});


// mypage info
export const myinfoState = atom({
  key: 'myinfoState',
  default: {
    name: '',
    phone: '',
    mainCenterId: '',
    mainCenter: '',
    marketing: '',
    pushAlarm: '',
  },
});

// 센터 문의사항 관리
export const inquiryListState = atom({
  key: 'inquiryListState',
  default: [],
});


// 구독권 내역 목록 상태 관리
export const subscribeListState = atom({
  key: 'subscribeListState',
  default: [],
});


// 이용권 내역 목록 상태 관리
export const ticketListState = atom({
  key: 'ticketListState',
  default: [],
});


// 홈 이용권 목록 상태 관리
export const homeTicketListState = atom({
  key: 'homeTicketListState',
  default: [],
});

// 홈 회원 수업 목록 조회
export const homeClassListState = atom({
  key: 'homeClassListState',
  default: [],
});
