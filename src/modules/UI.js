
import { format } from 'date-fns'
import Project from './Project'
// PROJECT EVENT LISTENERS
export default class UI {
    // DOM manipulation Load Content

    // LOADING CONTENT
    static loadHomePage() {
        UI.initProjectButtons();
        // UI.initAddProjectButtons();
    }

    // Load Projects to Nav and Activate Add New Projects
    static loadProjects() {
        Storage.getTodoList()
            .getProjects()
            .forEach((project) => {
                if (
                    project.name !== 'Inbox' &&
                    project.name !== 'Today' &&
                    project.name !== 'This week'
                ) {
                    UI.createProject(project.name)
                }
            })

        UI.initAddProjectButtons()
    }

    static closeAllPopups() {
        UI.closeAddProjectPopup()
        if (document.getElementById('button-add-task')) {
            UI.closeAddTaskPopup()
        }
        if (
            document.getElementById('tasks-list') &&
            document.getElementById('tasks-list').innerHTML !== ''
        ) {
            UI.closeAllInputs()
        }
    }

    // CREATING CONTENT

    // creates project name list in Nav 
    static createProject(name) {
        const userProjects = document.getElementById('projects-list')
        userProjects.innerHTML += ` 
          <button class="button-project" data-project-button>
            <div class="left-project-panel">
              <i class="fas fa-tasks"></i>
              <span>${name}</span>
            </div>
            <div class="right-project-panel">
              <i class="fas fa-times"></i>
            </div>
          </button>`

        UI.initProjectButtons()
    }

    // ADD PROJECT EVENT LISTENERS

    static initAddProjectButtons() {
        const addProjectButton = document.getElementById('button-add-project')
        const addProjectPopupButton = document.getElementById('button-add-project-popup')
        const cancelProjectPopupButton = document.getElementById('button-cancel-project-popup')
        const addProjectPopupInput = document.getElementById('input-add-project-popup')

        addProjectButton.addEventListener('click', UI.openAddProjectPopup)
        addProjectPopupButton.addEventListener('click', UI.addProject)
        cancelProjectPopupButton.addEventListener('click', UI.closeAddProjectPopup)
        addProjectPopupInput.addEventListener('keypress', UI.handleAddProjectPopupInput)

    }

    static openAddProjectPopup() {
        const addProjectPopup = document.getElementById('add-project-popup')
        const addProjectButton = document.getElementById('button-add-project')

        UI.closeAllPopups()
        addProjectPopup.classList.add('active')
        addProjectButton.classList.add('active')
    }

    static closeAddProjectPopup() {
        const addProjectPopup = document.getElementById('add-project-popup')
        const addProjectButton = document.getElementById('button-add-project')
        const addProjectPopupInput = document.getElementById('input-add-project-popup')

        addProjectPopup.classList.remove('active')
        addProjectButton.classList.remove('active')
        addProjectPopupInput.value = ''
    }

    static addProject() {
        const addProjectPopupInput = document.getElementById(
            'input-add-project-popup'
        )
        const projectName = addProjectPopupInput.value

        // form validation
        if (projectName === '') {
            alert("Project name can't be empty")
            return
        }

        // form validation
        if (Storage.getTodoList().contains(projectName)) {
            addProjectPopupInput.value = ''
            alert('Project names must be different')
            return
        }

        // add new project to storage and list
        Storage.addProject(new Project(projectName))
        UI.createProject(projectName)
        UI.closeAddProjectPopup()
    }

    // allows user to add input value with enter key as well as add btn
    static handleAddProjectPopupInput(e) {
        if (e.key === 'Enter') UI.addProject()
    }

    // PROJECT EVENT LISTENERS
    static initProjectButtons() {

        // opens hamburger drop down nav
        const openNavButton = document.getElementById('button-dropdown-nav');
        openNavButton.addEventListener('click', UI.openNav)
    }

    // Static method that opens nav menu
    static openNav() {
        const nav = document.getElementById('nav')

        // UI.closeAllPopups()
        nav.classList.toggle('active')
    }
}