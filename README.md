# JAMPLAY CODIPLAN – 시간표 생성기 (Web ver6.3)

> 5–7세 수업 시간표를 **브라우저에서 바로 생성**하고 **이미지(PNG)**로 저장할 수 있는 정적 웹앱입니다.  
> 데이터 저장/로그인 없이 누구나 링크로 접속해 사용합니다.

## 🔗 데모
- GitHub Pages: https://{사용자아이디}.github.io/{저장소이름}/

## ✨ 주요 기능
- 연령별 반 수 입력(5/6/7세)
- 수업 가능 요일 선택(월–금)
- 1–4주차 **자동 시간표 생성**
- **카니 1일 3회 이상** 시 경고 알림
- 화면에 보이는 시간표를 **PNG로 저장**

## 🧭 사용 방법
1. 페이지 접속  
2. 5·6·7세 반 수 입력  
3. 수업 가능한 요일 체크  
4. **시간표 생성** 클릭  
5. 필요 시 **PNG로 저장** 클릭

## 🚀 배포 방법 (GitHub Pages)
1. `index.html`, `style.css`, `script.js` 업로드
2. **Settings → Pages**  
   - Source: `Deploy from a branch`  
   - Branch: `main` / `(root)` → **Save**
3. 잠시 후 위 데모 링크로 접속

## 🧩 기술 스택
- HTML / CSS / JavaScript (정적 사이트)
- [html2canvas](https://html2canvas.hertzen.com/) – 화면 캡처(PNG 저장)

## 🛠 문제 해결 (FAQ)
- **PNG 저장 버튼이 반응 없음**  
  - 먼저 **시간표 생성**을 눌렀는지 확인  
  - 강력 새로고침(Cmd+Shift+R)  
  - `index.html`에서 html2canvas가 `script.js`보다 **먼저** 로드되는지 확인
- **배포 후 변경이 안 보임**  
  - 파일명 뒤에 버전 쿼리 추가: `<script src="script.js?v=3"></script>`  
  - 브라우저 캐시 삭제/강력 새로고침

## 📌 변경 이력
- **ver6.3 (web)**: GAS 로직을 프론트엔드로 포팅, PNG 저장 기능 추가

## 📄 라이선스
- 사내/지사 사용 목적의 내부 프로젝트
