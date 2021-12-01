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
    let formatFrom = getFromDate.split('-');
    let formatTo = getFromDate.split('-');
    for (let i = 0; i < formatFrom.length; i++){
        formatFrom
    }


    // Implement pushing to ZOOM URL
    // ....

    document.getElementById("printDates").innerHTML = getFromDate + "<br>"+ getToDate;
}
