// 경로: /[meetupId]

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      title='A First Meetup'
      img='https://t1.daumcdn.net/cfile/tistory/996333405A8280FC23'
      address='Some address 5, 12345 Some City'
      discription='This is a first meetup!'
    />
  );
};

export default MeetupDetails;