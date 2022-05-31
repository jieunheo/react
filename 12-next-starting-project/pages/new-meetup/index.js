// 경로: /new-meetup

import Layout from '../../components/layout/Layout';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetup() {
  const addMeetupHandler = enteredMeetupData => {
    console.log(enteredMeetupData);
  };

  return (
    <Layout>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Layout>
  );
};

export default NewMeetup;