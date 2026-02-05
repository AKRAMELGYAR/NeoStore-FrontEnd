import amazonPay from '../../assets/images/amazon-pay.png';
import americanLogo from '../../assets/images/American-Express-Color.png';
import masterCard from '../../assets/images/mastercard.webp';
import Paypal from '../../assets/images/paypal.png';
import playStore from '../../assets/images/get-google-play.png';
import appStore from '../../assets/images/get-apple-store.png';

export default function Footer() {
  return (
    <>
        <footer className="bg-black text-white py-8 mt-3">

            <div className="container mx-auto space-y-4">
                <div>
                <h2 className='text-xl font-semibold'>Get the FreshCart app</h2>
                <p className='text-slate-400'>We will send you a link, open it on your phone to download the app</p>
            </div>

            <div className='flex gap-3'>
                <input className='grow bg-white text-black rounded-sm p-2' type="email" placeholder="Enter your email address"/>
                <button  className="bg-red-600 text-white px-4 py-2 rounded-md">Share App Link</button>
            </div>

            <div className='flex items-center justify-between py-4 border-y-2 border-white/10 border-opacity-30'>
                <div className="payment flex items-center gap-3">
                    <h3>We accept</h3>
                    <img className='w-20' src={masterCard} alt="MasterCard"/>
                    <img className='w-24' src={americanLogo} alt="American Express"/>
                    <img className='w-24' src={Paypal} alt="Paypal"/>
                    <img className='w-24' src={amazonPay} alt="Amazon Pay"/>

                </div>
                <div className="download flex items-center gap-3">
                    <h3>Get deliveries with FreshCart</h3>
                    <img className='w-24' src={appStore} alt="App Store"/>
                    <img className='w-25.5' src={playStore} alt="Play Store"/>
                </div>
            </div>
            </div>
        </footer>
    </>
  );
}