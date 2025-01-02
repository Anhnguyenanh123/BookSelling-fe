import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import BookCard from "../books/BookCard";
import { fetchBooks } from "../../redux/features/book/bookSlice";

const Recommended = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBooks({ page: 0, limit: 18 })); // Fetch first 18 books
  }, [dispatch]);

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended Books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <Swiper
          navigation={true}
          slidesPerView={1}
          spaceBetween={30}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
            1180: { slidesPerView: 3, spaceBetween: 50 },
          }}
        >
          {books &&
            books.slice(0, 10).map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default Recommended;
