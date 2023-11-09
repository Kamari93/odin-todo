import Project from './Project'
import Task from './Task'
import TodoList from './TodoList'

// Used to store the data and create the buckets and thier content AKA the entire ToDoList Data
export default class Storage {
    // save the app to local storage 
    static saveTodoList(data) {
        localStorage.setItem('todoList', JSON.stringify(data))
    }

    // intialize a new ToDoList instance with all the data 
    static getTodoList() {
        const todoList = Object.assign(
            new TodoList(),
            JSON.parse(localStorage.getItem('todoList'))
        )

        todoList.setProjects(
            todoList
                .getProjects()
                .map((project) => Object.assign(new Project(), project))
        )

        todoList
            .getProjects()
            .forEach((project) =>
                project.setTasks(
                    project.getTasks().map((task) => Object.assign(new Task(), task))
                )
            )

        return todoList
    }
}