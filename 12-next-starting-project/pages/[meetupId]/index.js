// 경로: /[meetupId]

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      title='A First Meetup'
      image='https://t1.daumcdn.net/cfile/tistory/996333405A8280FC23'
      address='Some address 5, 12345 Some City'
      description='This is a first meetup!'
    />
  );
};

// getStaticProps 사용 시 params으로 넘어오는 값 정의
export async function getStaticPaths() {
  return {
    fallback: false, // false: paths에게 모든 지원되는 meetup value를 포함, true: Nextjs가 페이지를 만듦
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      },
      {
        params: {
          meetupId: 'm2'
        }
      }
    ]
  }
};

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId; // url의 meetupId 값을 가져옴

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: meetupId,
        title: 'A First Meetup',
        image: 'https://t1.daumcdn.net/cfile/tistory/996333405A8280FC23',
        address: 'Some address 5, 12345 Some City',
        description: 'This is a first meetup!'
      }
    }
  };
};

export default MeetupDetails;