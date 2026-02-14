import defaultConfig from './rollup.default.config.js';
import debugConfig from './rollup.debug.config.js';

export default commandLineArgs => {
	if (commandLineArgs.configDebug) {
		return debugConfig;
	}
	return defaultConfig;
};
