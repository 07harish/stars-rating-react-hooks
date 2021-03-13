import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StarsRating, useStars } from '../.';
import './index.css';

const App = () => {
  const [selecting, setselecting] = React.useState({
    isSelecting: false,
    selectingValue: null,
  });

  const [SelectedValue, setSelectedValue] = React.useState(3.5);

  const config = {
    number: 5,
    value: 2,
    renderFull: '★',
    renderEmpty: '☆',
  };

  const config1 = {
    number: 5,
    value: 2,
    renderFull: <span className="mr-10 star">A</span>,
    renderEmpty: <span className="mr-10 star-empty">A</span>,
  };

  const config2 = {
    number: 5,
    value: 2,
    renderFull: '✅',
    renderEmpty: '☑',
  };

  const config3 = {
    number: 5,
    value: 3.5,
    renderFull: <i className="fas fa-star"></i>,
    renderEmpty: <i className="far fa-star"></i>,
    renderHalf: <i className="fas fa-star-half-alt"></i>,
  };

  const config4 = {
    number: 5,
    value: 3.5,
    renderFull: <img src="https://img.icons8.com/fluent/48/000000/star.png" />,
    renderEmpty: (
      <img src="https://img.icons8.com/color/48/000000/star--v1.png" />
    ),
    renderHalf: (
      <img src="https://img.icons8.com/fluent/48/000000/star-half-empty.png" />
    ),
  };

  const config5 = {
    number: 5,
    value: 4.5,
    renderFull: (
      <img src="https://img.icons8.com/ios-filled/50/000000/star--v1.png" />
    ),
    renderEmpty: (
      <img src="https://img.icons8.com/ios/50/000000/star--v1.png" />
    ),
    renderHalf: (
      <img src="https://img.icons8.com/ios-filled/50/000000/star-half-empty.png" />
    ),
  };

  const { stars, getStarProps, getStarWrapperProps, isSelecting } = useStars(
    config
  );

  return (
    <div className="app flex-col">
      <div className="headingWrapper">
        <h1 className="heading">stars-rating-react-hooks</h1>
        <h3>
          {selecting.selectingValue}{' '}
          {selecting.isSelecting ? 'Rating...' : 'Stars'}
        </h3>
        <StarsRating
          isSelecting={(isSelecting, selectingValue) => {
            setselecting({ isSelecting, selectingValue });
          }}
          onStarsRated={selectedValue => {
            setSelectedValue(selectedValue);
          }}
          config={config5}
        />
      </div>

      <div className="wrapper">
        <StarsRating
          onStarsRated={selectedValue => {
            setSelectedValue(selectedValue);
            alert(`You just rated ${selectedValue} stars 🎉`);
          }}
          config={config4}
        />
        <StarsRating config={config3} />
      </div>

      <div className="wrapper flex-col">
        <h3>{isSelecting ? 'Rating' : 'Rate'}</h3>
        <div>
          <span {...getStarWrapperProps()}>
            {stars?.map((e: any, i: number) => (
              <span key={i} {...getStarProps(i)}>
                {e}
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className="wrapper">
        <StarsRating config={config1} />
      </div>

      <div className="wrapper">
        <StarsRating config={config2} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
