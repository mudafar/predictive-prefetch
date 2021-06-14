import ALZ from 'alz-predictor';

// get probability from options
const DEFAULT_OPTIONS = { minProbability: 0.7 };

// TODO: add expiration to stored values
function Predictor(options = DEFAULT_OPTIONS) {
  const STORAGE_KEY = 'alz-predictor';
  let currentCharCode = 33;
  let URL_TO_CHAR = {};
  let alzPredictor = new ALZ();

  // load from localStorage
  const storedALZ = localStorage.getItem(STORAGE_KEY);
  if (storedALZ) {
    alzPredictor.loadJSON(storedALZ);
    URL_TO_CHAR = JSON.parse(localStorage.getItem('alz-map'));
    currentCharCode = JSON.parse(localStorage.getItem('alz-char-code'));
  }

  // helper: get first key from object by value
  function getKeyByValue(object, value) {
    const res = Object.entries(object).find(([, val]) => val === value);
    if (res) {
      return res[0];
    }
    return undefined;
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alzPredictor));
    localStorage.setItem('alz-map', JSON.stringify(URL_TO_CHAR));
    localStorage.setItem('alz-char-code', JSON.stringify(currentCharCode));
  }

  function addPrediction(url) {
    let urlChar = URL_TO_CHAR[url];
    if (urlChar === undefined) {
      urlChar = String.fromCharCode(currentCharCode);
      currentCharCode += 1;
      URL_TO_CHAR[url] = urlChar;
    }

    alzPredictor.add(urlChar);
    saveToStorage();
  }

  function getPrediction() {
    const predictions = alzPredictor.predict();
    const sortedPredictions = Object.keys(predictions).sort(
      (a, b) => predictions[b] - predictions[a],
    );

    const probability = predictions[sortedPredictions[0]];

    if (options && options.minProbability > probability) {
      return undefined;
    }

    return ({
      link: getKeyByValue(URL_TO_CHAR, sortedPredictions[0]),
      probability,
    });
  }

  function reset() {
    alzPredictor = new ALZ();
    saveToStorage();
  }

  function isLinkExist(link) {
    return !!URL_TO_CHAR[link];
  }

  return ({
    add: addPrediction,
    get: getPrediction,
    isLinkExist,
    reset,
  });
}

export { DEFAULT_OPTIONS };
export default Predictor;
