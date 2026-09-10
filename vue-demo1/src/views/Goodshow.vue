
<style>
  *{
            margin: 0px;
            padding: 0px;
        }
        .box{
            background-color: rgb(4, 88, 4);
            width: 100%;
            height: 80px;
        }
        h1{
            margin: 0 auto; /* 水平居中 */
            height: 80px;
            color: white;
            line-height: 80px; /* 让文字垂直居中 */
            text-align: center; /* 文字居中 */
            width: 200px; /* 需要设置宽度才能居中 */
        }
        .input{
            width: 100%;
            height: 80px;
            text-align: center; /* 让行内块元素居中 */
        }
        input[type="text"]{
            margin: 25px;
            margin-left: 0px;
            margin-right: 0px;
            width: 250px;
            height: 25px;
        }
        .add_ren{
            height: 35px;
            width: 100px;
            border-radius: 5px;
            border:solid 2px rgb(161, 6, 6);
        }
        .add_ren:hover{
            background-color: rgb(245, 12, 12);
            cursor: pointer;
        }
        .display_plan{
            width: 100%;
            height: 100px;

            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
            font-size: 25px;
        }
        /* 表格实现*/
       .plan {
            max-width: 800px;
            margin: 20px auto;
            font-family: Arial, sans-serif;
        }

        .table_plan {
            width: 100%;
            border-collapse: collapse;
            text-align: center;
            font-size: 14px;
        }

        .table_plan th,
        .table_plan td {
            border: 1px solid #ccc;
            padding: 10px 8px;
        }

        .table_plan thead {
            background-color: #f5f5f5;
            font-weight: bold;
        }

        /* 复选框样式 — 模拟 ☐ / ☑ */
        .checkbox {
            font-size: 18px;
            cursor: pointer;
            user-select: none;
        }

        .checkbox.done {
            color: #28a745;
        }

        .checkbox.pending {
            color: #6c757d;
        }

        /* 状态标签样式 */
        .status {
            display: inline-block;
            padding: 2px 14px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 500;
        }

        .status.done {
            background-color: #d4edda;
            color: #155724;
        }

        .status.pending {
            background-color: #f8d7da;
            color: #721c24;
        }

        /* 删除按钮样式 */
        .delete-btn {
            cursor: pointer;
            /* font-weight: bold; */
            color: white;
            background: red;
            border: solid 1px burlywood;
            font-size: 12px;
            width: 60px;
            height: 30px;

        }

        .delete-btn:hover {
            /* text-decoration: underline; */
            background-color:rgb(190, 190, 79);
            border-radius: 15px;
        }
        .tbody_plan tr td input:hover{
            cursor: pointer;
        }
        /* 任务名列加宽 */
        .table_plan th:nth-child(3),
        .table_plan td:nth-child(3) {
            min-width: 200px;
        }
        /* 覆盖全局 input 样式，防止编辑框撑变形 */
        .tbody_plan td input[type="text"] {
            width: 100%;
            margin: 0;
            padding: 2px 4px;
            box-sizing: border-box;
            height: auto;
        }
</style>
<template>
    <div class="box">
        <h1>列表任务清单</h1>
    </div>

    <div class="input">
         <input
            type="text"
            v-model="newTask"
            placeholder="请输入任务内容:例如打豆豆,睡觉"
            @keydown.enter="addTask"
         />
         <button class="add_ren" @click="addTask">添加任务</button>
    </div>

    <div class="display_plan">
        <span>总任务数({{ totalCount }}) 已完成({{ doneCount }}) 未完成({{ pendingCount }})</span>
    </div>

    <!-- vue3-layer 确认弹窗 -->
    <S3Layer v-model="showConfirm" type="confirm" title="提示" :content="confirmMsg" :btn="['确定', '取消']" @yes="onConfirmYes" />
    <div class="plan">
        <table class="table_plan">
            <thead>
                <tr>
                    <th>#</th>
                    <th>任务编号</th>
                    <th>任务名</th>
                    <th>任务状态</th>
                    <th>添加时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody class="tbody_plan">
                <tr v-for="(task, index) in tasks" :key="task.id">
                    <td>
                        <input
                            type="checkbox"
                            :checked="task.done"
                            @change="toggleTask(task)"
                        />
                    </td>
                    <td>{{ task.id }}</td>
                    <td
                        class="double_change"
                        @dblclick="startEdit(task)"
                    >
                        <template v-if="task.editing">
                            <input
                                type="text"
                                v-model="task.editValue"
                                @blur="saveEdit(task)"
                                @keydown.enter="saveEdit(task)"
                            />
                        </template>
                        <template v-else>
                            {{ task.name }}
                        </template>
                    </td>
                    <td>
                        <span :class="['status', task.done ? 'done' : 'pending']">
                            {{ task.done ? '已完成' : '未完成' }}
                        </span>
                    </td>
                    <td>{{ task.time }}</td>
                    <td>
                        <button class="delete-btn" @click="deleteTask(index)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTask: '',
            tasks: [],
            taskIdCounter: 0,
            showConfirm: false,    // 控制确认弹窗显示
            confirmMsg: '',        // 确认弹窗内容
            confirmIndex: -1       // 待删除的任务索引
        }
    },
    computed: {
        // 统计任务数
        totalCount() {
            return this.tasks.length
        },
        doneCount() {
            return this.tasks.filter(t => t.done).length
        },
        pendingCount() {
            return this.totalCount - this.doneCount
        }
    },
    methods: {
        // 获取当前时间
        getTaskTime() {
            const date = new Date()
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        },
        // 添加任务
        addTask() {
            const taskName = this.newTask.trim()
            if (!taskName) {
                alert('请输入任务内容！')
                return
            }

            this.taskIdCounter++
            this.tasks.push({
                id: this.taskIdCounter,
                name: taskName,
                done: false,
                time: this.getTaskTime(),
                editing: false,
                editValue: ''
            })

            this.newTask = '' // 清空输入框
        },
        // 删除任务（使用vue3-layer确认弹窗）
        deleteTask(index) {
            this.confirmMsg = '确定要删除这条任务吗？'
            this.confirmIndex = index
            this.showConfirm = true
        },
        // 确认删除回调
        onConfirmYes() {
            if (this.confirmIndex >= 0) {
                this.tasks.splice(this.confirmIndex, 1)
            }
            this.showConfirm = false
            this.confirmIndex = -1
        },
        // 切换任务状态
        toggleTask(task) {
            task.done = !task.done
        },
        // 开始编辑任务名
        startEdit(task) {
            task.editing = true
            task.editValue = task.name
            // 等待DOM更新后聚焦输入框
            this.$nextTick(() => {
                const input = document.querySelector('.double_change input')
                if (input) input.focus()
            })
        },
        // 保存编辑
        saveEdit(task) {
            const newValue = task.editValue.trim()
            task.name = newValue || task.name // 如果为空则保留原值
            task.editing = false
        }
    }
}
</script>
