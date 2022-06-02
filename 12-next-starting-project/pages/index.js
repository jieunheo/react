import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// 요청이 들어올 때마다 실행 -> 배열 다음 서버에서 실행
// export async function getServerSideProps(context) {
//   const req = context.req; // 요청
//   const res = context.res; // 응답

//   return {
//     props: { // HomePage에서 받는 props가 됨
//       meetups: DUMMY_MEETUPS
//     }
//   };
// };

// pages 폴더 안에 있는 컴포넌트에만 사용 가능 - 비동기
// 해당 함수가 완료된 후에 컴포넌트가 실행됨 -> 데이터를 포함한 화면이 렌더링 됨
export async function getStaticProps() { // 무조건 서버측 실행
  // DB 연결
  const client = await MongoClient.connect('mongodb+srv://root:root@cluster0.nbtcz.mongodb.net/meetups?retryWrites=true&w=majority');
  // DB 가져오기
  const db = client.db();

  // collection(테이블) 이름 설정 및 생성/가져오기
  const meetupsCollection = db.collection('meetups');

  // .find(): 전체 데이터
  // .toArray(): 배열로 만들기
  const meetups = await meetupsCollection.find().toArray();

  // DB 끊기
  client.close();

  return {
    props: { // HomePage에서 받는 props가 됨
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString()
      })),
    },
    revalidate: 10 // 점진적 정적 생성 -> 요청이 들어올 때 페이지를 다시 생성하기까지 대기하는 시간(초)
  };
};

export default HomePage;