// Your code here
function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRowData){
    return employeeRowData.map(row => createEmployeeRecord(row));
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date
    })

    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date
    })

    return employee
}

function hoursWorkedOnDate(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(e => e.date === soughtDate)
    let outEvent = employee.timeOutEvents.find(e => e.date === soughtDate)

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, soughtDate){
    let hoursWorked = hoursWorkedOnDate(employee, soughtDate)
    return hoursWorked * employee.payPerHour
}

function allWagesFor(employee){
    let workingDates = employee.timeInEvents.map(e => e.date)

    let allWages = workingDates.reduce(function(wageAccumulator, date){
        return wageAccumulator + wagesEarnedOnDate(employee, date)
    }, 0)

    return allWages
}

function calculatePayroll(employees){
    console.log(employees)
    let everyWage = employees.reduce(function(wageAccumulator, employeeRecord){
        return wageAccumulator + allWagesFor(employeeRecord)
    }, 0)
    return everyWage
}