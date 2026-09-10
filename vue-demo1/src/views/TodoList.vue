<template>
<div class="todolist-page">
<Navigator />

<div class="todo-task">

    <h1>每日任务清单</h1>

    <div class="add-task">
        <input type="text" v-model.trim="taskName" 
                @keydown.enter="taskAddHandler"
                placeholder="请输入任务名、例如吃饭、睡觉、打豆豆">
        <button @click="taskAddHandler">添加</button>
    </div>

    <div class="tips">
        <p class="warning">勾选复选框即代表完成任务</p>
        <p class="message">
            <span>总任务数<b>{{ taskList.length  }}</b></span>
            <span>待完成<b>{{ pendingCount  }}</b></span>
            <span>编辑中<b>{{ editCount }}</b></span>
            <span>已完成<b>{{ doneCount }}</b></span>
        </p>
    </div>

    <div class="task-list">

        <div class="task-item" v-for="item in taskList" :key="item.id">
            <ul>
                <li><input type="checkbox" 
                     @change="item.state = '已完成'" :disabled="item.state === '已完成'"
                    :checked="item.state === '已完成'">
                </li>
                <li>
                    <span class="task-name" v-if="item.state !== '编辑中'"
                        :class="{done: item.state === '已完成'}">{{ item.name }}</span>
                    <input type="text" :value="item.name" 
                         @keydown.enter="item.name = $event.target.value; item.state = '待完成'"
                         @keydown.esc=" item.state = '待完成'"
                        class="edit-input" v-else>
                </li>
                <li>
                    <span :class="getStateStyle(item.state)">{{  item.state }}</span>
                </li>
                <li>
                    <a href="" v-if="item.state === '待完成'" @click.prevent="item.state = '编辑中'" class="btn-edit">修改</a>
                    <a href="javascript:void(0)" v-else class="btn-edit">修改</a>
                    <a href="" @click.prevent="taskDeleteHandler(item.id)" class="btn-delete">删除</a>
                </li>
            </ul>
        </div>

        
    </div>

</div>
</div>

</template>


<script>

import Navigator from '@/components/Navigator.vue';


export default {

    data() {
        return {
            taskName: "" ,  // 存储当前输入的任务名称 
            currentTaskId: 0 , // 设置当前任务的 ID 值
            taskList: [] ,  // 用来存储 所有的任务 、每一个任务是一个对象
        }
    },
    
    methods: {
        taskAddHandler(event) {
            let tag = event.target ;
            if (tag.nodeName === "BUTTON") {
                tag = tag.previousElementSibling ;
            }

            if (this.taskName === "") {
                this.$layer.tips('任务名不允许为空', tag, {tips: 3});
                return ;
            }
            // 检查 当前输入的任务 是否在 任务列表中已经存在 
            if (this.taskList.find(t => t.name === this.taskName) != null) {
                // 任务 存在 、则 提示 当前任务 已存在
                this.$layer.tips('当前任务已存在', tag, {tips: 3});
                return ;
            }
            // 任务 如果不存在， 则添加任务当 任务列表中 
            this.taskList.unshift({
                id: ++this.currentTaskId ,
                name: this.taskName ,
                state: '待完成' 
            })
            this.taskName = "" ;
        },
        getStateStyle(state) {
            if (state === '已完成') return 'status-done';
            if (state === '待完成') return 'status-pending';
            if (state === '编辑中') return 'status-editing' ;
        },
        taskDeleteHandler(taskId) {

            this.$layer.confirm('您确定要删除该任务吗?', (index)=> {
                 // 根据 任务ID 从 任务列表中查找当前任务的 索引
                let taskIndex = this.taskList.findIndex(t => t.id === taskId);

                if (index != -1) {
                    // 删除对应的数据 
                    this.taskList.splice(taskIndex, 1) ;
                    // 关闭 提示框 
                    this.$layer.close(index); 
                }

            });
        }
    },
    computed: {
        pendingCount() {
            return this.taskList.filter(t => t.state === '待完成').length ;
        },
        editCount() {
            return this.taskList.filter(t => t.state === '编辑中').length ;
        },
        doneCount() {
            return this.taskList.filter(t => t.state === '已完成').length ;
        }
    },
    components: {
      Navigator ,
    }
}

</script>



<style scoped>
/* 页面背景 - 与Index一致 */
.todolist-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #87CEEB 0%, #F4A460 30%, #D2691E 60%, #8B4513 100%);
  background-attachment: fixed;
}

/* 主容器 */
.todo-task {
  max-width: 1320px;
  margin: 40px auto;
  padding: 40px 36px;
  background: linear-gradient(145deg, #F5DEB3 0%, #DEB887 50%, #D2B48C 100%);
  border-radius: 20px;
  box-shadow:
    0 20px 60px rgba(139, 69, 19, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.1);
  font-family: 'Georgia', "PingFang SC", "Microsoft YaHei", serif;
  border: 3px solid #8B7355;
}

/* 标题 */
.todo-task h1 {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #8B0000;
  text-shadow: 1px 1px 2px rgba(139, 0, 0, 0.3);
  margin: 0 0 32px;
  letter-spacing: 2px;
  font-family: 'Georgia', serif;
  padding-bottom: 15px;
  border-bottom: 3px solid #8B7355;
}

/* 输入区域 */
.add-task {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.add-task input[type="text"] {
  flex: 1;
  height: 48px;
  padding: 0 20px;
  border: 2px solid #8B7355;
  border-radius: 8px;
  font-size: 15px;
  background: linear-gradient(180deg, #DEB887 0%, #D2B48C 100%);
  color: #3E2723;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Georgia', serif;
}

.add-task input[type="text"]:focus {
  border-color: #D2691E;
  box-shadow: 0 0 0 4px rgba(210, 105, 30, 0.2);
}

.add-task input[type="text"]::placeholder {
  color: #8B7355;
  font-style: italic;
}

.add-task button {
  height: 48px;
  padding: 0 28px;
  border: 2px solid #8B7355;
  border-radius: 8px;
  background: linear-gradient(135deg, #CD853F 0%, #D2691E 50%, #A0522D 100%);
  color: #FFD700;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 1px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-family: 'Georgia', serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.add-task button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.5);
}

.add-task button:active {
  transform: translateY(0);
}

/* 任务列表容器 */
.task-list {
  background: linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border: 2px solid #8B7355;
}

/* 单个任务项 */
.task-item {
  border-bottom: 2px solid #C4A882;
  transition: background-color 0.2s ease;
}

.task-item:last-child {
  border-bottom: none;
}

.task-item:hover {
  background-color: rgba(139, 69, 19, 0.08);
}

.task-item ul {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 18px 24px;
  gap: 16px;
}

.task-item ul li {
  margin: 0;
  padding: 0;
}

/* 复选框列 */
.task-item ul li:first-child {
  width: 32px;
  flex-shrink: 0;
}

.task-item ul li:first-child input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #D2691E;
  cursor: pointer;
  border-radius: 4px;
}

/* 任务名称列 */
.task-item ul li:nth-child(2) {
  flex: 1;
  font-size: 15px;
  color: #3E2723;
  line-height: 1.5;
  font-family: 'Georgia', serif;
}

.task-item ul li:nth-child(2) .task-name {
  display: inline-block;
}

.task-item ul li:nth-child(2) .task-name.done {
  text-decoration: line-through;
  color: #8B7355;
}

.task-item ul li:nth-child(2) .edit-input {
  width: 100%;
  padding: 8px 14px;
  border: 2px solid #8B7355;
  border-radius: 8px;
  font-size: 15px;
  color: #3E2723;
  outline: none;
  background: #DEB887;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-family: 'Georgia', serif;
}

.task-item ul li:nth-child(2) .edit-input:focus {
  border-color: #D2691E;
  box-shadow: 0 0 0 3px rgba(210, 105, 30, 0.2);
}

/* 状态列 - 增加左侧间距 */
.task-item ul li:nth-child(3) {
  width: 90px;
  text-align: center;
  flex-shrink: 0;
  margin-left: 24px;
}

.task-item ul li:nth-child(3) span {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
  font-family: 'Georgia', serif;
}

/* 已完成状态 - 西部绿色 */
.status-done {
  background: linear-gradient(135deg, #556B2F 0%, #6B8E23 100%);
  color: #F5F5DC;
  box-shadow: 0 2px 8px rgba(85, 107, 47, 0.4);
}

/* 编辑中状态 - 西部橙黄 */
.status-editing {
  background: linear-gradient(135deg, #D2691E 0%, #CD853F 100%);
  color: #FFD700;
  box-shadow: 0 2px 8px rgba(210, 105, 30, 0.4);
}

/* 待完成状态 - 西部棕色 */
.status-pending {
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  color: #F5DEB3;
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.4);
}

/* 操作列 */
.task-item ul li:last-child {
  width: 140px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
}

.task-item ul li:last-child a {
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  font-family: 'Georgia', serif;
}

/* 修改按钮 - 西部风格 */
.btn-edit {
  background: linear-gradient(135deg, #CD853F 0%, #D2691E 100%);
  color: #FFD700 !important;
  box-shadow: 0 3px 10px rgba(210, 105, 30, 0.4);
  border-color: #8B7355;
}

.btn-edit:hover {
  background: linear-gradient(135deg, #D2691E 0%, #8B4513 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 16px rgba(139, 69, 19, 0.5);
}

/* 删除按钮 - 西部风格 */
.btn-delete {
  background: transparent;
  color: #8B0000 !important;
  border: 2px solid #A0522D;
}

.btn-delete:hover {
  background: rgba(139, 0, 0, 0.1);
  border-color: #8B0000;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
}

.btn-edit:active,
.btn-delete:active {
  transform: translateY(0);
}

/* 响应式适配 */
@media (max-width: 600px) {
  .todo-task {
    margin: 20px 12px;
    padding: 24px 18px;
  }

  .todo-task h1 {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .add-task {
    flex-direction: column;
  }

  .add-task button {
    width: 100%;
  }

  .task-item ul {
    padding: 14px 16px;
    gap: 8px;
    flex-wrap: wrap;
  }

  .task-item ul li:nth-child(3) {
    margin-left: 12px;
  }

  .task-item ul li:last-child {
    width: 100%;
    justify-content: flex-end;
    margin-top: 6px;
  }
}

/* 统计提示区域 */
.tips {
  margin-bottom: 20px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%);
  border-radius: 14px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border: 2px solid #8B7355;
}

.tips .warning {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #8B4513;
  margin: 0 0 18px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #DEB887 0%, #D2B48C 100%);
  border: 1px solid #8B7355;
  border-left: 4px solid #D2691E;
  border-radius: 10px;
  letter-spacing: 0.5px;
  font-family: 'Georgia', serif;
}

.tips .warning::before {
  content: "⚠️";
  font-size: 18px;
  flex-shrink: 0;
}

.tips .message {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  gap: 8px;
}

.tips .message span {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #3E2723;
  padding: 8px 16px;
  border-radius: 10px;
  background: rgba(139, 69, 19, 0.08);
  transition: background-color 0.2s ease;
  font-family: 'Georgia', serif;
}

.tips .message span:hover {
  background: rgba(139, 69, 19, 0.15);
}

.tips .message span b {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}

/* 总任务数 - 深棕 */
.tips .message span:nth-child(1) b {
  color: #8B4513;
}

/* 待完成 - 橙色 */
.tips .message span:nth-child(2) b {
  color: #D2691E;
}

/* 编辑中 - 金色 */
.tips .message span:nth-child(3) b {
  color: #B8860B;
}

/* 已完成 - 橄榄绿 */
.tips .message span:nth-child(4) b {
  color: #556B2F;
}

/* 响应式 */
@media (max-width: 600px) {
  .tips {
    padding: 16px 18px;
  }

  .tips .message {
    flex-wrap: wrap;
    gap: 8px;
  }

  .tips .message span {
    flex: 1;
    min-width: 120px;
    justify-content: center;
    padding: 10px 12px;
  }
}
</style>