import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StarsRating, useStars } from 'stars-rating-react-hooks';
import './index.css';

const App = () => {
  const [selecting, setselecting] = React.useState({
    isSelecting: false,
    selectingValue: null,
  });

  const config = {
    totalStars: 5,
    initialSelectedValue: 2,
    renderFull: '★',
    renderEmpty: '☆',
  };

  const config1 = {
    totalStars: 5,
    initialSelectedValue: 2,
    renderFull: <span className="mr-10 star">A</span>,
    renderEmpty: <span className="mr-10 star-empty">A</span>,
  };

  const config2 = {
    totalStars: 5,
    initialSelectedValue: 3.5,
    renderFull: <img src="https://img.icons8.com/fluent/48/000000/star.png" />,
    renderEmpty: (
      <img src="https://img.icons8.com/color/48/000000/star--v1.png" />
    ),
    renderHalf: (
      <img src="https://img.icons8.com/fluent/48/000000/star-half-empty.png" />
    ),
  };

  const config3 = {
    totalStars: 5,
    initialSelectedValue: 4.5,
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
    <div className="app">
      <div className="main">
        <div className="headingWrapper">
          <h1 className="heading">stars-rating-react-hooks</h1>
          <h3>
            {selecting.selectingValue}
            {selecting.isSelecting ? ' Rating...' : ' Stars'}
          </h3>
          <StarsRating
            onSelecting={(isSelecting, selectingValue) => {
              setselecting({ isSelecting, selectingValue });
            }}
            config={config3}
          />
        </div>
        <div className="flex-col mt-50">
          <h2>Links:</h2>
          <div className="links">
            <span>
              <a href="https://github.com/07harish/stars-rating-react-hooks">
                Github
              </a>
            </span>
            <span>
              <a href="https://www.npmjs.com/package/stars-rating-react-hooks">
                NPM
              </a>
            </span>
            <span>
              <a href="https://codesandbox.io/s/stars-rating-react-hooks-c936v?file=/src/App.js">
                Code sandbox [Basic]
              </a>
            </span>
            <span>
              <a href="https://codesandbox.io/s/stars-rating-react-hooksadvanced-7xnuw?file=/src/App.js">
                Code sandbox [Customized]
              </a>
            </span>
          </div>
        </div>

        <div className="wrapper">
          <StarsRating
            onStarsRated={selectedValue => {
              alert(`You just rated ${selectedValue} stars 🎉`);
            }}
            config={config2}
          />
        </div>

        <div className="wrapper flex-col">
          <h3>
            {isSelecting ? 'Selecting' : 'Selected'} value: {selectingValue}
          </h3>
          <div>
            <span
              {...getStarWrapperProps({
                style: {
                  cursor: 'pointer',
                  display: 'inline-block'
                },
              })}
            >
              {stars?.map((star, i) => (
                <span
                  key={i}
                  {...getStarProps(i, {
                    style: {
                      fontSize: '40px',
                      display: 'inline-block'
                    },
                    onClick: (event, ratedValue) => {
                      console.log(`You just rated ${ratedValue} Stars!!`);
                    },
                  })}
                >
                  {star}
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="wrapper">
          <StarsRating config={config1} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
