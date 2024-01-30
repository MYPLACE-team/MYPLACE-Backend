export const status = {
  // success
  SUCCESS: { status: 200, isSuccess: true, code: 2000, message: '성공!!' },

  //공통
  PARAMETER_IS_WRONG: {
    status: 400,
    isSuccess: false,
    code: '4000',
    message: '잘못된 정보입니다!',
  },

  BAD_REQUEST: {
    status: 400,
    isSuccess: false,
    code: 4001,
    message: '잘못된 요청입니다',
  },
  //auth
  KAKAO_LOGIN_SUCCESS: {
    status: 200,
    isSuccess: true,
    code: 'AUTH2100',
    message: '카카오 로그인 완료!',
  },
  REGISTER_SUCCESS: {
    status: 200,
    isSuccess: true,
    code: 'AUTH2000',
    message: '회원 가입이 성공적으로 완료되었습니다.',
  },
  INVAILD_PROVIDER: {
    status: 400,
    isSuccess: false,
    code: 'AUTH4000',
    message: 'Provider is invaild.',
  },
  ACCOUNT_INFO_ERROR: {
    status: 400,
    isSuccess: false,
    code: 'AUTH4001',
    message: '비정상적 데이터입니다!',
  },
  //place
  SHOW_PREFERENCE_PLACES_SUCCESS: {
    status: 200,
    isSuccess: true,
    code: 'PLACE2000',
    message: '관심 장소 조회가 정상적으로 수행되었습니다',
  },
  PLACE_VISITED_TOGGLE_SUCCESS: {
    status: 200,
    isSuccess: true,
    code: 'PLACE2001',
    message: '방문 여부 정보 변경이 정상적으로 수행되었습니다',
  },
}
