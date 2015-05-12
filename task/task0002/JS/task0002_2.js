/**
 * @file task0002_2.js
 * @author AlisonZhang(zhangxuejing_62@126.com)
 * learnfrom zchen9
 */
window.onload = function(){

    var btn = $("#btn");
    var dateInput = $("#time");
    //�����������¼�
    addEvent( dateInput, "keyup", inputCheck );
    //��Ӱ�ť����¼�
    addEvent( btn, "click", btnHandle );

   //��ť����������������Ƿ��������ִ�е���ʱ���������򵯳�����

    function btnHandle() {
        if ( inputCheck() ) {
            timeCountDown();
        }
        else {
            alert("wrong date format");
        }
    }

    //�ж����������Ƿ����

    function inputCheck() {
        var time = $("#time").value;
        var tip = $("#tip");
        var timeReg = /\d{4}-\d{2}-\d{2}/g;
        //����������ڸ�ʽ
        if ( timeReg.test(time) ) {
            var times = time.split("-");

            //�ָ��������ڣ�����ꡢ�¡��յ���Ϣ
            var inputDate = new Date( times[0], times[1]-1, times[2] );
            var inputYear = parseInt( times[0] );
            var inputMonth = parseInt( times[1] );
            var inputDay = parseInt( times[2] );

            //��õ�ǰʱ�䣬����ꡢ�¡��յ���Ϣ
            var startDate = new Date();
            var startYear = parseInt( startDate.getFullYear() );
            var startMonth = parseInt( startDate.getMonth() );
            var startDay = parseInt( startDate.getDate() );

            //������ǰʱ�䣬��ʽΪ(YYYY,MM,DD)
            var curDate = new Date( startYear, startMonth, startDay );

            //��������·ݶ�Ӧ������
            switch (inputMonth) {
                case 2:
                    var monthDay = 28; //2��Ĭ��28��
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    monthDay = 30;
                    break;
                default :
                    monthDay = 31;
                    break;
            }
            //�ж���������Ƿ����
            if ( inputYear < 1970 ) {
                tip.innerHTML = "The YEAR you input is out of range.";
            }
            //�ж��·��Ƿ��������
            else if ( inputMonth < 0 || inputMonth > 12 ) {
                tip.innerHTML = "The MONTH you input is out of range.";
            }
            //�ж����������Ƿ����
            else if ( inputDay < 0|| inputDay > monthDay ) {
                tip.innerHTML = "The DAY you input is out of range.";
            }
            //�ж�����ʱ���Ƿ����
            else if ( inputDate < curDate ) {
                tip.innerHTML = "The DATE you input is out of range.";
            }
            else {
                tip.innerHTML = "";
                return true;
            }

        }
        //������ʱ���ʽ������ʾ��ʾ��Ϣ
        else {
            tip.innerHTML = "Use YYYY-MM-DD format";
            return false;
        }
    }

    /**
     * �������ʱ�䡢��ǰʱ�䣬���е���ʱ����
     *
     * @class
     */
    function timeCountDown() {
        var times = $("#time").value.split("-");

        var inputDate = new Date( times[0], times[1] - 1, times[2] );
        var startDate = new Date();

        //����ʱ��͵�ǰʱ��Ĳ�ֵ
        var dateCount = inputDate - startDate;

        //���������ֵ
        var dayCount = Math.floor( dateCount / 86400000 );

        //���Сʱ��ֵ
        var dateRemain = dateCount - dayCount * 86400000;
        var hourCount = Math.floor( dateRemain / 3600000);

        //��÷��Ӳ�ֵ
        dateRemain -= hourCount * 3600000;
        var minCount = Math.floor( dateRemain / 60000 );

        //������ֵ
        dateRemain -= minCount * 60000;
        var secCount = Math.ceil( dateRemain / 1000 );

        //��õ���ʱ���λ�ã���ʾ����ʱ����
        var timeCount = $("#timeCount");
        timeCount.innerHTML =  "Still need:"+"<br>"
        + hourCount +  "Hour"+"<br>"
        + minCount + "Minute" + "<br>"
        + secCount + "Second"

        //���ü��ʱ��Ϊ1�룬ÿ��1��ִ��һ�ε���ʱ����
        var interval = setInterval(
            function() {
                timeCountDown();
                dateCount -= 1000;
            },
            1000
        );

        //��ʱ���ֵС��0,ֹͣ����ʱ���㣬�����ʾ��Ϣ
        if ( dateCount <= 0) {
            clearInterval( interval );
            timeCount.innerHTML = "Time is up!";
        }
    }
};