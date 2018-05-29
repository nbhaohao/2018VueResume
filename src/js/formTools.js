window.FORM_TOOLS = {
    validMail: function(rule, value, callback) {
        let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        if (!emailReg.test(value)) {
            return callback(new Error('无效的邮箱地址'))
        }
        return callback()
    },
    validPassWord: function(rule, value, callback) {
        let passReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (!passReg.test(value)) {
            return callback(new Error('密码至少8位，且包含一个字母和数字'))
        }
        return callback()
    }
}