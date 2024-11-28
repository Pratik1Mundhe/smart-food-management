import React from "react";
import Slider from "react-slick";
import { v4 } from "uuid";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface AnnouncementType {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const foodAnnouncements: AnnouncementType[] = [
  {
    title: "Weekly Menu Update - New Items Added",
    description:
      "We’ve updated the menu for the upcoming week. Enjoy delicious new options like Veggie Pancake Stacks and Mango Smoothies.",
    category: "Menu Update",
    imageUrl:
      "https://res.cloudinary.com/dcnpafcrg/image/upload/v1732789132/global-foods-1.jpg",
  },
  {
    title: "Holiday Special Menu Launch",
    description:
      "Celebrate the holiday season with our exclusive festive menu featuring seasonal delights and treats.",
    category: "Special Menu",
    imageUrl:
      "https://res.cloudinary.com/dcnpafcrg/image/upload/v1732789126/global-foods-2.jpg",
  },
  {
    title: "Lunch Timing Adjustment Notification",
    description:
      "Please note that lunch service will now be available from 12:30 PM to 2:00 PM starting next week.",
    category: "Schedule Change",
    imageUrl:
      "https://res.cloudinary.com/dcnpafcrg/image/upload/v1732789123/global-foods-3.jpg",
  },
  {
    title: "Feedback Request on Dinner Options",
    description:
      "We value your input! Share your thoughts on the current dinner menu and suggest improvements or new dishes.",
    category: "Feedback",
    imageUrl:
      "https://res.cloudinary.com/dcnpafcrg/image/upload/v1732789117/global-foods-4.jpg",
  },
];

const NextArrow = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler;
}): React.ReactElement => (
  <button
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white p-2 rounded-full"
    onClick={onClick}
  >
    <FaChevronRight className="text-xl" />
  </button>
);

const PrevArrow = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler;
}): React.ReactElement => (
  <button
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10  text-white p-2 rounded-full"
    onClick={onClick}
  >
    <FaChevronLeft className="text-xl" />
  </button>
);

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const renderAnnouncement = (
  announcement: AnnouncementType
): React.ReactElement => {
  const { title, description, imageUrl, category } = announcement;
  return (
    <div key={v4()} className="relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[50dvh] object-cover"
      />
      <div className="flex flex-col justify-center absolute left-10 bottom-10 w-1/2 bg-black/50 rounded text-white p-4">
        <h1 className=" text-white text-3xl font-bold">{title}</h1>
        <p className="text-xl">{category}</p>
        <p className="text-2xl text-warning mt-8">{description}</p>
      </div>
    </div>
  );
};

const Announcements: React.FC = () => {
  return (
    <Slider {...settings}>
      {foodAnnouncements.map((announcement) => {
        return renderAnnouncement(announcement);
      })}
    </Slider>
  );
};

export default Announcements;
