// ==UserScript==
// @name        VDX Search Changes
// @namespace   vdx-search-changes
// @description Changes the location filters at the top of the search results
// @include     https://www.mnlinkgateway.org/vdx/zengine
// @include     https://www.mnlinkgateway.org/vdx/zengine*VDXaction*ZSearchResults*
// @include	https://www.mnlinkgateway.org/vdx/zengine*VDXaction*ZSearchMoveToStartOfResultSet*
// @version     1.9.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/tinysort/2.3.6/tinysort.js
// @updateURL   https://github.com/Minitex/VDX-Userscripts/raw/master/vdx-search-changes.user.js
// @author      Kyle Triska
// @copyright   2015, Kyle Triska
// @grant       GM_addStyle
// ==/UserScript==


var replacements = 	[
			["ANK", "Anoka County Library"],
			["ALV", "Arrowhead Library System"],
			["BTA", "CLIC - Bethel University"],
			["CCE", "Carver County Library"],
			["DCB", "Dakota County Library"],
			["DUD", "Duluth Public Library"],
			["ETC", "East Central Regional Library"],
			["GRR", "Great River Regional Library"],
			["HCO", "Hennepin County Library"],
			["KRL", "Kitchigami Regional Library"],
			["LAL/NRG", "Lake Agassiz Regional & Northwest Regional"],
			["CRM", "Pioneerland Library Systems"],
			["MHA", "Hamline University"],
			["MLM", "Plum Creek Library System"],
			["MNC", "Concordia University St. Paul"],
			["MNE", "St. Catherine University"],
			["MNT", "University of St. Thomas"],
			["NOW", "University of Northwestern-St. Paul"],
			["RCL", "Ramsey County Library"],
			["ROC", "Rochester Public Library"],
			["SPP", "Saint Paul Public Library"],
			["SSH", "Scott County Library System"],
			["S#L", "Southeastern Libraries Cooperating (SELCO)"],
			["TDS", "Traverse des Sioux Library System"],
			["MNU", "University of Minnesota - All Campuses"],
			["XOL", "Viking Library System"],
			["WLM", "Washington County Library"]
			];

$(".search-targets:contains(',')").each(function()
                                         {
                                             $(this).html($(this).html().split(",").join(""));
                                         });


$( ".search-targets a" ).each(function( index ) {
	for (var i=0; i<replacements.length; i++)
	{
	      var item = replacements[i];
	      var code = item[0];
	      var name = item[1];
	      if ($(this).text().indexOf(name) != -1)
      {
          $(this).text(code);
      }
    }
});

GM_addStyle ( "                                     \
.queryDescription { display: block; }\
" );

var targets = $( ".search-targets a" );
if (targets !== null && targets.length > 1)
{
  tinysort(targets);
  targets.not(":last-child").after(", ");
}
