import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Nextjs Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active Nextjs meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

// SSG
export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://jydndev:SGkrfjlgrd47MWAe@cluster0.xij6vv5.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
  );

  const db = client.db();

  const collection = db.collection('meetups');

  const meetups = await collection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
    },
    revalidate: 1, //incremental static generation
  };
}

// // SSR
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;

// nextjs prerendering options:
// 1. static generation: on build
// catch: data could be outdated
// 2. sever side rendering (ssr)
// use it for frequent data changes
