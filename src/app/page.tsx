import Head from 'next/head';
import Hero from './components/Hero';
//import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wilderness Royale | Discover Kenya</title>
      </Head>

    
      <Hero />
      
      <main>
        <h1 className="text-4xl font-bold text-center my-8">
          Experience Kenya Like Never Before
        </h1>
      </main>
    </div>
  );
}
