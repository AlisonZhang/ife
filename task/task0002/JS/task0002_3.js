/**
 * @file task0002_3.js
 * @author AlisonZhang(zhangxuejing_62@126.com)
 * learnfrom zchen9(zxcvbnm.pop@qq.com)
 */

window.onload = function() {
    var item = $(".item");

    /**
     * @param {Object} options ������
     *                 order Ϊ�ֲ�˳��nextΪ����prevΪ����Ĭ��next��
     *                 isLoop �Ƿ�ѭ����Ĭ���ǣ�
     *                 time ѭ��ʱ�䣬Ĭ��5000��
     *                 index ��ʼ��ţ�Ĭ��0��
     */
    var options = {
        order: "next",
        isLoop: true,
        time: 5000,
        index: 0
    };

    //��õ�ǰѭ��ͼƬ��������̬���СԲ�㵼��
    for (var i = 0; i < item.length; i++ ) {
        var list = $(".c-list")[0];
        var listControl = document.createElement("li");
        listControl.setAttribute( "data-target", "#myCarousel" );
        listControl.setAttribute( "data-slide-to", i );
        list.appendChild( listControl );
    }
    //��СԲ�㵼����ӵ���¼�
    var archor = $("li");
    for(var j = 0; j < archor.length; j++) {
        addEvent(archor[j], "click", toPic);
    }

    //��ʼ��ͼƬת��
    picActive(options);

    //����ͼƬ�ֲ�����

    var scroll = picScroll(options);
    function picScroll(options) {
        var order = options.order || "next";
        var isLoop = options.isLoop || true;
        var time = options.time || 6000;
        var curIndex = options.index;

        if (isLoop) {
            //��˳��Ϊ����ʱ
            if (order === "next") {
                return setInterval(function() {
                        picActive(options);
                        options.index++;
                        if (options.index > item.length-1) {
                            options.index = 0;
                        }
                    },
                    time
                );
            }
            //��˳��Ϊ����ʱ
            else {
                return setInterval( function() {
                        picActive(options);
                        options.index--;
                        if(options.index < 0) {
                            options.index = item.length-1;
                        }
                    },
                    time
                );
            }
        }
        //ѭ��Ϊ��ʱ��ֹͣѭ��
        else {
            clearInterval(scroll);
        }
    }

    // �����ֲ�ͼ��ʽ

    function picActive(options) {
        var order = options.order || "next";
        var curIndex = options.index;
        var item = $(".item");
        //��ȡ��ǰͼƬ���
        for(var i = 0; i < item.length; i++) {
            if (order == "next") {
                //��ǰ���֮ǰ��ͼƬ��ʽΪprev
                if (i < curIndex) {
                    item[i].setAttribute( "class", "item prev" );
                    removeClass($("[data-slide-to=" + i + "]"), "active" );
                }
                //��ǰ��ŵ�ͼƬ��ʽΪactive
                if (i === curIndex) {
                    item[i].setAttribute("class", "item active");
                    addClass($("[data-slide-to=" + curIndex + "]"), "active");
                }
                //��ǰ���֮���ͼƬ��ʽΪnext
                if (i > curIndex) {
                    item[i].setAttribute("class", "item next");
                    removeClass($("[data-slide-to=" + i + "]" ), "active");
                }
            }
        }
    }

    //�����ֲ�ͼ��ʾnextͼƬ�¼�

    function nextPicShow(options) {

        var item = $(".item");
        for(var i=0; i<item.length; i++) {
            if (item[i].getAttribute("class").indexOf("active") != -1) {
                var curIndex = i;
            }
        }
        if (curIndex === item.length-1) {
            curIndex = 0;
            options.index = curIndex;
            picActive(options);
        }
        else {
            options.index = curIndex+1;
            picActive(options);
        }
    }

    // �����ֲ�ͼ��ʾprevͼƬ�¼�

    function prevPicShow(options) {

        var item = $(".item");

        for (var i = 0; i < item.length; i++) {
            if (item[i].getAttribute("class").indexOf("active") != -1) {
                var curIndex = i;
            }
        }
        if (curIndex === 0) {
            curIndex = item.length-1;
            options.index = curIndex;
            picActive(options);
        }
        else {
            options.index = curIndex-1;
            picActive(options);
        }
    }

    //����СԲ�㵼���¼�

    function toPic(options) {
        options.index = parseInt( this.getAttribute("data-slide-to") );
        picActive(options);
    }
};