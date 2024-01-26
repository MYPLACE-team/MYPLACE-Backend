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
  //TOKEN
  TOKEN_ERROR: {
    status: 400,
    isSuccess: true,
    code: 'TOEKN4000',
    message: '토큰 오류입니다',
  },
  TOKEN_EXPIRED: {
    status: 400,
    isSuccess: true,
    code: 'TOEKN4001',
    message: '토큰 시간초과',
  },
  TOKEN_INVAILD: {
    status: 400,
    isSuccess: true,
    code: 'TOEKN4002',
    message: '유효하지 않은 토큰',
  },
  TOKEN_SIGNITURE: {
    status: 400,
    isSuccess: true,
    code: 'TOEKN4003',
    message: '토큰 서명 오류',
  },
}
