declare global {
  interface Window {
    ConsensusAppVars: { rootApi: string };
  }
}

window.ConsensusAppVars = window.ConsensusAppVars || null;

const config = {
  rootApi: ""
};

console.log("Loading config", window.ConsensusAppVars);
const windowVars = window.ConsensusAppVars;
if (windowVars) {
  config.rootApi = windowVars.rootApi;
} else {
  config.rootApi = process.env.VUE_APP_ROOT_API;
}

console.log("ROOT API", config.rootApi);

export default config;
