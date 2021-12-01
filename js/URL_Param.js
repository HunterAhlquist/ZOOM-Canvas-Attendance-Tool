// GET URL param
function getURL(){
    let fromDate = getURLParams('from')
    let toDate = getURLParams('to')

    //testing purpose
    document.getElementById("print").innerHTML = fromDate + "<br>"+ toDate;

    console.log(fromDate);
    console.log(toDate);
}


function getURLParams(findParam){
    let getPageURL = document.getElementById('url').value
    let convertURL = getPageURL.substring(1);
    let parameters = convertURL.split(/[\\?&]/);
    for (let i = 0; i < parameters.length; i++){
        let paramValues = parameters[i].split('=');
        if(paramValues[0] === findParam){
            return paramValues[1];
        }
    }
}

// Second way

//Push URL param
function pushData(){
    let getFromDate = document.getElementById("fromDate").value;
    let getToDate = document.getElementById("toDate").value;
    // format date
    let rdFrom = getFromDate.split('-');
    let rdTo = getToDate.split('-');

    let formatFrom = rdFrom[1] + "/" + rdFrom[2] + "/" + rdFrom[0];
    let formatTo = rdTo[1] + "/" + rdTo[2] + "/" + rdTo[0];



    // Implement pushing to ZOOM URL
    let zoomURL = new URL("https://zoom.us/account/report/user?from=FromDate&to=ToDate");
    zoomURL.searchParams.set('from',formatFrom);
    zoomURL.searchParams.set('to',formatTo);

    document.getElementById("printDates").innerHTML = decodeURIComponent(zoomURL);
}
