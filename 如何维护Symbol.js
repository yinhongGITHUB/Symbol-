/**
 * 第三方库数据管理工具（简易版）（取名模仿vue与vueX）
 *
 *  注：在js里面无法写类型判断，在ts里面Symbol不能作为key使用
 */
class symbolX {
  constructor() {}
  data = {};
  /**
   * @param {symbol} symbolVal 库标识
   * @param {any} identifyLabel 库数据（理论上无类型限制，推荐json）
   * @returns 会返回当前库中，一共有哪些库标识，方便后续根据库标识获取库数据
   */
  setState(symbolVal, identifyLabel) {
    this.data[symbolVal] = identifyLabel;
    return Reflect.ownKeys(this.data);
  }
  /**
   * @param {symbol} symbolVal 库标识
   * @returns 返回当前库标识对应的库数据
   */
  getState(symbolVal) {
    return this.data[symbolVal];
  }
}
let symbolObj = new symbolX();

// 测试区域=====================================================================
let test = Symbol();
console.log(symbolObj.setState(test, [1, 2, 3])); // [Symbol()]
console.log(symbolObj.getState(test)); // [1,2,3]
