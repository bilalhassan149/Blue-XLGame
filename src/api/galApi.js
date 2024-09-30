import axios from "axios";
import state from "../store/state";
import qs from "qs";

import { codes } from "../assets/allFx";
import router from "@/router";

//设备型号
var userAgent = window.navigator.userAgent;

function uuid() {
  const userAgent = navigator.userAgent;
  const numbers = userAgent.match(/\d+/g).join("");
  const padLength = 32;
  const paddedNumbers = numbers.padEnd(padLength, "0").slice(0, padLength);
  const uuidFormat = `${paddedNumbers.slice(0, 8)}-${paddedNumbers.slice(
    8,
    12
  )}-${paddedNumbers.slice(12, 16)}-${paddedNumbers.slice(
    16,
    20
  )}-${paddedNumbers.slice(20)}`;

  return uuidFormat;
}

//获取json
export function getJson() {
  let t = new Date().getTime();
  return getTotal(
    // "http://json.xl0735.com/xlMain.json?time="+t, // test json
    "https://info.xunli.bet/xlMain.json?time=" + t //formal
    // "https://info.xunli05.com/xlMain.json?time="+t,   //formal1
  );
}

//获取Json相应的数据
export function getJsonXq(url) {
  let t = new Date().getTime();
  return getTotal(url + "?time=" + t);
}

export function activityApplyapplyActivity(
  activityId,
  activityAwardId,
  uniqueCode,
  applyAmount
) {
  return postTotal(
    state.baseURL + "/activityApply/applyActivity",
    qs.stringify({
      activityId: activityId,
      activityAwardId: activityAwardId,
      uniqueCode: uniqueCode,
      applyAmount: applyAmount,
    })
  );
}
//

export function userInfogetLevelInfo() {
  return postTotal(state.baseURL + "/userInfo/getLevelInfo", qs.stringify({}));
}
//修改密码

export function userResetPasswordresetPasswordByOld(oldPassword, newPassword) {
  return postTotal(
    state.baseURL + "/userResetPassword/resetPasswordByOld",
    qs.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
  );
}

export function gameBalancegetNewestBalance(uniqueCode) {
  return postTotal(
    state.baseURL + "/gameBalance/getNewestBalance",
    qs.stringify({
      uniqueCode: uniqueCode,
    })
  );
}
export function pcAfterDiscount(uniqueCode, applyAmount) {
  return postTotal(
    state.baseURL + "/gameLogin/pcAfterDiscount",
    qs.stringify({
      uniqueCode: uniqueCode,
      applyAmount: applyAmount,
    })
  );
}
export function userResetPasswordforgetresetPassword(
  username,
  contact,
  newPassword
) {
  return postTotal(
    state.baseURL + "/userResetPassword/forget/resetPassword",
    qs.stringify({
      username: username,
      contact: contact,
      newPassword: newPassword,
    })
  );
}

export function userResetPasswordforgetcheckVerifyCode(
  username,
  contact,
  verifyCode
) {
  return postTotal(
    state.baseURL + "/userResetPassword/forget/checkVerifyCode",
    qs.stringify({
      username: username,
      contact: contact,
      verifyCode: verifyCode,
    })
  );
}

export function userResetPasswordforgetsendVerifyCode(username, contact) {
  return postTotal(
    state.baseURL + "/userResetPassword/forget/sendVerifyCode",
    qs.stringify({
      username: username,
      contact: contact,
    })
  );
}
//更换头像

export function userInfochangeIcon(userIcon) {
  return postTotal(
    state.baseURL + "/userInfo/changeIcon",
    qs.stringify({
      userIcon: userIcon,
    })
  );
}
//手机号绑定
export function userBindbindPhone(code, phone) {
  return postTotal(
    state.baseURL + "/userBind/bindPhone",
    qs.stringify({
      smsCode: code,
      phone: phone,
    })
  );
}
//发送手机号

export function userBindsendPhoneBindCode(phoneNo) {
  return postTotal(
    state.baseURL + "/userBind/sendPhoneBindCode",
    qs.stringify({
      phoneNo: phoneNo,
    })
  );
}
//绑定邮箱
export function userBindbindEmail(email, emailCode) {
  return postTotal(
    state.baseURL + "/userBind/bindEmail",
    qs.stringify({
      email: email,
      emailCode: emailCode,
    })
  );
}

//发送邮箱验证码

export function userBindsendEmailBindCode(email) {
  return postTotal(
    state.baseURL + "/userBind/sendEmailBindCode",
    qs.stringify({
      email: email,
    })
  );
}
//绑定

export function userBindbindRealInfo(realName, idCard) {
  return postTotal(
    state.baseURL + "/userBind/bindRealInfo",
    qs.stringify({
      realName: realName,
      idCard: idCard,
    })
  );
}
//投注详情

export function userRecordqueryBetDetails(uniqueCode, recordNo) {
  return postTotal(
    // state.baseURL + '/userRecord/queryBetDetails', qs.stringify({
    state.baseURL + "/userRecord/queryBetDetailsV2",
    qs.stringify({
      uniqueCode: uniqueCode,
      recordNo: recordNo,
    })
  );
}
//投注记录
export function userRecordqueryBetRecordByTimeType(
  pageNum,
  pageSize,
  timeType,
  uniqueCode
) {
  return postTotal(
    state.baseURL + "/userRecord/queryBetRecordByTimeType",
    qs.stringify({
      pageNum: pageNum,
      pageSize: pageSize,
      uniqueCode: uniqueCode,
      timeType: timeType,
    })
  );
}
//记录

export function userRecordgetRecord(recordType, pageNum, pageSize, timeType) {
  return postTotal(
    state.baseURL + "/userRecord/getRecord",
    qs.stringify({
      pageNum: pageNum,
      pageSize: pageSize,
      recordType: recordType,
      timeType: timeType,
    })
  );
}

//获取消息列表

// export function userRecordgetMessageList(pageNum, pageSize, messageType) {
//     return postTotal(
//         state.baseURL + '/userRecord/getMessageList', qs.stringify({
//             pageNum: pageNum,
//             pageSize: pageSize,
//             messageType: messageType
//         }), {
//             headers: state.requestHeader,
//         }
//     );
// }
export function userRecordgetMessageList(data) {
  return postTotal(
    state.baseURL + "/userRecord/getMessageList",
    qs.stringify(data)
  );
}
//绑定账号
export function userBindbindVCWallet(walletNo, vcProtocol, walletName) {
  return postTotal(
    state.baseURL + "/userBind/bindVCWallet",
    qs.stringify({
      walletNo: walletNo,
      vcProtocol: vcProtocol,
      walletName: walletName,
    })
  );
}
//获取虚拟

export function userBindallVCProtocol() {
  return postTotal(state.baseURL + "/userBind/allVCProtocol", qs.stringify({}));
}

//查询银行卡归属银行 - bank - serachBank -ok
export function serachBank(bankCardNo) {
  return postTotal(
    state.baseURL + "/userBind/queryBankCard",
    qs.stringify({
      bankCardNo: bankCardNo,
    })
  );
}

//绑定银行卡  - bank
export function userBindbindBankCard(bankCardNo, branchAddress, realName) {
  return postTotal(
    state.baseURL + "/userBind/bindBankCard",
    qs.stringify({
      bankCardNo: bankCardNo,
      branchAddress: branchAddress,
      realName: realName,
    })
  );
}

//获取用户很是信息

export function userInfogetCustomerInfo() {
  return postTotal(
    state.baseURL + "/userInfo/getCustomerInfo",
    qs.stringify({})
  );
}

//解绑虚拟钱包

export function userBindbatchUnbindVCWallet(paymentIds) {
  return postTotal(
    state.baseURL + "/userBind/batchUnbindVCWallet",
    qs.stringify({
      paymentIds: paymentIds,
    })
  );
}

//解绑银行卡

export function userBindbatchUnbindBankCard(paymentIds) {
  return postTotal(
    state.baseURL + "/userBind/batchUnbindBankCard",
    qs.stringify({
      paymentIds: paymentIds,
    })
  );
}

export function userWithdrawcheckAmount(withdrawAmount) {
  return postTotal(
    state.baseURL + "/userWithdraw/checkAmount",
    qs.stringify({
      withdrawAmount: withdrawAmount,
    })
  );
}

//提现汇率

export function userWithdrawgetCurrencyExchangeRate(currencyType) {
  return postTotal(
    state.baseURL + "/userWithdraw/getCurrencyExchangeRate",
    qs.stringify({
      currencyType: currencyType,
    })
  );
}

//取款

export function userWithdraw(
  withdrawAmount,
  payWayType,
  withdrawPaymentId,
  exchangeRate
) {
  return postTotal(
    state.baseURL + "/userWithdraw/applyWithdrawV2",
    qs.stringify({
      withdrawAmount: withdrawAmount,
      payWayType: payWayType,
      withdrawPaymentId: withdrawPaymentId,
      exchangeRate: exchangeRate,
    })
  );
}

//提现次数

export function userWithdrawtodaySurplusTimes() {
  return postTotal(
    state.baseURL + "/userWithdraw/todaySurplusTimesV2",
    qs.stringify({})
  );
}

//获取虚拟钱包

export function userInfogetAllVCWallet() {
  return postTotal(
    state.baseURL + "/userInfo/getAllVCWallet",
    qs.stringify({})
  );
}

//获取银行卡信息

export function userInfogetAllBankCard() {
  return postTotal(
    state.baseURL + "/userInfo/getAllBankCard",
    qs.stringify({})
  );
}

//接口上报

export function recordApiError(userName, deviceType, errorApi, errorInfo) {
  return postTotal(
    state.baseURL + "/systemInfo/recordApiError",
    qs.stringify({
      userName: userName,
      deviceType: deviceType,
      errorApi: errorApi,
      errorInfo: errorInfo,
    })
  );
}

//转账

export function gameBalancetransfer(
  transferAmount,
  inUniqueCode,
  outUniqueCode
) {
  return postTotal(
    state.baseURL + "/gameBalance/transfer",
    qs.stringify({
      transferAmount: transferAmount,
      inUniqueCode: inUniqueCode,
      outUniqueCode: outUniqueCode,
    })
  );
}
//开启动手或者自动转账

export function auto(id) {
  return postTotal(
    state.baseURL + "/userInfo/changeFreeTransfer",
    qs.stringify({
      freeTransfer: id,
    })
  );
}
//一键转入

export function gameBalanceoneKey(uniqueCode) {
  return postTotal(
    state.baseURL + "/gameBalance/oneKey",
    qs.stringify({
      uniqueCode: uniqueCode,
    })
  );
}

//锁定钱包余额

export function gameBalancegetLockBalance() {
  return postTotal(
    state.baseURL + "/gameBalance/getLockBalance",
    qs.stringify({})
  );
}
//一键回收

export function gameBalanceallBack() {
  return postTotal(state.baseURL + "/gameBalance/allBack", qs.stringify({}));
}

//获取会员等级

export function userInfogetUserInfo() {
  return postTotal(state.baseURL + "/userInfo/getUserInfo", qs.stringify({}));
}

export function gameBalancegetAllBalance() {
  return postTotal(
    state.baseURL + "/gameBalance/getAllBalanceV2",
    qs.stringify({})
  );
}
//充值
export function userRechargeapplyPay(
  payWay,
  payWayType,
  rechargeAmount,
  exchangeRate
) {
  return postTotal(
    state.baseURL + "/userRecharge/applyPay",
    qs.stringify({
      deviceType: 0,
      payWay: payWay,
      payWayType: payWayType,
      rechargeAmount: rechargeAmount,
      exchangeRate: exchangeRate,
    })
  );
}

//获取充值汇率

export function userRechargegetCurrencyExchangeRate(currencyType) {
  return postTotal(
    state.baseURL + "/userRecharge/getCurrencyExchangeRate",
    qs.stringify({
      currencyType: currencyType,
    })
  );
}

//获取充值渠道

export function userRechargegetAllChannel() {
  return postTotal(
    state.baseURL + "/userRecharge/getAllChannel",
    qs.stringify({
      deviceType: 0,
    })
  );
}
//退出游戏
export function logOut() {
  return postTotal(state.baseURL + "/userLogin/logout", qs.stringify({}));
}
//登录游戏
export function gameLoginpcLogin(uniqueCode) {
  return postTotal(
    state.baseURL + "/gameLogin/pcLogin",
    qs.stringify({
      uniqueCode,
    })
  );
}
//登录大厅内的游戏
export function gameLoginpcHallGameLogin(gameCode, uniqueCode) {
  return postTotal(
    state.baseURL + "/gameLogin/pcHallGameLogin",
    qs.stringify({
      uniqueCode: uniqueCode,
      gameCode: gameCode,
    })
  );
}
//获取公告
export function systemInfogetSystemNotice(systemNoticeType) {
  return postTotal(
    state.baseURL + "/systemInfo/getSystemNotice",
    qs.stringify({
      systemNoticeType: systemNoticeType,
    })
  );
  // return axios.post(
  //     state.baseURL + '/systemInfo/getSystemNotice', qs.stringify({
  //         systemNoticeType: systemNoticeType
  //     }), {
  //         headers: state.requestHeader,
  //     }
  // );
}

//验证码发送

export function suserLoginsendLoginSmse(phoneNo) {
  return postTotal(
    state.baseURL + "/userLogin/sendLoginSms",
    qs.stringify({
      phoneNo: phoneNo,
    })
  );
}
//验证码登录
export function userLoginloginBySms(phoneNo, smsCode) {
  return postTotal(
    state.baseURL + "/userLogin/loginBySms",
    qs.stringify({
      phoneNo: phoneNo,
      smsCode: smsCode,
      deviceVersion: 0,
      deviceUserAgent: userAgent,
      deviceType: 0,
      deviceCode: uuid(),
    })
  );
}
//账号密码登录

export function userLoginlogin(username, password) {
  return postTotal(
    state.baseURL + "/userLogin/login",
    qs.stringify({
      username: username,
      password: password,
      deviceVersion: 0,
      deviceUserAgent: userAgent, //设备型号
      deviceType: 0, //0-PC浏览器；1-手机浏览器 ；2-Android App ；3-iOS App；4-其他
      deviceCode: uuid(),
    })
  );
}
export function userLoginloginLog(username) {
  return postTotal(
    state.baseURL + "/userLogin/loginLog",
    qs.stringify({
      username,
      password: "",
      deviceVersion: 0,
      deviceUserAgent: userAgent, //设备型号
      deviceType: 0, //0-PC浏览器；1-手机浏览器 ；2-Android App ；3-iOS App；4-其他
      deviceCode: uuid(),
    })
  );
}
//注册验证

export function userRegistersendRegisterSms(phoneNo) {
  return postTotal(
    state.baseURL + "/userRegister/sendRegisterSms",
    qs.stringify({
      phoneNo: phoneNo,
    })
  );
}
//注册
export function userRegisterregister(
  username,
  password,
  phoneNo,
  smsCode,
  inviteCode
) {
  return postTotal(
    state.baseURL + "/userRegister/register",
    qs.stringify({
      username: username,
      password: password,
      phoneNo: phoneNo,
      smsCode: smsCode,
      inviteCode: inviteCode,
      deviceVersion: 0,
      deviceUserAgent: userAgent,
      deviceType: 0,
      deviceCode: uuid(),
    })
  );
}

function postTotal(url, data) {
  // return axios.post(url, data,{headers:state.requestHeader});
  return new Promise(async (reslove, reject) => {
    let res = await axios.post(url, data, { headers: state.requestHeader });
    if (res.data.code == "9999") {
      codes(res.data.msg);
      router.push("/login");
    }
    reslove(res.data);
  });
}

function getTotal(url) {
  return axios.get(url, { headers: state.requestHeader });
}
