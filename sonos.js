const connection = require( './connection' );
const devices    = require( './devices' );
const delay      = require( 'delay' );
var title = null;

const Sonos = require('sonos')
const NAME = "Sonos";

Sonos.DeviceDiscovery((device) => {
  console.log("Device:", device.host)
//  console.log(device.host)

  const speaker = new Sonos.Sonos(device.host, device.port)

  speaker.on('CurrentTrack', (track) => {
    if (title != track.title) {
      console.log("Title: ", track.title)
      title = track.title
      light();
    }
  })
})

async function light() {
  const tradfri = await connection.getConnection();
  tradfri.observeDevices();
  await delay( 1000 );

  let currentDevice = null;
  let accessory = null;

  currentDevice = devices.findDevice( tradfri, NAME );

  if( currentDevice == null ) {
    console.log( "Unable to find device", NAME );
    console.log( tradfri.devices );
    process.exit(1);
  }

  switch( currentDevice.type ) {
    case 2: //light
      accessory = currentDevice.lightList[0];
      accessory.client = tradfri;
      break;
  }

  accessory.turnOn();
  accessory.setBrightness("10");
  // color => efd275 f5faf6 f1e0b5 6c83ba c984bb d9337c da5d41 e78834 ebb63e 
  accessory.setColor("efd275");
  await delay(1000);
  accessory.setColor("f5faf6");
  await delay(1000);
  accessory.setColor("f1e0b5");
  await delay(1000);
  accessory.setColor("6c83ba");
  await delay(1000);
  accessory.setColor("c984bb");
  await delay(1000);
  accessory.setColor("d9337c");
  await delay(1000);
  accessory.setColor("da5d41");
  await delay(1000);
  accessory.setColor("e78834");
  await delay(1000);
  accessory.setColor("ebb63e");
  await delay(1000);
  accessory.setBrightness("0");
  await delay(1000);
  await tradfri.destroy();
//  process.exit(0);

}

