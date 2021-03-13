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

  const {
    stars,
    getStarProps,
    getStarWrapperProps,
    isSelecting,
    selectingValue,
    selectedValue,
  } = useStars(config);

  return (
    <div className="app flex-col">
      <div className="headingWrapper">
        <h1 className="heading">stars-rating-react-hooks</h1>
        <h3>
          {selecting.selectingValue}
          {selecting.isSelecting ? ' Rating...' : ' Stars'}
        </h3>
        <StarsRating
          isSelecting={(isSelecting, selectingValue) => {
            setselecting({ isSelecting, selectingValue });
          }}
          config={config5}
        />
      </div>

      <div className="wrapper">
        <StarsRating
          onStarsRated={selectedValue => {
            alert(`You just rated ${selectedValue} stars 🎉`);
          }}
          config={config4}
        />
      </div>

      <div className="wrapper flex-col">
        <h3>{isSelecting ? 'Rating' : 'Rate'}</h3>
        <h3>Selecting value: {selectingValue}</h3>
        <h3>Selected/ last selected value: {selectedValue}</h3>
        <div>
          <span
            {...getStarWrapperProps({
              style: {
                cursor: 'pointer',
              },
            })}
          >
            {stars?.map((e, i) => (
              <span
                key={i}
                {...getStarProps(i, {
                  style: {
                    fontSize: '40px',
                  },
                  onClick: (event , ratedValue ) => {
                    alert(`You just rated ${ratedValue} Stars!!`);
                  },
                })}
              >
                {e}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="wrapper">
        <StarsRating config={config1} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
