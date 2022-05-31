// API Route
// 1. 리액트 컴포넌트를 정의하고 랜더링하거나 리턴하지 않음
// 2. 서버 사이드 코드를 포함하는 함수 정의 -> 서버에서만 돌아감

// 경로: /api/new-meetup -> POST

import { MongoClient } from 'mongodb';

// req: 요청. 들어오는 요청에 관한 데이터
// res: 응답. 응답을 보낼 때 사용
async function handler(req, res) {
  if(req.method === 'POST') {
    const data = req.body;

    // 받아올 데이터 정의 가능
    // const { title, img, address, discription } = data;

    // DB 연결
    // mongodb+srv://<username>>:<password>@...mongodb.net/<databasename>?...
    const client = await MongoClient.connect('mongodb+srv://root:root@cluster0.nbtcz.mongodb.net/meetups?retryWrites=true&w=majority');
    // DB 가져오기
    const db = client.db();

    // collection(테이블) 이름 설정 및 생성/가져오기
    const meetupsCollection = db.collection('meetups');

    // 결과 값 집어넣기
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    // 연결 끊기
    client.close();

    // 결과
    // 201: 성공
    // .json(): 발신 응답에 추가될 값
    res.status(201).json({ message: 'Meetup inserted!' });
  }
};

export default handler;