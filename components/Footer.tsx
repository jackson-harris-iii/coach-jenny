import { Avatar, Footer } from 'flowbite-react';
import Link from 'next/link';
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from 'react-icons/bs';

const DashFooter = () => {
  return (
    <Footer bgDark={true}>
      <div className="w-full absolute inset-x-0 bottom-0 text-center">
        <div className="w-full bg-gray-700 py-6 px-4 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="CoachJenny™" year={2023} />
          <div className="text-gray-400 text-sm grid grid-cols-2 gap-4">
            <div className="self-center">alterok </div>
            <div>
              <Link href="https://twitter.com/_buildspace" target="_blank">
                <Avatar
                  alt="User settings"
                  img="https://pbs.twimg.com/profile_images/1591152764708585473/EXYGT1Z__400x400.jpg"
                  rounded={true}
                />
              </Link>
            </div>
          </div>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://twitter.com/jacksonthedev"
              target="_blank"
              icon={BsTwitter}
            />
            <Footer.Icon
              href="https://github.com/jackson-harris-iii/"
              target="_blank"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default DashFooter;
