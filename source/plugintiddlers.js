created: 20151106222453723
modified: 20151108084201015
module-type: macro
tags: TiddlyWikiAsPlugin
title: $:/plugins/mannfr/asplugin/plugintiddlers
type: application/javascript

/*\
title: plugintiddlers
type: application/javascript
module-type: macro

Macro to output tiddlers matching a filter to Plugin

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "plugintiddlers";

exports.params = [
	{name: "filter"},
	{name: "extratag",
	default: "FromTiddlyWikiAsAPlugin"}
];

/*
Run the macro
*/
exports.run = function(filter, extratag) {
	var data = {tiddlers: {}};
	var tiddlers = this.wiki.filterTiddlers(filter);
	for(var t=0;t<tiddlers.length; t++) {
		var tiddler = this.wiki.getTiddler(tiddlers[t]);
		if(tiddler) {
			var fields = new Object();
			for(var field in tiddler.fields) {
				fields[field] = tiddler.getFieldString(field);
			}
			data["tiddlers"][fields["title"]] = fields;
			if (!("tags" in data["tiddlers"][fields["title"]])) {
			   data["tiddlers"][fields["title"]]["tags"] = "";
			}
			if( !(data["tiddlers"][fields["title"]]["tags"].indexOf(extratag) >= 0)) {
				data["tiddlers"][fields["title"]]["tags"] += " " + extratag;
			}
                        data["tiddlers"][fields["title"]]["tags"] = data["tiddlers"][fields["title"]]["tags"].trim();
		}
	}
	return JSON.stringify(data,null,$tw.config.preferences.jsonSpaces);
};

})();
