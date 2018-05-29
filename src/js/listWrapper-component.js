Vue.component("list-wrapper", {
    props: ["iconClass", "title", "wrapperClass", "listClass", "data", "targetData", "isPreview"],
    template: `
        <div v-on:mouseenter="toggleAddBtn('show')" v-on:mouseleave="toggleAddBtn('hide')" class="important-contenrt-wrapper" :class="wrapperClass">
            <div class="titleWrapper">
                <div class="svg-circle-wrapper">
                    <svg class="icon" aria-hidden="true">
                        <use v-bind:xlink:href="'#' + iconClass"></use>
                    </svg>
                </div>
                <h3>{{ title }}</h3>
                <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" >
                    <span v-show="isAddBtnVisible" class="span-c-red-close" @click="addItem">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-add"></use>
                        </svg>
                    </span>
                </transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            </div>
            <div :class="listClass">
                <template v-for="(item, index) in data" :key="index">
                    <del-btn-textarea :is-preview="isPreview"  :target-data='targetData + index' :value="item"></del-btn-textarea>
                </template>
            </div>
        </div>
    `,
    methods: {
        addItem() {
            let data = this.targetData.replace(".", "")
            window.FORM_TOOLS.EVENT_HUB_TOOL.$emit("add-resume-data", data)
        },
        toggleAddBtn(status) {
            if (this.isPreview) {return}
            if (status === "show") {
                this.isAddBtnVisible = true
            } else {
                this.isAddBtnVisible = false
            }
        },
    },
    data: function() {
      return {
          isAddBtnVisible: false,
      }
    },
})