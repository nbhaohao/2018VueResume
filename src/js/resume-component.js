{
    Vue.component("resume-wrapper", {
        props: ["resume"],
        template: `
            <div class="resume">
            <div class="top-colorpart">
                <div class="whitepart"></div>
            </div>
            <div class="jobTarget">
                <div class="svg-wrapper">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-user"></use>
                    </svg>
                </div>
                <div class="userInfo">
                    <el-input maxlength="4" class="name-input" :value="resume.name" @input="$emit('update-resume', 'name', $event)"></el-input>
                    <div class="target-job"><el-input maxlength="25" class="" :value="resume.targetJob" @input="$emit('update-resume', 'targetJob', $event)"></el-input></div>
                </div>
            </div>
            <div class="infobar">
                <span class="birthday">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-day"></use>
                    </svg>
                    <el-input maxlength="12" class="info-text" :value="resume.birthday" @input="$emit('update-resume', 'birthday', $event)"></el-input>
                </span>
                <span class="phone">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-phone"></use>
                    </svg>
                    <el-input maxlength="11" class="info-text" :value="resume.phone" @input="$emit('update-resume', 'phone', $event)"></el-input>
                </span>
                <span class="email">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mail"></use>
                    </svg>
                    <el-input maxlength="25" class="info-text" :value="resume.email" @input="$emit('update-resume', 'email', $event)"></el-input>
                </span>
                <span class="gender" style="width:10%;">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gender"></use>
                    </svg>
                    <el-input maxlength="2" class="info-text" :value="resume.gender" @input="$emit('update-resume', 'gender', $event)"></el-input>
                </span>
            </div>
            <div class="importantList">
                <div class="skills important-contenrt-wrapper">
                    <div class="titleWrapper">
                        <div class="svg-circle-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-skills"></use>
                            </svg>
                        </div>
                        <h3>主要技能</h3>
                    </div>
                    <el-input :value="resume.skills" @input="$emit('update-resume', 'skills', $event)" type="textarea" :autosize="true"></el-input>
                </div>
                <div class="project important-contenrt-wrapper">
                    <div class="titleWrapper">
                        <div class="svg-circle-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-project"></use>
                            </svg>
                        </div>
                        <h3>项目经验</h3>
                    </div>
                    <div class="projectList">
                        <div class="div-c-projectItem" v-for="(project,index) in resume.projects" :key="index">
                            <el-input :value="project.text" @input="$emit('update-resume', 'projects.' + index + '.text', $event)" type="textarea" :autosize="true"></el-input>
                            <span class="span-c-red-close">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-close"></use>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="job important-contenrt-wrapper">
                    <div class="titleWrapper">
                        <div class="svg-circle-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-job"></use>
                            </svg>
                        </div>
                        <h3>工作经历</h3>
                    </div>
                    <div class="jobsList">
                        <el-input v-for="(job,index) in resume.jobs" :key="index" :value="job.text" @input="$emit('update-resume', 'jobs.' + index + '.text', $event)" type="textarea" :autosize="true"></el-input>
                    </div>
                </div>
                <div class="hobby important-contenrt-wrapper">
                    <div class="titleWrapper">
                        <div class="svg-circle-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-hobby"></use>
                            </svg>
                        </div>
                        <h3>兴趣爱好</h3>
                    </div>
                    <el-input :value="resume.hobby" @input="$emit('update-resume', 'hobby', $event)" type="textarea" :autosize="true">
                </div>
                <div class="study important-contenrt-wrapper">
                    <div class="titleWrapper">
                        <div class="svg-circle-wrapper">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-study"></use>
                            </svg>
                        </div>
                        <h3>教育背景</h3>
                    </div>
                 <el-input :value="resume.study" @input="$emit('update-resume', 'study', $event)" type="textarea" :autosize="true">
                </div>
            </div>
            <div class="bottom-colorpart">
                <div class="whitepart"></div>
            </div>
        </div>
        `,
    })
}