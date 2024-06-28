import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://jydndev:SGkrfjlgrd47MWAe@cluster0.xij6vv5.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
  );

  const db = client.db();

  const collection = db.collection('meetups');

  const meetups = await collection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for single meetup

  const { meetupId } = context.params;

  const client = await MongoClient.connect(
    'mongodb+srv://jydndev:SGkrfjlgrd47MWAe@cluster0.xij6vv5.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
  );

  const db = client.db();

  const collection = db.collection('meetups');

  const selectedMeetup = await collection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
