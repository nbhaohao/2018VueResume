Vue.component("register-dialog", {
    props: ["register"],
    template: `
        <el-dialog title="注册" :visible.sync="register" width="30%":before-close="handleClose">
            <el-form ref="registerForm" :rules="rules" @submit.native.prevent="registerSubmit" :model="registerForm" label-width="80px">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerForm.email"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pass">
                    <el-input v-model="registerForm.pass" type="password"></el-input>
                  </el-form-item>
                  <el-form-item>   
                  <span class="span-c-toggleLogin" @click="toggleToLogin">已有账号？前往登录</span>
                  </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    `,
    methods: {
        handleClose() {
            this.$refs['registerForm'].resetFields()
            this.$emit("hide-dialog", 'registerDialog')
        },
        toggleToLogin() {
            this.$refs['registerForm'].resetFields();
            this.$emit("hide-dialog", 'registerDialog')
            setTimeout(() => {
                this.$emit("show-dialog", 'loginDialog')
            }, 200)

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit("register-event", {email: this.registerForm.email, pass: this.registerForm.pass})
                } else {
                    return false;
                }
            });
        },
    },
    data() {
        return {
            registerForm: {
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
