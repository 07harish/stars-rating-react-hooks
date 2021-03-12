import * as React from 'react';
import styles from './styles/StarRating.module.css';

type ConfigType = {
  number: number;
  value?: number;
  renderFull: JSX.Element | string;
  renderHalf?: JSX.Element | string;
  renderEmpty?: JSX.Element | string;
  shouldRenderHalf?: boolean;
};

type Props = {
  config: ConfigType;
  isSelecting?: (isSelecting: boolean) => void;
};

const callAllFns = (...fns: any[]) => (...args: any) =>
  fns.forEach(fn => fn && fn(...args));

export function useStars(config: any) {
  const {
    number,
    value,
    renderFull,
    renderHalf = null,
    renderEmpty = '',
  } = config;

  const [selectedValue, setSelectedValue] = React.useState(value);
  const [selectingValue, setSelecting] = React.useState(value);
  const [isSelecting, setisSelecting] = React.useState(false);

  const onClick = () => {
    setSelectedValue(selectingValue);
  };

  const onMouseEnter = () => {
    setisSelecting(true);
  };

  const onMouseLeave = () => {
    setSelecting(selectedValue);
    setisSelecting(false);
  };

  const onMouseMove = (e: any, index: number) => {
    const rect = e.target.getBoundingClientRect();
    const xmiddleRelativePosistion = e.pageX - e.target.offsetLeft;
    if (rect.width / 2 <= xmiddleRelativePosistion) {
      setSelecting(index + 0.5);
    } else {
      setSelecting(index);
    }
  };

  const stars: Array<any> = Array.from(Array(number), (_, i: number) => {
    const shouldRenderHalf = renderHalf !== null ? true : false;
    let sindex = shouldRenderHalf ? i + 0.5 : i;

    const isSelected = sindex <= selectingValue;
    const isHalf = !Number.isInteger(selectingValue) && sindex === selectingValue;

    const render = isSelected
      ? isHalf
        ? renderHalf
        : renderFull
      : renderEmpty;

    return render;
  });

  function getStarProps(index: number, elementProps?: any) {
    const shouldRenderHalf = renderHalf !== null ? true : false;
    let i = shouldRenderHalf ? index + 0.5 : index;
    return {
      ...elementProps,
      className: elementProps?.className ? elementProps.className : styles.star,
      onClick: callAllFns(elementProps && elementProps.onClick, onClick),
      onMouseMove: (e: any) =>
        callAllFns(
          elementProps &&
            elementProps.onMouseMove &&
            elementProps.onMouseMove(e, i),
          onMouseMove(e, i)
        ),
    };
  }

  function getStarWrapperProps(elementProps?: any) {
    return {
      ...elementProps,
      className: elementProps?.className
        ? elementProps.className
        : styles.stars,
      onMouseLeave: callAllFns(
        elementProps && elementProps.onMouseLeave,
        onMouseLeave
      ),
      onMouseEnter: callAllFns(
        elementProps && elementProps.onMouseEnter,
        onMouseEnter
      ),
    };
  }

  return {
    getStarProps,
    stars,
    getStarWrapperProps,
    isSelecting,
  };
}

export const StarsRating: Function = (props: Props) => {
  const instance = useStars(props.config);
  const { stars, getStarProps, getStarWrapperProps, isSelecting } = instance;

  React.useEffect(() => {
    props?.isSelecting && props?.isSelecting(isSelecting);
  }, [isSelecting]);

  return (
    <span {...getStarWrapperProps()} className={styles.stars}>
      {stars?.map((e: any, i: number) => (
        <span key={i} {...getStarProps(i)} className={styles.star}>
          {e}
        </span>
      ))}
    </span>
  );
};
