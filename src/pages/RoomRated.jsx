import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Keyboard,
} from "swiper/modules";
import axiosInstance from "../../interceptor";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import ReactStars from "react-rating-stars-component";
import { FaRegStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const RoomRated = () => {
  const [rooms, setRooms] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar";
  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/rooms");
      setRooms(res.data.data);
      //
    }
    fetchData();
  }, []);
  const userId = localStorage.getItem("userId");
  const handleAddToFavourite = async (roomId) => {
    const { data } = await axiosInstance.post(`/rooms/favourites/${userId}`, {
      roomId,
    });
    setIsFavourite((prev) => !prev);
  };

  const topRatedRooms = rooms.sort((a, b) => b.ratingAvg - a.ratingAvg);
  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="flex flex-col justify-center font-secondary mx-2 sm:mx-10 dark:text-PrimaryDark">
        <h2 className="text-primary text-2xl font-secondary sm:text-4xl dark:text-PrimaryDark ">
          {t("rooms.rated-rooms")}
        </h2>
        <div className="flex gap-1 items-center mt-4 text-custom dark:text-[#CBB7A4]">
          {isArabic ? (
            <>
              <span className="mx-1">{t("rooms.guests")}</span> <FaRegStar />
            </>
          ) : (
            <>
              <FaRegStar />
              <span>{t("rooms.guests")}</span>
            </>
          )}
        </div>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        {topRatedRooms.map((room) => (
          <SwiperSlide key={room._id}>
            <div className="relative rounded-3xl overflow-hidden h-[320px]  mx-2">
              <img
                className="h-full w-full object-cover"
                src={room.images[0]}
                alt="room"
              />
              <div
                className={`absolute top-2 px-4 w-full flex ${
                  isArabic ? "flex-row-reverse" : "flex-row"
                } justify-between items-center`}
              >
                {room.promotionId.map((promotion) => (
                  <div
                    className={`bg-[#C2AF00] text-white py-1 px-2 rounded-full mt-2 `}
                    key={promotion._id}
                  >
                    <p>
                      {isArabic ? (
                        <>
                          {t("rooms.off")} {promotion.percentage}%{" "}
                        </>
                      ) : (
                        <>
                          {promotion.percentage}% {t("rooms.off")}
                        </>
                      )}
                    </p>
                  </div>
                ))}

                <div className="absolute top-2 right-3 w-8 h-8 bg-white  flex justify-center items-center rounded-full ">
                  <button onClick={() => handleAddToFavourite(room._id)}>
                    {isFavourite ? (
                      <FaRegHeart className="text-red-900 text-2xl text-center cursor-pointer" />
                    ) : (
                      <FaHeart className="text-red-900 text-2xl text-center cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                <div className="bg-secondary  rounded-t-2xl px-4 py-2 flex justify-between items-center dark:bg-[#7C6555]">
                  <div className="flex flex-col  ">
                    <p className="text-white capitalize  font-bold text-sm dark:text-[#ffffff]">
                      {isArabic ? (
                        <>
                          {" "}
                          {t("rooms.branch")} {room.hotelId.name_ar}{" "}
                        </>
                      ) : (
                        <>
                          {room.hotelId.name_en} {t("rooms.branch")}
                        </>
                      )}
                    </p>
                    <span className="text-white text-sm mt-1 capitalize dark:text-[#ffffff]">
                      {isArabic ? (
                        <>
                          {t("rooms.room")} {room.roomTypeId.type_ar}
                        </>
                      ) : (
                        <>
                          {room.roomTypeId.type_en} {t("rooms.room")}
                        </>
                      )}
                    </span>
                    <ReactStars
                      value={room.ratingAvg}
                      edit={false}
                      color="#ffffff"
                    />
                  </div>
                  <div>
                    <Link to={`/rooms/${room._id}`}>
                      <button className="bg-primary text-white text-sm py-2 px-6 rounded-full dark:bg-PrimaryDark dark:text-customDark font-semibold">
                        {t("rooms.checkout")}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RoomRated;
