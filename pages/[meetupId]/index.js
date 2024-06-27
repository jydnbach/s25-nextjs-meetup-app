import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/1500_block_of_Corcoran_Street%2C_N.W..JPG/2560px-1500_block_of_Corcoran_Street%2C_N.W..JPG"
      title="first meetup"
      address="some street"
      description="first meetup"
    />
  );
}

export function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  //fetch data for single meetup

  const { meetupId } = context.params;

  return {
    props: {
      meetupData: {
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/1500_block_of_Corcoran_Street%2C_N.W..JPG/2560px-1500_block_of_Corcoran_Street%2C_N.W..JPG',
        id: meetupId,
        title: 'first meetup',
        address: 'address',
        description: 'desc',
      },
    },
  };
}

export default MeetupDetails;
