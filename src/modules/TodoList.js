import { compareAsc, toDate } from 'date-fns'
import Project from './Project'
import Task from './Task'

// Create the individual Projects content
export default class TodoList {
    // create individual/initial projects
    constructor() {
        this.projects = []
        this.projects.push(new Project('Inbox'))
        this.projects.push(new Project('Today'))
        this.projects.push(new Project('This week'))
    }

    // set the value of projects Arr...this arg will be set in Storage.js
    setProjects(projects) {
        this.projects = projects
    }
    // retrieve the value/list of the projects Arr
    getProjects() {
        return this.projects
    }

    // in the projects array retrieve the project with the specific name
    getProject(projectName) {
        return this.projects.find((project) => project.getName() === projectName)
    }

    // checks to see if projects arr containts a specific project for input validation...used in UI.js and tied to Storage.js
    contains(projectName) {
        return this.projects.some((project) => project.getName() === projectName)
    }

    addProject(newProject) {
        // only add new project entry if its name isn't already in the Projects arr
        if (this.projects.find((project) => project.name === newProject.name))
            return
        this.projects.push(newProject)
    }

    // use the getName() func from Tasks.js to search projects arr and del selected proj
    deleteProject(projectName) {
        const projectToDelete = this.projects.find(
            (project) => project.getName() === projectName
        )
        this.projects.splice(this.projects.indexOf(projectToDelete), 1)
    }

    updateTodayProject() {
        // Empty the Today project arr in order to fill with curr days projects' tasks
        this.getProject('Today').tasks = []

        // loop through Projects arr to get the curr tasks of each proj folder to update curr days tasks
        this.projects.forEach((project) => {
            // skip the Today/Week proj folders tasks as these will be the folders the curr updated tasks wil be added to
            if (project.getName() === 'Today' || project.getName() === 'This week')
                return

            // else use the getTasksToday method from Project.js to gather all curr day tasks and add them and their parent project to the Today project arr 
            const todayTasks = project.getTasksToday()
            todayTasks.forEach((task) => {
                const taskName = `${task.getName()} (${project.getName()})`
                this.getProject('Today').addTask(new Task(taskName, task.getDate()))
            })
        })
    }


    updateWeekProject() {
        this.getProject('This week').tasks = []

        this.projects.forEach((project) => {
            if (project.getName() === 'Today' || project.getName() === 'This week')
                return

            const weekTasks = project.getTasksThisWeek()
            weekTasks.forEach((task) => {
                const taskName = `${task.getName()} (${project.getName()})`
                this.getProject('This week').addTask(new Task(taskName, task.getDate()))
            })
        })

        // the This Week project tasks are sorted in ascneding order based on dates using sort and compareAsci comparator fn from date-fns 
        this.getProject('This week').setTasks(
            this.getProject('This week')
                .getTasks()
                .sort((taskA, taskB) =>
                    compareAsc(
                        toDate(new Date(taskA.getDateFormatted())),
                        toDate(new Date(taskB.getDateFormatted()))
                    )
                )
        )
    }
}