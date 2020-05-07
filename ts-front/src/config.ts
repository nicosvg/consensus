declare global {
  interface Window { ConsensusAppVars: any; }
}

window.ConsensusAppVars = window.ConsensusAppVars || {};

console.log("Loading config");
const vars = window.ConsensusAppVars;
const rootApi = vars ? vars.rootApi : process.env.VUE_APP_ROOT_API;

console.log("ROOT API", rootApi);

export default {
  rootApi
};
