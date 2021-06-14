import Predictor, { DEFAULT_OPTIONS as PREDICTOR_OPTIONS } from './predictor';
import urls, { DEFAULT_OPTIONS as URL_OPTIONS } from './urls';
import assets, { DEFAULT_OPTIONS as ASSETS_OPTIONS } from './assets';

const DEFAULT_OPTIONS = {
  assets: ASSETS_OPTIONS,
  urls: URL_OPTIONS,
  predictor: PREDICTOR_OPTIONS,
};

function PredictivePrefetch(options = DEFAULT_OPTIONS) {
  const predictor = new Predictor(options.predictor);
  assets(predictor, options.assets);
  urls(predictor, options.urls);
}

export default PredictivePrefetch;
