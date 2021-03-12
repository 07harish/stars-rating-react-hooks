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

  return (
    <div className="app flex-col">
      <div className="headingWrapper">
        <h1 className="heading">stars-rating-react-hooks</h1>
      </div>

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

      <div className="wrapper  flex-col">
        <h5>{selecting.isSelecting ? 'Rating...' : 'Rate'}</h5>
        <h3>{selecting.selectingValue}</h3>
        <h3>
          <span className="mr-10">
            Last selected: {SelectedValue || config3.number}
          </span>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <span>Selecting: {selecting.selectingValue}</span>
        </h3>
        <StarsRating
          isSelecting={(isSelecting, selectingValue) => {
            setselecting({ isSelecting, selectingValue });
          }}
          onStarsRated={selectedValue => {
            setSelectedValue(selectedValue);
            alert(`You just rated ${selectedValue} stars 🎉`);
          }}
          config={config3}
        />
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
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
