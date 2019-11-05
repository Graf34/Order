function verification(){
    let errors=[];//

    if ((document.getElementById("fio").value)=='')
    {
        errors.push('Не заполнено поле ФИО <br>');
    }
    if ((document.getElementById("phone").value)=='')
    {
        errors.push('Не заполнено поле Телефон <br>');
    }
    else{
        if ((/[^[0-9]/.test(document.getElementById("phone").value)))
        {
            errors.push('Телефон должен содержать только числа<br>');
        }

    }

   if ((!(document.getElementById("email").value)=='')) {
       if (!(/@/.test(document.getElementById("email").value))) {
           errors.push('Email должен содержать символ собаки (@)<br>');
       }
   }

    if (errors.length==0){
        document.getElementById('message').style.color='black';
        document.getElementById("message").innerHTML='Заказ оформлен!';
    }
    else {
        document.getElementById('message').style.color='#FF0000';
        document.getElementById("message").innerHTML=(errors.join(""));
    }



//document.getElementById("message").innerHTML=(errors.join(""));
}



ymaps.ready(init);
var myMap;



function init () {
    myMap = new ymaps.Map("map", {
        center: [55.7564, 37.6206], // Москва
        zoom: 15,
        controls: ['zoomControl','searchControl', 'typeSelector',  'fullscreenControl']//Добавление элиментов управления на карту
    }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search'
    });

    //Создание пина
    myGeoObject = new ymaps.GeoObject({
        // Описание геометрии.
        geometry: {
            type: "Point",
            coordinates: [55.7564, 37.6206] // Москва
        },}, {preset: 'islands#circleIcon',});


    //Клик по карте
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');

            myMap.balloon.open(coords, {
                contentHeader:'Координаты доставки:',
                contentBody:[
                        coords[0].toPrecision(6),
                        coords[1].toPrecision(6)
                    ].join(', ') + '</p>'
            });
                //Изменение координат
                myGeoObject.geometry.setCoordinates([coords[0].toPrecision(6), coords[1].toPrecision(6)]);
        }
        else {
            myMap.balloon.close();
        }
    });
   myMap.geoObjects
        .add(myGeoObject)//Добавление пина на карту
}




