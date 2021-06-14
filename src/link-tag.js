const DEFAULT_REL = 'prefetch';

function appendLinkTag(href, node, rel = DEFAULT_REL) {
  // TODO check if link with same href doesn't exist first
  const linkElement = document.createElement('link');
  linkElement.rel = rel;
  linkElement.href = href;

  node.appendChild(linkElement);
}

function withCheck(callback) {
  const APPENDED_LINKS = {};

  return function check(...args) {
    if (APPENDED_LINKS[args[0]] === undefined) {
      APPENDED_LINKS[args[0]] = true;
      return callback(...args);
    }
    return undefined;
  };
}

export default withCheck(appendLinkTag);
