function isPalindrome(str) {
    let i = 0;
    let j = str.length-1;
    while (i <= j) {
        if (str[i] !== str[j]) return false;
        i++;
        j--;
    }
    return true;
}

function convertdateStrToString(date) {
    var dateStr = {day : '', month : '', year : ''};
    
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

// function that takes a particular dateStr format and returns all the variations of it
function getAllDateFormats(date) {
    var dateStr = convertdateStrToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;

    for (var i=0; i<listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function getNextDate(date) {
    day = date.day + 1; // increment the day
    month = date.month;
    year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day >= 29) {
                day = 1;
                month ++;
            }
        } else {
            if (day >= 28) {
                day = 1;
                month ++;
            }
        }
    }
    else {
        if (day > daysInMonth[month-1]) {
            day = 1;
            month ++;
        }
    }

    if (month > 11) {
        day = 1;
        month = 1;
        year ++;
    }

    return {
        day : day,
        month : month,
        year : year
    }
}

function getNextPalindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDate(date);

    while (true) {
        counter ++;
        if (checkPalindromeForAllDateFormats(nextDate)) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [counter, nextDate];
}


// bonus exercise:

function getPreviousDate(date) {
    day = date.day - 1;
    month = date.month;
    year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 

    if (day < 1) {
        day = daysInMonth[month-2];
        if ((month - 2) === 1) {
            if (isLeapYear(year)) {
                day = 29
            }
        }
        if (month === 1) {
            day = 31;
            month = 12;
            year --;
        } else month --;
    }

    return {
        day : day, 
        month : month,
        year : year
    }
}

var date = {
    day : 1,
    month : 1,
    year : 2000
}

console.log(getPreviousDate(date));


function getPreviousPalindromeDate(date) {
    var counter = 0;
    var prevDate = getPreviousDate(date);

    while (true) {
        counter ++;
        if (checkPalindromeForAllDateFormats(prevDate)) {
            break;
        }
        prevDate = getPreviousDate(prevDate);
    }

    return [counter, prevDate];
}

var date = {
    day : 3,
    month : 1,
    year : 2022
}

console.log(getNextPalindromeDate(date));
console.log(getPreviousPalindromeDate(date));

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    else if (year % 100 === 0) {
        return false
    }
    else if (year % 4 === 0) {
        return true
    }
    return false
}

let submitBtn = document.getElementById('btn');
let result = document.getElementById('output');

function submitHandler(e) {
    e.preventDefault();
    let inputDate = document.getElementById('input-date');
    inputDate = inputDate.value;
    if (inputDate === '') {
        result.innerText = 'Please enter a valid date format'
        return null;
    }
    var dateArray = inputDate.split('-');
    var dateObj = {
        day : Number(dateArray[2]),
        month : Number(dateArray[1]),
        year : Number(dateArray[0])
    }
    if (checkPalindromeForAllDateFormats(dateObj)) {
        result.innerText = 'Congrats! Your birthday is a Palindrome 🥳'
    } else {
        const [days, nextPalindromeDate] = getNextPalindromeDate(dateObj)
        result.innerText = `Sorry! Your birthday is not a Palindrome, the next nearest Palindrome is ${nextPalindromeDate.day}-${nextPalindromeDate.month}-${nextPalindromeDate.year} in ${days} days`
    }
}

submitBtn.addEventListener('click', submitHandler);



