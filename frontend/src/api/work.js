import instance from './index';

// 특정 게스트하우스에 대한 모집공고 리스트 확인
const getMyRecruitments = (guestHouseUid) => {
  return instance.get(`/api/guest-house-recruitment/${guestHouseUid}`);
};

// 모집중인 직무 모두 보기
const allWorkList = () => {
  return instance.get(`/api/job-offer?pageNumber=${1}`);
};

// recruitmentUid를 통해 모집공고 세부 정보 제공
const recruitmentDetail = (recruitmentUid) => {
  return instance.get(`/api/job-offer/${recruitmentUid}`, {}, {});
};

// 직무 필터 조회
const filteredWorkList = (filterValues) => {
  console.log(filterValues);
  const config = {
    body: {
      filterValues,
    },
  };
  return instance.post('/api/job-offer/search', config, {});
};

// 공고 작성
const createRecruitment = (body, token) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return instance.post('/auth/job-offer', body, config);
};

// 공고 수정
const updateRecruitment = (body, token, recruitmentUid) => {
  console.log(body);
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return instance.put(`/auth/job-offer/${recruitmentUid}`, body, config);
};

// 특정 게스트하우스에 대한 직무 리스트 확인
const getMyWorks = (token, guestHouseUid) => {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.get(`/auth/recruitment-work-list/${guestHouseUid}`, config);
  // return [{ uid: 1 }, { uid: 2 }, { uid: 3 }];
};

// 직무 작성
function createWork(body, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.post('/auth/work', body, config);
}

// 직무 수정
function updateWork(body, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.put('/auth/work', body, config);
}

// 직무 삭제
function deleteWork(workUid, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.delete(`/auth/work/${workUid}`, config);
}

export {
  recruitmentDetail,
  allWorkList,
  filteredWorkList,
  createWork,
  updateWork,
  deleteWork,
  getMyWorks,
  getMyRecruitments,
  createRecruitment,
  updateRecruitment,
};
