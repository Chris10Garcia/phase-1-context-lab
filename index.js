/* Your Code Here */

function createEmployeeRecord(array){
    // first name STRING, family name STRING, title STRING, payrate per hour NUMBER
    const recordObj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return recordObj    
}

function createEmployeeRecords(nestedArray){
    const records = nestedArray.map(array => createEmployeeRecord(array))
    return records
}

function createTimeInEvent(dateStamp){
    const timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4),10), // need to count backwards to deal with single or double digit hours and explictly convert to Int
        date: dateStamp.slice(0,10) // (YYYY-MM-DD)
    }

    this.timeInEvents.push(timeInObj)   //it's really this simple!!! (no pun intended lol)
    return this                         // also console log sooner when having issues
}

function createTimeOutEvent(dateStamp){
    const timeOutObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4),10), // need to count backwards to deal with single or double digit hours and explictly convert to Int
        date: dateStamp.slice(0,10) // (YYYY-MM-DD)
    }

    this.timeOutEvents.push(timeOutObj)
    return this
}

function hoursWorkedOnDate(dateStamp){
    // using my last lab, replace employObj with "this" and everything should work

    const timeInValue = this.timeInEvents.find(element => element.date === dateStamp).hour // chaining .hour works here because single element returns
    const timeOutValue = this.timeOutEvents.find(element => element.date === dateStamp).hour

    return (timeOutValue - timeInValue)/100   //hours is in 100 units. 

}

function wagesEarnedOnDate(dateStamp){
    // function.call (this object, function's parameter)
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
}



function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employObj => employObj.firstName === firstName)
}




function calculatePayroll(array){

    const allWages = array.map(employObj => allWagesFor.call(employObj))
    return allWages.reduce((accum, element) => {
        return accum + element
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


