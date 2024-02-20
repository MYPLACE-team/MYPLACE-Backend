export const status = {
  // success
  SUCCESS: { status: 200, isSuccess: true, code: '2000', message: '성공!!' },

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
    code: '4001',
    message: '잘못된 요청입니다',
  },
  //auth
  KAKAO_LOGIN_SUCCESS: {
    status: 200,
    isSuccess: true,
    code: 'AUTH2001',
    message: '카카오 로그인 완료!',
  },
  GOOGLE_LOGIN_SUCCESS: {
    status: 200,
    isSuccess: true,
    code: 'AUTH2001',
    message: '구글 로그인 완료!',
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
  SHOW_INITIAL_INFO_SUCCESS: {
    status: 200,
    isSuccess: true,
    code: 'PLACE2001',
    message: '초기 정보 조회가 정상적으로 수행되었습니다',
  },
  //archive
  SHOW_ARCHIVE_LIST_SUCCESS: {
    status: 200,
    isSuccess: true,
    code: 'ARCHIVE2000',
    message: '아카이브 장소 목록 조회가 정상적으로 수행되었습니다',
  },
  REMOVE_FOLDER_SUCCESS: {
    status: 200,
    isSuccess: true,
    code: 'ARCHIVE2000',
    message: '폴더가 성공적으로 삭제되었습니다',
  },
  ARCHIVE_LIST_DOESNT_EXIST: {
    status: 404,
    isSuccess: false,
    code: 'ARCHIVE4000',
    message: '아카이브 리스트가 존재하지 않습니다',
  },
  USER_DOESNT_OWN_FOLDER: {
    status: 404,
    isSuccess: false,
    code: 'ARCHIVE4001',
    message: '유저가 접근할 수 없는 폴더입니다',
  },
  //user
  USER_NOT_EXISTS: {
    status: 404,
    isSuccess: false,
    code: 'USER4000',
    message: '존재하지 않는 유저입니다.',
  },
  NAME_ALREADY_EXISTS: {
    status: 404,
    isSuccess: false,
    code: 'USER4001',
    message: '이미 존재하는 닉네임입니다.',
  },
  PLACE_VISITED_TOGGLE_SUCCESS: {
    status: 200,
    isSuccess: true,
    code: 'PLACE2001',
    message: '방문 여부 정보 변경이 정상적으로 수행되었습니다',
  },
  //TOKEN
  TOKEN_ERROR: {
    status: 400,
    isSuccess: false,
    code: 'TOEKN4000',
    message: '토큰 오류입니다',
  },
  TOKEN_EXPIRED: {
    status: 400,
    isSuccess: false,
    code: 'TOEKN4001',
    message: '토큰 시간초과',
  },
  TOKEN_INVAILD: {
    status: 400,
    isSuccess: false,
    code: 'TOEKN4002',
    message: '유효하지 않은 토큰',
  },
  TOKEN_SIGNITURE: {
    status: 400,
    isSuccess: false,
    code: 'TOEKN4003',
    message: '토큰 서명 오류',
  },
  //ERR
  CONTROL_ERROR: {
    status: 400,
    isSuccess: false,
    code: 'CTRL4000',
    message: '잘못된 데이터입니다!',
  },
  NOT_FOUND: {
    status: 404,
    isSuccess: false,
    code: 'PAGE4000',
    message: '요청한 정보를 찾을 수 없습니다.',
  },
}
