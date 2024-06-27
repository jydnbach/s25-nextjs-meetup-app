import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'First meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/1500_block_of_Corcoran_Street%2C_N.W..JPG/2560px-1500_block_of_Corcoran_Street%2C_N.W..JPG',
    address: 'some address',
    description: 'this is a first meetup',
  },
  {
    id: 'm2',
    title: 'Second meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/1500_block_of_Corcoran_Street%2C_N.W..JPG/2560px-1500_block_of_Corcoran_Street%2C_N.W..JPG',
    address: 'some address',
    description: 'this is a second meetup',
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;

// nextjs prerendering options:
// 1. static generation: on build
// 2.
