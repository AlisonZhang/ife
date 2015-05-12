/**
 * @file util.js
 * @author  AlisonZhang(zhangxuejing_62@126.com)
 */

// �ж�arr�Ƿ�Ϊһ�����飬����һ��boolֵ
function isArray(arr) {
    //����һ
    //return arr instanceof Array;
    //������
    return Object.prototype.toString.call(arr)==="[object Array]";
}

// �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
function isFunction(fn) {
    //����һ
    //return typeof fn === "function";
    //������
    return Object.prototype.toString.call(fn) === "[object Function]";
}
// ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
// �����ƵĶ������ͻᱻ����Ϊ���֡��ַ��������������ڡ����顢Object���󡣲��������������������
function cloneObject(src) {
    var tar = src.constructor === Array ? [] : {};
    for ( var i in src ) {
        if ( src.hasOwnProperty(i) ) {
            tar[i] = typeof src[i] === "object" ? cloneObject(src[i]) : src[i];
        }
    }
    return tar;
}

// ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
function uniqArray(arr) {
    var newarry = [] ;
    if (objecr.prototype.toString.call(arr) !== "[object Array]") {
        return false;
    }
    if (arr.length <= 1) {
        return arr;
    }
    for (var i = 0,len = arr.length;i < len;i++) {
        if(arr[i] !== arr[i+1]) {
            newarry.push(arr[i]);
        }
    }
    return newarry;
}

// ʵ��һ���򵥵�trim����������ȥ��һ���ַ�����ͷ����β���Ŀհ��ַ�
// ��ϰͨ��ѭ�����Լ��ַ�����һЩ�����������ֱ�ɨ���ַ���strͷ����β���Ƿ��������Ŀհ��ַ�������ɾ�����ǣ���󷵻�һ�����ȥ�����ַ���
function simpleTrim(str) {
    var len = str.length;
    for (var i = 0; i < len; i++) {
        if (str.charAt(i)==" ") {
            str = str.substring(i+1);
        }
        else break;
    }
    for (var i=len-1; i > 0; i--) {
        if (str.charAt(i) == " ") {
            str = str.substring(0,i);
        }
        else break;
    }
    console.log(str.length);
    return str;
}

// ����ʹ��һ�м���������ʽ��ɸ���Ŀ
function trim(str) {
   return str.replace( /\s+/g, "" );
}

// ʵ��һ����������ķ��������������ÿһ��Ԫ��ִ��fn��������������������Ԫ����Ϊ��������
function each(arr, fn) {
    var len = arr.length;
    for (var i=0; i < len; i++) {
        fn(arr[i],i);
    }
}


// ��ȡһ�����������һ��Ԫ�ص�����������һ������
function getObjectLength(obj) {
    var count = 0;
    if (obj instanceof Obeject) {
        for (var i in obj) {
            count++;
        }
    }
    return count;
}

// �ж��Ƿ�Ϊ�����ַ
function isEmail(emailStr) {
    return /^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailStr)
}

// �ж��Ƿ�Ϊ�ֻ���
function isMobilePhone(phone) {
    return /^1[3|4|5|7|8|]\d{9}$/.test(phone);
}

// Ϊelement����һ����ʽ��ΪnewClassName������ʽ
function addClass(element, newClassName) {
    if (element == null) {
        throw new Error (element + "does not exist");
    }
    else if (element.classList.contains(newClassName)) {
        throw ne Error (element + "already contained" + newClassName);
    }
    else {
        element.classList.add (newClassName);
    }
}

// �Ƴ�element�е���ʽoldClassName
function removeClass(element, oldClassName) {
   if (element == null) {
       throw new Error (element + "dose not exist");
   }
    else if (element.classList.contains(oldClassName)) {
       element.classList.remove(oldClassName);
   }
    else {
       throw new Error (element + "does not contain " +oldClassName);
   }
}

// �ж�siblingNode��element�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
function isSiblingNode(element, siblingNode) {
   return element.parentElement() === siblingNode.parentElement();
}

// ��ȡelement�������������ڵ�λ�ã�����һ������{x, y}
function getPosition(element) {
    var elPo = document.getElementById(element);
    var x = 0;
    var y =0;
    while (elPo !== null) {
        x += elPo.offsetTop;
        y += elPo.offsetLeft;
        elPo = elPo.offsetParent;
    }
    return {x:x,y:y};
}

// ʵ��һ���򵥵�Query  ���ᣬ����zchen9����һ��
function $(selector) {

    var selItem = selector.split(" ");

    if ( selItem.length === 1 ) {
        var aitem = selItem.toString();
        switch ( aitem.substr(0, 1) ) {
            case "#":
                return document.getElementById( aitem.substr(1) );
                break;
            case ".":
                if (document.getElementsByClassName) {
                    return document.getElementsByClassName(aitem.substr(1))
                }else {
                    var nodes = document.getElementsByTagName("*"),ret = [];
                    for(i = 0; i < nodes.length; i++) {
                        if(hasClass(nodes[i],aitem.substr(1))){
                            ret.push(nodes[i])
                        }
                    }
                    return ret;
                }
                break;
            case "[":
                if ( aitem.charAt( aitem.length - 1 ) === "]" ) {

                    var item = aitem.substring( 1, aitem.length - 1 );
                    var elements = document.getElementsByTagName("*");

                    if ( item.indexOf("=")  != -1 ) {
                        var items = item.split("=");
                        for ( var j = 0; j < elements.length; j++) {
                            if ( elements[j].getAttribute( items[0] ) === items[1] ) {
                                return elements[j];
                            }
                        }
                    }
                    else {
                        for ( var i=0; i < elements.length; i++ ) {
                            if ( elements[i].hasAttribute( item ) ) {
                                return elements[i];
                            }
                        }
                    }
                }
                else
                {
                    throw Error( "']' is missing !" );
                }
                break;
            default :
                return document.getElementsByTagName( aitem );
        }
    }
    else {
        for ( var k = 1; k < selItem.length; i++ ) {

            if ( selItem[0].substr(0, 1) == "#" ) {
                var itemId = document.getElementById( selItem[0].substr(1) );
                switch ( selItem[k].substr(0,1) ) {
                    case ".":
                        return itemId.getElementsByClassName( selItem[k].substr(1) )[0];
                        break;
                    default :
                        return itemId.getElementsByTagName( selItem[k] );
                }
            }
            else if ( selItem[0].substr(0, 1) == "." ) {
                var itemClass = document.getElementsByClassName( selItem[0].substr(1) );
                switch ( selItem[k].substr(0, 1) ) {
                    case "#":
                        return itemClass.getElementById( selItem[k].substr(1) );
                        break;
                    default :
                        return itemId.getElementsByTagName( selItem[k] );
                }
            }
        }
    }
}


// ��һ��element��һ�����event�¼�����Ӧ����Ӧ����Ϊlistener
function addEvent(element, event, listener) {
    if ( element.addEventListener ) {
        element.addEventListener( event, listener, false );
    }
    else if ( element.attachEvent ) {
        element.attachEvent( "on" + event, listener );
    }
    else {
        element[ "on" + event ] = listener;
    }

}

// �Ƴ�element�������event�¼�����ʱִ��listener����Ӧ
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }
    else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    } else {
        element["on" + event] = null;
    }
}

// ʵ�ֶ�click�¼��İ�
function addClickEvent(element, listener) {
    element.onclick = listener;
}
/*
function addClickEvent(element, listener) {
    if ( element.addEventListener ) {
        element.addEventListener("click", listener, false );
    }
    else if ( element.attachEvent ) {
        element.attachEvent( "onclick", listener );
    }else {
        element["onclick"] = listener;
    }
}
*/

// ʵ�ֶ��ڰ�Enter��ʱ���¼���
function addEnterEvent(element, listener) {
    element.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            listener();
        }
    }
}
/*function addEnterEvent(element, listener) {
    var e = event ? event : window.event;
    var ele = element ? e.target : e.srcElement;
    var curKey = 0;
    curKey = e.keyCode|| e.which|| e.charCode; //֧��IE��FF
    if ( curKey == 13 ) {
        listener();
    }
}*/
/*function addEnterEvent(element, listener) {
   addEvent(element, "keydown", function(event) {
        if (event.keyCode==13) {
            listener();
        }
    });
}*/

 //�¼�����
function delegateEvent(element, tag, eventName, listener) {
    var e = event ? event : window.event;
    var ele = element ? element : document.body;
    var target = e.target || e.srcElement;
    $.on(element,eventName,function(){
        if ( ele.nodeName === tag || ele.nodeName.toLowerCase() === tag ) {
            listener();
        }
    });
}

$.on = function (element, event,listener) {
    addEvent(element, event,listener)};

$.un = function (element, event, listener) {
    removeEvent(element, event, listner) };

$.click = function (element, listener) {
    addClickEvent(element,listener)};

$.enter = function(element,listener) {
    addEnterEvent(element,listneer)};

$.delegate = function(element, tag, eventName, listener) {
    delegateEvent(element, tag, eventName, listener);
};



// �ж��Ƿ�ΪIE�����������-1���߰汾��
function isIE() {
    var ua = window.navigator.userAgent;
    if (ua.indexOf("MSIE")> -1 && ua.indexOf("Trident") > -1) {
        switch (true) {
            case ua.indexOf("MSIE 6.0") != -1:
                return "IE6";
                break;
            case ua.indexOf("MSIE 7.0") != -1:
                return "IE7";
                break;
            case ua.indexOf("MSIE 8.0") != -1:
                return "IE8";
                break;
            case ua.indexOf("MSIE 9.0") != -1:
                return "IE9";
                break;
            case ua.indexOf("MSIE 10.0") != -1:
                return "IE10";
                break;
            case ua.indexOf("MSIE 11.0") != -1:
                return "IE11";
                break;
            default:
                return "Other Vision"
        }
    }
}

// ����cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
    if(expiredays instanceof Date) {
        cookie += "; expire=" + expiredays.toGMTString();
    }
    document.cookie = cookie;
}

// ��ȡcookieֵ
function getCookie(cookieName) {
    var coName = encodeURIComponent(cookieName) + "=",
        coStart = document.cookie.indexOf(coName),
        coValue = null;
    if(coStart > -1) {
        var coEnd = document.cookie.indexOf(";",coStart);
        if(coEnd == -1) {
            coEnd = document.cookie.length;
        }
        coValue = decodeURIComponent(document.cookie.subString(coStart + coName.length,coEnd)
        );
    }
    return coValue;
}

//��װAjax,����������newutil.js�ļ������ @author zchen9 ͬѧ������һ��
