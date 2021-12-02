// First option (gets URL params from ZOOM to pick date. but isn't to user friendly)

// GET URL param
function getURL() {
    let fromDate = getURLParams('from')
    let toDate = getURLParams('to')

    //testing purpose
    document.getElementById("print").innerHTML = fromDate + "<br>" + toDate;

    console.log(fromDate);
    console.log(toDate);
}


function getURLParams(findParam) {
    let getPageURL = document.getElementById('url').value
    let convertURL = getPageURL.substring(1);
    let parameters = convertURL.split(/[\\?&]/);
    for (let i = 0; i < parameters.length; i++) {
        let paramValues = parameters[i].split('=');
        if (paramValues[0] === findParam) {
            return paramValues[1];
        }
    }
}

// Second Option (very user friendly, but needs more work)

//Push URL param
function pushData() {
    let getFromDate = document.getElementById("fromDate").value;
    let getToDate = document.getElementById("toDate").value;

    if (getFromDate == null || getFromDate === "" && getToDate == null || getToDate === "") {
        document.getElementById("dateError").innerHTML = `<h3 style="color: red;">Please choose a valid date</h3>`;
    } else if (getToDate < getFromDate) {
        document.getElementById("dateError").innerHTML = `<h3 style="color: red;">Please choose a valid date</h3>`;
    } else {
        // format date
        let rdFrom = getFromDate.split('-');
        let rdTo = getToDate.split('-');

        let formatFrom = rdFrom[1] + "/" + rdFrom[2] + "/" + rdFrom[0];
        let formatTo = rdTo[1] + "/" + rdTo[2] + "/" + rdTo[0];


        // pushing to ZOOM URL
        let zoomURL = new URL("https://zoom.us/account/report/user?from=FromDate&to=ToDate");
        zoomURL.searchParams.set('from', formatFrom);
        zoomURL.searchParams.set('to', formatTo);

        window.open(decodeURIComponent(zoomURL));
    }
}


// Automatically loads a set date for From & To inputs
let fromField = document.getElementById('fromDate');
let toField = document.getElementById('toDate');

let todaysDate = new Date();
let yesterdaysDate = new Date(todaysDate);

yesterdaysDate.setDate(yesterdaysDate.getDate() - 1)

// sets the date
fromField.value = todaysDate.getFullYear().toString() + '-' + (todaysDate.getMonth() + 1).toString().padStart(2, 0)
    + '-' + yesterdaysDate.getDate().toString().padStart(2, 0);


toField.value = todaysDate.getFullYear().toString() + '-' + (todaysDate.getMonth() + 1).toString().padStart(2, 0)
    + '-' + todaysDate.getDate().toString().padStart(2, 0);