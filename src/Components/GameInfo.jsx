import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation, Thumbs, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchGameDetail, selectGameBySlug } from '../slices/gamesSlice';
import Loader from './Loader';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GameInfo = () => {
  const [images, setImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchGameDetail(slug));
  }, [dispatch, slug]);

  const { gameDetails: { data } } = useSelector((state) => state.gamesSlice);
  const game = useSelector((state) => selectGameBySlug(state, slug));

  useEffect(() => {
    if (data && data.gameId) {
      const { short_screenshots: screenshots = [] } = game || {};
      setImages([{ image: data.image1, id: 0 }, { image: data.image2, id: -2 }, ...screenshots]);
    }
  }, [data, game]);

  if (!data) {
    return <Loader />;
  }

  const {
    desc,
    developers: [{ name: devName }],
    rating,
    genres,
    // gameId,
    name,
    platforms,
    released,
    website,
  } = data;
  console.log(
    platforms,
  );
  return (
    <div className="game-info">
      <h1>{name}</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        loop
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div>
              <img src={img.image} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div>
              <img src={img.image} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <ul>
          <li>
            <span className="game-stat">
              Developer:
            </span>
            {' '}
            {devName}
          </li>
          <li>
            <span className="game-stat">
              Release date:
            </span>
            {' '}
            {released}
          </li>
          <li>
            <span className="game-stat">
              Rating:
            </span>
            {' '}
            {rating}
          </li>
          <li>
            <span className="game-stat">
              Platforms:
            </span>
            {' '}
            {platforms.map(({ platform }) => platform.name).join(', ')}
          </li>
          <li>
            <span className="game-stat">
              Website:
            </span>
            {' '}
            <a href={website}>{website}</a>
          </li>
          <li>
            <span className="game-stat">
              Genres:
            </span>
            {' '}
            {genres.map((genre) => genre.name).join(', ')}
          </li>
        </ul>
      </div>
      <h2 className="game-desc">About</h2>
      <span>{desc}</span>
    </div>
  );
};

export default GameInfo;
