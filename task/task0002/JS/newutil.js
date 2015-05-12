/**
 * @file util.js
 * @author zchen9(zxcvbnm.pop@qq.com)
 */

/**
 * �ж�arr�Ƿ�Ϊһ�����飬����һ��boolֵ
 *
 * @class
 */
function isArray(arr){
    //����һ
    //return arr instanceof Array;
    //������
    //return Array.isArray(arr);
    //������
    return Object.prototype.toString.call(arr) == "[object Array]";
}

/**
 * �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
 *
 * @class
 */

function isFunction(fn){
    //����һ
    //return typeof fn === "function";
    //������
    //return fn instanceof Function;
    //������
    return Object.prototype.toString.call(fn) == "[object Function]";
}
/**
 * ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
 * �����ƵĶ������ͻᱻ����Ϊ���֡��ַ��������������ڡ����顢Object���󡣲��������������������
 *
 * @class
 */

function cloneObject(src) {
    var tar = src.constructor === Array ? [] : {};
    for ( var i in src ) {
        if ( src.hasOwnProperty(i) ) {
            tar[i] = typeof src[i] === "object" ? cloneObject(src[i]) : src[i];
        }
    }
    return tar;
}
/**
 * ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
 *
 * @class
 */
//����1
function uniqArray(arr) {
    var temp = [];
    if(arr instanceof Array){
        arr.sort();
        for(var i=0;i<arr.length;i++){
            if(arr[i] !== arr[i+1]){
                temp.push(arr[i]);
            }
        }
    }
    return temp;
}
//����2
//function uniqArray(arr) {
//  var temp = [];
//  if(arr instanceof Array){
//      for(var i=0; i<arr.length; i++){
//          temp.push(arr[i]);
//          for(var j=i+1; j<=arr.length; j++){
//              if(arr[i]===arr[j]){
//                  temp.pop(arr[j]);
//              }
//          }
//      }
//  }
//  return temp;
//}

/**
 * ���ַ���ͷβ���пո��ַ���ȥ��������ȫ�ǰ�ǿո�Tab�ȣ�����һ���ַ���
 *
 * @class
 */
function trim(str) {
    return str.replace( /\s+/g, "" );
}

/**
 * ʵ��һ����������ķ��������������ÿһ��Ԫ��ִ��fn��������������������Ԫ����Ϊ��������
 *
 * @class
 */
function each(arr, fn) {
    for( var i=0; i < arr.length; i++ ) {
        fn(arr[i], i);
    }
}

/**
 * ��ȡһ�����������һ��Ԫ�ص�����������һ������
 *
 * @class
 */
function getObjectLength(obj) {
    var count = 0;
    if (obj instanceof Object) {
        for (var i in obj) {
            count++;
        }
    }
    return count;
}

/**
 * �ж��Ƿ�Ϊ�����ַ
 *
 * @class
 */
function isEmail(emailStr) {
    var emReg = /^([a-zA-Z0-9\_\-\.])+@([a-zA-Z0-9\_\-\.])+([a-zA-Z0-9]){2,4}$/gi;
    return emReg.test( emailStr );
}

/**
 * �ж��Ƿ�Ϊ�ֻ���
 *
 * @class
 */
function isMobilePhone(phone) {
    var phoneReg = /^\d{11}$/g;
    return phoneReg.test(phone);
}

/**
 * Ϊelement����һ����ʽ��ΪnewClassName������ʽ
 *
 * @class
 */
function addClass(element, newClassName) {
    try{
        element.setAttribute("class", newClassName);
    }
    catch( ex ) {
        element.className = "newClassName";
    }
}

/**
 * �Ƴ�element�е���ʽoldClassName
 *
 * @class
 */
function removeClass(element, oldClassName) {
    if ( element.className == oldClassName ) {
        try{
            element.removeAttribute("class");
        }
        catch( ex ) {
            element.className = "";
        }
    }
}

/**
 * �ж�siblingNode��element�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
 *
 * @class
 */
function isSiblingNode( element, siblingNode ) {
    var nodes = element.parentNode.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if ( nodes[i] === siblingNode ) {
            return true;
        }
    }
}

/**
 * ��ȡelement�������������ڵ�λ�ã�����һ������{x, y}
 *
 * @class
 */
function getPosition( element ) {
    var actualLeft = elemnt.offsetLeft;
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while ( current !== null ) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return { x : actualLeft, y : actualTop };
}

/**
 * ʵ��һ���򵥵�$()ѡ����
 *
 * @class
 */
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

/**
 * �ж�class����
 *
 * @class
 */
function hasClass(tagStr,classStr){
    var arr=tagStr.className.split(/\s+/ ); //���������ʽ����Ϊclass�����ж��,�ж��Ƿ����
    for (var i=0;i<arr.length;i++){
        if (arr[i]==classStr){
            return true ;
        }
    }
    return false ;
}

/**
 * ��һ��element��һ�����event�¼�����Ӧ����Ӧ����Ϊlistener
 *
 * @class
 */
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

/**
 * �Ƴ�element�������event�¼�����ʱִ��listener����Ӧ����listenerΪ��ʱ���Ƴ�������Ӧ����
 *
 * @class
 */
function removeEvent(element, event, listener) {
    if ( element.removeEventListener ) {
        element.removeEventLinster( event, listener, false );
    }
    else if( element.detachEvent ) {
        element.detachEvent( "on" + event, listener );
    }
    else {
        element[ "on" + event ] = null;
    }
}

/**
 * ʵ�ֶ�click�¼��İ�
 *
 * @class
 */
function addClickEvent(element, listener) {
    if ( element.addEventListener ) {
        element.addEventListener( "click", listener, false );
    }
    else if ( element.attachEvent ) {
        element.attachEvent( "onclick", listener );
    }else {
        element["onclick"] = listener;
    }
}

/**
 * ʵ�ֶ��ڰ�Enter��ʱ���¼���
 *
 * @class
 */
function addEnterEvent(element, listener) {
    var e = event ? event : window.event;
    var ele = element ? e.target : e.srcElement;
    var curKey = 0;
    curKey = e.keyCode|| e.which|| e.charCode; //֧��IE��FF
    if ( curKey == 13 ) {
        listener();
    }
}

$.on = function(element, event, listener) {
    addEvent(element, event, listener)
};

$.un = function(element, event, listener) {
    removeEvent(element, event, listener)
};

$.click = function(element, listener) {
    addClickEvent(element, listener)
};

$.enter = function(element, listener) {
    addEnterEvent(element, listener)
};


/**
 * ����Ԫ������¼�
 *
 * @class
 */
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

$.delegate = function(element, tag, eventName, listener) {
    delegateEvent(element, tag, eventName, listener);
};

/**
 * �ж��Ƿ�ΪIE�����������-1���߰汾��
 *
 * @class
 */
function isIE() {
    var ua = navigator.userAgent;
    if ( ua.indexOf("MSIE") > 0 ) {
        switch( true ) {
            case ua.indexOf("MSIE 6.0") != -1 :
                return "IE6";
                break;
            case ua.indexOf("MSIE 7.0") != -1 :
                return "IE7";
                break;
            case ua.indexOf("MSIE 8.0") != -1 :
                return "IE8";
                break;
            case ua.indexOf("MSIE 9.0") != -1 :
                return "IE9";
                break;
            case ua.indexOf("MSIE 10.0") != -1 :
                return "IE10";
                break;
            default :
                return "Other Vision";
        }
    }
}

/**
 * ����cookie
 *
 * @class
 */
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURIComponent( cookieName )
        + "="
        + encodeURIComponent( cookieValue );
    if ( expiredays instanceof Date ) {
        cookieText += "; expire=" + expiredays.toGMTString();
    }
    document.cookie = cookieText;
}

/**
 * ��ȡcookieֵ
 *
 * @class
 */
function getCookie(cookieName) {
    var coName = encodeURIComponent(cookieName) + "=",
        coStart = document.cookie.indexOf(coName),
        coValue = null;

    if ( coStart > -1 ) {
        var coEnd = document.cookie.indexOf(";", coStart);
        if ( coEnd == -1) {
            coEnd = document.cookie.length;
        }
        coValue = decodeURIComponent(
            document.cookie.subString( coStart + coName.length, coEnd )
        );
    }
    return coValue;
}

/**
 * ��װAjax����
 *
 * @param {Object} options ���԰����Ĳ���Ϊ��
 *                 type: post����get��������һ��Ĭ��ֵ
 *                 data: ���͵����ݣ�Ϊһ����ֵ�������Ϊһ����&���ӵĸ�ֵ�ַ���
 *                 onsuccess: �ɹ�ʱ�ĵ��ú���
 *                 onfail: ʧ��ʱ�ĵ��ú���
 *@param {Object} url ����
 *
 */
function ajax(url, options) {

    //��typeֵΪ�գ�Ĭ��ΪGET����
    var atype = options.type;
    if ( typeof atype == null ) {
        options.type = "GET";
    }

    options = {
        onsuccess: function( responseText, xhr ) {
            console.log( "Request was unsuccessful: " + xhr.status );
        },
        onfail: function( responseText, xhr ) {
            console.log( responseText );
        }
    };

    //XHR����
    function createXHR() {
        //һ�������
        if ( typeof XMLHttpRequest != "undefined" ) {
            return new XMLHttpRequest();
        }
        //����IE�ϰ汾
        else if ( typeof ActiveXObject != "undefined" ) {
            if ( typeof arguments.callee.activeXString != "string" ) {
                var versions = [ "MSXML2.XMLHttp.6.0",
                        "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"
                    ],
                    i,
                    len;
                for ( i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject( versions[i] );
                        arguments.callee.activeXString = versions[i];
                        break;
                    }
                    catch( ex ) {

                    }
                }
            }
            return new ActiveXObject( arguments.callee.activeXString );
        }
        else {
            throw new Error( "No XHR object available." );
        }
    }

    var xhr = createXHR();
    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 ) {
            if ( ( xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                options.onfail( xhr.responseText, xhr );
            }
            else {
                options.onsuccess( xhr.responseText, xhr );
            }
        }
    };

    //���巢�͵����ݵĸ�ʽ
    function addURLParam( data ){
        var pair = [];
        if ( data instanceof String ) {
            data = encodeURIComponent( data );
        }
        else if ( data instanceof Object ) {
            for( var i = 0; i < data.length; i++) {
                if ( data.hasOwnProperty(i) ) {
                    pair.push( i + "=" + data[i].toString() );
                }
            }
            data = encodeURIComponent( pair.join("&") );
        }
        return data;
    }

    //������ΪGETʱ
    if( options.type = "GET" ) {
        if( options.data != null ) {
            url += addURLParam( options.data );
        }
        xhr.open( "get", url, false );
        xhr.send( null );
    }
    //������ΪPOSTʱ
    else if( options.type = "POST" ) {
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if( options.data != null ) {
            xhr.send(addURLParam(options.data));
        }
    }
}

/**
 * ��ֹ�¼�ð��
 *
 * @class
 */
function stopBubble(e) {
    // ����ṩ���¼�����������һ����IE�����
    if ( e && e.stopPropagation ) {
        // �����֧��W3C��stopPropagation()����
        e.stopPropagation();
    }
    else {
        // ����������Ҫʹ��IE�ķ�ʽ��ȡ���¼�ð��
        window.event.cancelBubble = true;
    }
}

/**
 *���ܣ���ֹ�¼�Ĭ����Ϊ
 *
 * @class
 */
function stopDefault( e ) {
    // ��ֹĬ�����������(W3C)
    if ( e && e.preventDefault ) {
        e.preventDefault();
    }
    else {
        // IE����ֹ������Ĭ�϶����ķ�ʽ
        window.event.returnValue = false;
    }
    return false;
}