let uA = navigator.userAgent;
let isAndroid = uA.indexOf('Android') > -1 || uA.indexOf('Adr') > -1;
alert(uA);

function postAxios(obj) {
    if(!isAndroid){
        let params = new URLSearchParams();
        for(let i in obj){
            params.append(i,obj[i])
        };
        return params;
    }else{
        return obj;
    }
}

export default postAxios;