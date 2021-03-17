export type Renderable = JSX.Element | string | number | null;

export type Config = {
  totalStars: number;
  initialSelectedValue?: number;
  renderFull: Renderable;
  renderEmpty: Renderable;
  renderHalf?: Renderable;
};

export type StarRatingProps = {
  config: Config;
  onSelecting?: (isSelecting: boolean, selectingValue: number) => void;
  onStarsRated?: (initialSelectedValue: number) => void;
  isDisabled?: boolean;
};
