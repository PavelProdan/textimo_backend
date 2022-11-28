
<img width="400" alt="textimo-banner2" style="text-align:center;" src="https://user-images.githubusercontent.com/35011979/184703095-db4217f5-56f1-4dc3-97af-8457abaac6f7.png">


![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)

![Flutter](https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white)

# About Textimo

Textimo is a software solution designed to stream live lyrics to a video projector without a laptop, by simply connecting a Raspberry Pi to the video projector. The Raspberry is configured to be plug and play: you just have to power up the Raspberry and connect the HDMI cable to the video projector. Then you have to connect the mobile app to Raspberry's WiFi hotspot and stream or add lyrics.

From the Textimo Mobile App, you can control and customize the live stream: what song's verse to show or how the Live Page should look (background color, font size, etc.)

## Short Demo
https://user-images.githubusercontent.com/35011979/204353532-cc59342e-797e-4b2f-8d14-902e7ce11ab6.mp4

## How it works

<img width="1503" alt="textimo diagram" src="https://user-images.githubusercontent.com/35011979/204353994-6296e792-e9db-4041-861f-9c23d263af41.png">

Textimo uses two services:

- **Textimo Backend Server:**  it's a NodeJS App that runs in the background on the Raspberry Pi and a Full Screen Sandbox Chromium Window that is displayed on the external screen via HDMI (projector or display) on startup. Raspberry Pi runs the light versions (without desktop) edition of Raspbian (Stretch), and uses Xorg display manager to display only the Chromium window. 

- **Textimo Mobile App:** a Flutter app that uses Textimo Server REST API to control everything. The app connects to Raspberry PI using the WiFi hotspot created by the Raspberry itself. 


## Features

- Budget solution for a chorus that needs to display some live lyrics using a standalone system
- You can costumize the LivePage from the app
- You can add songs and lyrics using camera (OCR)
- You can control what verse is being shown on the LivePage
- Swagger REST API documentation at /api-docs route

## How to install Textimo Server on Raspberry

1) Download Raspberry Pi OS Lite: https://www.raspberrypi.com/software/operating-systems/. The desktop version works as well, but the Lite version offers a faster boot time.
2) Install Node 16, NPM, PM2, Chromium and X11/Xinit X window manager
3) Setup Raspberry to create a WiFi hotspot and make sure that the IP Address of the Raspberry is always 172.24.1.1. *If you want to change the IP Address you have to update start.sh, textimo_backend/config/config.js, textimo_mobile_app/lib/config/config.dart (and the rebuild the flutter app)*
4) Download the latest Textimo Backend Release or clone the main github branch
5) Unarchive the .zip file and move the **textimo_backend** folder to the home folder of pi user
6) Start the Node app with PM2 and save it to open on startup
7) In the home folder, add the following .sh files: 
mainstart.sh
```
#!/bin/bash
startx ./start.sh
```

start.sh
```
#!/bin/sh
xset -dpms
xset s off
xset s noblank

unclutter &
chromium-browser http://172.24.1.1:3000/LivePage --window-size=1920,1080 --start-fullscreen --kiosk --incognito --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI --disk-cache-dir=/dev/null
```
8) Add executable executable permission to these files and create a cronjob to run on startup *mainstart.sh*
9) Install textimo_mobile_app on your phone (the app is only available in Romanian language, no English support for now)

## Documenation

The release executable is a NodeJS app exported with PKG. If you want to test or develop locally you have to clone the master branch and install the node modules. A REST API documenation is available at "http://localhost/api-docs" using Swagger.
The page that contains the livestream is available at http://localhost/LivePage.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the **Label "Feature request"**. Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (```git checkout -b feature/AmazingFeature```)
3. Commit your Changes (```git commit -m 'Add some AmazingFeature'```)
4. Push to the Branch (```git push origin feature/AmazingFeature```)
5. Open a Pull Request

## License
Distributed under the GNU GPLv3 License. See ```LICENSE.txt``` for more information.

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

-------------------
Created with ❤️ by Pavel Prodan in 2022
