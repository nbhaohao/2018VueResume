Vue.component("del-btn-textarea", {
    props: ["value", "targetData", "isPreview"],
    template: `
        <div class="div-c-projectItem">
            <el-input :disabled="isPreview" @input="updateParentData" @focus="toggleDelBtn('show')" :value="value" @blur="toggleDelBtn('hide')" type="textarea" :autosize="true"></el-input>
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" >
                <span v-show="closeBtnShow" class="span-c-red-close" @click="delItem">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </span>
            </transition>
            <div class="print-div"></div>
        </div>
    `,
    data() {
        return {
            closeBtnShow: false,
        }
    },
    methods: {
        toggleDelBtn(status) {
            if (this.isPreview) {return}
            if (status === "show") {
                this.closeBtnShow = true
            } else {
                this.closeBtnShow = false
            }
        },
        delItem() {
            let data = this.targetData.split(".")
            window.FORM_TOOLS.EVENT_HUB_TOOL.$emit("delete-resume-data", data[0], data[1])
        },
        updateParentData(value) {
            window.FORM_TOOLS.EVENT_HUB_TOOL.$emit("update-resume-data", this.targetData, value)
        }
    },
})