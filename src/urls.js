import appendLinkTag from './link-tag';

const DEFAULT_OPTIONS = { disabled: false };

function urls(predictor, options = DEFAULT_OPTIONS) {
  if (options && options.disabled) {
    return;
  }

  const { pushState } = window.history;
  window.history.pushState = function historyPushState(...args) {
    // if (typeof window.history.onpushstate == "function") {
    //   window.history.onpushstate({ state });
    // }

    const url = window.location.origin + args[2];
    // TODO: don't add dynamic url, specially one-time or temporary URLS
    // one way is to check if the url is used more than 3 times, then
    // add it to the predictor.
    predictor.add(url);
    const prediction = predictor.get();
    if (prediction) {
      appendLinkTag(prediction.link, document.head);
    }

    return pushState.apply(window.history, args);
  };
}

export { DEFAULT_OPTIONS };
export default urls;
