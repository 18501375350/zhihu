Date.prototype.getWeek = function () {
    var num = this.getDay();
    var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return arr[num];
}


export default function(time){
    var getDate = function() {
        var str = time;
        var str2 = str.slice(0, 4);
        var str3 = str.slice(4, 6);
        var str4 = str.slice(6);
        // console.log(str2, str3, str4);
        // console.log(typeof str2);
        var date = new Date(str2, str3, str4).getTime();
        // console.log(date);
        return date;
      };
    var date = new Date(getDate());
    var year = date.getFullYear();
    var month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth()+1);
    var day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    var hours = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    var minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    var seconds = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    var week = date.getWeek();
    return `${month-1}月${day}日 ${week}`;
}
