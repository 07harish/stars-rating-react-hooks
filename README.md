# stars-rating-react-hooks ⭐️
<img width="265" alt="stars-rating-react-hooks" src="https://user-images.githubusercontent.com/27046938/111029678-f390b180-8423-11eb-9497-e8ab2e797686.png">

### Customizable react component for rating stars 

 - Define `config` object
 - import { StarsRating } from "stars-rating-react-hooks"
 - Start using `<StarsRating config={config} />`

***
[![NPM](https://img.shields.io/npm/v/stars-rating-react-hooks.svg)](https://www.npmjs.com/package/stars-rating-react-hooks)

## Install

```bash
npm install --save stars-rating-react-hooks
```

## Usage (Basic)

<img width="319" alt="stars-rating-react-hooks" src="https://user-images.githubusercontent.com/27046938/111029635-bd533200-8423-11eb-9160-6acc095ec140.png">

```jsx
import React from 'react'

import { StarsRating } from "stars-rating-react-hooks";

function Example() {

  const config = {
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
    )
  };

  
  
    return  <StarsRating config={config} />
  
}

export default Example

```


```
import { useStars } from 'stars-rating-react-hooks'

const {
    stars,
    getStarProps,
    getStarWrapperProps,
    isSelecting,
    selectingValue,
    selectedValue,
  } = useStars(config);

        <span
            {...getStarWrapperProps({
              style: {
                cursor: 'pointer',
              },
            })}
          >
               {stars?.map((star, i) => (
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
                      {star}
                    </span>
                  ))}
       </span>
```

'getStarWrapperProps' and 'getStarProps' are prop getters, More info on [prop getters](https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters)

## Demo:

### Basic
[Open Basic codesandbox](https://codesandbox.io/s/stars-rating-react-hooks-c936v?file=/src/App.js) 

### Customizable and Headless:

[Open Customizable codesandbox](
https://codesandbox.io/s/stars-rating-react-hooksadvanced-7xnuw?file=/src/App.js) 


## License

MIT © [07harish](https://github.com/07harish)
