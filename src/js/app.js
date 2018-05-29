{
    let app = new Vue({
        el: "#app",
        data: {
            resume: {
                name: "姓名",
                targetJob: "前端开发",
                birthday: "1996年7月10日",
                phone: "13xxxxxxxxx",
                email: "nbhaohao@163.com",
                gender: "男",
                skills: "我的主要技能",
                hobby: "我的爱好",
                study: "我的教育经历",
                projects: [
                    {text: "项目经历"},
                ],
                jobs: [
                    {text: "工作经历"},
                ],
            },
            registerDialog: false,
            loginDialog: false,
            currentUser: {
                email: "",
                id: "",
            },
        },
        computed: {
            isLogin: function() {
                return this.currentUser.email
            }
        },
        methods: {
            updateResume(name, value) {
                let names = name.split(".")
                let prop = this.resume
                for (let i = 0; i < names.length; i++) {
                    if (i === names.length - 1) {
                        prop[names[i]] = value
                    }
                    else {
                        prop = prop[names[i]]
                    }
                }
            },
            showDialog(name) {
                this[name] = true
            },
            hideDialog(name) {
                this[name] = false
            },
            registerHandler(obj) {
                let user = new AV.User()
                // 设置用户名
                user.setUsername(obj.email)
                // 设置密码
                user.setPassword(obj.pass)
                // 设置邮箱
                user.setEmail(obj.email)
                user.signUp().then((loggedInUser) => {
                    this.currentUser.id = loggedInUser.id
                    this.currentUser.email = loggedInUser.attributes.email
                    this.$message({
                        message: '注册成功，已帮您自动登录！',
                        type: 'success'
                    })
                    this.hideDialog('registerDialog')
                }, (error) => {
                    if (error.code === 203) {
                        this.$message.error('此电子邮箱已经被占用')
                    }
                })
            },
            loginOut() {
                AV.User.logOut()
                this.currentUser.id = ""
                this.currentUser.email = ""
                this.$message({
                    message: '退出成功！',
                    type: 'success'
                });
            },
            loginEvent(obj) {
                AV.User.logIn(obj.email, obj.pass).then((user) => {
                    this.currentUser.id = user.id
                    this.currentUser.email = user.attributes.email
                    this.$message({message: '登录成功！', type: 'success'});
                    this.hideDialog("loginDialog")
                }, (error) => {
                    if (error.code === 210) {
                        this.$message.error("用户名与密码不匹配")
                    }
                    else if (error.code === 211) {
                        this.$message.error("该用户不存在")
                    }
                })
            },
        },
        created() {
            let currentUser = AV.User.current()
            if (currentUser) {
                this.currentUser.id = currentUser.id
                this.currentUser.email = currentUser.attributes.email
            }
        },
    })
}
