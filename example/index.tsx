import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StarsRating, useStars } from '../.';
import './index.css';

const App = () => {
  const config = {
    number: 5,
    value: 2,
    renderFull: '★',
    renderEmpty: '☆',
  };

  const config1 = {
    number: 5,
    value: 2,
    renderFull: <span className="mr-10 full">A</span>,
    renderEmpty: <span className="mr-10 empty">A</span>,
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

  const { stars, getStarProps, getStarWrapperProps, isSelecting } = useStars(
    config
  );
  console.log("j1nasd", stars, isSelecting);

  return (
    <>
      <div className="wrapper">
        <div>{isSelecting ? 'Selecting' : null}</div>
        <StarsRating config={config} />
      </div>

      <div className="wrapper">
        <StarsRating config={config1} />
      </div>

      <div className="wrapper">
        <StarsRating config={config2} />
      </div>

      <div className="wrapper">
        <StarsRating config={config3} />
      </div>

      <div className="wrapper">
        <span {...getStarWrapperProps()}>
          {stars?.map((e: any, i: number) => (
            <span key={i} {...getStarProps(i)}>
              {e}
            </span>
          ))}
        </span>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
