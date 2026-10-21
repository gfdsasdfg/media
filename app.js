// 방송미디어통신위원회 웹 앱 자바스크립트

document.addEventListener('DOMContentLoaded', () => {

  // 1. 주요 업무 탭 전환 기능
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 모든 버튼 및 패널 활성 해제
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // 현재 선택된 버튼 및 패널 활성화
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 2. FAQ 아코디언 토글 기능
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // 다른 열린 항목 닫기
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBody = otherItem.querySelector('.accordion-body');
        if (otherBody) {
          otherBody.style.maxHeight = null;
        }
      });

      // 클릭한 항목 토글
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });

  // 3. 최신 뉴스 실시간 키워드 검색/필터 기능
  const newsSearchInput = document.getElementById('news-search');
  const newsCards = document.querySelectorAll('.news-card');

  if (newsSearchInput) {
    newsSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      newsCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 4. 네비게이션 스크롤 부드럽게 이동
  const navAnchorLinks = document.querySelectorAll('.nav-links a, .hero-actions a, .footer-links a');
  navAnchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 75;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 5. 국민 맞춤형 지원 찾기 체크리스트 & 설문 데이터 및 로직
  const solutionsData = {
    'telecom-dispute': {
      category: '이용자 권익 구제',
      title: '통신분쟁조정위원회 무료 분쟁조정 제도',
      desc: '통신사와의 결합상품 해지 위약금, 과다 청구 요금, 계약 내용 불일치 분쟁을 무료로 조정해 드립니다. 합의 성립 시 법원 확정 판결과 동일한 강력한 효력이 발생합니다.',
      fee: '비용: 전액 무료',
      period: '처리 기간: 통상 60일 이내',
      actionText: '통신분쟁조정 신청하기',
      actionUrl: 'https://www.kmcc.go.kr'
    },
    'spam-deepfake': {
      category: '디지털 안전 & 피해구제',
      title: '불법스팸 신속 과태료 처분 및 AI 딥페이크 긴급 삭제 심의',
      desc: '악성 피싱·도박 스팸 발신자를 추적해 행정처분 및 과태료를 부과하며, 성명·초상이 무단 합성된 딥페이크 허위조작영상물은 플랫폼 사업자에게 24시간 내 삭제·차단을 요구합니다.',
      fee: '지원: 피해자 긴급 모니터링',
      period: '상담: 국번없이 118',
      actionText: '불법스팸·유해물 신고센터',
      actionUrl: 'https://www.kmcc.go.kr'
    },
    'disabled-tv': {
      category: '미디어 복지 지원',
      title: '시청각장애인 맞춤형 TV 전액 무료 보급 사업',
      desc: '시각장애인을 위한 전 메뉴 음성안내(TTS)와 청각장애인을 위한 스마트 수어방송 크기조절·자막 위치 조정 기능이 탑재된 맞춤형 최신 TV를 무상으로 댁내까지 설치해 드립니다.',
      fee: '대상: 등록 장애인 대상 무료',
      period: '신청: 매년 상반기 집중 접수',
      actionText: '맞춤형 TV 보급 신청 안내',
      actionUrl: 'https://www.korea.kr'
    },
    'media-center': {
      category: '창작 & 시민 역량강화',
      title: '시청자미디어센터 방송 스튜디오 및 4K 촬영장비 무료 대여',
      desc: '전국 주요 거점 시청자미디어센터를 통해 국민 누구나 4K 방송 카메라, 조명, 녹음실, 영상 편집실을 무료로 대여하고 전문 강사의 미디어 리터러시 제작 교육을 수강할 수 있습니다.',
      fee: '비용: 시설·장비 100% 무료',
      period: '이용: 사전 예약제 상시 운영',
      actionText: '시청자미디어센터 시설 예약',
      actionUrl: 'https://www.kmcc.go.kr'
    },
    'broadcast-complaint': {
      category: '방송 공공성 감시',
      title: '시청자 방송 심의 민원 신청 및 시청자권익보호위원회',
      desc: '지상파·종편·보도전문채널 등의 편파 보도, 청소년 유해 방송, 허위 가짜뉴스에 대해 시청자가 직접 심의를 제기할 수 있으며, 공정한 심사를 거쳐 방송사 제재 조치가 내려집니다.',
      fee: '신청: 국민 누구나 가능',
      period: '결과: 심의 완료 후 통보',
      actionText: '방송 프로그램 심의 민원 접수',
      actionUrl: 'https://www.kmcc.go.kr'
    },
    'disaster-report': {
      category: '국민 안전망',
      title: '터널·지하공간 재난방송(FM/DMB) 수신 장애 긴급 실사 및 시설 개선',
      desc: '국민이 자주 다니는 터널이나 지하철 등에서 재난방송 수신이 불량할 경우 도로공사·지자체에 즉각적인 중계 설비 설치 및 개선 명령을 내리고 수신 상태를 재점검합니다.',
      fee: '제보: 위험 음영구역 즉각 접수',
      period: '조치: 분기별 합동 점검',
      actionText: '재난방송 음영지역 제보하기',
      actionUrl: 'https://www.newsis.com'
    }
  };

  const surveyCheckboxes = document.querySelectorAll('input[name="service_check"]');
  const resultPlaceholder = document.querySelector('.result-placeholder');
  const resultDetails = document.getElementById('result-details');
  const resultCardsList = document.getElementById('result-cards-list');
  const resultCount = document.getElementById('result-count');
  const surveyResetBtn = document.getElementById('survey-reset-btn');

  function updateSurveyResults() {
    const selectedKeys = [];
    surveyCheckboxes.forEach(cb => {
      const card = cb.closest('.survey-card');
      if (cb.checked) {
        card.classList.add('selected');
        selectedKeys.push(cb.value);
      } else {
        card.classList.remove('selected');
      }
    });

    if (selectedKeys.length === 0) {
      resultPlaceholder.style.display = 'block';
      resultDetails.style.display = 'none';
      resultCardsList.innerHTML = '';
      if (resultCount) resultCount.textContent = '0';
    } else {
      resultPlaceholder.style.display = 'none';
      resultDetails.style.display = 'block';
      if (resultCount) resultCount.textContent = selectedKeys.length;

      let html = '';
      selectedKeys.forEach(key => {
        const item = solutionsData[key];
        if (item) {
          html += `
            <div class="solution-card">
              <div class="solution-body">
                <span class="solution-badge">${item.category}</span>
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
                <div class="solution-meta">
                  <span><i class="fa-solid fa-circle-check"></i> ${item.fee}</span>
                  <span><i class="fa-solid fa-clock"></i> ${item.period}</span>
                </div>
              </div>
              <div class="solution-action">
                <a href="${item.actionUrl}" target="_blank" rel="noopener noreferrer" class="btn-action">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> ${item.actionText}
                </a>
              </div>
            </div>
          `;
        }
      });
      resultCardsList.innerHTML = html;
    }
  }

  surveyCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateSurveyResults);
  });

  if (surveyResetBtn) {
    surveyResetBtn.addEventListener('click', () => {
      surveyCheckboxes.forEach(cb => {
        cb.checked = false;
        cb.closest('.survey-card').classList.remove('selected');
      });
      updateSurveyResults();
    });
  }

  console.log('대한민국 방송미디어통신위원회 웹 앱이 성공적으로 로드되었습니다.');
});
