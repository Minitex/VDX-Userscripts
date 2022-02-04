// ==UserScript==
// @name        VDX+
// @namespace   vdx-plus
// @description Inserts lending policies into VDX results and adds background colors to alert keywords
// @include     https://www.mnlinkgateway.org/vdx/zengine*VDXaction*ZSearchDetails*
// @version     2.9.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @updateURL   https://github.com/Minitex/VDX-Userscripts/raw/master/VDX%2B.user.js
// @downloadURL https://github.com/Minitex/VDX-Userscripts/raw/master/VDX%2B.user.js
// @author      Kyle Triska
// @copyright   2021, Kyle Triska
// @grant 	GM_getResourceText
// @resource    closingsFile file://H:\Resource Sharing\Kyle\vdxclosings.txt
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */
function handleClosings() {
    var closingsSource = GM_getResourceText("closingsFile");
    if (closingsSource === null) {alert("Cannot find file on H drive! Closings will not display! Tell supervisor!");}
    var array = parseClosingsToArray(closingsSource);
    modifyHtmlWithClosings(array);
}

function parseClosingsToArray(txt)
{
    var closings = [];
    var lines = txt.split('\n');
    for (var i=0; i<lines.length; i++)
    {
        var line = lines[i];
        line = line.replace('[', '').replace(']', ''); // remove brackets
        line = line.replace(/["']/g, "");
        line = line.replace('\n', "");

        if (line.indexOf(',') != -1)
        {
            var parts = line.split(',');
            var code = parts[0];
            var info = parts[1];
            var row = [code, info];
            closings.push(row);
        }

    }

    return closings;
}

var collections = 	[
    ["Chatfield Music Lending Library", "DOES NOT LOAN - CODE 6"],
    ["Bookmobile", "BOOKMOBILES DON'T LOAN - CODE 6"],
    ["Mobile", "BOOKMOBILES DON'T LOAN - CODE 6"],
    ["Floating", "FLOATING DON'T LOAN - CODE 6"],
    ["Church Library", "- CHURCH LIBRARY DOESN'T LOAN - CODE 6"],
    [" H S", "K12 SCHOOLS DON'T LOAN - CODE 6"],
    [" M S", "K12 SCHOOLS DON'T LOAN - CODE 6"],
    ["High School", "K12 SCHOOLS DON'T LOAN - CODE 6"],
    ["HIGH SCHOOL", "K12 SCHOOLS DON'T LOAN - CODE 6"],
    ["Schools", "K12 SCHOOLS DON'T LOAN - CODE 6"],
    ["Elementary School", "K12 SCHOOLS DON'T LOAN - CODE 6"],
    ["Secondary School", "K12 SCHOOLS DON'T LOAN - CODE 6"],
    ["Community School", "K12 SCHOOLS DON'T LOAN - CODE 6"],
    ["Middle School", "K12 SCHOOLS DON'T LOAN - CODE 6"],
    ["Primary School", "K12 SCHOOLS DON'T LOAN - CODE 6"],
    ["Elysian Public Library", "- DOESN'T LOAN - 6"],
    ["William Kelley School", "- DOESN'T LOAN -6"],
    ["Minneapolis Central", "IGNORE THIS LOCATION"]
];

var dvdLocs = 	[
    ["ALV - Babbitt", "- DOESN'T LOAN DVDS - 2"],
    ["ALV - Baudette", "- DOESN'T LOAN DVDS - 2"],
    ["ALV - Marble Public", "- DOESN'T LOAN DVDS - 2"],
    ["ALV - Moose Lake", "- DOESN'T LOAN DVDS - 2"],

    ["ALV - Ely", "- DOESN'T LOAN DVDS - 2"],

    ["MLM - Edgerton", "- DOESN'T LOAN DVDS - 2"],
    ["MLM - Redwood Falls", "- DOESN'T LOAN DVDS - 2"],
    ["MLM - Wabasso", "- DOESN'T LOAN DVDS - 2"],

    ["MNK", "- DOESN'T LOAN DVDS - 2"],

    ["MNT", "- DOESN'T LOAN DVDS - 2"],

    ["TL#", "- DOESN'T LOAN DVDS - 2"],

    ["S#L - Albert Lea", "- DOESN'T LOAN DVDS - 2"],

    ["SMC", "- DOESN'T LOAN DVDS - 2"],

    ["SSH - Law Library", "- DOESN'T LOAN DVDS - 2"]
];

var dvdSerLocs	=	[
    ["ALV - Virginia", "- NO FICTION DVDS - 2"],
    ["S#L - Cannon Falls", "- DOESN'T LOAN DVD SERIES - 2"],
    ["S#L - Pine Island", "- DOESN'T LOAN DVD SERIES - 2"],
    ["S#L - Zumbrota", "- DOESN'T LOAN DVD SERIES - 2"]
];

var clicCDS = [
    ["MNK", "- DOESN'T LOAN CDS - 2"],
    ["MNT", "- DOESN'T LOAN CDS - 2"],
    ["TL#", "- DOESN'T LOAN CDS - 2"],
    ["SMC", "- DOESN'T LOAN CDS - 2"],
];

var videoGames = [
    ["", "- VIDEO GAMES DO NOT LEND - 2"],
];


var badCallNumbers = ["Rental", "Reserve", "Reference", "Ref. Collection", "REF.", "New", "Rotating", "Display", "STORYTIME", "PHONO", "ON DISPLAY", "Childrens Collection", "Special", "_Off-site", "BIG BOOK"];


var availabilityBad = [
    ["STORYTIME", "- STORYTIME COLLECTION DOESN'T LOAN - CODE 2"],
    ["ON DISPLAY", "- DISPLAY ITEMS DON'T LOAN - CODE 2"],
    ["WALDORF", "- STORYTIME COLLECTION DOESN'T LOAN - CODE 2"],
    ["Reference", "- REFERENCE COLLECTION DOESN'T LOAN - CODE 2"],
    ["Archives", "- Archives COLLECTION DOESN'T LOAN - CODE 2"],
    ["LITHUB", "- LITHUB COLLECTION DOESN'T LOAN - CODE 2"],
    ["William Kelley School", "- HIGH SCHOOLS DO NOT LOAN - 2"],
    ["LUCKY Type", "- LUCKY ITEMS DO NO CIRCULATE - 1"]
];


var codes = [
    ["Arrowhead Library System", "Items with NEW in Catalog do not loan.","24"],
    ["Arrowhead Library System", "MN History Items do not loan.","2"],
    ["Arrowhead Library System", "Hibbing Public Library does not loan Bob Dylan Collection.","2"],
    ["Arrowhead Library System", "Aurora Public Library does not loan Storytime bags or Realia items.","2"],
    ["Arrowhead Library System", "Grand Marais does not loan the Technology Collection.","2"],
    ["Arrowhead Library System", "Ely does not loan the Science Tools Collection.","2"],

    ["Anoka County Library", "Check current year and previous year DVDs in catalog for 'Rental' in Call Number","24"],
    ["Anoka County Library", "Does not lend if another copy is out for ILL","1"],
    ["Anoka County Library", "Does not lend Board Games","2"],
    ["Anoka County Library", "Does not lend Cookware","2"],
    ["Anoka County Library", "Does not lend DIscovery Kits","2"],
    ["Anoka County Library", "Does not lend Memory Maker Kits","2"],

    ["Carver County Library", "Do Not Lend Book Club/Book-Club-In-A-Bag Kits including Adult, Teen, Juvenile","2"],
    ["Carver County Library", "Does not lend Memory-Kits or Memory Maker Kit","2"],
    ["Carver County Library", "Does not lend Care-Kits or Child Care in a Kit","2"],
    ["Carver County Library", "Does not lend STEM-Kits or Elementary STEM Kit","2"],
    ["Carver County Library", "Does not lend Hotspots or Mobile Hotspots","2"],
    ["Carver County Library", "Does not lend Board Books","2"],

    ["Dakota County Library", "Does not lend Book Group (Book Club) Kits","24"],
    ["Dakota County Library", "Does not lend Board Books.","2"],
    ["Dakota County Library", "Does not lend Launch Pads.","2"],
    ["Dakota County Library", "Does not lend Microfilm.","2"],
    ["Dakota County Library", "Does not lend Portable Wifi Hotspots.","2"],

    ["Great River Regional Library", "Does not lend RR (Reservation Required).","2"],

    ["Hennepin County Library", "Children's Board Books do not circulate.","2"],
    ["Hennepin County Library", "Off-site does not loan.","6"],
    ["Hennepin County Library", "Send to review if MLAC is the only location.","N/A"],

    ["Kitchigami Regional Library", "Does not loan current year and previous year items.","24"],

    ["Lake Agassiz Regional Library and Northwest Regional Library", "Does not lend current year items.","24"],

    ["Plum Creek Library System", "<a href=\x22http://opac.plumcreeklibrary.net/cgi-bin/koha/opac-main.pl\x22 target=\x22_blank\x22>Please check catalog for items with '0' availability.</a>"," "],
    ["Plum Creek Library System", "Does not loan current year and previous year items (has 'NEW' in the call number).","24"],

    ["Ramsey County Library", "Does not lend Professional Collection.","2"],
    ["Ramsey County Library", "Does not lend Sotry Bags.","2"],
    ["Ramsey County Library", "Does not lend Book Club Bags.","2"],
    ["Ramsey County Library", "Does not lend Stem Kits.","2"],
    ["Ramsey County Library", "Does not lend Snowshoes.","2"],
    ["Ramsey County Library", "Does not lend MN State Park Passes.","2"],
    ["Ramsey County Library", "Does not lend Binge Boxes.","2"],
    ["Ramsey County Library", "Does not lend Memory Minders.","2"],

    ["Rochester Public Library", "Does not lend Quick Picks and Flicks Collection (QUICKFLK).","2"],
    ["Rochester Public Library", "Does not lend Book, Palmer Amaranth, Soil Thermometer, or Garden Sieve Kits.","2"],
    ["Rochester Public Library", "Does not lend Board Games.","2"],
    ["Rochester Public Library", "Does not lend Telescope.","2"],
    ["Rochester Public Library", "Does not lend Land Seeds.","2"],

    ["Scott County Library System", "<b>Heritage Room</b> items do not circulate.","2"],

    ["Southeastern Libraries Cooperating (SELCO)", "<a href=\x22http://selco.ent.sirsi.net/client/default\x22 target=\x22_blank\x22>Remember to check S#L catalog before sending any requests to their location!</a>"," "],
    ["Southeastern Libraries Cooperating (SELCO)", "<b>Local Request Only</b>","2"],
    ["Southeastern Libraries Cooperating (SELCO)", "<b>CBBMLL (Chatfield Brass Band Music Lending Library)</b> does not circulate.","2"],
    ["Southeastern Libraries Cooperating (SELCO)", "Notify a supervisor if you see a request going to <b>CBBMLL</b>.","2"],
    ["Southeastern Libraries Cooperating (SELCO)", "Zumbrota will not loan DVD series.","2"],
    ["Southeastern Libraries Cooperating (SELCO)", "Catalog Restriction &amp;nbsp; System-wide","2"],
    ["Southeastern Libraries Cooperating (SELCO)", "Catalog Restriction 7 day cko System-wide","2"],
    ["Southeastern Libraries Cooperating (SELCO)", "Catalog Restriction 21 day cko System-wide","2"],

    ["Traverse des Sioux Library", "Martin Luther College Library does not lend Oversize.","2"],
    ["Traverse des Sioux Library", "Does not lend any Kits.","2"],
    ["Traverse des Sioux Library", "Does not lend Hotspots.","2"],
    ["Traverse des Sioux Library", "Does not lend Computers.","2"],
    ["Traverse des Sioux Library", "Does not lend On Search.","25"],

    ["Washington County Library", "Does not lend unless there is more than one copy available.","2"],

    ["placeholder","placeholder","placeholder"]
];



var collectionInfo = $(".collectioninfo");

var format = "";
var imprint = "";
var edition = "";
$(".fieldcontents").each(function()
                         {
    if ($(this).attr("headers") == "FormatID") format = $(this).text();
    if ($(this).attr("headers") == "ImprintID") imprint = $(this).text();
    if ($(this).attr("headers") == "EditionID") edition = $(this).text();
});

var matchRows = "";
for (var i=0; i<codes.length; i++)
{
    var code = codes[i][0];
    var policy = codes[i][1];
    var reportCode = codes[i][2];

    if (collectionInfo.text().indexOf(code) != -1)
    {
        matchRows += "<tr><td style='border: 2px solid black; width:95%;'>" + policy + "</td><td style='border: 2px solid black;'>" + reportCode + "</td></tr>";
    }
}

var matchTable = "<p><center><h3>Lending Policies</h3><table style='border: 2px solid black; width: 60%;'>" + matchRows + "</table></center></p>";
if (matchRows.length > 0) $(".record").after().append(matchTable);

handleClosings();

function modifyHtmlWithClosings(closings)
{
    var rows = $(".holdings tr:gt(0)"); // skip the header row
    rows.each(function(index)
              {

        var distance = $(this).children("td").eq(0); //this is for distance locations that have no libraryCell
        var libraryCell = $(this).children("td").eq(1);
        var callNumber = $(this).children("td").eq(2);
        var availability = $(this).children("td").eq(3);

        //CLOSINGS
        for (var j=0; j<closings.length; j++)
        {
            var closed = closings[j][0];
            var closingCode = closings[j][1];


            if (libraryCell.text().indexOf(closed) != -1)
            {
                libraryCell.css("background-color", "#FE2E64");
                libraryCell.append(closingCode);
            }
        }


        //COLLECTIONS
        for (var k=0; k<collections.length; k++)
        {
            var collection = collections[k][0];
            var collectionCode = collections[k][1];

            if (callNumber.text().indexOf(collection) != -1)
            {
                libraryCell.css("background-color", "#FE2E64");
                libraryCell.append(collectionCode);
            }

            if (distance.text().indexOf(collection) != -1) //this is for distance locations that don't have a libraryCell
            {
                distance.css("background-color", "#FE2E64");
                distance.append(collectionCode);
            }

        }

        //BAD CALL NUMBERS
        for (var m=0; m<collections.length; m++)
        {
            var badCallNumber = badCallNumbers[m];

            if (callNumber.text().indexOf(badCallNumber) != -1)
            {
                libraryCell.css("background-color", "yellow");
                libraryCell.append("- Call number alert");
            }

        }

        //DVDS
        for (var n=0; n<dvdLocs.length; n++)
        {
            var dvdLoc = dvdLocs[n][0];
            var dvdLocCode = dvdLocs[n][1];

            if (libraryCell.text().indexOf(dvdLoc) != -1 && (format == "DVD" || format == "Video Other"))
            {
                libraryCell.css("background-color", "#FE2E64");
                libraryCell.append(dvdLocCode);
            }

        }

        //DVD Series
        for (var q=0; q<dvdSerLocs.length; q++)
        {
            var dvdSerLoc = dvdSerLocs[q][0];
            var dvdSerLocCode = dvdSerLocs[q][1];

            if (libraryCell.text().indexOf(dvdSerLoc) != -1 && (format == "DVD" || format == "Video Other"))
            {
                libraryCell.css("background-color", "yellow");
                libraryCell.append(dvdSerLocCode);
            }

        }

        //CLIC
        for (var g=0; g<clicCDS.length; g++)
        {
            var clicCD = clicCDS[g][0];
            var clicCDCode = clicCDS[g][1];

            if (libraryCell.text().indexOf(clicCD) != -1 && (format == "Music CD" || format == "Book on CD"))
            {
                libraryCell.css("background-color", "#FE2E64");
                libraryCell.append(clicCDCode);
            }

        }


        for (var b=0; b<videoGames.length; b++)
        {
            var videoGame = videoGames[b][0];
            var videoGameCode = videoGames[b][1];

            if (libraryCell.text().indexOf(videoGame) != -1 && (format == "CD-ROM" && (edition.includes("Xbox") || edition.includes("PlayStation") || edition.includes("Wii") || edition.includes("Switch") || edition.includes("PS"))))
            {
                libraryCell.css("background-color", "#FE2E64");
                libraryCell.append(videoGameCode);
            }

        }

        for (var p=0; p<availabilityBad.length; p++)
        {
            var checkAvailabilityBad = availabilityBad[p][0];
            var availabilityBadCode = availabilityBad[p][1];


            if (availability.text().indexOf(checkAvailabilityBad) != -1)
            {
                libraryCell.css("background-color", "#FE2E64");
                libraryCell.append(availabilityBadCode);
            }
        }
    });
}
