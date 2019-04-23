// ==UserScript==
// @name        VDX+
// @namespace   vdx-plus
// @description Inserts lending policies into VDX results and adds background colors to alert keywords
// @include     https://www.mnlinkgateway.org/vdx/zengine*VDXaction*ZSearchDetails*
// @version     2.8.4
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @updateURL   https://github.com/Minitex/VDX-Userscripts/raw/master/VDX%2B.user.js
// @downloadURL https://github.com/Minitex/VDX-Userscripts/raw/master/VDX%2B.user.js
// @author      Kyle Triska
// @copyright   2019, Kyle Triska
// @grant 	GM_getResourceText
// @resource    closingsFile file://H:\Resource Sharing\Kyle\vdxclosings.txt
// ==/UserScript==

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
    ["St. Cloud Public Library", "CLOSED INDEFINITELY - CODE 6"],
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
    ["ALV - Hibbing Public Library", "Closed indefinitely - CODE 6"],
    ["Elysian Public Library", "- DOESN'T LOAN - 6"],
    ["Minneapolis Central", "IGNORE THIS LOCATION"]
];

var dvdLocs = 	[
    ["ALV - Babbitt", "- DOESN'T LOAN DVDS - 2"],
    ["ALV - Baudette", "- DOESN'T LOAN DVDS - 2"],
    ["ALV - Marble Public", "- DOESN'T LOAN DVDS - 2"],
    ["ALV - Moose Lake", "- DOESN'T LOAN DVDS - 2"],
    ["ALV - Virginia", "- NO FICTION DVDS - 2"],
    ["ALV - Ely", "- DOESN'T LOAN DVDS - 2"],

    ["BTA", "- DOESN'T LOAN DVDS - 2"],

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
    ["S#L - Cannon Falls", "- DOESN'T LOAN DVD SERIES - 2"],
    ["S#L - Pine Island", "- DOESN'T LOAN DVD SERIES - 2"],
    ["S#L - Zumbrota", "- DOESN'T LOAN DVD SERIES - 2"]
];

var clicCDS = [
    ["BTA", "- DOESN'T LOAN CDS - 2"],
    ["MNK", "- DOESN'T LOAN CDS - 2"],
    ["MNT", "- DOESN'T LOAN CDS - 2"],
    ["TL#", "- DOESN'T LOAN CDS - 2"],
    ["SMC", "- DOESN'T LOAN CDS - 2"],
];

var videoGames = [
    ["", "- VIDEO GAMES DO NOT LEND - 2"],
];


var badCallNumbers = ["Rental", "Reserve", "Reference", "Ref. Collection", "REF.", "New", "GLCL", "Rotating", "Display", "Bi-Folkal", "STORYTIME", "PHONO", "ON DISPLAY", "Childrens Collection", "Browsing Collection", "Curriculum Resources", "Special", "_Off-site"];


var availabilityBad = [
    ["STORYTIME", "- STORYTIME COLLECTION DOESN'T LOAN - CODE 2"],
    ["ON DISPLAY", "- DISPLAY ITEMS DON'T LOAN - CODE 2"],
    ["WALDORF", "- STORYTIME COLLECTION DOESN'T LOAN - CODE 2"],
    ["MNARCHIVES", "- MNARCHIVES COLLECTION DOESN'T LOAN - CODE 2"],
    ["Reference", "- REFERENCE COLLECTION DOESN'T LOAN - CODE 2"],
    ["Archives", "- Archives COLLECTION DOESN'T LOAN - CODE 2"],
    ["Ade Bethune", "- ADE BETHUNE COLLECTION DOESN'T LOAN - CODE 2"],
    ["McHugh", "- McHugh COLLECTION DOESN'T LOAN - CODE 2"],
    ["Mitsch", "- Mitsch COLLECTION DOESN'T LOAN - CODE 2"],
    ["Muellerleile", "- Muellerleile COLLECTION DOESN'T LOAN - CODE 2"],
    ["Sawyer", "- SAWYER COLLECTION DOESN'T LOAN - CODE 2"],
    ["Slade", "- SLADE COLLECTION DOESN'T LOAN - CODE 2"],
    ["LITHUB", "- LITHUB COLLECTION DOESN'T LOAN - CODE 2"],
    ["Bethel Seminary San Diego Library", "- SAN DIEGO LIBRARY DOESN'T LOAN - CODE 6"],
    ["Vault", "- BTA VAULT ITEMS DO NOT LOAN - 2"],
];


var codes = [
    ["Arrowhead Library System", "<b>Cloquet</b> does not circulate anything published in the last 6 months.","24"],
    ["Arrowhead Library System", "Does not lend AV Materials by Bob Dylan.","2"],

    ["Anoka County Library", "Check current year and previous year DVDs in catalog for 'Rental' in Call Number","24"],
    ["Anoka County Library", "Does not lend if another copy is out for ILL","1"],

    ["CLIC - Bethel", "<b>Curriculum</b> and <b>Education Collection (Educ Coll)</b> materials do not circulate through ILL.","2"],
    ["CLIC - Bethel", "<b>BTA</b> - Items from the <b>Z Room</b> do not circulate.","2"],
    ["CLIC - Bethel", "<b>MNK</b> - Does not lend Children's books.","2"],
    ["CLIC - Bethel", "<b>BTA and MNK</b> - Do not lend AV items.","2"],

    ["CLIC - Concordia", "<b>Curriculum</b> and <b>Education Collection (Educ Coll)</b> materials do not circulate through ILL.","2"],
    ["CLIC - Concordia", "Loans any AV if 'Media' is not in the location code.","2"],

    ["CLIC - Hamline", "<b>Curriculum</b> and <b>Education Collection (Educ Coll)</b> materials do not circulate through ILL.","2"],
    ["CLIC - Hamline", "Items from Multi-Volume sets do not circulate.","2"],
    ["CLIC - Hamline", "Items from the <b>2012-2013 MN Continuing Education Collection</b> do not circulate.","2"],
    ["CLIC - Hamline", "Childrens Collection does not circulate.","2"],
    ["CLIC - Hamline", "Loans CDs if 'Media' is not in the location code (but will not lend other AV at all).","2"],
    ["CLIC - Hamline", "Items owned at <b>MHL</b> should be added to the ROTA as MHA.", " "],

    ["CLIC - St. Catherine", "<b>Curriculum</b> and <b>Education Collection (Educ Coll)</b> materials do not circulate through ILL.","2"],
    ["CLIC - St. Catherine", "<b>SMC</b> - Does not lend 2019 items.","24"],
    ["CLIC - St. Catherine", "<b>SMC</b> - Does not lend AV items.","2"],
    ["CLIC - St. Catherine", "<b>MNE</b> - <b>'Browsing Collection'</b> will not circulate","2"],
    ["CLIC - St. Catherine", "<b>MNE</b> - <b>'Special Collection'</b> will not circulate","2"],
    ["CLIC - St. Catherine", "<b>MNE</b> - Loans CDs if 'Media' is not in the location code (but will not lend other AV at all).","2"],

    ["CLIC - Northwestern", "<b>Curriculum</b> and <b>Education Collection (Educ Coll)</b> materials do not circulate through ILL.","2"],
    ["CLIC - Northwestern", "Loans any AV if 'Media' is not in the location code.","2"],

    ["CLIC - St. Thomas", "<b>Curriculum</b> and <b>Education Collection (Educ Coll)</b> materials do not circulate through ILL.","2"],
    ["CLIC - St. Thomas", "<b>MNT and TL#</b> - Do not lend AV items.","2"],

    ["Pioneerland Library Systems", "Ortonville will not loan new (current year and previous year) DVDs","24"],
    ["Pioneerland Library Systems", "Will not circulate audio series 'The story of the world' series by Susan Wise Bauer","2"],

    ["Dakota County Library", "Does not lend recent DVDs. (In Catalog as 'DVDs, Rental')","24"],
    ["Dakota County Library", "Videocassettes do not circulate.","2"],
    ["Dakota County Library", "Video Games do not circulate.","2"],

    ["Hennepin County Library", "Children's board books do not circulate.","2"],
    ["Hennepin County Library", "Off-site does not loan.","6"],

    ["Kitchigami Regional Library", "Does not loan current year and previous year items.","24"],

    ["Lake Agassiz Regional Library and Northwest Regional Library", "Does not lend current year and previous year items.","24"],

    ["Plum Creek Library System", "<a href=\x22http://opac.plumcreeklibrary.net/cgi-bin/koha/opac-main.pl\x22 target=\x22_blank\x22>Please check catalog for items with '0' availability.</a>"," "],
    ["Plum Creek Library System", "Does not loan current year and previous year items (has 'NEW' in the call number).","24"],

    ["Ramsey County Library", "Professional collection does not circulate.","2"],
    ["Ramsey County Library", "Video Games do not circulate.","2"],

    ["Scott County Library System", "<b>Heritage Room</b> items do not circulate.","2"],

    ["Southeastern Libraries Cooperating (SELCO)", "<a href=\x22http://selco.ent.sirsi.net/client/default\x22 target=\x22_blank\x22>Remember to check S#L catalog before sending any requests to their location!</a>"," "],
    ["Southeastern Libraries Cooperating (SELCO)", "<b>Local Request Only</b>","2"],
    ["Southeastern Libraries Cooperating (SELCO)", "<b>CBBMLL (Chatfield Brass Band Music Lending Library)</b> does not circulate.","2"],
    ["Southeastern Libraries Cooperating (SELCO)", "Notify a supervisor if you see a request going to <b>CBBMLL</b>.","2"],
    ["Southeastern Libraries Cooperating (SELCO)", "Cannon Falls, Pine Island, and Zumbrota will not loan DVD series.","2"],

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
