export default {
    // 验证邮箱格式
    isEmail(str) {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      return reg.test(str);
    },
    // 验证手机号格式
    isMobile(str) {
      const reg = /^1[3456789]\d{9}$/;
      return reg.test(str);
    },
    //验证手机号或邮箱
    isPhoneOrEmail(str){
        const reg = /^(13\d|14[5-9]|15[0-35-9]|166|17[0-8]|18\d|19[8-9])\d{8}$|^[\w.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
        return reg.test(str);
    },
    // 验证密码格式
    isPassword(str) {
      const reg = /^[a-zA-Z0-9_~!@#$%^&*()_+`\-={}[\]:;"'<>,.?/\\|]{6,20}$/;
      return reg.test(str);
    },
    // 验证两个值是否相等
    isEqual(value1, value2) {
      return value1 === value2;
    },
    // 验证是否为空
    isRequired(str) {
      return str.trim().length > 0;
    },
    // 验证是否为数字
    isNumber(str) {
      const reg = /^[0-9]*$/;
      return reg.test(str);
    }
  }
  