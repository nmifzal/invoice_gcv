var items = [];
var vessels = [];

function addRow(tableID) {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var tabIndex = rowCount - 1;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "checkbox";
    element1.name = "chkbox[]";
    cell1.appendChild(element1);

    for (let i = 1; i <= 8; i++) {
        if (i == 1 || i == 2) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "datetime-local";
            if (i == 1) {
                element.id = "day1" + tabIndex;
                element.className = "from";
                element.onchange = function () {
                    calculateDateDiff(element.id)
                };
            }
            else {
                element.id = "day2" + tabIndex;
                element.className = "to";
                element.onchange = function () {
                    calculateDateDiff(element.id)
                };
            }
            cell.appendChild(element);
        }
        else if (i == 3) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "text";
            element.id = "days" + tabIndex;
            element.name = "txtbox" + tabIndex + i;
            cell.appendChild(element);
        }
        else if (i == 4) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "text";
            element.id = "layTime" + tabIndex;
            element.name = "txtbox" + tabIndex + i;
            cell.appendChild(element);
        }
        else if (i == 5) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "text";
            element.name = "txtbox" + tabIndex + i;
            element.id = "percentage" + tabIndex;
            element.onchange = function () {
                percentageCalculation(element.id)
            };
            element.value = 100;
            cell.appendChild(element);
        }
        else if (i == 6) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "text";
            element.name = "txtbox" + tabIndex + i;
            element.id = "actualTime" + tabIndex;
            cell.appendChild(element);
        }
        else if (i == 7) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "text";
            element.name = "txtbox" + tabIndex + i;
            element.id = "totalTime" + tabIndex;
            cell.appendChild(element);
        }
        else if (i == 8) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "text";
            element.name = "txtbox" + tabIndex + i;
            element.id = "description" + tabIndex;
            cell.appendChild(element);
        }
    }
}


function calculateDateDiff(data) {
    let Id = data.substring(4);
    let from = document.getElementById("day1" + Id).value;
    let to = document.getElementById("day2" + Id).value;
    console.log(to);
    console.log(subtract(from, to));
    if (from !== null && to !== null && from !== NaN && to !== NaN && from !== '' && to !== '') {

        document.getElementById("layTime" + Id).value = subtract(from, to);
        //setTimeout(function(){
        percentageCalculation("percentage" + Id);
        Totaltimeused();
        //},300);

    }
}

function percentageCalculation(Id) {
    let id = Id.substring(10);
    let layVal = document.getElementById("layTime" + id).value.split(":");
    let percentage = document.getElementById("percentage" + id).value;
    console.log(layVal);
    let calTime = (layVal[0] * 24 * 60 * 60) + (layVal[1] * 60 * 60) + (layVal[2] * 60);
    let calRes = (calTime * percentage) / 100;
    let calculatedtime = Math.floor(calRes / 60 / 60 / 24) + ":" + Math.floor((calRes / 60 / 60) % 24) + ':' + Math.floor((calRes / 60) % 60);
    document.getElementById("actualTime" + id).value = calculatedtime;
    Totaltimeused();
}
function Totaltimeused() {
    let calRes = 0;
    var x = document.getElementById("dataTable").rows.length;
    console.log(x)
    var i;
    for (i = 0; i < x - 1; i++) {
        let layVal = document.getElementById("layTime" + i).value.split(":");
        let percentage = document.getElementById("percentage" + i).value;
        console.log(layVal);
        let calTime = (layVal[0] * 24 * 60 * 60) + (layVal[1] * 60 * 60) + (layVal[2] * 60);
        calRes = calRes + ((calTime * percentage) / 100);
        let calculatedtime = Math.floor(calRes / 60 / 60 / 24) + ":" + Math.floor((calRes / 60 / 60) % 24) + ':' + Math.floor((calRes / 60) % 60);
        document.getElementById("totalTime" + i).value = calculatedtime;
        if (i == x - 1) {
            document.getElementById("Totaltimeused").value = calculatedtime;
            converttodecimaldays("Totaltimeused", 'Totaltimeuseddecumal')

        }

    }

}

function converttodecimaldays(id, refelectid) {
    let value = document.getElementById(id).value.split(":");
    let days = (value[0]) + (value[1] / 24) + (value[2] / 60);
    document.getElementById(refelectid).value = parseFloat(days).toFixed(3);


}

function passdatatoid(id, refelectid) {
    document.getElementById(refelectid).value = document.getElementById(id).value;


}

function convertdecimaldaystotime(id, another, refelectid) {
    let value = (document.getElementById(id).value / document.getElementById(another).value).toString();
    let days = (value).toString().split(".");
    let hours = (parseFloat("0." + days[1]) * 24).toString().split(".");
    let minutes = (parseFloat("0." + hours[1]) * 60).toString().split(".");
    document.getElementById(refelectid).value = days[0] + ":" + hours[0] + ":" + minutes[0];
    converttodecimaldays(refelectid, "layTimeDays")

}

// vessel row function
function addVesselRow(tableID) {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var tabIndex = rowCount - 1;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "checkbox";
    element1.name = "vesselchkbox";
    cell1.appendChild(element1);
    for (let i = 1; i <= 3; i++) {
        if (i == 1) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "text";
            element.name = "vesselname" + tabIndex + i;
            cell.appendChild(element);
        }
        else if (i == 2) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "time";
            element.name = "vesseltime" + tabIndex + i;
            cell.appendChild(element);
        }
        else {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "date";
            element.name = "vesseldate" + tabIndex + i;
            cell.appendChild(element);

        }
    }
}


function subtract(from, to) {
    var date_now = new Date(from).getTime();
    var date_future = new Date(to).getTime();

    // get total seconds between the times
    var delta = Math.abs(date_future - date_now) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60;

    console.log(days, hours, minutes);
    return days + ':' + hours + ':' + minutes;
}


function deleteRow(tableID) {
    try {
        var table = document.getElementById(tableID);
        var rowCount = table.rows.length;

        for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            var chkbox = row.cells[0].childNodes[0];
            if (null != chkbox && true == chkbox.checked) {
                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    } catch (e) {
        alert(e);
    }
}



// get id of input
$(document).ready(function () {
    let inpIdfrom;
    let inpIdto;
    let from;
    let to;

    $(".from").change(function () {
        $("input").each(function () {
            $(this).attr("id");
        });
        inpIdfrom = $(this).attr("id");
        from = $('#' + inpIdfrom).val();
        console.log(new Date(from).getTime());
        console.log(from, to);
    });
    $(".to").change(function () {
        $("input").each(function () {
            $(this).attr("id");
        });
        inpIdto = $(this).attr("id");
        to = $('#' + inpIdto).val();
        console.log(new Date(to).getTime());
        subtract(from, to);
    });






});

