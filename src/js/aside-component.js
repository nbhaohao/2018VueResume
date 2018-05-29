{
    Vue.component("aside-bar", {
        props: ["isLogin", "userName"],
        template: `
            <aside>
                <div class="inner">
                    <p class="svg-wrapper">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-centericresume"></use>
                        </svg>
                        <span v-if="isLogin">{{ userName }}</span>
                        <span v-else>您还没有登录</span>
                    </p>
                    <ul class="controls-btns">
                        <li @click="showPrint">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-print"></use>
                            </svg>
                            <span>打印</span>
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-baocun"></use>
                            </svg>
                            <span>保存</span>
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-theme"></use>
                            </svg>
                            <span>更换主题</span>
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-share"></use>
                            </svg>
                            <span>分享</span>
                        </li>
                    </ul>
                    <ul class="ul-c-checkboxGroup">
                        <el-checkbox label="主要技能" border size="medium"></el-checkbox>
                        <el-checkbox label="项目经验" border size="medium"></el-checkbox>
                        <el-checkbox label="工作经历" border size="medium"></el-checkbox>
                        <el-checkbox label="兴趣爱好" border size="medium"></el-checkbox>
                        <el-checkbox label="教育背景" border size="medium"></el-checkbox>
                    </ul>
                    <div class="bottom">
                        <span v-if="isLogin">
                            <el-button @click="loginOut" type="danger" round>退出</el-button>
                        </span>
                        <span v-else>
                            <el-button @click="showDialog" type="success" round>注册/登录</el-button>
                        </span>
                    </div>
                </div>
            </aside>`,
        methods: {
            showDialog() {
                this.$emit("show-dialog", "registerDialog")
            },
            loginOut() {
                this.$emit("login-out", "")
            },
            showPrint() {
                window.print()
            }
        },
        data() {
            return {}
        },
        created() {}
    })
}