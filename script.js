import device from 'current-device'
console.log('device.mobile() === %s', device.mobile());

const os = document.querySelector("#os");
const orientation = document.querySelector("#orientation");
const type = document.querySelector("#type");

if (device.windows()) {
    os.textContent = "Windows";
}

if (device.ios()) {
    os.textContent = "iOS";
}

if (device.android()) {
    os.textContent = "Android";
}

if (device.mobile()) {
    type.textContent = "Mobile";
};
if (device.tablet()) {
    type.textContent = "Tablet";
};
if (device.desktop()) {
    type.textContent = "Desktop";
};

if (device.portrait()) {
    orientation.textContent = "Portrait";
};

if (device.landscape()) {
    orientation.textContent = "Landscape";
};


// if (device.ipad()) {};
// if (device.ipod()) {};
// if (device.iphone()) {};
// if (device.android()) {};
// if (device.androidTablet()) {};
// if (device.blackberryTablet()) {};
// if (device.fxos()) {};
// if (device.fxosPhone()) {};
// if (device.fxosTablet()) {};
// if (device.meego()) {};
// if (device.television()) {};

device.onChangeOrientation((newOrientation) => {
    console.log(`New orientation is ${newOrientation}`)
})