/**
 * @file task0002_4.js
 * @author AlisonZhang(zhangxuejing_62@126.com)
 * learnfrom zchen9(zxcvbnm.pop@qq.com)
 */
window.onload = function() {
    var input = $("#s-input");
    var resultText = $("#s-result");
    var suggestBox = $("#s-suggest");

    //��Ӽ��̺͵���¼�
    addEvent(document, "keyup", suggestSelected);
    addEvent(document, "click", suggestHide);

    //������������¼�
    addEnterEvent(input, suggestEnter);
    addEvent(input, "keyup", suggestShow);

    //�Զ��彨������
    var suggestData = [ 'hello', 'world', 'nice', 'to', 'see', 'you', 'I', 'love', 'you'];

    //���嵱������ȡ����ʱ�����������������¼�

    function suggestShow() {
        var searchText = input.value;
        var data = suggestData;
        resultText.innerHTML = "";

        //��ӽ�������
        for(var i = 0; i < data.length; i++) {
            var liText = document.createElement("li");
            liText.innerHTML = data[i];
            resultText.appendChild(liText);

            //��ӽ�����ļ����¼�������������Ϊѡ�У�����Ƴ�ȡ��ѡ��
            addEvent(liText, "mouseover", addSelected);
            addEvent(liText, "mouseout", removeSelected);
            addEvent(liText, "click", suggestSelected);
        }

        //�����������Ϊ��ʱ�����������֣���������
        if (searchText != "" ) {
            suggestBox.style.display = "block";
        }
        else {
            suggestBox.style.display = "none";
        }
    }

    //���嵱document���ܵ���¼�ʱ�������������¼�
    function suggestHide() {
        suggestBox.style.display = "none";
    }

    //���彨����ѡ��ʱ��������ʽ�Լ�����������¼�
    function addSelected(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        addClass(target, "selected");
        input.value = target.innerHTML;
    }

    //���彨����δѡ��ʱ���Ƴ���ʽ�¼�
    function removeSelected(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        removeClass(target, "selected");
    }

    //���彨�������¼�ѡ���¼�
    var i = 0 ;
    function suggestSelected(e) {
        var list = $("#s-result").childNodes;
        e = e || window.event;
        var target = e.target || e.srcElement;
        //�ж�ѡ�����Ƿ�Ϊ��
        if (list != null) {
            //���ǿգ�����ѡ��������ʽ
            each (list, function(item) {
                removeClass(item,"selected");
            });
            //�����¼�ѡ�����������ʽ�Լ����������
            if (e.keyCode == 40 || e.keyCode == 34 ) {
                addClass(list[i], "selected");
                input.value = list[i].innerHTML;
                i++;
                if (i > list.length-1) {
                    i = 0;
                }
            }
            //�����ϼ�ѡ�����������ʽ�Լ����������
            if (e.keyCode == 38 || e.keyCode == 33) {
                i--;
                if (i < 0) {
                    i = list.length -1;
                }
                addClass(list[i], "selected");
                input.value = list[i].innerHTML;
            }
        }
    }

    //���彨����Enter��ѡ���¼�
    function suggestEnter(e) {
        //��ֹ�����Ĭ��enter�¼�
        e = e || window.event;
        stopDefault(e);
        //��ȡ��ǰsuggest�б��б�ѡ�е����ݣ�����������ֵ
        var list = $("#s-result").childNodes;
        for(var i = 0; i < list.length; i++) {
            if (list[i].getAttribute("class") == "selected") {
                input.value = list[i].innerHTML;
            }
        }
    }
};
