import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import api from "../../utils/config";
import { useParams } from "react-router-dom";
import Footer from "../../Components/Footer";

/**
 * Anh chuyển qua trang room list dùm e với key rồi, h e sử dụng useParams lấy cái key đó về, xong tìm trong danh sách phòng,
 * phòng nào có vị trí gần giống (chỉ cần so sánh có khớp là được, không cần giống 100%, so giống bên home anh so á)
 * location.tinhThanh.toLowerCase().includes(value.trim().toLowerCase())
 * sau đó e render danh sách phòng ra
 * ok không???
 * Tạm thời mình để cái google map là tĩnh đi, không cần động, sau này còn time thì thêm vào sau
 *
 */
const RoomList = () => {
  const { cityName, cityId } = useParams();

  const [arrListRoom, setArrListRoom] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const getApiListRoom = async () => {
    try {
      const res = await api.get(
        `/phong-thue/lay-phong-theo-vi-tri?maViTri=${cityId}`
      );
      setArrListRoom(res.data.content);
    } catch (error) {
      console.error("Error fetching room list:", error);
    }
  };

  useEffect(() => {
    getApiListRoom();
  }, []);

  useEffect(() => {
    let sortRooms = [...arrListRoom];
    sortRooms.sort((a, b) => sortOrder === 'asc' ? a.giaTien - b.giaTien : b.giaTien - a.giaTien);
    setArrListRoom(sortRooms);
  }, [sortOrder]);

  return (
    <div>
      <Header />
      <div className="flex ml-8">
        <div className="basis-3/5 mt-9">
          <p className="p_list">Hơn 350 chỗ ở 16 thg 4 - 14 thg 6</p>
          <h3 className="text-3xl">Chỗ ở tại khu vực đã chọn</h3>
          <div className="mt-3">
            <button className="btn mr-5 bt_list">Loại nơi ở</button>
            <button className="btn mr-5 bt_list" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>Giá</button>
            <button className="btn mr-5 bt_list">Đặt ngay</button>
            <button className="btn mr-5 bt_list">Phòng và phòng ngủ</button>
            <button className="btn mr-5 bt_list">Bộ lọc khác</button>
          </div>
          {arrListRoom.map((room) => (
            <div key={room.id} className="relative">
              <hr className="w-full mt-4" />
              <div className="inline-flex mt-9 w-full">
                <img
                  className="img_list"
                  src={room.hinhAnh}
                  alt=""
                />
                <div className="ml-2 items-center">
                  <p className="p_list">{room.tenPhong}</p>
                  <h2 className="text-2xl text-slate-600">{room.moTa.length > 100 ? room.moTa.slice(0, 100) + '...' : room.moTa}</h2>
                  <hr style={{ width: 50 }} className="mt-4 mb-4" />
                  <p className="p_list"> {room.khach} khách - {room.giuong} giường - {room.phongNgu} phòng ngủ - {room.phongTam} phòng tắm  </p>
                  <p className="p_list">{room.wifi? 'Wifi-' : null} 
                  {room.banLa? ' Bàn là ' : null} 
                  {room.mayGiat? '- Máy giặt ' : null} 
                  {room.tivi? '- Tivi ' : null} 
                  {room.dieuHoa? '- Điều hòa' : null} 
                  {room.bep? '- Bếp' : null} 
                  {room.hoBoi? '- Hồ bơi' : null} 
                 
                 
                   </p>
                  <span className="absolute text-xl font-medium price_list">
                    ${room.giaTien}/tháng
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="basis-2/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.765283363988!2d106.67772000445909!3d10.775218526262998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1714403318166!5m2!1svi!2s"
            className="h-screen"
            width={600}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default RoomList;
