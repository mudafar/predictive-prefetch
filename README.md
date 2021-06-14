# Predictive Prefetch &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mudafar/predictive-prefetch/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/predictive-prefetch.svg?style=flat)](https://www.npmjs.com/package/predictive-prefetch)  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

100% client side, out of the box predictive prefetch solution for webpack and modern SPAs, based on **[alz-predictor](https://github.com/mudafar/alz-predictor/)**. 


* **Webpack:** Learn, predict and prefetch JavaScript modules or [chunks](https://webpack.js.org/guides/code-splitting) and other supported assets in runtime.    


* **SPA:** Predict and prefetch user's next Route or URL, e.g: from [React Router](https://reactrouter.com/).

* Unlike [Guess.js](https://github.com/guess-js/guess), Predictive Prefetch **doesn't** require any third party data analytics sources.


## Why?
  - Speed up user future navigation.
  - 100% frontend AI solution. 
  - Privacy, data is stored and kept locally. 


## FAQ      

## How it works?
- Monitor any [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) change in the document object looking for JavaScript tags and other supported assets.

- Intercept [history](https://developer.mozilla.org/en-US/docs/Web/API/History) pushState looking for changes in routes.

- Train **[ALZ Predictor](https://github.com/mudafar/alz-predictor/)** and predict next asset or route.

- Add link tag with **[prefetch](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)** rel for the previous prediction.


## Installation
```bash
# Yarn
yarn add predictive-prefetch

# NPM
npm install --save predictive-prefetch

```


## Usage

```js
import PredictivePrefetch from 'predictive-prefetch'

PredictivePrefetch();

```


## Configuration
Predictive Prefetch includes options for:
- assets: disable script and/or other resources monitoring.
- urls: disable url intercepting.
- predictor: calibrate prefetch minimum probability.

### Default options
```js
import PredictivePrefetch from 'predictive-prefetch'

const options = {
    assets: {
        scriptsDisabled: false, 
        resourcesDisabled: true,
        };
    urls: {
        disabled: false,
    };
    predictos: {
        minProbability: 0.7,
    };
};

PredictivePrefetch(options);
```



## License
Predictive Prefetch is [MIT licensed](./LICENSE).