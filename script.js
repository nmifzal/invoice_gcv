var items = [];
var vessels = [];
var weekends = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
function addRow(tableID, rowid) {

    var el = document.getElementById("page1");
    gfg_Run(el);
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var tabIndex = rowCount - 1;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);

    // removing all check box except last
    var prevchkid = 'chk' + (tabIndex - 1);
    var prevCheckbox = document.getElementById(prevchkid);
    prevCheckbox.style.display = "none";
    var element1 = document.createElement("button");
    element1.type = "button";
    element1.className = "chk"
    element1.innerHTML = "X";
    element1.onclick = function () {

        deleteRow('dataTable');
    };
    element1.setAttribute("id", "chk" + tabIndex);
    cell1.appendChild(element1);




    for (let i = 1; i <= 8; i++) {
        if (i == 1 || i == 2) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.type = "text";

            if (i == 1) {
                // setDateTime();
                element.id = "day1" + tabIndex;
                element.className = "from text-left datetimepicker";
                element.value = document.getElementById("day2" + rowid).value;
                element.readOnly = true;
                element.onchange = function () {
                    calculateDateDiff(element.id)
                };
            }
            else {
                // setDateTime();
                element.id = "day2" + tabIndex;
                element.className = "to text-left datetimepicker";
                element.onchange = function () {
                    calculateDateDiff(element.id);
                };
            }

            cell.appendChild(element);

        }
        else if (i == 3) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("input");
            element.className = "text-left";
            element.type = "text";
            element.value = weekends[new Date(Date.parse(document.getElementById("day2" + rowid).value)).getDay()];
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
            element.className = "text-left";
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
            element.className = "text-left";
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
            element.className = "text-left";
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
            element.className = "text-left";
            element.name = "txtbox" + tabIndex + i;
            element.id = "totalTime" + tabIndex;
            cell.appendChild(element);
        }
        else if (i == 8) {
            let cell = window.i;
            let element = window.i;
            cell = row.insertCell(i);
            element = document.createElement("textarea");
            element.rows = "1";
            element.className = "expand" + tabIndex;
            element.cols = "42";
            element.id = "description" + tabIndex;
            cell.appendChild(element);

            const sampleTextarea1 = document.querySelector('.expand' + tabIndex);
            sampleTextarea1.addEventListener('input', () => {
                sampleTextarea1.style.height = "20px";
                sampleTextarea1.style.height = sampleTextarea1.scrollHeight + "px";
            })
        }
    }
}



function calculateDateDiff(data) {
    let Id = data.substring(4);
    let from = document.getElementById("day1" + Id).value;
    let to = document.getElementById("day2" + Id).value;

    document.getElementById("days" + Id).value = weekends[new Date(Date.parse(from)).getDay()];
    if (from !== null && to !== null && from !== NaN && to !== NaN && from !== '' && to !== '') {
        let table = document.getElementById("dataTable");
        let rowCount = table.rows.length;
        let tabIndex = rowCount - 2;
        let lastdate = document.getElementById("day2" + tabIndex).value;
        //

        if (parseInt(Id) < tabIndex) {
            document.getElementById("day1" + (parseInt(Id) + 1).toString()).value = to;
        }
        if (lastdate !== null && lastdate !== NaN && lastdate !== '') {
            if (parseInt(Id) === tabIndex) {
                addRow('dataTable', Id);
            }
            if (parseInt(Id) === 0) {
                //document.getElementById("day1" + Id).readOnly = true;
                //  document.getElementById("day2" + Id).readOnly = true;
            } else {
                //document.getElementById("day2" + Id).readOnly = true;
            }
        }
        document.getElementById("layTime" + Id).value = subtract(from, to);
        //setTimeout(function(){
        percentageCalculation("percentage" + Id);
        totalcalculateDateDiff()
        //},300);

    }
}
function totalcalculateDateDiff() {
    let table = document.getElementById("dataTable");
    let rowCount = table.rows.length;
    let tabIndex = rowCount - 2;
    for (i = 0; i <= tabIndex; i++) {
        let from = document.getElementById("day1" + i.toString()).value;
        let to = document.getElementById("day2" + i.toString()).value;
        document.getElementById("layTime" + i.toString()).value = subtract(from, to);
        percentageCalculation("percentage" + i.toString());
    }
    Totaltimeused();

}
function portselection() {
    let commenced = ["Discharging Commenced", "Loading Commenced"]
    let completed = ["Discharging Completed", "Loading Completed"]
    let rpd = ["Discharge rate per day", "Load rate per day"]
    let portvalue = document.getElementById("portselection").value;
    document.getElementById("commenced").innerHTML = commenced[portvalue];
    document.getElementById("completed").innerHTML = completed[portvalue];
    document.getElementById("rpd").innerHTML = rpd[portvalue];


}

function percentageCalculation(Id) {
    let id = Id.substring(10);
    let layVal = document.getElementById("layTime" + id).value.split(":");
    let percentage = document.getElementById("percentage" + id).value;
    let calTime = (layVal[0] * 24 * 60 * 60) + (layVal[1] * 60 * 60) + (layVal[2] * 60);
    let calRes = (calTime * percentage) / 100;
    let day = Math.floor(calRes / 60 / 60 / 24);
    let hour = Math.floor((calRes / 60 / 60) % 24);
    let mins = Math.floor((calRes / 60) % 60)
    let calculatedtime = (day > 9 ? day : "0" + day) + ":" + (hour > 9 ? hour : "0" + hour) + ":" + (mins > 9 ? mins : "0" + mins);
    document.getElementById("actualTime" + id).value = calculatedtime;
    Totaltimeused();
}
function Totaltimeused() {
    let calRes = 0;
    var x = document.getElementById("dataTable").rows.length;
    var i;
    for (i = 0; i < x - 1; i++) {
        let layVal = document.getElementById("layTime" + i).value.split(":");
        let percentage = document.getElementById("percentage" + i).value;
        let calTime = (layVal[0] * 24 * 60 * 60) + (layVal[1] * 60 * 60) + (layVal[2] * 60);
        calRes = calRes + ((calTime * percentage) / 100);
        let day = Math.floor(calRes / 60 / 60 / 24);
        let hour = Math.floor((calRes / 60 / 60) % 24);
        let mins = Math.floor((calRes / 60) % 60)
        let calculatedtime = (day > 9 ? day : "0" + day) + ":" + (hour > 9 ? hour : "0" + hour) + ":" + (mins > 9 ? mins : "0" + mins);
        document.getElementById("totalTime" + i).value = calculatedtime;
        if (i == x - 2) {
            document.getElementById("Totaltimeused").value = calculatedtime;
            document.getElementById("TotalTimeUsed").value = calculatedtime;
            converttodecimaldays("Totaltimeused", 'Totaltimeuseddecumal')
            converttodecimaldays("TotalTimeUsed", 'TotalTimeUseddecimal')
            Subractionoftimeloss("TotalTimeUseddecimal", "Actualtimealloweddecimal");
            Demurragedispatch("TotalTimeUseddecimal", "Actualtimealloweddecimal");

        }

    }

}
function Subractionoftimeloss(totalTimeid, actualTimeid) {
    let TotalTimeUsed = parseFloat(document.getElementById(totalTimeid).value);
    let ActualTimeUsed = parseFloat(document.getElementById(actualTimeid).value);
    let value = TotalTimeUsed - ActualTimeUsed;
    let days = (value).toString().split(".");
    let hours = (parseFloat("0." + days[1]) * 24).toString().split(".");
    let minutes = (parseFloat("0." + hours[1]) * 60).toString().split(".");
    document.getElementById("TimeLostdecimal").value = value.toFixed(3);
    document.getElementById("TimeLostdecimallastrow").value = value.toFixed(3);
    document.getElementById("TimeLost").value = (parseInt(days[0]) > 9 ? days[0] : "0" + days[0]) + ":" + (parseInt(hours[0]) > 9 ? hours[0] : "0" + hours[0]) + ":" + (parseInt(minutes[0]) > 9 ? minutes[0] : "0" + minutes[0]);

}
function Demurragedispatch(totalTimeid, actualTimeid) {


    let TotalTimeUsed = parseFloat(document.getElementById(totalTimeid).value);
    let ActualTimeUsed = parseFloat(document.getElementById(actualTimeid).value);
    if (ActualTimeUsed < TotalTimeUsed) {

        passdatatoid("Demurage", "demuragedispatch")
        passdatatoid("Demurageamnt", "demuragedispatchamnt")
        document.getElementById("timebased").value = "Time Lost"

        amountCalculation("Demurageamnt", "Finalamountcalculation")
    } else {
        passdatatoid("Despatch", "demuragedispatch")
        passdatatoid("Despatchamnt", "demuragedispatchamnt")
        document.getElementById("timebased").value = "Time Saved"
        amountCalculation("Despatchamnt", "Finalamountcalculation")
    }

}
var convertnumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
});
var convert = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});
function Despatchcalc() {
    let value = document.getElementById("Demurageamnt").value;
    document.getElementById("Despatchamnt").value = convert.format(value / 2);
    document.getElementById("Demurageamnt").value = convert.format(value);


}
function tonumber(id) {
    let value = document.getElementById(id).value;
    document.getElementById(id).value = Number(value.replace(/[^0-9.-]+/g, ""));
}
function amountCalculation(id, refelectid) {
    let value = Number(document.getElementById(id).value.replace(/[^0-9.-]+/g, ""));
    let timelossdays = document.getElementById("TimeLostdecimallastrow").value;
    let total = -(parseFloat(timelossdays) * parseFloat(value));
    document.getElementById(refelectid).value = convert.format(total);


}
function converttodecimaldays(id, refelectid) {
    let value = document.getElementById(id).value.split(":");
    let days = (parseInt(value[0])) + (parseInt(value[1]) / 24) + (parseInt(value[2]) / (60 * 24));
    document.getElementById(refelectid).value = parseFloat(days).toFixed(3);


}

function numberfrmt(id) {

    let value = document.getElementById(id).value;
    document.getElementById(id).value = convertnumber.format(value);
    if (id == 'quantity') {
        document.getElementById('cargoQty').value = convertnumber.format(value);
    }


}

function passdatatoid(id, refelectid) {
    document.getElementById(refelectid).value = document.getElementById(id).value;


}

function convertdecimaldaystotime(id, another, refelectid) {
    let value = (Number(document.getElementById(id).value.replace(/[^0-9.-]+/g, "")) / Number(document.getElementById(another).value.replace(/[^0-9.-]+/g, ""))).toString();
    let days = (value).toString().split(".");
    let hours = (parseFloat("0." + days[1]) * 24).toString().split(".");
    let minutes = (parseFloat("0." + hours[1]) * 60).toString().split(".");
    document.getElementById(refelectid).value = (parseInt(days[0]) > 9 ? days[0] : "0" + days[0]) + ":" + (parseInt(hours[0]) > 9 ? hours[0] : "0" + hours[0]) + ":" + (parseInt(minutes[0]) > 9 ? minutes[0] : "0" + minutes[0]);
    document.getElementById("Actualtimeallowed").value = (parseInt(days[0]) > 9 ? days[0] : "0" + days[0]) + ":" + (parseInt(hours[0]) > 9 ? hours[0] : "0" + hours[0]) + ":" + (parseInt(minutes[0]) > 9 ? minutes[0] : "0" + minutes[0]);
    converttodecimaldays(refelectid, "layTimeDays")
    converttodecimaldays(refelectid, "Actualtimealloweddecimal");
    Subractionoftimeloss("TotalTimeUseddecimal", "Actualtimealloweddecimal");
    Demurragedispatch("TotalTimeUseddecimal", "Actualtimealloweddecimal");

}

// vessel row function
// function addVesselRow(tableID) {
//     var table = document.getElementById(tableID);
//     var rowCount = table.rows.length;
//     var tabIndex = rowCount - 1;
//     var row = table.insertRow(rowCount);
//     var prevCheckbox
//     var cell1 = row.insertCell(0);
//     var element1 = document.createElement("input");
//     element1.type = "checkbox";
//     element1.setAttribute("id", rowCount);
//     element1.name = "vesselchkbox";
//     cell1.appendChild(element1);
//     for (let i = 1; i <= 3; i++) {
//         if (i == 1) {
//             let cell = window.i;
//             let element = window.i;
//             cell = row.insertCell(i);
//             element = document.createElement("input");
//             element.type = "text";
//             element.name = "vesselname" + tabIndex + i;
//             cell.appendChild(element);
//         }
//         else if (i == 2) {
//             let cell = window.i;
//             let element = window.i;
//             cell = row.insertCell(i);
//             element = document.createElement("input");
//             element.type = "time";
//             element.name = "vesseltime" + tabIndex + i;
//             cell.appendChild(element);
//         }
//         else {
//             let cell = window.i;
//             let element = window.i;
//             cell = row.insertCell(i);
//             element = document.createElement("input");
//             element.type = "date";
//             element.name = "vesseldate" + tabIndex + i;
//             cell.appendChild(element);

//         }
//     }
// }


function subtract(from, to) {
    var date_now = new Date(Date.parse(from)).getTime();
    var date_future = new Date(Date.parse(to)).getTime();
    console.log(from)
    console.log(to)
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

    return (parseInt(days) > 9 ? days : "0" + days) + ':' + (parseInt(hours) > 9 ? hours : "0" + hours) + ':' + (parseInt(minutes) > 9 ? minutes : "0" + minutes);
}


function deleteRow(tableID) {
    try {
        var table = document.getElementById(tableID);
        var rowCount = table.rows.length;
        var rows = table.getElementsByTagName('tr');
        //var lastrow = rows[rows.length - 2];
        //var cell0 = lastrow.insertCell(1);
        var element1 = document.getElementById("chk" + (rows.length - 3));
        element1.style.display = "block";
        if ((rows.length - 3) === 0) {
            document.getElementById("day1" + (rows.length - 3)).readOnly = false;
            document.getElementById("day2" + (rows.length - 3)).readOnly = false;
        } else {
            document.getElementById("day2" + (rows.length - 3)).readOnly = false;
        }
        // element1.name = "chkbox[]";
        // element1.setAttribute("id", "chk" + (rows.length - 3));
        // cell0.appendChild(element1);
        table.deleteRow(rowCount - 1);
        Totaltimeused();
        // for (var i = 0; i < rowCount; i++) {
        //     var row = table.rows[i];
        //     var chkbox = row.cells[0].childNodes[0];
        //     if (null != chkbox && true == chkbox.checked) {
        //         table.deleteRow(i);
        //         rowCount--;
        //         i--;
        //     }
        // }
    } catch (e) {
        console.log(e);
    }
}


function check(el) {
    var curOverf = el.style.overflow;

    if (!curOverf || curOverf === "visible")
        el.style.overflow = "hidden";

    var isOverflowing = el.clientWidth < el.scrollWidth
        || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverf;

    return isOverflowing;
}

function gfg_Run(el) {
    ans = "No Overflow";

    if (check(el)) {
        // alert('overflow');
        var e = document.createElement("section");
        e.id = 'page2';
        e.classList.add("page");
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
    });
    $(".to").change(function () {
        $("input").each(function () {
            $(this).attr("id");
        });
        inpIdto = $(this).attr("id");
        to = $('#' + inpIdto).val();
        subtract(from, to);
    });

    //setDatTime(this);
});



$(document).on('focus', ".datetimepicker", function () {
    setDateTime(this);
});

function setDateTime(data) {

    let Id = data.id.substring(4);
    let from = data.id.substring(3, 4);
    if (from == 2) {
        $('#day2' + (parseInt(Id)).toString() + '.datetimepicker').datetimepicker({
            format: 'd/M/Y H:i',
            minDate: new Date(Date.parse(document.getElementById("day1" + (parseInt(Id)).toString()).value)),
            defaultDate: $('.datetimepicker').val(),
            step: 30
        });
    } else {
        if (Id == 0) {

            $('#day1' + (parseInt(Id)).toString() + '.datetimepicker').datetimepicker({
                format: 'd/M/Y H:i',
                maxDate: new Date(Date.parse(document.getElementById("day2" + (parseInt(Id)).toString()).value)),
                defaultDate: $('.datetimepicker').val(),
                step: 30
            });
        } else {
            $('#day1' + (parseInt(Id)).toString() + '.datetimepicker').datetimepicker({
                format: 'd/M/Y H:i',
                defaultDate: $('.datetimepicker').val(),
                step: 30
            });
        }


    }
    // $.datetimepicker.setLocale('pt-BR');
}

function setDatTime(data) {
    console.log(data);
    $('.datetimepicker').datetimepicker({
        format: 'd/M/Y H:i',
        defaultDate: $('.datetimepicker').val(),
        step: 30
    });
    // $.datetimepicker.setLocale('pt-BR');
}


