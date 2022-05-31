import Layout from '../components/layout/Layout';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1', // 아이디
    title: 'A First Meetup', // 모임 이름
    image: 'https://t1.daumcdn.net/cfile/tistory/996333405A8280FC23', // 모임 이미지
    address: 'Some address 5, 12345 Some City', // 모임 주소
    discription: 'This is a first meetup!' // 내용
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://img.lovepik.com/photo/40173/9974.jpg_wh860.jpg',
    address: 'Some address 8, 67890 Some City',
    discription: 'This is a Second meetup!'
  }
];

function HomePage() {
  return (
    <Layout>
      <MeetupList meetups={DUMMY_MEETUPS} />
    </Layout>
  );
};

export default HomePage;