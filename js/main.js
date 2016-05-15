$(function(){

      screen = $('#screen');
      buttons = $('.buttons');
      num1 = [];
      oper = '';
      num2 = [];

  if (num1.length === 0) {
    num1.push(0);
    screen.append(num1);
  }

  function postNum(ev) {
    ev.preventDefault();
    var ev = $(event.target);
    var evTxt = ev.text();

    if (num1[0] == 0) {
      num1.shift();
    }

    var last = num1[num1.length - 1];

    if (last === ' + ' || last === ' - ' || last === ' x ' || last === ' \xf7 ') {
      num2.push(evTxt);
      screen.empty();
      var joined1 = num1.join("");
      var joined2 = num2.join("");
      screen.append(joined1+joined2);
    } else {
      num1.push(evTxt);
      screen.empty();
      screen.append(num1);
    }
  }

  function clear() {
    num1 = [0];
    num2 = [];
    screen.empty();
    screen.append(num1);
  }

  buttons.on('click', '.num', postNum);
  buttons.on('click', '.operator', postOp);

  function postOp(ev) {
    ev.preventDefault();
    var ev = $(event.target);
    var evTxt = ev.text();
    if (num1[0] == 0) {
      return;
    }
    if (evTxt === 'C') {
      clear();
    } else if (evTxt === '+' || evTxt === '-' || evTxt === 'x' || evTxt === '\xf7') {
      num1.push(` ${evTxt} `);
      screen.empty();
      screen.append(num1);
    } else if (evTxt === '=') {
        oper = num1.pop();
        if (oper === ' x ') {
          oper = ' * ';
        }
        if (oper === ' \xf7 ') {
          oper = ' / ';
        }
        num1 = num1.join("");
        num1 = parseInt(num1);
        num2 = num2.join("");
        num2 = parseInt(num2);
        answer = eval(`num1 ${oper} num2`);
        num1 = [answer];
        screen.empty();
        num2 = [];
        screen.append(num1);
        return;
    }
  }//end postOp function


  // runCalc = {
  //   'plus': function(num1,oper,num2) {
  //     return num1 oper num2;
  //   },
  //   'minus': function(num1,num2) {
  //     return num1 - num2;
  //   },
  //   'mult': function(num1,num2) {
  //     return num1 * num2;
  //   },
  //   'div': function(num1,num2) {
  //     return num1/num2;
  //   }
  // }

});
