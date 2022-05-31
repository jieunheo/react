// 경로: /[meetupId]

import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      title={props.meetupData.title}
      image={props.meetupData.image}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

// getStaticProps 사용 시 params으로 넘어오는 값 정의
export async function getStaticPaths() {
  // DB 연결
  const client = await MongoClient.connect('mongodb+srv://root:root@cluster0.nbtcz.mongodb.net/meetups?retryWrites=true&w=majority');
  // DB 가져오기
  const db = client.db();

  // collection(테이블) 이름 설정 및 생성/가져오기
  const meetupsCollection = db.collection('meetups');

  // .find(첫번째 값, 두번째 값)
  // 첫번째 값: 특정 필드 값 필터 기준
  // 두번째 값: 포함할 필드 정의
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  // DB 끊기
  client.close();

  return {
    fallback: false, // false: paths에게 모든 지원되는 meetup value를 포함, true: Nextjs가 페이지를 만듦
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString()
      }
    }))
  }
};

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId; // url의 meetupId 값을 가져옴

  // DB 연결
  const client = await MongoClient.connect('mongodb+srv://root:root@cluster0.nbtcz.mongodb.net/meetups?retryWrites=true&w=majority');
  // DB 가져오기
  const db = client.db();

  // collection(테이블) 이름 설정 및 생성/가져오기
  const meetupsCollection = db.collection('meetups');

  // .find(첫번째 값, 두번째 값)
  // 첫번째 값: 특정 필드 값 필터 기준
  // 두번째 값: 포함할 필드 정의
  // ObjectId(meetupId): DB상에 저장된 _id 값이 ObjectId이기 때문에 변환 후 검색
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  // DB 끊기
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(), // 다시 string으로 변환
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description
      }
    }
  };
};

export default MeetupDetails;