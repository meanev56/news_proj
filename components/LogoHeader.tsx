import  Image  from 'next/image';

export default function LogoHeader() {
  return (
    <header className="bg-white text-black shadow-md">
      <div className='container mx-auto p-4 flex justify-center items-center '>
        <div className='justify-center'>
          <div className='text-center'>
            <Image 
              src="/images/businessday.png"
              alt="BusinessDay Logo"
              className='mx-auto sm:w-20 md:w-26 lg:w-64 transition-all'
              width={50}
              height={24}
            />
          </div>
          <div className="flex justify-between text-black mt-4 font-bold text-xs md:text-sm">
              <h1 className='mx-3'>TRACKING TRENDS</h1>
              <h1 className='mx-4'>  | </h1>
              <h1>INFORMING DECISIONS</h1>
            </div>
        </div>
      </div>
    </header>
  )
}
