Vue.component("login-dialog", {
    props: ["login"],
    template: `
        <el-dialog title="登录" :visible.sync="login" width="30%":before-close="handleClose">
            <el-form ref="loginForm" :rules="rules" @submit.native.prevent="loginSubmit" :model="loginForm" label-width="80px">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pass">
                    <el-input v-model="loginForm.pass" type="password"></el-input>
                  </el-form-item>
                  <el-form-item>   
                  <span class="span-c-toggleLogin" @click="toggleToRegister">注册新账号</span>
                  </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginSubmit('loginForm')">登录</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    `,
    methods: {
        handleClose() {
            this.$refs['loginForm'].resetFields()
            this.$emit("hide-dialog", 'loginDialog')
        },
        toggleToRegister() {
            this.$refs['loginForm'].resetFields()
            this.$emit("hide-dialog", 'loginDialog')
            setTimeout(() => {
                this.$emit("show-dialog", 'registerDialog')
            }, 200)

        },
        loginSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit("login-event", {email: this.loginForm.email, pass: this.loginForm.pass})
                } else {
                    return false;
                }
            });
        },
    },
    data() {
        return {
            loginForm: {
                email: "",
                pass: "",
            },
            rules: {
                email: [
                    { validator: window.FORM_TOOLS.validMail, trigger: 'blur' }
                ],
                pass: [
                    { validator: window.FORM_TOOLS.validPassWord, trigger: 'blur' }
                ],
            }
        }
    }
})
