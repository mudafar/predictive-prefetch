import appendLinkTag from './link-tag';

// receive option to disable other resources
const DEFAULT_OPTIONS = { scriptsDisabled: false, resourcesDisabled: true };

function assets(predictor, options = DEFAULT_OPTIONS) {
  if (options && options.scriptsDisabled && options.resourcesDisabled) {
    return;
  }

  function observerCallback(mutationsList) {
    // eslint-disable-next-line no-restricted-syntax
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const URLS = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const node of mutation.addedNodes) {
          if (options && !options.scriptsDisabled && node.src) {
            // script tag
            URLS.push(node.src);
          } else if (options && !options.resourcesDisabled && node.innerHTML && node.innerHTML.includes('src')) {
            // other resources, like images
            // TODO: check other types
            [...node.innerHTML.matchAll(/.*?src="(.*?)"/g)].forEach((src) => {
              URLS.push(src[1]);
            });
          }
        }

        URLS.forEach((URL) => {
          if (predictor.isLinkExist(URL)) {
            predictor.add(URL);
            const prediction = predictor.get();
            if (prediction) {
              appendLinkTag(prediction.link, document.head);
            }
          } else {
            predictor.add(URL);
          }
        });
      }
    }
  }

  const observer = new MutationObserver(observerCallback);
  const headNode = document;
  const config = { attributes: false, childList: true, subtree: true };
  observer.observe(headNode, config);
}

export { DEFAULT_OPTIONS };
export default assets;
