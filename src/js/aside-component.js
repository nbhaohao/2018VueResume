{
    Vue.component("aside-bar", {
        props: ["isLogin", "userName", "checkStatus"],
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
                        <li @click="saveResume">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-baocun"></use>
                            </svg>
                            <span>保存</span>
                        </li>
                        <li @click="shareResume">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-share"></use>
                            </svg>
                            <span>分享</span>
                        </li>
                    </ul>
                    <ul class="ul-c-checkboxGroup">
                        <el-checkbox @change="changeCheckStatus('moduleCheckGroup.skillsCheck', $event)" :value="checkStatus.skillsCheck" label="主要技能" border size="medium"></el-checkbox>
                        <el-checkbox @change="changeCheckStatus('moduleCheckGroup.projectsCheck', $event)" :value="checkStatus.projectsCheck" label="项目经验" border size="medium"></el-checkbox>
                        <el-checkbox @change="changeCheckStatus('moduleCheckGroup.jobsCheck', $event)" :value="checkStatus.jobsCheck" label="工作经历" border size="medium"></el-checkbox>
                        <el-checkbox @change="changeCheckStatus('moduleCheckGroup.hobbyCheck', $event)" :value="checkStatus.hobbyCheck" label="兴趣爱好" border size="medium"></el-checkbox>
                        <el-checkbox @change="changeCheckStatus('moduleCheckGroup.studyCheck', $event)" :value="checkStatus.studyCheck" label="教育背景" border size="medium"></el-checkbox>
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
                let allPrintDiv = document.querySelectorAll(".print-div")
                for (let i = 0; i < allPrintDiv.length; i++) {
                    let item = allPrintDiv[i]
                    item.innerHTML = item.parentElement.querySelector(".el-textarea__inner").value.replace(new RegExp("\n","gm"), "<br>")
                }
                window.print()
            },
            saveResume() {
                if (!this.isLogin) {
                    this.$message.error("请先登录后再进行保存操作")
                    return
                }
                window.FORM_TOOLS.EVENT_HUB_TOOL.$emit("save-resume-data", "")
            },
            shareResume() {
                if (!this.isLogin) {
                    this.$message.error("请先登录后再进行分享操作")
                    return
                }
                window.FORM_TOOLS.EVENT_HUB_TOOL.$emit("share-resume-data", "")
            },
            changeCheckStatus(name, value) {
                window.FORM_TOOLS.EVENT_HUB_TOOL.$emit("update-resume-data", name, value)
            }
        },
        data() {
            return {}
        },
        created() {
        }
    })
}