
// CLASS BLUEPRINT FOR CREATING TASKS
export default class Task {
    constructor(name, dueDate = 'No date') {
        this.name = name
        this.dueDate = dueDate
    }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setDate(dueDate) {
        this.dueDate = dueDate
    }

    getDate() {
        return this.dueDate
    }

    // getDateFormatted() {
    //     const day = this.dueDate.split('/')[0]
    //     const month = this.dueDate.split('/')[1]
    //     const year = this.dueDate.split('/')[2]
    //     return `${month}/${day}/${year}`
    // }

    getDateFormatted() {
        // If the dueDate is 'No date', return it as is
        if (this.dueDate === 'No date') {
            return this.dueDate;
        }

        // Parse the current dueDate assuming it's in MM/dd/yyyy format
        const parsedDate = new Date(this.dueDate);

        // Format the date as MM/dd/yyyy
        const formattedDate = parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        return formattedDate;
    }
}