import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-[70vh] bg-[url('/images/mara.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Wilderness Royale</h1>
          <p className="text-xl mb-8">Your Gateway to Kenyan Adventures</p>
          
          {/* Updated Link component */}
          <Link 
            href="/tours" 
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full flex items-center justify-center mx-auto w-fit"
          >
            Explore Tours <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}