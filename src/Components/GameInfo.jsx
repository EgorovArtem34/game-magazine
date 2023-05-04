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

const noInfo = 'No information';

const GameInfo = () => {
  const [images, setImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchGameDetail(slug));
    setThumbsSwiper(null);
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
    name,
    platforms,
    released,
    website,
    slug: oldSlug,
  } = data;

  if (slug !== oldSlug) {
    return <Loader />;
  }

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
        {images.map(({ image, id }) => {
          if (image === null) {
            return null;
          }
          return (
            <SwiperSlide key={id}>
              <div>
                <img src={image} alt="" />
              </div>
            </SwiperSlide>
          );
        })}
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
        {images.map(({ image, id }) => {
          if (image === null) {
            return null;
          }
          return (
            <SwiperSlide key={id}>
              <div>
                <img src={image} alt="" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div>
        <ul>
          <li>
            <span className="game-stat">
              Developer:
            </span>
            {' '}
            {devName || noInfo}
          </li>
          <li>
            <span className="game-stat">
              Release date:
            </span>
            {' '}
            {released || noInfo}
          </li>
          <li>
            <span className="game-stat">
              Rating:
            </span>
            {' '}
            {rating || noInfo}
          </li>
          <li>
            <span className="game-stat">
              Platforms:
            </span>
            {' '}
            {platforms.map(({ platform }) => platform.name).join(', ') || noInfo}
          </li>
          <li>
            <span className="game-stat">
              Website:
            </span>
            {' '}
            {website.length > 0 ? <a href={website}>{website}</a> : noInfo}
          </li>
          <li>
            <span className="game-stat">
              Genres:
            </span>
            {' '}
            {genres.map((genre) => genre.name).join(', ') || noInfo}
          </li>
        </ul>
      </div>
      <h2 className="game-desc">About</h2>
      <span>{desc || noInfo}</span>
    </div>
  );
};

export default GameInfo;
