// import libs
import React from "react";

import "./about-us.css";

export default function AboutUsPage() {
  return (
    <main className="about-us__container">
      <section className="about-us__about-information white">
        <div className="about-us__about-information__wrapper">
          <h1 className="about-us__about-information__title">
             Cửa hàng bán đồ ăn nhanh
            <span className="about-us__about-information__title-after"></span>
          </h1>
          <h4 className="about-us__about-information__subtitle">
            Shop tự hào khi là một shop bán đồ ăn nhanh từ nam ra bắc
          </h4>
        </div>
        <div className="about-us__service__container">
          <div className="about-us__service__wrapper">
            <div className="about-us__service__imgs__cover">
              <img
                className="about-us__service__img"
                src="https://khoaquangminh.com/news/product-quanlity.png"
                alt="Chất lượng thật - Giá trị thật"></img>
            </div>
            <h3>Chất lượng thật - Giá trị thật</h3>
            <p>
              Số lượng sản phẩm và dịch vụ tốt nhất với chủng loại đa dạng,
              phong phú sẽ đáp ứng tất cả nhu cầu mua sắm của bạn.
            </p>
          </div>
          <div className="about-us__service__wrapper">
            <div className="about-us__service__imgs__cover">
              <img
                className="about-us__service__img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5w57NdMMwkL3PQE8xqzTRIrs8z_5hdsfLBg&usqp=CAU"
                alt="Tích điểm"></img>
            </div>
            <h3>Tích điểm dựa trên hóa đơn của bạn</h3>
            <p>
              
            </p>
          </div>
          <div className="about-us__service__wrapper">
            <div className="about-us__service__imgs__cover">
              <img
                className="about-us__service__img"
                src="https://luoithephuyvu.com/media/k2/items/cache/13f34e2b533e12c6166f88368dcd8c07_L.jpg"
                alt="Hỗ trợ giao hàng toàn quốc"></img>
            </div>
            <h3>Hỗ trợ giao hàng toàn quốc</h3>
            <p>
              Miễn phí vận chuyển nội thành thành phố Hồ Chí Minh cho các đơn
              hàng từ 399.000đ trở lên.
            </p>
          </div>
        </div>
      </section>
      {/* <section className="about-us__about-members brown-img">
        <div className="about-us__about-members__wrapper">
          <div className="about-us__about-members__title">
            Đội ngũ nhân viên
            <span className="about-us__about-members__title-after"></span>
          </div>
          <h4 className="about-us__about-members__subtitle">
            Chúng tôi tạo dựng môi trường làm việc thân thiện cho nhân viên, các
            cấp quản lý luôn lắng nghe, thấu hiểu, hỗ trợ cho nhân viên mình có
            thể phát huy mọi tiềm năng .
          </h4>
        </div>
        <div className="about-us__members__container">
          <div className="about-us__members__wrapper">
            <div className="about-us__members__imgs__cover">
              <img
                className="about-us__members__img"
                src=""
                alt="Chất lượng thật - Giá trị thật"></img>
            </div>
            <h4>Nguyễn Thị Kim Ngân</h4>
            <p>&quot;215&quot;</p>
          </div>
          <div className="about-us__members__wrapper">
            <div className="about-us__members__imgs__cover">
              <img
                className="about-us__members__img"
                src=""
                alt="Tích điểm"></img>
            </div>
            <h4>Phạm Quang Hiếu</h4>
            <p>&quot;21520235&quot;</p>
          </div>
          
        </div>
      </section> */}
      {/* <section className="about-us__banner">
        <img
          className="about-us__banner-img"
          src="/imgs/about-us/banner-about-us-1.webp"
          fill={true}
          alt="about-us-banner-1"
        />
      </section> */}
      <section className="about-us__about-value brown">
        <div className="about-us__about-value__wrapper">
          <div className="about-us__about-value__title">
            Giá trị cốt lõi
            <span className="about-us__about-value__title-after"></span>
          </div>
          <h4 className="about-us__about-value__subtitle">
            Vì sứ mệnh tạo nên những giá trị thương hiệu, chúng tôi đã, đang và
            sẽ luôn nỗ lực hết mình vì sự phát triển – khẳng định thương hiệu
            Việt, mang lại những giá trị lâu dài cho doanh nghiệp. Chúng tôi cam
            kết không ngừng nâng cao chất lượng dịch vụ và mang đến những trải
            nghiệm thú vị cho khách hàng qua những sản phẩm luôn được yêu thích
            như món khoai tây chiên lừng danh thế giới French Fries,
            bánh burger Big Mac, hay Chicken McNuggets, và trên hết là những trải
             nghiệm mà bạn chỉ có thể có được tại nhà hàng của McDonald’s.
          </h4>
        </div>
        <div className="about-us__value__container">
          <div className="about-us__value__wrapper">
            <div className="about-us__value__imgs__cover">
              <img
                className="about-us__value__img"
                src="https://cdn-icons-png.flaticon.com/512/3595/3595490.png"
                alt="Chất lượng thật - Giá trị thật"></img>
            </div>
            <h4>Quality - Chất lượng</h4>
            <p>
              High quality food: Thực phẩm chất lượng cao. 
              Số lượng sản phẩm và dịch vụ tốt nhất với chủng loại đa dạng,
              phong phú sẽ đáp ứng tất cả nhu cầu mua sắm của bạn.
            </p>
          </div>
          <div className="about-us__value__wrapper">
            <div className="about-us__value__imgs__cover">
              <img
                className="about-us__value__img"
                src="https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-room-service-line-icon-vector-png-image_1886393.jpg"
                alt="Tích điểm"></img>
            </div>
            <h4>Service - Dịch vụ</h4>
            <p>
            Superior service: Phục vụ chuyên nghiệp
            </p>
          </div>
          <div className="about-us__value__wrapper">
            <div className="about-us__value__imgs__cover">
              <img
                className="about-us__value__img"
                src=" https://banner2.cleanpng.com/20180606/kxq/kisspng-computer-icons-buffet-food-restaurant-meal-dishes-clean-5b18a38a1b54c4.225754991528341386112.jpg"
                alt="Hỗ trợ giao hàng toàn quốc"></img>
            </div>
            <h4>Cleanliness - Vệ sinh</h4>
            <p>
            Clean and welcoming environment: Môi trường sạch sẽ và thân thiện
            </p>
          </div>
          <div className="about-us__value__wrapper">
            <div className="about-us__value__imgs__cover">
              <img
                className="about-us__value__img"
                src="https://static.tuoitre.vn/tto/i/s626//2015/03/13/te2qSRH8.jpg"
                alt="Chất lượng thật - Giá trị thật"></img>
            </div>
            <h4>Values - Giá trị.</h4>
            <p>
            Great value for money: Giá cả hợp lý
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}