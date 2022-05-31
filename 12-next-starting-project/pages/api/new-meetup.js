// API Route
// 1. 리액트 컴포넌트를 정의하고 랜더링하거나 리턴하지 않음
// 2. 서버 사이드 코드를 포함하는 함수 정의 -> 서버에서만 돌아감

// 경로: /api/new-meetup -> POST

// req: 요청. 들어오는 요청에 관한 데이터
// res: 응답. 응답을 보낼 때 사용
function handler(req, res) {
  if(req.method === 'POST') {
    const data = req.body;

    // 받아올 데이터 정의 가능
    const { title, img, address, discription } = data;
  }
};

export default handler;