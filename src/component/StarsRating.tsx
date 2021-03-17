import * as React from 'react';
import { StarRatingProps } from '../core/types';
import { useStars } from '../core/useStars';
import styles from './styles/StarRating.module.css';

export const StarsRating: Function = (props: StarRatingProps) => {
  const { isDisabled = false } = props;
  const instance: any = useStars(props.config, isDisabled);
  const {
    stars,
    getStarProps,
    getStarWrapperProps,
    isSelecting,
    selectingValue,
    selectedValue,
  } = instance;

  const isMountRef = React.useRef(false);

  React.useEffect(() => {
    if (props && props.onSelecting && props?.onSelecting) {
      props.onSelecting(isSelecting, selectingValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelecting, selectingValue]);

  React.useEffect(() => {
    if (isMountRef.current === true && props?.onStarsRated) {
      props.onStarsRated(selectedValue);
    }
    isMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <>
      <div>
        <span tabIndex={0} {...getStarWrapperProps()} className={styles.stars}>
          {stars?.map((e: any, i: number) => (
            <span key={i} {...getStarProps(i)} className={styles.star}>
              {e}
            </span>
          ))}
        </span>
      </div>
    </>
  );
};
