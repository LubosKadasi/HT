

document.querySelector('button').addEventListener('click', event => {
  console.log('click');
  navigator.bluetooth.requestDevice({ filters: [{ name: ['MJ_HT_V1'] }] })
    .then(device => device.gatt.connect()
    )
    .then(server => server.getPrimaryService('226c0000-6476-4566-7562-66734470666d'))
    .then(service => service.getCharacteristic('226caa55-6476-4566-7562-66734470666d'))
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => {
      characteristic.addEventListener('characteristicvaluechanged',
                                      handleCharacteristicValueChanged);
      console.log('Notifications have been started.');
    })
    .catch(error => { console.log(error); });

    function handleCharacteristicValueChanged(event) {
      var buffer = event.target.value.buffer;
      var values = '';

      //console.log(buffer);
      //console.log(buffer.byteLength);

      var normalArray = new Int8Array(buffer);;

      for (i = 0; i < normalArray.length - 1; i++){
        values += String.fromCharCode(normalArray[i]);
      }

      console.log(values);
      document.getElementById('values').innerText = values;

      // TODO: Parse value.
      // See https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
    }
});