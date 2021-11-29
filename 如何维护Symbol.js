/**
 * 问题：Symbol 既然作为“指纹”，但如何保存（或者说更好维护）这些指纹最好呢？？
 * 个人见解：
 * 保存Symbol绝对不是目的。依据其唯一性，管理与其绑定的数据，才是真的目的
 * 所以我没有用Symbol做value而是用Symbol做key
 *
 * 第三方库数据管理工具（简易版）（取名模仿vue与vueX）
 *  注：在js里面无法写类型判断，在ts里面Symbol不能作为key使用
 */
class SymbolX {
  constructor() {}
  data = {};
  /**
   * @param {symbol} symbolVal 库标识
   * @param {any} identifyLabel 库数据（理论上无类型限制，推荐json）
   * @returns {array} 会返回当前库中，一共有哪些库标识，方便后续根据库标识获取库数据
   */
  setState(symbolVal, identifyLabel) {
    let data = this.data;
    data[symbolVal] = identifyLabel;
    return Reflect.ownKeys(data);
  }
  /**
   * @param {symbol} symbolVal 库标识
   * @returns 返回当前库标识对应的库数据
   */
  getState(symbolVal) {
    return this.data[symbolVal];
  }
}
export let symbolObj = new SymbolX();

// 测试区域=====================================================================
let test = Symbol();
console.log(symbolObj.setState(test, [1, 2, 3])); // [Symbol()]
console.log(symbolObj.getState(test)); // [1,2,3]
