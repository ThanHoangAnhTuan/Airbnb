import { useEffect, useState } from "react";

const Footer = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [screenWidth]);

  return (
    <>
      {screenWidth >= 1200 && (
        <div className="bg-slate-100 mt-5">
          <div className="container">
            <div className="flex p-5">
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Giới thiệu</h2>
                <div className="flex-col">
                  <p className="mt-2">Phương thức hoạt động của Airbnb</p>
                  <p className="mt-2">Trang tin tức</p>
                  <p className="mt-2">Nhà đầu tư</p>
                  <p className="mt-2">Airbnb Plus</p>
                  <p className="mt-2">Airbnb Luxe</p>
                  <p className="mt-2">Hotel Tonight</p>
                  <p className="mt-2">Airban for Work</p>
                  <p className="mt-2">Nhờ Host mọi thứ đều có thể</p>
                  <p className="mt-2">Cơ hội nghề nghiệp</p>
                  <p className="mt-2">Thư của nhà sáng lập</p>
                </div>
              </div>
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Cộng đồng</h2>
                <div className="flex-col">
                  <p className="mt-2">Sự đa dạn và cảm giác thân thuộc</p>
                  <p className="mt-2">Tiện nghi phù hợp cho người khuyết tật</p>
                  <p className="mt-2">Đối tác liên kết Airbnb</p>
                  <p className="mt-2">Chỗ ở cho tuyến đầu</p>
                  <p className="mt-2">Lượt giới thiệu của khách</p>
                  <p className="mt-2">Airbnb.org</p>
                </div>
              </div>
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Đón tiếp khách</h2>
                <div className="flex-col">
                  <p className="mt-2">Cho thuê nhà</p>
                  <p className="mt-2">Tổ chức Trải nghiệm trực tuyến</p>
                  <p className="mt-2">Tổ chức Trải nghiệm</p>
                  <p className="mt-2">Đón tiếp khách có trách nhiệm</p>
                  <p className="mt-2">Trung tâm tài nguyên</p>
                  <p className="mt-2">Trung tâm cộng đồng</p>
                </div>
              </div>
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Hỗ trợ</h2>
                <div className="flex-col">
                  <p className="mt-2">
                    Biện pháp đối phó với đại dịch COVID-19 của chúng tôi
                  </p>
                  <p className="mt-2">Trung tâm trợ giúp</p>
                  <p className="mt-2">Các tùy chọn hủy</p>
                  <p className="mt-2">Hỗ trợ khu dân cư</p>
                  <p className="mt-2">Tin cậy và an toàn</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex">
              <p className="text-lg basis-3/4">
                © 2021 Airbnb, Inc. All rights reserved - Quyền riêng tư - Điều
                khoản - Sơ đồ trang web
              </p>
              <div className="basis-1/4 text-lg pl-48">
                <i className="fa-brands fa-facebook mr-3"></i>
                <i className="fa-brands fa-twitter mr-3"></i>
                <i className="fa-brands fa-instagram mr-3"></i>
              </div>
            </div>
          </div>
        </div>
      )}
      {screenWidth >= 768 && screenWidth < 1200 && (
        <div className="bg-slate-100 mt-5">
          <div className="container">
            <div className="flex p-5">
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Giới thiệu</h2>
                <div className="flex-col">
                  <p className="mt-2">Phương thức hoạt động của Airbnb</p>
                  <p className="mt-2">Trang tin tức</p>
                  <p className="mt-2">Nhà đầu tư</p>
                  <p className="mt-2">Airbnb Plus</p>
                  <p className="mt-2">Airbnb Luxe</p>
                  <p className="mt-2">Hotel Tonight</p>
                  <p className="mt-2">Airban for Work</p>
                  <p className="mt-2">Nhờ Host mọi thứ đều có thể</p>
                  <p className="mt-2">Cơ hội nghề nghiệp</p>
                  <p className="mt-2">Thư của nhà sáng lập</p>
                </div>
              </div>
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Cộng đồng</h2>
                <div className="flex-col">
                  <p className="mt-2">Sự đa dạn và cảm giác thân thuộc</p>
                  <p className="mt-2">Tiện nghi phù hợp cho người khuyết tật</p>
                  <p className="mt-2">Đối tác liên kết Airbnb</p>
                  <p className="mt-2">Chỗ ở cho tuyến đầu</p>
                  <p className="mt-2">Lượt giới thiệu của khách</p>
                  <p className="mt-2">Airbnb.org</p>
                </div>
              </div>
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Đón tiếp khách</h2>
                <div className="flex-col">
                  <p className="mt-2">Cho thuê nhà</p>
                  <p className="mt-2">Tổ chức Trải nghiệm trực tuyến</p>
                  <p className="mt-2">Tổ chức Trải nghiệm</p>
                  <p className="mt-2">Đón tiếp khách có trách nhiệm</p>
                  <p className="mt-2">Trung tâm tài nguyên</p>
                  <p className="mt-2">Trung tâm cộng đồng</p>
                </div>
              </div>
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Hỗ trợ</h2>
                <div className="flex-col">
                  <p className="mt-2">
                    Biện pháp đối phó với đại dịch COVID-19 của chúng tôi
                  </p>
                  <p className="mt-2">Trung tâm trợ giúp</p>
                  <p className="mt-2">Các tùy chọn hủy</p>
                  <p className="mt-2">Hỗ trợ khu dân cư</p>
                  <p className="mt-2">Tin cậy và an toàn</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex">
              <p className="text-lg basis-3/4">
                © 2021 Airbnb, Inc. All rights reserved - Quyền riêng tư - Điều
                khoản - Sơ đồ trang web
              </p>
              <div className="basis-1/4 text-lg pl-48">
                <i className="fa-brands fa-facebook mr-3"></i>
                <i className="fa-brands fa-twitter mr-3"></i>
                <i className="fa-brands fa-instagram mr-3"></i>
              </div>
            </div>
          </div>
        </div>
      )}
      {screenWidth < 768 && (
        <div className="bg-slate-100 mt-5">
          <div className="container">
            <div className="flex p-5">
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Giới thiệu</h2>
                <div className="flex-col">
                  <p className="mt-2">Phương thức hoạt động của Airbnb</p>
                  <p className="mt-2">Trang tin tức</p>
                  <p className="mt-2">Nhà đầu tư</p>
                  <p className="mt-2">Airbnb Plus</p>
                  <p className="mt-2">Airbnb Luxe</p>
                  <p className="mt-2">Hotel Tonight</p>
                  <p className="mt-2">Airban for Work</p>
                  <p className="mt-2">Nhờ Host mọi thứ đều có thể</p>
                  <p className="mt-2">Cơ hội nghề nghiệp</p>
                  <p className="mt-2">Thư của nhà sáng lập</p>
                </div>
              </div>
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Cộng đồng</h2>
                <div className="flex-col">
                  <p className="mt-2">Sự đa dạn và cảm giác thân thuộc</p>
                  <p className="mt-2">Tiện nghi phù hợp cho người khuyết tật</p>
                  <p className="mt-2">Đối tác liên kết Airbnb</p>
                  <p className="mt-2">Chỗ ở cho tuyến đầu</p>
                  <p className="mt-2">Lượt giới thiệu của khách</p>
                  <p className="mt-2">Airbnb.org</p>
                </div>
              </div>
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Đón tiếp khách</h2>
                <div className="flex-col">
                  <p className="mt-2">Cho thuê nhà</p>
                  <p className="mt-2">Tổ chức Trải nghiệm trực tuyến</p>
                  <p className="mt-2">Tổ chức Trải nghiệm</p>
                  <p className="mt-2">Đón tiếp khách có trách nhiệm</p>
                  <p className="mt-2">Trung tâm tài nguyên</p>
                  <p className="mt-2">Trung tâm cộng đồng</p>
                </div>
              </div>
              <div className="basis-1/4">
                <h2 className="font-semibold uppercase">Hỗ trợ</h2>
                <div className="flex-col">
                  <p className="mt-2">
                    Biện pháp đối phó với đại dịch COVID-19 của chúng tôi
                  </p>
                  <p className="mt-2">Trung tâm trợ giúp</p>
                  <p className="mt-2">Các tùy chọn hủy</p>
                  <p className="mt-2">Hỗ trợ khu dân cư</p>
                  <p className="mt-2">Tin cậy và an toàn</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex">
              <p className="text-lg basis-3/4">
                © 2021 Airbnb, Inc. All rights reserved - Quyền riêng tư - Điều
                khoản - Sơ đồ trang web
              </p>
              <div className="basis-1/4 text-lg pl-48">
                <i className="fa-brands fa-facebook mr-3"></i>
                <i className="fa-brands fa-twitter mr-3"></i>
                <i className="fa-brands fa-instagram mr-3"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
