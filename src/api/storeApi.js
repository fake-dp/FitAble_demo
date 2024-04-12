import customAxios from './customAxios';
import multipartAxios from './multipartAxios';

export const getProductList = async currentPage => {
  console.log(currentPage);
  try {
    const response = await customAxios.get(
      `/api/members/stores/v1/products?page=${currentPage}&size=8`,
      // `/api/members/stores/v1/products?page=0&size=8`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductDetail = async id => {
  try {
    const response = await customAxios.get(
      `/api/members/stores/v1/products/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewList = async id => {
  try {
    const response = await customAxios.get(
      `/api/members/stores/v1/products/${id}/reviews`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getInquiryList = async type => {
  try {
    const response = await customAxios.get(
      `/api/members/v2/inquiry/type/${type}?page=0&size=40`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

//리뷰 신고하기
export const postReport = async id => {
  try {
    const response = await customAxios.post(
      `/api/members/stores/v1/products/reviews/report`,
      {id},
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

//장바구니 담기
export const portCart = async (productId, options) => {
  try {
    const response = await customAxios.post(`/api/members/stores/v1/carts`, {
      productId,
      options,
    });

    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//장바구니 조회
export const getCartList = async () => {
  try {
    const response = await customAxios.get(`/api/members/stores/v1/carts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 장바구니 상품 삭제
export const deleteCartItem = async id => {
  try {
    const response = await customAxios.delete(
      `/api/members/stores/v1/carts/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//장바구니 수량 변경
export const putItemQuantity = async (id, quantity) => {
  try {
    const response = await customAxios.put(`/api/members/stores/v1/carts`, {
      id,
      quantity,
    });

    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//구매자 정보 조회
export const getBuyerData = async () => {
  try {
    const response = await customAxios.get(
      `/api/members/stores/v1/order/member/info`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//배송지 등록
export const portAddress = async (
  name,
  phone,
  zipCode,
  address,
  addressDetail,
) => {
  try {
    const response = await customAxios.post(
      `/api/members/stores/v1/delivery-address`,
      {
        name,
        phone,
        zipCode,
        address,
        addressDetail,
      },
    );

    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//주문상품 상세내역
export const getOrderItemData = async id => {
  try {
    const response = await customAxios.get(
      `/api/members/stores/v1/orders/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// post inquiry
export const postInquiry = async data => {
  try {
    const response = await multipartAxios.post(
      `/api/members/stores/v1/inquiry`,
      data,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// post Fitable inquiry
export const postFitableInquiry = async data => {
  try {
    const response = await multipartAxios.post(
      `/api/members/v1/inquiry/fitable`,
      data,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 문의 삭제
export const deleteInquiry = async id => {
  try {
    const response = await customAxios.delete(`/api/members/v2/inquiry/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 핏에이블 문의 삭제
export const deleteFitableInquiry = async id => {
  try {
    const response = await customAxios.delete(
      `/api/members/v1/inquiry/fitable/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 리뷰 작성
export const postReview = async data => {
  try {
    const response = await multipartAxios.post(
      `/api/members/stores/v1/review`,
      data,
    );

    console.log('ㅇㅁㅅㅁ', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 스토어 결제
export const postPayment = async data => {
  try {
    const response = await customAxios.post(
      `/api/members/stores/v1/orders`,
      data,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 스토어 결제 정보 저장
export const postPaymentInfo = async data => {
  try {
    const response = await customAxios.post(
      `/api/members/stores/v1/orders/payment`,
      data,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
