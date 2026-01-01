import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <img src="images/logo.jpg" alt="" />
            <p className="text-gray-300 mb-4 mt-5">
            Nairametrics, established in 2001, is a daily business newspaper based in Lagos. It is the only Nigerian newspaper with a bureau in Accra, Ghana. It has both daily and Sunday titles. It circulates in Nigeria and Ghana... Read More...

            </p>
          
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">The Company</h3>
            <ul className="space-y-2">
              <li><Link href="/category/business" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/category/economy" className="text-gray-300 hover:text-white transition-colors">Business Day Pro</Link></li>
              <li><Link href="/category/markets" className="text-gray-300 hover:text-white transition-colors">Research & Insight</Link></li>
              <li><Link href="/category/politics" className="text-gray-300 hover:text-white transition-colors">Conference</Link></li>
              <li><Link href="/category/technology" className="text-gray-300 hover:text-white transition-colors">BD Fx</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Privacy</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Privacy Policy </Link></li>
              <li><Link href="/advertise" className="text-gray-300 hover:text-white transition-colors">Copyright</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">Companies</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Market </Link></li>
              <li><Link href="/advertise" className="text-gray-300 hover:text-white transition-colors">Economy</Link></li>
              <li><Link href="/advertise" className="text-gray-300 hover:text-white transition-colors">ePapers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">Adverts & Rates</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Support </Link></li>
              <li><Link href="/advertise" className="text-gray-300 hover:text-white transition-colors">Contact Us </Link></li>            </ul>
          </div>

          
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-6">
          <p className="text-center text-gray-400 text-sm">
            © Nairametrics MEDIA LTD 2026.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
