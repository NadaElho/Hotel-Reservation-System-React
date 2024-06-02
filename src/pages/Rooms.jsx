import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Rooms = () => {
  const [value, setValue] = useState([0, 10000]);
  const [rooms, setRooms] = useState([]);
  const [params] = useSearchParams()
  const onValueChange = (values) => {
    setValue(values);
  };
  let arr = params.toString().split("&")
  let filterObj = {}
  arr.forEach((query)=>{
    let [key, value] = query.split("=")
    value = decodeURIComponent(value);
    if(key == "checkIn" || key == "checkOut"){
      filterObj[key] = new Date(value).toISOString()
    }else{
      filterObj[key] = value
    }
  })
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/rooms", {
          params: {
            "price[gt]": value[0],
            "price[lt]": value[1],
            ...filterObj
          }
        });
        const data = res.data.data;
        console.log(data);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
    fetchData();
  }, [value]);

  return (
    <>
      <div className="container mx-auto flex mt-16">
        <div className="w-80 border border-secondary rounded-3xl h-64 mx-10 flex flex-col justify-around hidden sm:block">
          <div className="mx-10 mt-4">
            <p className="text-secondary text-xl font-semibold">Filter by</p>
            <p className="text-primary font-semibold text-2xl mt-2">Price per night</p>
            <div className="flex space-x-3 mt-8">
              <div className="w-28 h-14 bg-white border border-custom p-1 rounded-lg">
                <label htmlFor="minInput" className="font-semibold">Min</label>
                <input
                  type="text"
                  max="10000"
                  value={value[0]}
                  onChange={(event)=>setValue([event.target.value === "" ? 0 : parseInt(event.target.value),value[1]])}
                  //pareseint === min but value[1] = max 
                  className="w-full border-none border-b-2 border-black focus:outline-none focus:border-custom-500"
                />
              </div>
              <div className="w-28 h-14 bg-white border border-custom p-1 rounded-lg">
                <label htmlFor="maxInput" className="font-semibold">Max</label>
                <input
                  type="text"
                  value={value[1]}
                  onChange={(event)=> setValue([ value[0],event.target.value === "" ? 40 : parseInt(event.target.value)])}
                  min="0"
                  className="w-full border-none border-b-2 border-black focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex mt-10">
              <RangeSlider
                min={0}
                max={10000}
                value={value}
                onInput={onValueChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {rooms.map((room) => (
            <div
              className="w-full sm:max-w-96 rounded-3xl overflow-hidden shadow-lg border border-secondary border-opacity-40 "
              key={room._id}
            >
              <img
                className="w-full h-64 object-cover"
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
                alt=""
              />
              <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2 text-primary">
                  {room.roomTypeId.type_en}
                </div>
                <p className="text-primary opacity-80 font-semibold text-sm text-justify tracking-tight mt-4">
                  {room.description_en}
                </p>
                <hr className="bg-primary mt-4" />
              </div>
              <div className="px-6 pt-4 pb-2 text-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                </span>
                <hr className="bg-primary" />
                <div className="w-full flex justify-between py-8">
                  <button className="w-40 bg-primary text-white text-sm opacity-95 py-3 px-4 rounded-full inline-flex items-center">
                    <Link to="/reservation-room/:id">
                      Book now for ${room.price}
                    </Link>
                  </button>
                  <button className="w-40 bg-transparent border border-primary rounded-full text-primary opacity-95 font-semibold py-2 px-4 inline-flex items-center justify-center">
                    <Link to={`/rooms/${room._id}`}>Check details</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* room */}
    </>
  );
};

export default Rooms;




