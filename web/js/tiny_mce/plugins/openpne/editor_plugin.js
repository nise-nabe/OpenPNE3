
(function(){var DOM=tinymce.DOM,Event=tinymce.dom.Event,is=tinymce.is,each=tinymce.each;tinymce.create('tinymce.ui.OpenPNEColorButton:tinymce.ui.ColorSplitButton',{renderHTML:function(){var s=this.settings,h='<a id="'+this.id+'" href="javascript:;" class="mceButton mceButtonEnabled '+s['class']
+'" onmousedown="return false;" onclick="return false;" title="'+tinymce.DOM.encode(s.title)+'">';if(s.image){h+='<img class="mceIcon" src="'+s.image+'" /></a>';}else{h+='<span class="mceIcon '+s['class']+'"></span></a>';}
return h;},renderMenu:function(){var t=this,m,i=0,s=t.settings,n,tb,tr,w,context;w=DOM.add(s.menu_container,'div',{role:'listbox',id:t.id+'_menu','class':s['menu_class']+' '+s['class'],style:'position:absolute;left:0;top:-1000px;'});m=DOM.add(w,'div',{'class':s['class']+' mceSplitButtonMenu'});DOM.add(m,'span',{'class':'mceMenuLine'});n=DOM.add(m,'table',{role:'presentation','class':'mceColorSplitMenu'});tb=DOM.add(n,'tbody');i=0;each(is(s.colors,'array')?s.colors:s.colors.split(','),function(c){c=c.replace(/^#/,'');if(!i--){tr=DOM.add(tb,'tr');i=s.grid_width-1;}
n=DOM.add(tr,'td');n=DOM.add(n,'a',{role:'option',href:'javascript:;',style:{backgroundColor:'#'+c},'data-mce-color':'#'+c});});if(s.more_colors_func){n=DOM.add(tb,'tr');n=DOM.add(n,'td',{colspan:s.grid_width,'class':'mceMoreColors'});n=DOM.add(n,'a',{role:'option',id:t.id+'_more',href:'javascript:;',onclick:'return false;','class':'mceMoreColors'},s.more_colors_title);Event.add(n,'click',function(e){s.more_colors_func.call(s.more_colors_scope||this);return Event.cancel(e);});}
DOM.addClass(m,'mceColorSplitMenu');new tinymce.ui.KeyboardNavigation({root:t.id+'_menu',items:DOM.select('a',t.id+'_menu'),onCancel:function(){t.hideMenu();t.focus();}});Event.add(t.id+'_menu','mousedown',function(e){return Event.cancel(e);});Event.add(t.id+'_menu','click',function(e){var c;e=DOM.getParent(e.target,'a',tb);if(e&&e.nodeName.toLowerCase()=='a'&&(c=e.getAttribute('data-mce-color')))
t.setColor(c);return Event.cancel(e);});return w;},postRender:function(){tinymce.dom.Event.add(this.id,'click',this.showMenu,this);},setColor:function(c){this.value=c;this.hideMenu();this.settings.onselect(c);}});tinymce.create('tinymce.ui.OpenPNEEmojiButton:tinymce.ui.ColorSplitButton',{OpenPNEEmojiButton:function(id,s){var t=this;t.parent(id,s);t.settings=s;},renderMenu:function(){var t=this,m,i=0,s=t.settings,n,tb,tr,w;w=DOM.add(s.menu_container,'div',{id:t.id+'_menu',dir:'ltr','class':s['menu_class']+' '+s['class'],style:'position:absolute;left:0;top:-1000px;width:402px;margin-left:-201px'});m=DOM.add(w,'div',{'class':s['class']+' mceSplitButtonMenu'});DOM.add(m,'span',{'class':'mceMenuLine'});n=DOM.add(m,'table',{'class':'mceEmojiSplitMenu'});tb=DOM.add(n,'tbody');for(var num in s.emoji){var emoji=s.emoji[num];for(var i=emoji.start;i<=emoji.end;i++){if((i-emoji.start)%25==0){tr=DOM.add(tb,'tr');}
n=DOM.add(tr,'td');n=DOM.add(n,'img',{src:op_get_relative_uri_root()+"/images/emoji/"+s.carrier+"/"+s.carrier+i+".gif",alt:"["+s.carrier+":"+i+"]",width:12,height:12});Event.add(n,'mousedown',function(e){if(Prototype.Browser.IE){tinyMCE.execCommand("mceInsertContent",false,e.srcElement.getAttribute("alt"));}else{tinyMCE.execCommand("mceInsertContent",false,e.element().getAttribute("alt"));}});}}
DOM.addClass(m,'mceColorSplitMenu');return w;},renderHTML:function(){var s=this.settings,h='<a id="'+this.id+'" href="javascript:;" class="mceButton mceButtonEnabled '+s['class']
+'" onmousedown="return false;" onclick="return false;" title="'+tinymce.DOM.encode(s.title)+'">';if(s.image){h+='<img class="mceIcon" src="'+s.image+'" /></a>';}else{h+='<span class="mceIcon '+s['class']+'"></span></a>';}
return h;},showMenu:function(){var t=this,r,p,e,p2;if(t.isDisabled())
return;if(!t.isMenuRendered){t.renderMenu();t.isMenuRendered=true;}
if(t.isMenuVisible)
return t.hideMenu();e=DOM.get(t.id);DOM.show(t.id+'_menu');DOM.addClass(e,'mceSplitButtonSelected');p2=DOM.getPos(e);DOM.setStyles(t.id+'_menu',{left:'50%',top:p2.y-DOM.get(t.id+'_menu').clientHeight,zIndex:150});e=0;Event.add(DOM.doc,'mousedown',t.hideMenu,t);t.onShowMenu.dispatch(t);if(t._focused){t._keyHandler=Event.add(t.id+'_menu','keydown',function(e){if(e.keyCode==27)
t.hideMenu();});DOM.select('a',t.id+'_menu')[0].focus();}
t.isMenuVisible=1;},hideMenu:function(e){var t=this;{if(e&&e.type=="mousedown"&&DOM.getParent(e.target,function(e){return e.id===t.id+'_open';}))
return;if(!e||!DOM.getParent(e.target,'.mceSplitButtonMenu')){DOM.removeClass(t.id,'mceSplitButtonSelected');Event.remove(DOM.doc,'mousedown',t.hideMenu,t);Event.remove(t.id+'_menu','keydown',t._keyHandler);DOM.hide(t.id+'_menu');}
t.isMenuVisible=0;}},postRender:function(){tinymce.dom.Event.add(this.id,'click',this.showMenu,this);}});tinymce.create('tinymce.ui.OpenPNECmdButton:tinymce.ui.Button',{renderHTML:function(){var s=this.settings;var h='<a id="'+this.id+'" href="javascript:;" class="mceButton mceButtonEnabled '+s['class']+'" style="width:40px; margin-left: 25px;" onmousedown="return false;" onclick="return false;" title="'+tinymce.DOM.encode(s.title)+'"><img class="mceIcon" style="width:40px;" src="'+s.image+'" /></a>';return h;}});tinymce.PluginManager.requireLangPack('openpne');var config=op_mce_editor_get_config();tinymce.create('tinymce.plugins.OpenPNEPlugin',{init:function(ed,url){var t=this;ed.settings.content_css=url+"/css/editor.css";ed.addCommand('mceOpenPNE_op_b',function(){tinyMCE.execCommand("Bold");});ed.addCommand('mceOpenPNE_op_u',function(){tinyMCE.execCommand("Underline");});ed.addCommand('mceOpenPNE_op_s',function(){tinyMCE.execCommand("Strikethrough");});ed.addCommand('mceOpenPNE_op_i',function(){tinyMCE.execCommand("Italic");});ed.addCommand('mceOpenPNE_op_large',function(){tinyMCE.execCommand("FontSize",false,5);});ed.addCommand('mceOpenPNE_op_small',function(){tinyMCE.execCommand("FontSize",false,1);});ed.addCommand('mceOpenPNE_op_image',function(){window.open(config.op_image.contentURL.unescapeHTML(),'','width=600,height=550,toolbar=no,scrollbars=yes,left=10,top=10');});ed.addCommand('mceOpenPNE_op_cmd',function(){window.open(config.op_cmd.contentURL.unescapeHTML());});for(var key in config){var value=config[key];if(key!="op_color"){ed.addButton(key,{title:'{#openpne.'+key+'}',image:value.imageURL,cmd:'mceOpenPNE_'+key});}}
ed.onBeforeSetContent.add(function(ed,o){o.content=t._textToPreview(o.content);});ed.onPostProcess.add(function(ed,o){if(o.save){if(ed.isHidden()){o.content=ed.getElement().value.replace(/\n\n/g,"\n \n");}else{o.content=t._previewToText(o.content,ed);}}});ed.onNodeChange.add(function(ed,cm,n){cm.setActive(this.id+'_op_b',false);cm.setActive(this.id+'_op_u',false);cm.setActive(this.id+'_op_s',false);cm.setActive(this.id+'_op_i',false);cm.setActive(this.id+'_op_large',false);cm.setActive(this.id+'_op_small',false);var elm=n;while(elm.parentNode){var tagname=t._getTagName(elm);if((tagname=="large"||tagname=="small")&&(cm.get(this.id+'_op_large').isActive()||cm.get(this.id+'_op_small').isActive())){elm=elm.parentNode;continue;}
cm.setActive(this.id+'_op_'+tagname,true);elm=elm.parentNode;}});tinyMCE.onBeforeUnload.add(function(){if(!ed.isHidden()){ed.hide();}});},createControl:function(n,cm){var c=null;if(n=="op_color"){c=this._createOpenPNEColorButton("op_color",{title:"{#openpne.op_color}",image:config["op_color"].imageURL,cmd:"ForeColor"},cm);}
if(n=="op_emoji_docomo"||n=="op_emoji_au"&&config["op_emoji_au"]||n=="op_emoji_softbank"&&config["op_emoji_softbank"]){var emoji_config={op_emoji_docomo:{carrier:"i",emoji:[{start:1,end:252}],title:"{#openpne."+n+"}",image:config[n].imageURL},op_emoji_au:{carrier:"e",emoji:[{start:1,end:518},{start:700,end:822}],title:"{#openpne."+n+"}",image:config[n].imageURL},op_emoji_softbank:{carrier:"s",emoji:[{start:1,end:485}],title:"{#openpne."+n+"}",image:config[n].imageURL}}
c=this._createOpenPNEEmojiButton(n,emoji_config[n],cm);}
if(n=="op_cmd"&&config["op_cmd"]){c=this._createOpenPNECmdButton(n,{title:"{#openpne.op_cmd}",image:config["op_cmd"].imageURL,cmd:"mceOpenPNE_op_cmd"},cm);}
return c;},getInfo:function(){return{longname:'OpenPNE plugin',author:'Kousuke Ebihara, Shogo Kawahara',version:"2.0"}},_getTagName:function(elm){var tagname=elm.nodeName.toLowerCase();if(Prototype.Browser.WebKit&&tagname=="span"){if(elm.style.fontWeight=='bold'){return'b';}
if(elm.style.textDecoration=='underline'){return'u';}
if(elm.style.textDecoration=='line-through'){return's';}
if(elm.style.fontStyle=='italic'){return'i';}
if(elm.style.fontSize=='x-large'){return'large';}
if(elm.style.fontSize=='x-small'){return'small';}}else if(tagname!="span"){var convertList={strike:"s",strong:"b",em:"i"};if(convertList[tagname]){return convertList[tagname];}
var size=elm.getAttribute("size");if(tagname=="font"&&size=="5"){return"large";}
if(tagname=="font"&&size=="1"){return"small";}}
return tagname;},_createOpenPNEColorButton:function(id,s,cm){var t=cm,ed=t.editor,cmd,c;if(t.get(id)){return null;}
s.title=ed.translate(s.title);s.scope=s.scope||ed;if(!s.onclick){s.onclick=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}
if(!s.onselect){s.onselect=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}
id=t.prefix+id;s=tinymce.extend({title:s.title,'class':'mce_'+id,'menu_class':ed.getParam('skin')+'Skin',scope:s.scope,more_colors_title:ed.getLang('more_colors')},s);c=new tinymce.ui.OpenPNEColorButton(id,s);ed.onMouseDown.add(c.hideMenu,c);ed.onRemove.add(function(){c.destroy();});return t.add(c);},_createOpenPNEEmojiButton:function(id,s,cm){var t=cm,ed=t.editor,cmd,c;if(t.get(id)){return null;}
s.title=ed.translate(s.title);s.scope=s.scope||ed;if(!s.onclick){s.onclick=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}
if(!s.onselect){s.onselect=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}
id=t.prefix+id;s=tinymce.extend({title:s.title,'class':'mce_'+id,'menu_class':ed.getParam('skin')+'Skin',scope:s.scope},s);c=new tinymce.ui.OpenPNEEmojiButton(id,s);ed.onMouseDown.add(c.hideMenu,c);ed.onRemove.add(function(){c.destroy();});return t.add(c);},_createOpenPNECmdButton:function(id,s,cm){var t=cm,ed=t.editor,cmd,c;if(t.get(id)){return null;}
s.title=ed.translate(s.title);s.scope=s.scope||ed;if(!s.onclick){s.onclick=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}
if(!s.onselect){s.onselect=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}
id=t.prefix+id;s=tinymce.extend({title:s.title,'class':'mce_'+id,'menu_class':ed.getParam('skin')+'Skin',scope:s.scope},s);c=new tinymce.ui.OpenPNECmdButton(id,s);ed.onPostRender.add(function(){var parentContainer=document.getElementById(c.id).parentNode;parentContainer.style.width="70px";});ed.onRemove.add(function(){c.destroy();});return t.add(c);},_previewToText:function(s,editor){var editorDoc=editor.getBody();function rep(re,str){s=s.replace(re,str);};if(!tinymce.isWebKit){s=tinymce.trim(s);rep('/<(\/?)strong>/gi','<\1b>');rep('/<(\/?)strike>/gi','<\1s>');rep('/<(\/?)em>/gi','<\1i>');editor.dom.setHTML(editor.getBody(),s);}
function convertHtmlTagToDecoTag(doc,tagname)
{var tagList=doc.getElementsByTagName(tagname);var org_tagname=tagname;var args={};while(tagList.length){targetObj=tagList[0];args={};if(org_tagname=="font"){var size=targetObj.getAttribute("size");var color=targetObj.getAttribute("color");tagname='op:font';if(size&&color){if(tinymce.isIE){targetObj.removeAttribute("color");targetObj.innerHTML='<font color="'+color+'">'+targetObj.innerHTML+"</font>";}else{var fontSize=document.createElement("font");fontSize.setAttribute("size",size);fontSize.removeAttribute("color");var clone=targetObj.cloneNode(true);clone.removeAttribute("size");fontSize.appendChild(clone);targetObj.parentNode.replaceChild(fontSize,targetObj);}
tagList=doc.getElementsByTagName(org_tagname);continue;}
if(size>=1&&size<=7){args['size']=size;}
if(color){args['color']=color;}
if(tagname==org_tagname){editor.dom.remove(targetObj,true);tagList=doc.getElementsByTagName(org_tagname);continue;}}else if(org_tagname=='span'){if(targetObj.style.fontWeight=='bold'){tagname='op:b';}else if(targetObj.style.textDecoration=='underline'){tagname='op:u';}else if(targetObj.style.textDecoration=='line-through'){tagname='op:s';}else if(targetObj.style.fontStyle=='italic'){tagname='op:i';}else if(targetObj.style.color){var color=tinyMCE.activeEditor.dom.toHex(targetObj.style.color);tagname='op:font';args['color']=color;}else if(targetObj.style.fontSize){var fontSizeMap={'xx-small':1,'x-small':2,'small':3,'medium':4,'large':5,'x-large':6,'xx-large':7}
if(!fontSizeMap[targetObj.style.fontSize]){editor.dom.remove(targetObj,true);continue;}
tagname='op:font';args['size']=fontSizeMap[targetObj.style.fontSize];}else{editor.dom.remove(targetObj,true);continue;}}else{tagname='op:'+org_tagname;}
if(tinymce.isIE){tagname=tagname.replace("op:","op");}
var newObj=editor.dom.create(tagname);editor.dom.setAttribs(newObj,args);editor.dom.replace(newObj,targetObj,true);tagList=doc.getElementsByTagName(org_tagname);}
s=editorDoc.innerHTML;}
var convertList=new Array('span','font','b','u','s','i');for(var i=0;i<convertList.length;i++){convertHtmlTagToDecoTag(editor.getBody(),convertList[i]);}
rep(/<\/?div>/gi,"");if(Prototype.Browser.IE){rep(/<(\/?):?op(b|u|s|i|font|large|small|color)/gi,'<$1op:$2');}
rep(/<br\s?\/?[^>]*>/gi,"\n\n");rep(/&nbsp;/gi," ");rep(/&quot;/gi,"\"");rep(/&lt;/gi,"<");rep(/&gt;/gi,">");rep(/&amp;/gi,"&");return s;},_textToPreview:function(s){s=tinymce.trim(s);var rule=/&lt;op:(b|u|s|i|font|large|small|color)(\s+(.*?)|)&gt;(.*?)&lt;\/op:\1&gt;/i;function rep(re,str){s=s.replace(re,str);};function getAttributes(str){var result={};if(!str){return result;}
var reg=new RegExp(/([^\s]*?)=(?:&quot;|")(.*?)(?:&quote;|")/gi);while((att=reg.exec(str))!=null){result[att[1]]=att[2];}
return result;};rep(/</gi,"&lt;");rep(/>/gi,"&gt;");rep(/\n/gi,"<br />");rep(/&lt;(\/|)op:(b|u|s|i|font|large|small|color)(?:\s+(.*?)|)&gt;/gi,function(str,isEndTag,org_tagname,attributes_str){var opt="";var style="";var tagname=org_tagname;var attributes=getAttributes(attributes_str);var fontSizeMap=["xx-small","x-small","small","medium","large","x-large","xx-large"];var fontsize=fontSizeMap[3];if(tagname=="font"||tagname=="color"||tagname=="large"||tagname=="small"){tagname="span";}
if(isEndTag){return"</"+tagname+">";}
if(org_tagname=="font"){if(attributes["size"]){if(fontSizeMap[attributes["size"]-1]){fontsize=fontSizeMap[attributes["size"]-1];}
style+='font-size:'+fontsize+';';}
if(attributes["color"]&&attributes["color"].match(/^#[0-9a-fA-F]{6}$/)){style+='color:'+attributes["color"]+';';}
opt=' style="'+style+'"';}
if(org_tagname=="color"&&attributes["code"]&&attributes["code"].match(/^#[0-9a-fA-F]{6}$/)){opt=' style="color:'+attributes["code"]+';"';}
if(org_tagname=="large"){opt=' style="font-size:large"';}
if(org_tagname=="small"){opt=' style="font-size:xx-small"';}
return"<"+tagname+opt+">";});return s;}});tinymce.PluginManager.add('openpne',tinymce.plugins.OpenPNEPlugin);})();