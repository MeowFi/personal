import { FadeInSection } from '../../hooks/useIntersectionObserver';
import Link from 'next/link'; // Though the button is an external link

const ContactSection = () => {
  return (
    <FadeInSection id="contact" className="scroll-mt-24 text-center" scrollMarginTop='96px'>
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text-neon font-fira-code">
        <span className="text-blue-400 text-2xl mr-2">📫</span>nano contact.txt
      </h2>
      <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">
        Open for collaborations, discussions on cutting-edge tech, or just a friendly chat. <br />
        Find me at <code className="text-blue-300 bg-slate-700 px-2 py-1 rounded">meowfi.sol</code> or connect via X.
      </p>
      <a
        href="https://x.com/MeowfiDev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-3 border-2 border-blue-500 text-lg font-medium rounded-lg shadow-lg text-blue-300 bg-blue-500/20 hover:bg-blue-500/30 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-blue-500 transition duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
        aria-label="Connect with me on X (Twitter), opens in new tab"
      >
        Send Signal (X/Twitter)
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </FadeInSection>
  );
};

export default ContactSection;