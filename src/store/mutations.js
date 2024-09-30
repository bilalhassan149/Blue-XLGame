let mutations = {
  ruleFx(state, ruleData) {
    let obj = Object.keys(ruleData);
    obj.forEach((res) => {
      ruleData[res] = new RegExp(ruleData[res]);
    });
    state.rule = ruleData;
  },
};
export default mutations;
