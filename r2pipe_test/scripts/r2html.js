var html = "";
var keys = [];

// #TODO: generate decorators from gui ...
var decorators = {"num2hex":["offset","vaddr","paddr","plt","from","addr","addr_end","eip","esp"]}

// thx stackoverflow, WebBrowser for .net is O_o=*x!< compatibility 
// with modern webbrowsers s*x... need a better .net control
function inList(psString, laList) 
{
    var i = laList.length;
    while (i--) {
        if (laList[i] === psString) return true;
    }
    return false;
}
function text2html(varname, value)
{
    var sAddress = "0x" + value.toString(16);
    var id = varname + "_" + sAddress;
    if (!inList(sAddress, addresses))
    {
        addresses = addresses.concat(sAddress);
        add_select_event(varname, "address", "address_selected");
    }
	return "<span class="+varname+" name="+varname+" id="+id+">"+sAddress+"</span>";
}
function decorate(varname, value)
{
	for (var key in decorators)
	{
		if( inList(varname, decorators[key]) == true )
		{
			value = value.toString(16); // this should be a callback to decorator
			value = text2html(varname, value);
		}
	}
	return value;
}
function readDict(dict)
{
	var html="";
	html += "<table class=tbl_dict border=0 id=out_dict contenteditable=true>\r\n";
	for (var key in dict) {
		value = dict[key];
		if(typeof(value) == "object") 
			value=readDict(value);
		value = decorate( key, value);
		html+="<tr valign=top><td class=op_stack nowrap>"+key;
		html+="</td><td class=group>:</td><td width=100%>"+value+"</td></tr>\r\n";
	}
	html+="</table>";
	return html;
}
if ( r2output != null )
{
	for(var k in r2output[0]) keys.push(k);
	html  = "<table class=tbl border=0 id=out contenteditable=true>\r\n";
	html += "<tr>\r\n";
	html += "<th>"+keys.join("</th><th>")+"</th>";
	html += "</tr><tr>\r\n";
	for(i=0;i<r2output.length,row=r2output[i];i++)
	{
		html+="<tr>\r\n";
		for(j=0;j<keys.length,key=keys[j];j++)
		{
			value = decorate( key, row[key] );
			html+="<td nowrap>"+value+"</td>";
		}
		html+="</tr>\r\n";
	}
	html+="</table>";

	html+=readDict(r2output);
	document.write(html);
}

var r2code = document.getElementById('r2code');
if (r2code) r2code.contentEditable = true;

function add_select_event(id,cname,cname_selected)
{
    $(id).click(function () {
        clear_selected_addresses();
        if ($(this).hasClass(cname))
            $(id).removeClass(cname).addClass(cname_selected);
        else
            $(id).removeClass(cname_selected).addClass(cname);
    });
}
function clear_selected_addresses() {        
    for (i = 0; i < addresses.length, address = addresses[i]; i++)
    {
        var id = "#address_" + address;
        if ($(id).hasClass("address_selected"))
            $(id).removeClass("address_selected").addClass("address");
    }
}

if (typeof addresses !== 'undefined') {
    for (i = 0; i < addresses.length, address=addresses[i]; i++) {
        add_select_event("#address_" + address, "address", "address_selected"); // html render
        add_select_event("#from_" + address, "from", "from_selected"); // json decodes
    }
}
//document.write(keys);
//document.write(JSON.stringify(r2output));

