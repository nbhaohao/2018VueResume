{
    Vue.component("resume-wrapper", {
        props: ["resume", "animationFlag", "isPreview"],
        template: `
            <div class="resume">
            <div class="top-colorpart">
                <div class="whitepart"></div>
                <el-button @click="window.location.href = '/2018VueResume/index.html'" v-if='isPreview' class="absolute-right" v-clock type="success" round>返回主页</el-button>
            </div>
            <div class="jobTarget">
                <div class="svg-wrapper">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-user"></use>
                    </svg>
                </div>
                <div class="userInfo">
                    <el-input maxlength="4" :disabled="isPreview" class="name-input" :value="resume.name" @input="$emit('update-resume', 'name', $event)"></el-input>
                    <div class="target-job"><el-input  :disabled="isPreview" maxlength="25" class="" :value="resume.targetJob" @input="$emit('update-resume', 'targetJob', $event)"></el-input></div>
                </div>
            </div>
            <div class="infobar">
                <span class="birthday">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-day"></use>
                    </svg>
                    <el-input maxlength="12" :disabled="isPreview" class="info-text" :value="resume.birthday" @input="$emit('update-resume', 'birthday', $event)"></el-input>
                </span>
                <span class="phone">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-phone"></use>
                    </svg>
                    <el-input maxlength="11" :disabled="isPreview" class="info-text" :value="resume.phone" @input="$emit('update-resume', 'phone', $event)"></el-input>
                </span>
                <span class="email">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mail"></use>
                    </svg>
                    <el-input maxlength="25" :disabled="isPreview" class="info-text" :value="resume.email" @input="$emit('update-resume', 'email', $event)"></el-input>
                </span>
                <span class="gender" style="width:10%;">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gender"></use>
                    </svg>
                    <el-input maxlength="2" :disabled="isPreview" class="info-text" :value="resume.gender" @input="$emit('update-resume', 'gender', $event)"></el-input>
                </span>
            </div>
                <div class="importantList">
                    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight" v-bind:css="animationFlag" >
                        <div v-clock v-if="resume.moduleCheckGroup.skillsCheck" class="skills important-contenrt-wrapper">
                            <div class="titleWrapper">
                                <div class="svg-circle-wrapper">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-skills"></use>
                                    </svg>
                                </div>
                                <h3>主要技能</h3>
                            </div>
                            <el-input :disabled="isPreview" :value="resume.skills" @input="$emit('update-resume', 'skills', $event)" type="textarea" :autosize="true"></el-input>
                            <div class="print-div"></div>
                        </div>
                    </transition>
                    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight" >
                        <list-wrapper :is-preview="isPreview" v-clock v-if="resume.moduleCheckGroup.projectsCheck" :icon-class="'icon-project'" :title="'项目经验'" :wrapper-class="'project'" :list-class="'projectList'" :data="resume.projects" :targetData="'projects.'"></list-wrapper>
                    </transition>
                    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight leave-active-content-wrapper" >
                        <list-wrapper :is-preview="isPreview" v-clock v-if="resume.moduleCheckGroup.jobsCheck" :icon-class="'icon-job'" :title="'工作经历'" :wrapper-class="'job'" :list-class="'jobsList'" :data="resume.jobs" :targetData="'jobs.'"></list-wrapper>
                    </transition>
                    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight" >
                        <div v-clock v-if="resume.moduleCheckGroup.hobbyCheck" class="hobby important-contenrt-wrapper">
                            <div class="titleWrapper">
                                <div class="svg-circle-wrapper">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-hobby"></use>
                                    </svg>
                                </div>
                                <h3>兴趣爱好</h3>
                            </div>
                            <el-input :value="resume.hobby" @input="$emit('update-resume', 'hobby', $event)" type="textarea" :autosize="true">
                            <div class="print-div"></div>
                        </div>
                    </transition>
                    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight" >
                        <div v-clock v-if="resume.moduleCheckGroup.studyCheck" class="study important-contenrt-wrapper">
                            <div class="titleWrapper">
                                <div class="svg-circle-wrapper">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-study"></use>
                                    </svg>
                                </div>
                                <h3>教育背景</h3>
                            </div>
                              <div class="print-div"></div>
                         <el-input :disabled="isPreview" :value="resume.study" @input="$emit('update-resume', 'study', $event)" type="textarea" :autosize="true">
                        </div>
                    </transition>

                </div>
            <div class="bottom-colorpart"></div>
        </div>
        `,
    })
}