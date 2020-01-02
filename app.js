window.onload = () => {
    var eqCtl = document.getElementById('eq');
    var currNumberCtl = document.getElementById('currNumber');
    calculator.init(eqCtl, currNumberCtl);
};

var calculator = function() {
    var eqCtl;
    var currNumberCtl;
    var operator;
    var operatorSet = false;
    var equalsPressed = false;
    var lastNumber = null;

        init = (equals, currNumber) => {
            eqCtl = equals;
            currNumberCtl = currNumber;
        },

        add = (x, y) =>{
            return x + y;
        },

        subtract = (x, y) =>{
            return x - y;
        },

        multiply = (x, y) =>{
            return x * y;
        },

        divide = (x, y) => {
            if (y == 0) {
                alert("Can't divide by 0");
                return 0;
            }
            return x / y;
        },

        setVal = (val) =>{
            currNumberCtl.innerHTML = val;
        },

        setEquation = (val) =>{
            eqCtl.innerHTML = val;
        },

        clearNumbers = () =>{
            lastNumber = null;
            equalsPressed = operatorSet = false;
            setVal('0');
            setEquation('');
        },

            //Handle case where = was pressed
            //followed by an operator (+, -, *, /)
            
        setOperator = (newOperator) =>{
            if (newOperator == '=') {
                equalsPressed = true;
                calculate();
                setEquation('');
                return;
            }

            if (!equalsPressed) calculate();
            equalsPressed = false;
            operator = newOperator;
            operatorSet = true;
            lastNumber = parseFloat(currNumberCtl.innerHTML);
            var eqText = (eqCtl.innerHTML == '') ?
                lastNumber + ' ' + operator + ' ' :
                eqCtl.innerHTML + ' ' + operator + ' ';
            setEquation(eqText);
        },
        numberClick = (e) => {
            // if the click has occurred on a button
            var button = (e.target) ? e.target : e.srcElement;
            if (operatorSet == true || currNumberCtl.innerHTML == '0') {
                setVal('');
                operatorSet = false;
            }
            setVal(currNumberCtl.innerHTML + button.innerHTML);
            setEquation(eqCtl.innerHTML + button.innerHTML);
        },
        calculate = () =>{
            if (!operator || lastNumber == null) return;
            var currNumber = parseFloat(currNumberCtl.innerHTML),
                newVal = 0;
            switch (operator) {
            case '+':
                newVal = add(lastNumber, currNumber);
                break;
            case '-':
                newVal = subtract(lastNumber, currNumber);
                break;
            case '*':
                newVal = multiply(lastNumber, currNumber);
                break;
            case '/':
                newVal = divide(lastNumber, currNumber);
                break;
            }
            setVal(newVal);
        };
        return {
            init: init,
            numberClick: numberClick,
            setOperator: setOperator,
            clearNumbers: clearNumbers
        };
    }();
