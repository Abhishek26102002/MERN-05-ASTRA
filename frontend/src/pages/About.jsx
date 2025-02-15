import React from "react";
import { CircleCheckBig } from "lucide-react";
import Abhishek from "../components/Abhishek";

const About = () => {

  // make api for this or only  oneadmin can edit or show this field
  const sections = [
    {
      id: 1,
      title: "Our Mission",
      text: "At our company, we are committed to delivering excellence in every aspect. Our mission is to create value and leave a lasting impact through our innovative solutions.",
      image:
        "https://img.freepik.com/free-vector/illustrated-people-business-training_52683-60661.jpg?t=st=1736953977~exp=1736957577~hmac=dcefd9994abadab4388fc14dbd794074a76703f221fcfffbb678c67254a5da79&w=996",
      date: 2023,
    },
    {
      id: 2,
      title: "Our Vision",
      text: "Our vision is to be a global leader in our industry, fostering growth and innovation while maintaining the highest standards of integrity and customer satisfaction.",
      image:
        "https://img.freepik.com/free-vector/multi-device-targeting-concept-illustration_114360-7405.jpg?uid=R141417707&ga=GA1.1.1493008547.1735794767&semt=ais_tags_boosted",
      date: 2024,
    },
    {
      id: 3,
      title: "Our Team",
      text: "Behind every success is a great team. We take pride in our skilled professionals who work tirelessly to achieve our goals and make a difference.",
      image:
        "https://img.freepik.com/free-vector/designer-collection-concept_23-2148508641.jpg?t=st=1736954104~exp=1736957704~hmac=12f5b1e7390a818b821bc509e50a8d6c6778d63dc6283409bd33a95267648f9f&w=996",
      date: 2025,
    },
  ];
  return (
    <>
      <div className="h-full pt-5 ">
        <div className="w-full sm:w-[80%] mx-auto">
          <div className="flex flex-col items-center bg-base-300 pb-10 pt-10 rounded-xl">
            <div className="">
              <h1 className="text-6xl font-bold mb-10">Who am I</h1>
            </div>
            {/* 1st */}
            <Abhishek />
            {/* 1st End  */}

            {/* 2nd */}
            <div className="mt-10 mb-10 flex flex-col w-[90%] justify-center items-center">
              {sections?.map((post, idx) => (
                <ul
                  key={post?.id}
                  className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
                >
                  <li>
                    <div className="timeline-middle">
                      <CircleCheckBig />
                    </div>
                    <div
                      className={
                        idx % 2 === 0
                          ? "timeline-start mb-1 me-10 md:text-end"
                          : "timeline-end mb-1 me-10 md:text-end"
                      }
                    >
                      <img
                        className="w-96 h-60 rounded-lg"
                        src={post?.image || "/profile.png"}
                        alt=""
                      />
                    </div>
                    <hr className="bg-primary" />
                  </li>
                  <li>
                    <hr className="bg-primary" />
                    <div className="timeline-middle">
                      <CircleCheckBig />
                    </div>
                    <div
                      className={
                        idx % 2 === 0
                          ? "timeline-end md:mb-10"
                          : "timeline-start md:mb-10"
                      }
                    >
                      <time className="font-mono italic">{post?.date}</time>
                      <div className="text-lg font-black">{post?.title}</div>
                      {post?.text}
                    </div>
                    <hr className="bg-primary" />
                  </li>
                </ul>
              ))}
            </div>
            {/* 2nd End */}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
