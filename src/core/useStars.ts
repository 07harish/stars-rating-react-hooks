import React, { HtmlHTMLAttributes } from 'react';
import { Config, Renderable } from './types';

const callAllFns = (...fns: any[]) => (...args: any) =>
  fns.forEach(fn => fn && fn(...args));

export function useStars(config: Config, isDisabled: boolean = false) {
  const {
    totalStars,
    initialSelectedValue = 0,
    renderFull,
    renderHalf = null,
    renderEmpty,
  } = config;

  const [selectedValue, setSelectedValue]: [
    Renderable,
    React.Dispatch<any>
  ] = React.useState(initialSelectedValue);

  const [selectingValue, setSelecting]: [
    Renderable,
    React.Dispatch<any>
  ] = React.useState(initialSelectedValue);

  const [isSelecting, setisSelecting]: [
    boolean,
    React.Dispatch<any>
  ] = React.useState(false);

  const onClick = () => {
    if (isDisabled) return;
    setSelectedValue(selectingValue);
  };

  const onMouseEnter = () => {
    if (isDisabled) return;
    setisSelecting(true);
  };

  const onMouseLeave = () => {
    if (isDisabled) return;
    setSelecting(selectedValue);
    setisSelecting(false);
  };

  const onMouseMove = (e: any, index: number) => {
    if (isDisabled) return;
    const rect = e.target.getBoundingClientRect();
    const xmiddleRelativePosistion = e.pageX - e.target.offsetLeft;
    if (renderHalf !== null && rect.width / 2 <= xmiddleRelativePosistion) {
      setSelecting(index + 0.5);
    } else {
      setSelecting(index);
    }
  };

  const stars: Array<Renderable> = Array.from(
    Array(totalStars),
    (_, i: number) => {
      const shouldRenderHalf = renderHalf !== null ? true : false;
      let sindex = shouldRenderHalf ? i + 0.5 : i + 1;

      const isSelected = sindex <= selectingValue;
      const isHalf =
        !Number.isInteger(selectingValue) && sindex === selectingValue;

      const render = isSelected
        ? isHalf
          ? renderHalf
          : renderFull
        : renderEmpty;

      return render;
    }
  );

  function getStarProps(index: number, elementProps?: any) {
    const shouldRenderHalf = renderHalf !== null ? true : false;
    let i = shouldRenderHalf ? index + 0.5 : index + 1;
    return {
      ...elementProps,
      onClick: (e: any) =>
        callAllFns(
          onClick(),
          elementProps && elementProps.onClick(e, selectingValue)
        ),
      onMouseMove: (e: any) =>
        callAllFns(
          onMouseMove(e, i),
          elementProps &&
            elementProps.onMouseMove &&
            elementProps.onMouseMove(e, i)
        ),
    };
  }

  function getStarWrapperProps(elementProps?: HtmlHTMLAttributes<Element>) {
    return {
      ...elementProps,
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
    selectedValue,
    selectingValue,
  };
}
