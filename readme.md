
![Logo](https://user-images.githubusercontent.com/35011979/184702405-ec6deb05-d8e1-42c9-a5f5-f852f2f26a75.png)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)

![Flutter](https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white)

![Flutter](https://camo.githubusercontent.com/3dbcfa4997505c80ef928681b291d33ecfac2dabf563eb742bb3e269a5af909c/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f496c65726961796f2f6d61726b646f776e2d6261646765733f7374796c653d666f722d7468652d6261646765)

# About Textimo

Textimo is a software solution designed to stream live lyrics to a video projector without a laptop, by simply connecting a Raspberry Pi to the video projector. Raspbian is configured to be plug and play: you just have to power up the Raspberry and connect the HDMI cable. Then you have to connect the mobile app to Raspberry's WiFi hotspot and stream or add the lyrics of a song.

From the Textimo Mobile App, you can control and customize the live stream: what song's verse to show or how the Live Page should look (background color, font size, etc.)

## Short Demo

coming soon

## How it works

Textimo uses two services:
- **Textimo Backend Server:**  it's a NodeJS App that runs in the background and a Full Screen Sandbox Chromium Window that is displayed on the external screen via HDMI (projector or display). Raspberry Pi runs the light versions (without desktop) edition of Raspbian, but uses Xorg display manager. 

- **Textimo Mobile App:** a Flutter app that uses Textimo Server REST API to control everything. The app connects to raspberry by WiFi hotspot. 


## Features

- Budget solution for a chorus that needs to display some live lyrics using a standalone system
- You can costumize the LivePage from the app
- You can add songs and lyrics using camera (OCR)
- You can control what verse is being shown on the LivePage
- Swagger REST API documentation at /api-docs route

## How to install Textimo Server on Raspberry


**COMING SOON**

1)Download and install the latest Raspberry Pi OS Lite

2)Clone the latest release of Textimo Server

3)Run the install.sh using:


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
Distributed under the MIT License. See ```LICENSE.txt``` for more information.

[MIT](https://choosealicense.com/licenses/mit/)

-------------------
Created with ❤️ by Pavel Prodan in 2022
