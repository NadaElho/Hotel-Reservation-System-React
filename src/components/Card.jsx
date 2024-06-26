import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { LanguageContext } from "../providers/LanguageContext";
import { useContext } from "react";
import ReactStars from "react-rating-stars-component";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

const Card = ({
  room,
  userData,
  favouriteRoomsIds,
  handleAddToFavourite,
  from,
}) => {
  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar";

  const calcPrice = (room) => {
    let calcTotalPrice = 0;

    if (room.promotionId) {
      calcTotalPrice = room.price * (1 - room.promotionId.percentage / 100);
    } else {
      calcTotalPrice = room.price;
    }

    if (userData?.subscriptionId) {
      calcTotalPrice *= 1 - userData.subscriptionId.percentage / 100;
    }
    return Math.round(calcTotalPrice);
  };

  return (
    <div className={from == "favourites" ? "w-fit" : "container"}>
      <div className="relative w-[350px] h-64 rounded-3xl overflow-hidden mt-10 mx-4 lg:mx-0">
        <img
          className="h-full w-full object-cover"
          src={room.images[0]}
          alt="Room"
        />
        <div
          className={`absolute top-2 px-4 w-full flex justify-between items-center`}
        >
          {room.promotionId && (
            <div
              className={`bg-[#0f314f] text-white  py-1 px-2 rounded-full mt-2 `}
            >
              <p>
                {isArabic ? (
                  <>
                    {t("rooms.off")} {room.promotionId.percentage}%
                  </>
                ) : (
                  <>
                    {room.promotionId.percentage}% {t("rooms.off")}
                  </>
                )}
              </p>
            </div>
          )}

          {localStorage.getItem("userId") && (
            <div className="absolute top-2 ltr:right-3 rtl:left-3 w-8 h-8 bg-white flex justify-center items-center rounded-full ">
              <span
                className="text-red-900 text-3xl text-center cursor-pointer"
                onClick={() => handleAddToFavourite(room._id)}
              >
                {favouriteRoomsIds && favouriteRoomsIds.includes(room._id) ? (
                  <FaHeart className="text-red-900 text-2xl text-center cursor-pointer" />
                ) : (
                  <FaRegHeart className="text-red-900 text-2xl text-center cursor-pointer" />
                )}
              </span>
            </div>
          )}
        </div>
        <div className=" absolute bottom-0 left-0 flex items-center justify-center  ">
          <div
            className={`py-1 px-4 w-44 flex flex-col gap-1 bg-secondary rounded dark:bg-[#7C6555]`}
          >
            <p className="text-white font-semibold text-sm">
              {room.hotelId && isArabic ? (
                <>
                  {t("rooms.branch")} {room.hotelId.name_ar}
                </>
              ) : (
                <>
                  {room.hotelId.name_en} {t("rooms.branch")}
                </>
              )}
            </p>
            <p className="text-white text-sm opacity-95">
              {`${
                room.roomTypeId && isArabic
                  ? room.roomTypeId.type_ar
                  : room.roomTypeId.type_en
              }`}
            </p>
            <ReactStars value={room.ratingAvg} edit={false} color="#ffffff" />
            <div className="flex text-xs gap-1">
              <span
                className={`${
                  room.price != calcPrice(room) ? "line-through " : ""
                } text-primary dark:text-PrimaryDark`}
              >
                ${room.price}
              </span>
              {room.price != calcPrice(room) && (
                <span className="text-primary dark:text-PrimaryDark">
                  ${calcPrice(room)}
                </span>
              )}
              <a className="text-primary mt-0.5 dark:text-PrimaryDark">
                <AiOutlineExclamationCircle />
              </a>
              <span className="text-primary dark:text-PrimaryDark">
                {t("rooms.Per-night")}
              </span>
            </div>
            <p className="text-primary font-500 text-xs font-semibold dark:text-PrimaryDark">
              {t("rooms.taxes-fees")}
            </p>
          </div>
          <div className=" mx-6 mt-16">
            <Link to={`/rooms/${room._id}`}>
              <button className="bg-primary text-white text-xs py-1 w-32 font-semibold rounded-full dark:bg-[#E2C8AD] dark:text-customDark ">
                {t("rooms.Reserve-Now")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
