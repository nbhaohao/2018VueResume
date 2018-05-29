{
    let app = new Vue({
        el: "#app",
        data: {
            resume: {
                name: "",
                targetJob: "",
                birthday: "",
                phone: "",
                email: "",
                gender: "",
                skills: "",
                hobby: "",
                study: "",
                projects: [],
                jobs:  [],
                moduleCheckGroup: {
                    skillsCheck: false,
                    projectsCheck: false,
                    jobsCheck: false,
                    hobbyCheck: false,
                    studyCheck: false,
                },
            },
            defaultResume: {
                name: "姓名",
                targetJob: "前端开发",
                birthday: "1996年7月10日",
                phone: "13xxxxxxxxx",
                email: "nbhaohao@163.com",
                gender: "男",
                skills: "我的主要技能",
                hobby: "我的爱好",
                study: "我的教育经历",
                projects: ["项目经历1", "项目经历2"],
                jobs:  ["工作经历1", "工作经历2"],
                moduleCheckGroup: {
                    skillsCheck: true,
                    projectsCheck: true,
                    jobsCheck: true,
                    hobbyCheck: true,
                    studyCheck: true,
                },
            },
            animationFlag: false,
            registerDialog: false,
            loginDialog: false,
            fullscreenLoading: false,
            currentUser: {
                email: "",
                id: "",
            },
            isPreView: false,
        },
        computed: {
            isLogin: function () {
                return this.currentUser.email
            },
            shareLink: function() {
                return location.origin + location.pathname + `?user_id=${this.currentUser.id}`
            },
        },
        watch: {
           'currentUser.id': function(value) {
               if (!value) {
                   let defaultValue = JSON.stringify(this.defaultResume)
                   Object.assign(this.resume, JSON.parse(defaultValue))
                   return
               }
               var query = new AV.Query('User')
               query.get(value).then((user) => {
                    Object.assign(this.resume, user.attributes.resume)
                   this.animationFlag = true
                   },(error) => {
                   this.$message.error('网络异常')
               })
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
            window.FORM_TOOLS.EVENT_HUB_TOOL.$on("update-resume-data", (name, value) => {
                this.updateResume(name, value)
            })
            window.FORM_TOOLS.EVENT_HUB_TOOL.$on("delete-resume-data", (name, index) => {
                this.resume[name].splice(index, 1)
            })
            window.FORM_TOOLS.EVENT_HUB_TOOL.$on("add-resume-data", (name) => {
                this.resume[name].push("新增标签")
            })
            window.FORM_TOOLS.EVENT_HUB_TOOL.$on("save-resume-data", () => {
                var todo = AV.Object.createWithoutData('User', this.currentUser.id)
                todo.set('resume', this.resume)
                todo.save().then((data) => {
                    this.$message({message: '保存成功！', type: 'success'});
                }, (error) => {this.$message.error("网络异常")})
            })
            window.FORM_TOOLS.EVENT_HUB_TOOL.$on("share-resume-data", () => {
                this.$alert(this.shareLink, '分享链接', {
                    confirmButtonText: '确定',
                });
            })
            let shareUser = window.FORM_TOOLS.getQueryByName(window.location.href, "user_id")
            if (shareUser) {
                this.isPreView = true
                this.currentUser.id = shareUser
                return
            }
            let currentUser = AV.User.current()
            if (currentUser) {
                this.currentUser.id = currentUser.id
                this.currentUser.email = currentUser.attributes.email
            } else {
                let defaultCopy = JSON.stringify(this.defaultResume)
                Object.assign(this.resume, JSON.parse(defaultCopy))
                this.animationFlag = true
            }
        },
    })
}
