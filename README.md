# <u>Load Project using Visual Studio 2019 (recommended) </u> #
 
 ### Step 0 ###
 
 Install Visual Studio Community from https://visualstudio.microsoft.com/vs/
 
 ### Step 1 ###
Clone the folder or download and extract the zip file to your computer.
 
 ### Step 2 ###
Open Visual Studio 2019 and select "Open a project or solution"

![alt text](https://imgur.com/i91d3aT.png)

Navigate to the folder you saved the project and open "Coin Tosser.sln"

![alt text](https://imgur.com/4tIOzlr.png)

 ### Step 3 ###

In the <b>Solution Explorer</b> find <i>"npm"</i> under <i>"Coin Tosser"</i>. Right click <i>"npm"</i> and press "Update npm packages"

![alt text](https://imgur.com/A5HIdyx.png)

 ### Done ###
 
 You are done! Now just run the project with "F10" and you are ready to bet!

 The client side is compiled and can be accessed through http://localhost:1337/


## Run Statistics Module (Visual Studio) ##

The Statistics Module is implemented as a unit test using <i>jasmine.js</i>

To run the statistics go to <b>Test</b> > <b>Test Explorer</b>

![alt text](https://imgur.com/4FOUYYl.png)

In the <b>Text Explorer</b> window, you can run all tests or each in particular, and the results will appear on the right hand side of the window

![alt text](https://imgur.com/TrgzHxG.png)


# Load Project using terminal #

 ### Step 0 ###
 
Install Node.js from https://nodejs.org/en/ <br />
Open the terminal and run the following command:
 ```
 npm install -g typescript
 ```
 
 ### Step 1 ###
Clone the folder or download and extract the zip file to your computer.
 
 ### Step 2 ###
Navigate to the folder from the terminal

### Step 3 ###
Run the following commands:
```
npm install
npm run build
```
 ### Done ###
 
 You are done! Now just run the project with 
 ```
 node ./server/server.js
 ```
 The client side is compiled and can be accessed through http://localhost:1337/
 
 To close the server press Ctrl + C in the terminal.

## Run Statistics Module (Terminal) ##

After the project files have been compiled with 
```
npm run build
```
Just navigate to the folder and run
```
jasmine
```
To see the statistics for the unit tests
