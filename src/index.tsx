import * as React from 'react';
import './styles/StarRating.css';

type ConfigType = {
  number: number;
  value?: number;
  renderFull: JSX.Element | string;
  renderHalf?: JSX.Element | string;
  renderEmpty?: JSX.Element | string;
};

type Props = {
  config: ConfigType;
};

export const StarsRating = (props: Props) => {
  const {
    number,
    value = 0,
    renderFull,
    renderHalf = renderFull,
    renderEmpty = '',
  } = props.config;

  const [selected, setSelected] = React.useState(value);
  const [softselected, setSoftSelected] = React.useState(value);

  const renderStar = (n: number) => {
    if (n < 0) return null;

    const onClick = (newVal: number) => {
      setSelected(newVal);
    };

    const onMouseOut = () => {
      setSoftSelected(selected);
    };

    const onMouseMove = (e: any, index: number) => {
      const rect = e.target.getBoundingClientRect();
      const xmiddleRelativePosistion = e.pageX - e.target.offsetLeft;

      if (rect.width / 2 <= xmiddleRelativePosistion) {
        setSoftSelected(index + 0.5);
      } else {
        setSoftSelected(index);
      }
    };

    const stars = Array.from(Array(number), (_, i: number) => {
      let sindex = i + 0.5;
      const isSelected = sindex <= softselected;
      const isHalf = !Number.isInteger(softselected) && sindex === softselected;

      return (
        <span
          key={i}
          onMouseOut={() => onMouseOut()}
          onMouseMove={e => onMouseMove(e, sindex)}
          onClick={() => onClick(softselected)}
          className="star"
        >
          {isSelected ? (isHalf ? renderHalf : renderFull) : renderEmpty}
        </span>
      );
    });

    return stars;
  };

  console.log("asda", props);

  return <span className="stars">{renderStar(number)}</span>;
};
