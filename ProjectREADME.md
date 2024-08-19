# The GymGoers Application

A full-stack web application designed for gym enthusiasts to track and visualise their workout progress with the goal of staying consistent.

```ascii
  ..,.oooE777999V(;
                                  ...oooP779090(;''       ''''  I
                    ...ooB777979V;;''       .....=v}}=}=}=}}v==  5
               97?(;''     .........< .    . .:.:.:.:.`:;``;;;;;;;;<;;;<;<<<<<<<<<<
                 b ;           . : .:.:.:.`;;;;;;;;;;;<;;<;<<<<<<<<, I
                 `,`               . : :.:.:.:.`.`;;;;;;;;;;;;<;<;<<. 5
                  b ;                    . : .:.:.:.`;;;;;;;;;;;<;<;<: E
                  `,<                         . . .:.:.:.``;;;;;;;;;;. I
                   b :                             . . :.:.:.:.:.:.;;;. 5
                   `>;                                  . .:..:.:.:.`.:  |
                    b :                                      . . :.:.:.x T
                    `,;                                          . . .::  E
                     b :                                               _  !4
                     `r :                                   __.__,--,;'))))).
                      b :                         ___...--'; `))))))))' '' `>!9eOc
                      `r :              __,--:-;;;)))))))))))'' '' ' ' _. -'-'.`!9Eg.
                       L : . __.--_--:,)))))))))))'' ' '  _. ._.-'-'-'-'\-'\---\/\ ``Qu.
                       `,: !x;:)))))))) ')'' ' _ _._-.'\'\_\_-'\''-\'_'\-'\'\ -_\'-\-. 95n.
                        D` ))))'''  _ .___.-_:/-/\/-_\ /-_, /-,\ \-/_\/\,-\_/-\/-/--' ..v<]9o.
                      __b :<> -_\._/\,- ,_ -\ _/\-\ _-\ -_/-\,\/,-/\_/-_\'\--' .vvvvvvv}v}}x}]NEo.
                .ooPO%LOCu  `< `/\_ -:\/_/-/,\/,/-,/_,-/\ :_\:_-:__-'' ...vvvvvvvvvvvvxx}vx}}}}==No
              .oPO'       `y. `< ~-\ _\/\_,- \ , - ,___..--' .......>>vvvvvvvvx>vvvvvvvvvv)v~~~`         iuuuaE'
  .@tTL'                        `y,  `< .-vvv<<<<<<<<vvvvv=>~~~~`         _uuua'''
.&P'                              `L,  `>>><<<<><>v~>^` `        _uuug'
                                      `L,  ~~`          _uuua''
                                        `L,:    _uuua''
                                          `LaE''
```

## Project Description

For this project I wanted to create an application to help tackle one of the biggest problems people face when trying to stay fit and healthy, and that is staying consistent. This app focuses on keeping users consistent and this is done by tracking the number of days user have been consistently working out. Whether users want to use the GymGroups feature to stay in competition with friends or keep track of workouts to keep trying to better their records, there are plenty of was to stay motivated with your fitness goals with The GymGoers.

For this project I used the MERN stack which includes MongoDB, Express.js, React.js, Node.js. The data that the app stores is  not uniform and needs a NoSQL database which is why I chose a MongoDB. React allows creating interactive frontend applications simple and  

## How to run the project

To run this application you must start up the two servers.

First install the repo.

1) open the project and install dependencies
2) open the terminal and go to the directory TheGymGoers/frontend/vite-project
3) type npm run dev
4) in another terminal go to the directory TheGymGoers/backend
5) type npm start
6) now that the backend and frontend are running, use the link in the terminal to access the website

### How to run the tests

on a Windows

1) open the terminal and go to the directory TheGymGoers/frontend/vite-project
2) type npm run test
3) in another terminal go to the directory TheGymGoers/backend
4) type npm test-win

on a Mac

1) open the terminal and go to the directory TheGymGoers/frontend/vite-project
2) type npm run test
3) in another terminal go to the directory TheGymGoers/backend
4) type npm test

## Architecture

The application follows a three-tier architecture:

1) Frontend: Built using React for an interactive user interface.
2) Backend: Developed with Node.js and Express to handle API requests and server-side logic.
3) Database: MongoDB Atlas is used for secure data storage, managing user details, workout logs, and group information.