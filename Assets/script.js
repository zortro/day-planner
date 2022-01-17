//variable for storing and looping through scheduler
var timeBlock = [
    {
        id: '0',
        hour: '9',
        time: '09',
        m: 'AM',
        reminder: ''
    },
    {
        id: '1',
        hour: '10',
        time: '10',
        m: 'AM',
        reminder: ''
    },
    {
        id: '2',
        hour: '11',
        time: '11',
        m: 'AM',
        reminder: ''
    },
    {
        id: '3',
        hour: '12',
        time: '12',
        m: 'PM',
        reminder: ''
    },
    {
        id: '4',
        hour: '1',
        time: '13',
        m: 'PM',
        reminder: ''
    },
    {
        id: '5',
        hour: '2',
        time: '14',
        m: 'PM',
        reminder: ''
    },
    {
        id: '6',
        hour: '3',
        time: '15',
        m: 'PM',
        reminder: ''
    },
    {
        id: '7',
        hour: '4',
        time: '16',
        m: 'PM',
        reminder: ''
    },
    {
        id: '8',
        hour: '5',
        time: '17',
        m: 'PM',
        reminder: ''
    },
    {
        id: '9',
        hour: '6',
        time: '18',
        m: 'PM',
        reminder: ''
    },
    {
        id: '10',
        hour: '7',
        time: '19',
        m: 'PM',
        reminder: ''
    },
    {
        id: '11',
        hour: '8',
        time: '20',
        m: 'PM',
        reminder: ''
    },
    {
        id: '12',
        hour: '9',
        time: '21',
        m: 'PM',
        reminder: ''
    },
]

//the current time
var rightNow = moment().format('HH')

//display current time under jumbotron
function getDate() {
    var currentDate = moment().format('MMMM Do, YYYY HH')
    $('#currentDay').text(currentDate)
}
getDate()

//save data to local storage
function saveReminder() {
    localStorage.setItem('timeBlock', JSON.stringify(timeBlock))
}

//display localStorage
function displayReminder() {
    timeBlock.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder)
    })
}

//displays any existing localStorage data
function init() {
    let storedRem = JSON.parse(localStorage.getItem('timeBlock'))

    if (storedRem) {
        timeBlock = storedRem
    }

    saveReminder()
    displayReminder()
}

//when i scroll down i am presented with Timeblocks
//they will be colored to indicate past (red) present (grey) future (green) present
timeBlock.forEach(function(thisHour) {
    //timeblocks row
    let hourRow = $('<form>').attr({
        'class': 'row'
    })
    $('.container').append(hourRow)
    //time field
    var hourField = $('<div>')
        .text(`${thisHour.hour} ${thisHour.m}`)
            hourField.addClass('col-md-2 hour')
        //scheduler data
    var hourPlan = $('<div>')
        hourPlan.addClass('col-md-9 description p-0')

    var planData = $('<textarea>')
    hourPlan.append(planData)
    planData.attr('id', thisHour.id)
    planData.addClass('reminder-data')
        //past
    if (thisHour.time < rightNow) {
        planData.addClass('past')
        //present
    } else if (thisHour.time === rightNow) {
        planData.addClass('present')
        //future
    } else if (thisHour.time > rightNow) {
        planData.addClass('future')
    }

    //create save btn
    var saveBtn = $('<i class="fa fa-save fa-lg"></i>')
    var savePlan = $('<button>')
        savePlan.addClass('col-md-1 saveBtn')

        savePlan.append(saveBtn)
        hourRow.append(hourField, hourPlan, savePlan)
})

//load localstorage data after add
init()
/* localStorage.clear() */
$('.saveBtn').on('click', function(event) {
    event.preventDefault()
    var futureIndex = $(this).siblings('.description').children('.reminder-data').attr('id')

    timeBlock[futureIndex].reminder = $(this).siblings('.description').children('.reminder-data').val()

    console.log(futureIndex)

    saveReminder()
    displayReminder()
})