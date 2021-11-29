/**
 * 问题：Symbol 既然作为“指纹”，但如何保存（或者说更好维护）这些指纹最好呢？？
 * 思考过程：
 * 指纹？每个人都有独特的指纹
 * 假设指纹对应Symbol、人对应模块、珍贵之物对应数据
 * 所以模块才是主导，推动Symbol去匹配对应数据的发起者
 *
 * 个人见解：
 * 保存Symbol绝对不是目的。依据其唯一性，管理与其绑定的数据，才是真的目的
 * 所以我没有用Symbol做value而是用Symbol做key，也许随机数也能实现，但随机数依旧有重复的可能，
 * 但在一个库的底层封装中，是不允许有如此误差出现的，Symbol才是作为唯一标识的最佳选择。
 *
 * 第三方库数据管理工具（简易版）（取名模仿vue与vueX）
 *  注：在js里面无法写类型判断，在ts里面Symbol不能作为key使用
 */
class SymbolX {
  constructor() {}
  // 存放每个模块的数据
  data = {};
  // 存放模块和指纹的对应关系
  moduleData = {};
  /**
   * @param {string} module 模块
   * @param {symbol} symbolVal 模块标识
   * @param {any} identifyLabel 模块数据（理论上无类型限制，推荐json）
   * @returns {object} 会返回一个对象，显示全部的模块（module）和其对应的指纹（Symbol）
   */
  setState(module, symbolVal, identifyLabel) {
    let { data, moduleData } = this;
    for (let key in moduleData) {
      if (key === module) throw "已有该模块，无法添加";
    }
    // symbol对应数据
    data[symbolVal] = identifyLabel;
    // 模块对应symbol
    moduleData[module] = symbolVal;
    return moduleData;
  }
  /**
   * @param {symbol} symbolVal 模块标识
   * @returns 返回当前库标识对应的库数据
   */
  getState(module) {
    let temp = this.moduleData[module];
    return this.data[temp];
  }
}
let symbolObj = new SymbolX();

// 测试区域=====================================================================
let test = Symbol();
console.log(symbolObj.setState("导航栏模块", test, [1, 2, 3])); // {"导航栏模块",Symbol()}
console.log(symbolObj.getState("导航栏模块")); // [1,2,3]
