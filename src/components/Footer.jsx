import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo-1.svg'; 
import { footerLinks, socialMedia } from '../constants';

const Footer = () => {
  return (
    <section className="flex justify-center py-12 flex-col bg-primary">
      <div className="flex flex-col md:flex-row items-start mb-8 w-full px-6">
        <div className="flex-1 flex flex-col justify-start mr-10">
          <img src={Logo} alt="logo" className='w-[266px] h-[72px] object-contain'/>
          <p className="text-dimWhite mt-4 max-w-[310px]">
            Experience luxury travel. <br/>
            Book, search & compare trains, buses, flights.
          </p>
        </div>
        
        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap mt-10 md:mt-0">
          {footerLinks.map((footerlink) => (
            <div key={footerlink.title} className="flex flex-col ss:my-0 my-4 min-w-[150px]">
              <h4 className="font-medium text-[18px] leading-[27px] text-white">{footerlink.title}</h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li key={link.name} className={`${index !== footerlink.links.length - 1 ? 'mb-4' : 'mb-0'}`}>
                    <NavLink 
                      to={link.link}
                      className={({ isActive }) => 
                        `font-normal text-[16px] leading-[24px] transition-all duration-300 cursor-pointer ${
                          isActive 
                            ? 'text-secondary font-medium' 
                            : 'text-dimWhite hover:text-secondary'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45] px-6">
        <p className="font-normal text-center text-[18px] leading-[27px] text-white">
          2025 TravelLite. All Rights Reserved.
        </p>
        
        <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <div
                key={social.id}
                className={`text-white text-xl cursor-pointer hover:text-secondary transition-colors duration-300 ${
                  index !== socialMedia.length - 1 ? 'mr-6' : 'mr-0'
                }`}
                onClick={() => window.open(social.link, '_blank')}
              >
                <IconComponent />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Footer;