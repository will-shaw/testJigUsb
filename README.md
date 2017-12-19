This is a nodeJS web application for serial communication between the Syft Technologies Test Jig and a PC.

The final goal of this project is being able to make a STM32F microprocessor access and communicate to web using the WebUSB API present on Google Chrome browser. In this way, the application that drives the communication with the Test Jig would be running in a remote server, so whoever has access to this server would be able to send and receive data from the Test Jig through Google Chrome and no other software will be necessary to be installed into the user's computer.

Since the above feature is not implemented, this software has others functionalities. It is possible to communicate with the test jig using the serialport package (https://www.npmjs.com/package/serialport). However, this application must be running in the same computer that the test jig is physically connected.

How to use:

Once you have application running, open a web browser and type https://localhost:8000/ if the test jig is connected you will see a few links. 

On the first block of links right below "View results on screen”, every link sends a message telling the test jig which test is going to be executed and the results will be shown in the web page.

On the second block of links instead of showing the results on the web page, the software will execute a selenium script (www.seleniumhq.org/) that will send the results to a third party web application.

In order to use the webUSB API type https://localhost:8000/usb. You will see two buttons "Request Device" and "Get Devices". The first one call the navigator.usb.requestDevice() and once you select one device and click in Connect, it will try to open the connection, which at moment returns a "DOMException: Access denied" error on console. 

The "Request Device" button only lists the requested devices on console.
