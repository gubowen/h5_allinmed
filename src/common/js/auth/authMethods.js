/**
 * @Desc：将auth目录的方法暴露出去
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by lichenyang on 17/12/08.
 */

 import CheckLogin from './checkLogin';
 import GetPersonal from './getPersonal';
 import MobileRegister from './mobileRegister';
 import PasswordLogin from './passwordLogin';
 import SendCode from './sendCode';
 import ValidCodeLogin from './validCodeLogin';

let checkLogin=new CheckLogin();
let getPersonal=new GetPersonal();
let mobileRegister= new MobileRegister();
let passwordLogin= new PasswordLogin();
let sendCode =new SendCode();
let validCodeLogin =new ValidCodeLogin();
export {
    checkLogin,
    getPersonal,
    mobileRegister,
    passwordLogin,
    sendCode,
    validCodeLogin,
}

//  export default {
//     checkLogin:new CheckLogin(),
//     getPersonal:new GetPersonal(),
//     mobileRegister: new MobileRegister(),
//     passwordLogin: new PasswordLogin(),
//     sendCode : new SendCode(),
//     validCodeLogin :new ValidCodeLogin(),
//  }