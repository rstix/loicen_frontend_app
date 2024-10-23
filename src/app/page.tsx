'use client';

import Image from 'next/image';

import { Roboto } from 'next/font/google';
import ExpandableBox from '@/components/landing-page/expandable-box';
import saveLead from '@/actions/save-lead';
import { createRef, useState } from 'react';
import Link from 'next/link';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const HomePage = () => {
  const ref = createRef<HTMLFormElement>();
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const handleSubmit = async (formData: FormData) => {
    const response = await saveLead(formData);
    if (response) {
      // success
      setShowSuccessModal(true);
      ref!.current!.reset();
    } else {
      // fail
    }
  };

  return (
    <div className={roboto.className}>
      <div className="bg-white text-gray-very_dark">
        <div className="flex flex-1 flex-col align-middle justify-center items-center max-w-[1560px] mx-auto">
          <div className="sm:px-6 px-8 z-10">
            <nav className="flex w-full justify-between text-white p-3 px-5 bg-gray-very_dark border border-gray mt-2 rounded-[15px]">
              <Link
                className="flex gap-2 px-3 py-1 bg-background rounded-lg"
                href="/"
              >
                <Image
                  src="/img/loicen_logo.svg"
                  width={34}
                  height={34}
                  alt="search box"
                />
                <p className="max-sm:hidden font-semibold text-[25px]">
                  Loicen
                </p>
              </Link>

              <div className="flex gap-6 align-middle">
                {/* <ScrolLink id="product">Solution</ScrolLink>
                <ScrolLink id="about-us">Data Privacy</ScrolLink>
                <ScrolLink id="pricing">Pricing</ScrolLink> */}
                <a
                  href="mailto:rmnstix@gmail.com"
                  className="flex justify-center items-center bg-gray-light p-1 px-2 text-gray-very_dark rounded-md font-semibold"
                >
                  Contact sales
                </a>
              </div>
            </nav>

            <div className="mt-[160px]  max-w-[1250px] flex  items-center flex-col">
              <div className="flex justify-center flex-col items-center">
                <h1 className="md:text-[62px] sm:text-[52px] text-[42px] font-bold leading-tight  text-gray-very_dark mx-6 text-center">
                  Supercharge your legal research, with the power of AI.
                </h1>
                <h4 className="md:text-[28px] sm:text-[24px] text-[22px] text-gray-very_dark leading-tight my-6 md:mx-40 mx- text-center">
                  Designed by lawyers for lawyers, Loicen integrates seamlessly
                  into your firm’s workflow, saving up to 80% of legal research
                  time, empowering your team to achieve better outcomes for
                  clients.
                </h4>
                <div className="flex gap-4">
                  {/* <button className="border-2 p-2 px-3 rounded-md font-semibold">
                    View a demo
                  </button> */}
                  {/* <button className="bg-gray-very_dark p-2 px-3 text-white rounded-md font-semibold">
                    Contact sales
                  </button> */}
                  <a
                    href="mailto:rmnstix@gmail.com"
                    className="flex justify-center items-center bg-gray-very_dark p-2 px-3 text-white rounded-md font-semibold"
                  >
                    Contact sales
                  </a>
                </div>
              </div>

              <div className="flex mt-[80px]">
                <Image
                  src="/img/loicen_app.jpg"
                  width={1250}
                  height={850}
                  alt="loice app"
                />
              </div>

              <div className="flex flex-col mt-[120px]">
                <h3 className="md:text-[48px] sm:text-[40px] text-[36px] font-bold leading-tight">
                  Bring all your work and knowledge,{' '}
                  <span className="md:block">in the same secure place</span>
                </h3>

                <h4 className="md:text-[24px] sm:text-[20px] text-[18px] leading-tight mt-6 mb-12">
                  Legal research consumes up to 35% of a law firm’s workload,
                  taking hours to sift through complex databases and driving up
                  costs. Loicen streamlines this process, saving time, reducing
                  costs, and allowing lawyers to focus on high-value tasks.
                </h4>

                <div className="flex flex-col gap-10">
                  <div className="flex flex-wrap md:flex-nowrap gap-10">
                    <div className="md:basis-3/5 flex flex-col justify-evenly bg-gray-very_light p-10 rounded-lg">
                      <div className="flex justify-center my-12">
                        <Image
                          src="/img/search_box.png"
                          width={650}
                          height={350}
                          alt="search box"
                        />
                      </div>
                      <div className="self-end">
                        <h5 className="md:text-[32px] text-[24px] font-semibold">
                          Get answers
                        </h5>
                        <p className="text-gray md:text-[24px] sm:text-[20px] text-[18px]">
                          Effortlessly access and search your firm’s database
                          making making finding the right information as simple
                          as having a conversation.
                        </p>
                      </div>
                    </div>

                    <div className="md:basis-2/5 flex flex-col bg-gray-very_light p-10 rounded-xl">
                      <div className="flex justify-center my-8">
                        <Image
                          src="/img/security.svg"
                          width={250}
                          height={230}
                          alt="search box"
                          className="max-w-[240px]"
                        />
                      </div>
                      <h5 className="md:text-[32px] text-[24px] font-semibold">
                        Stay secure
                      </h5>
                      <p className="text-gray md:text-[24px] sm:text-[20px] text-[18px]">
                        Anonymize sensitive information with Loicen, ensuring
                        the security of your data and your clients data.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap md:flex-nowrap gap-20 justify-evenly bg-gray-very_light p-10 rounded-xl">
                    <Image
                      src="/img/working_together.svg"
                      width={250}
                      height={250}
                      alt="search box"
                      className="md:basis-1/2 max-w-[240px]"
                    />
                    <div className="md:basis-1/2 flex flex-col justify-end">
                      <h5 className="md:text-[32px] text-[24px] font-semibold">
                        Reduce time and effort
                      </h5>
                      <p className="text-gray md:text-[24px] sm:text-[20px] text-[18px]">
                        Loicen integrates with your firm’s knowledge base,
                        saving time on legal research, boosting productivity,
                        and reducing costs, allowing lawyers to focus on
                        high-value tasks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:flex-nowrap gap-12 mt-[100px]">
                <div className="lg:basis-2/5">
                  <h3 className="md:text-[48px] sm:text-[40px] text-[36px] font-bold leading-tight">
                    Modeled around your workflow and needs
                  </h3>
                  <h4 className="md:text-[24px] sm:text-[20px] text-[18px] leading-tight mt-6 mb-12">
                    Loicen is an AI-powered chatbot assistant designed
                    specifically for legal firms.
                  </h4>
                  <ExpandableBox
                    isOpen={true}
                    headline="No more searching"
                    text="Research is time-consuming, often taking hours or even days for lawyers to sift through vast databases of complex case documents."
                  ></ExpandableBox>
                  <ExpandableBox
                    isOpen={true}
                    headline="Anonymize sensitive information"
                    text="Our system automatically redacts private details to prevent any unauthorized access or disclosure."
                  ></ExpandableBox>
                </div>
                <div className="lg:basis-3/5 flex flex-col justify-evenly bg-gray-very_light p-10 rounded-lg">
                  <div className="flex justify-center my-12">
                    <Image
                      src="/img/overworked.svg"
                      width={350}
                      height={350}
                      alt="search box"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-[100px]">
                <h3 className="md:text-[48px] sm:text-[40px] text-[36px] font-bold leading-tight">
                  We handle your data with discretion. Trusted by law firms
                  around the wold.
                </h3>

                <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6  mt-[40px]">
                  <div className="lg:basis-1/3 basis-full md:text-[24px] sm:text-[20px] text-[18px] flex flex-col bg-gray-very_light p-10 rounded-lg">
                    {/* <div className="flex justify-center my-12">
                    <Image
                      src="/img/search_box.png"
                      width={650}
                      height={350}
                      alt="search box"
                    />
                  </div> */}
                    <h5 className="font-semibold">Secure servers</h5>
                    <p className="text-gray md:text-[24px] sm:text-[20px] text-[18px]">
                      We don’t use third party commercial AIs. Your data is safe
                      with us.
                    </p>
                  </div>

                  <div className="lg:basis-1/3 basis-full md:text-[24px] sm:text-[20px] text-[18px] flex flex-col bg-gray-very_light p-10 rounded-lg">
                    {/* <div className="flex justify-center my-12">
                    <Image
                      src="/img/search_box.png"
                      width={650}
                      height={350}
                      alt="search box"
                    />
                  </div> */}
                    <h5 className="font-semibold">Advanced permissions</h5>
                    <p className="text-gray md:text-[24px] sm:text-[20px] text-[18px]">
                      Set detailed access controls to define who can view
                      specific information and resources.
                    </p>
                  </div>

                  <div className="lg:basis-1/3 basis-full md:text-[24px] sm:text-[20px] text-[18px] flex flex-col bg-gray-very_light p-10 rounded-lg">
                    {/* <div className="flex justify-center my-12">
                    <Image
                      src="/img/search_box.png"
                      width={650}
                      height={350}
                      alt="search box"
                    />
                  </div> */}
                    <h5 className="font-semibold">Committed to excellence</h5>
                    <p className="text-gray md:text-[24px] sm:text-[20px] text-[18px]">
                      We keep evolving. Our security policies and controls
                      continuously meet the highest industry standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap items-center mt-[100px] gap-6 bg-gray-very_light p-10 rounded-lg">
                <div className="md:basis-1/2 basis-full">
                  <h4 className="md:text-[36px] sm:text-[30px] text-[26px] font-semibold leading-tight">
                    Ready to speedup your team’s research?
                  </h4>
                </div>
                <div className="md:basis-1/2 basis-full max-sm:pb-[40px] relative">
                  <form ref={ref} action={handleSubmit} className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address..."
                      className="flex p-4 flex-1 w-full"
                    />
                    <button
                      type="submit"
                      className="absolute max-sm:left-1/2 max-sm:-bottom-[105%] max-sm:-translate-x-1/2  sm:-translate-x-auto  sm:top-1/2 sm:-translate-y-1/2 sm:right-1 bg-gray-very_dark p-2 px-3 text-white rounded-md font-semibold"
                    >
                      Contact sales
                    </button>
                  </form>
                  {showSuccessModal && (
                    <div className="absolute top-full left-0 text-sm font-semibold p-2">
                      We got your email, we will get in touch soon.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-gray-very_dark text-white z-0 flex align-middle justify-center items-center -mt-[40px] w-full px-4 py-[80px]">
          <div className="flex max-w-[1250px] w-full justify-between items-center">
            <div className="flex gap-2 ">
              <Image
                src="/img/loicen_logo.svg"
                width={55}
                height={55}
                alt="search box"
              />
              <p className=" font-semibold text-[40px]">Loicen</p>
            </div>
            <a
              href="https://www.linkedin.com/company/loicen"
              target="_blank"
              className="flex"
            >
              <Image
                src="/img/linkedin.svg"
                width={25}
                height={25}
                alt="search box"
              />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
