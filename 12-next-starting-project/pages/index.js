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

function HomePage(props) {
  return (
      <MeetupList meetups={props.meetups} />
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

  return {
    props: { // HomePage에서 받는 props가 됨
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10 // 점진적 정적 생성 -> 요청이 들어올 때 페이지를 다시 생성하기까지 대기하는 시간(초)
  };
};

export default HomePage;