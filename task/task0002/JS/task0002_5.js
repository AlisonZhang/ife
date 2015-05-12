/**
 * @file task0002_5.js
 * @author AlisonZhang(zhangxuejing_62@126.com)
 * learnfrom zchen9(zxcvbnm.pop@qq.com)
 */
window.onload = function() {

    //������п�Ԫ��
    var myBlock = $(".block");

    //���ƫ��
    var mouseOffsetX = 0;
    var mouseOffsetY = 0;

    //�Ƿ���϶�
    var isDragging = false;
    for (var i = 0; i < myBlock.length; i++) {
        //��갴�¿�ʼ��ק�¼�
        addEvent(myBlock[i], "mousedown", dragging);
        //��갴�º�ʼ�ƶ��¼�
        addEvent(myBlock[i], "mousemove", moving);
        //����ƿ��¼�
        addEvent(myBlock[i], "mouseup", dropping);
    }

    //���Ԫ���ƶ���Χ
    function getBoxRange(ele) {
        var minWidth = ele.offsetLeft;
        var minHeight = ele.offsetTop;
        var maxWidth = minWidth + ele.offsetWidth;
        var maxHeight = minHeight + ele.offsetHeight;
        return [ minWidth, maxWidth, minHeight, maxHeight ];
    }

    //��������ڿ��Ϸ����¼�
    function dragging(e) {
        e = e || window.event;
        stopBubble(e);
        var target = e.srcElement || e.target;
        //��ȡ��������קԪ�ص����Ͻǵ�����
        mouseOffsetX = e.pageX - target.offsetLeft;
        mouseOffsetY = e.pageY - target.offsetTop;
        //���Ԫ��Ϊ���϶�
        isDragging = true;
    }

    //��������ƶ��¼�
    function moving(e) {
        e = e || window.event;
        stopBubble(e);
        var target = e.srcElement || e.target;
        //��굱ǰλ��
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        //��Ԫ����λ��
        var moveX = 0;
        var moveY = 0;
        //�ж�Ԫ���Ƿ���϶�
        if (isDragging === true) {
            //��ȡԪ���ƶ����꣨����ڵ�ǰtarget�����λ�ã�
            moveX = mouseX - mouseOffsetX;
            moveY = mouseY - mouseOffsetY;
            //����ǰ��קԪ��������ʽ
            addClass(this, "block dragging");
            this.innerHTML = "draggingBlock";
            this.style.position = "absolute";
            this.style.left = moveX + "px";
            this.style.top = moveY + "px";
            //��ȡ��ǰԪ�صĸ�Ԫ�ص���Ԫ��
            var nextBox = this.parentNode.nextElementSibling;
            var prevBox = this.parentNode.previousElementSibling;
            if ( nextBox ) {
                //�����Ԫ�صĿ��϶���Χ
                var nextBoxRange = getBoxRange(nextBox);
                var nextBoxMinX = nextBoxRange[0];
                var nextBoxMaxX = nextBoxRange[1];
                var nextBoxMinY = nextBoxRange[2];
                var nextBoxMaxY = nextBoxRange[3];
                //�ж����λ���Ƿ�����Ԫ�ط�Χ�ڣ����ǣ���ӵ�ǰ��קԪ��
                if ((mouseX > nextBoxMinX && mouseX < nextBoxMaxX)
                    &&
                    ( mouseY > nextBoxMinY && mouseY < nextBoxMaxY )
                ) {
                    nextBox.appendChild( this );
                }
            }
            if ( prevBox ) {
                //�����Ԫ�صĿ��϶���Χ
                var prevBoxRange = getBoxRange(prevBox);
                var prevBoxMinX = prevBoxRange[0];
                var prevBoxMaxX = prevBoxRange[1];
                var prevBoxMinY = prevBoxRange[2];
                var prevBoxMaxY = prevBoxRange[3];
                //�ж����λ���Ƿ�����Ԫ�ط�Χ�ڣ����ǣ���ӵ�ǰ��קԪ��
                if ((mouseX > prevBoxMinX && mouseX < prevBoxMaxX)
                    &&
                    (mouseY > prevBoxMinY && mouseY < prevBoxMaxY)
                ) {
                    prevBox.appendChild(this);
                }
            }
        }
    }

    ///��������ɿ��¼�

    function dropping() {
        //Ԫ��Ϊ�����϶�״̬
        isDragging = false;
        //����קԪ�ظ�����ʽ
        this.removeAttribute("style");
        addClass(this, "block");
        //���±������п�Ԫ�أ�����Ԫ�����
        var boxList = $(".box");
        for (var j = 0; j < boxList.length; j++) {
            var blockList = boxList[j].children;
            for (var i =0; i < blockList.length; i++) {
                blockList[i].innerHTML = j + 1 + "-" + ( i + 1 );
            }
        }
    }
};
