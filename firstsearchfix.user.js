// ==UserScript==
// @name        FirstSearchFix
// @namespace   FirstSearchFix
// @description Changes the libraries availability table in FirstSearch
// @include     http://firstsearch.org/WebZ/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @updateURL   https://github.com/Minitex/VDX-Userscripts/raw/master/firstsearchfix.user.js
// @downloadURL https://github.com/Minitex/VDX-Userscripts/raw/master/firstsearchfix.user.js
// @author      Kyle Triska
// @copyright   2017, Kyle Triska
// ==/UserScript==

var selcoLocs = ["ATN", "CFBML", "HOKAH", "LEROY", "MCANN", "MCHAT",
                 "MDCPL", "MGMPL", "MKASS", "MKNPL", "MLANE", "MLCPL",
                 "MNALP", "MNBPL", "MNBPP", "MNCAL", "MNHAR", "MNHOU",
                 "MNLCP", "MNLON", "MNMAB", "MNRCO", "MNRUS", "MOWAT",
                 "MPLPL", "MPRES", "MSGPL", "MSTCH", "MSTEW", "MSVPL",
                 "MVHPL", "MWABA", "MWCON", "MZUMB", "NORTH", "WPB"];

$( "table[cellpadding=1][cellspacing=3] td:nth-child(3)").each(function( index ) {
    for (var i=0; i<selcoLocs.length; i++)
    {
        var locs = selcoLocs[i];
        if ($(this).text().indexOf(locs) != -1)
        {
            $(this).parent().replaceWith('<tr class="selco" valign="top" bgcolor="#EEEEEE"><td align="center">MLINKVDX</td><td><a target="_blank" href="https://selco.ent.sirsi.net/client/en_US/default"><b>SELCO</b></a></td><td align="center">S#L <font size="2" color="red"><b><a target="_blank" href="https://illpolicies.oclc.org/dill-ui/InstitutionView.do?institutionId=62362">?</a></b></font></td></tr>');
        }
    }
});

$("table[cellpadding=1][cellspacing=3] td:contains('S#L')").parent(':not(:last())').hide();
$(".selco").css({"font-family": "Tahoma, Arial, Helvetica", "font-size": "small"});