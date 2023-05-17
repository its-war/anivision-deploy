const now = new Date();
const datahora = {
    getHora: function () {
        let h = now.getHours();
        if (h < 10) h = '0' + h;
        let m = now.getMinutes();
        if (m < 10) m = '0' + m;
        return h + "h" + m;
    },

    getData: function () {
        let d = now.getDate();
        if (d < 10) d = '0' + d;
        let m = now.getMonth() + 1;
        if (m < 10) m = '0' + m;
        let a = now.getFullYear();
        return d + "/" + m + "/" + a;
    }
};

module.exports = datahora;



