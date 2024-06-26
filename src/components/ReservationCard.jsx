import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import calculateTotalPrice from "../utils/calcTotalPrice";

function ReservationCard({
  roomData,
  calcNoOfNights,
  calcTotalPrice,
  reserve,
}) {
  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar";
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);

  useEffect(() => {
    const fetchDataAndCalculatePrice = async () => {
      try {
        const price = await calculateTotalPrice(roomData, 1);
        setPriceAfterDiscount(price);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAndCalculatePrice();
  }, [roomData]);

  return (
    <div className="p-4 w-full md:max-w-[300px] lg:w-[400px] border rounded-2xl border-main-800 dark:border-main-25">
      <div className="flex justify-between gap-2 border-b-2 border-main-800 dark:border-main-25 pb-2">
        {roomData.images && (
          <div>
            <div className="relative">
              <div
                className={`bg-[#0f314f] text-white py-1 px-2 rounded-full mt-2 absolute top-1 ltr:left-1 rtl:right-1 `}
              >
                {roomData.promotionId && (
                  <p>
                    {isArabic ? (
                      <>
                        {t("rooms.off")} {roomData.promotionId.percentage}%
                      </>
                    ) : (
                      <>
                        {roomData.promotionId.percentage}% {t("rooms.off")}
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
            <img
              className="w-[150px] rounded-2xl"
              src={roomData?.images[0]}
              alt=""
            />
          </div>
        )}
        <div>
          <h3 className="font-bold text-main-800 dark:text-main-25 text-xl">
            {isArabic ? roomData.hotelId?.name_ar : roomData.hotelId?.name_en}
          </h3>
          <p className="text-main-800 dark:text-main-25 py-1">
            {isArabic ? roomData.title_ar : roomData.title_en}
          </p>
        </div>
      </div>
      <h4 className="py-3 text-xl text-main-800 dark:text-main-25 font-bold">
        {t("booking.price-details")}
      </h4>
      <div className="flex justify-between text-main-300 dark:text-main-25">
        <div>
          <span
            className={
              priceAfterDiscount != roomData.price ? "line-through " : ""
            }
          >
            {roomData.currency}
            {roomData.price}
          </span>
          x {calcNoOfNights}
        </div>
        <div
          className={`font-bold
             ${priceAfterDiscount != roomData.price ? "line-through " : ""}`}
        >
          {roomData.currency}
          {calcTotalPrice}
        </div>
      </div>
      {priceAfterDiscount != roomData.price && (
        <div className="flex justify-between text-main-300 dark:text-main-25">
          <div>
            <span>
              {roomData.currency}
              {priceAfterDiscount}
            </span>
            x {calcNoOfNights}
          </div>
          <div className="font-bold">
            {roomData.currency}
            {priceAfterDiscount * calcNoOfNights}
          </div>
        </div>
      )}
      <h5 className="py-2 text-main-300 dark:text-main-25">
        {calcNoOfNights} {t("booking.nights")}
      </h5>
      <div className="flex pb-2 justify-between text-main-300 dark:text-main-25">
        <div>
          {isArabic ? roomData.hotelId?.name_ar : roomData.hotelId?.name_en}
        </div>
        <div>
          {isArabic
            ? roomData.hotelId?.address_ar
            : roomData.hotelId?.address_en}
        </div>
      </div>
      <h5 className="pb-5 pt-1 text-main-300 dark:text-main-25">
        {isArabic ? roomData.roomTypeId?.type_ar : roomData.roomTypeId?.type_en}
      </h5>
      <button
        className="rounded-3xl bg-main-800 dark:bg-main-25 dark:text-main-1000 dark:font-bold py-2 px-4 text-white w-full"
        onClick={reserve}
      >
        {t("booking.book-now")}
      </button>
    </div>
  );
}
export default ReservationCard;
