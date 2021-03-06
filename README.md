## Functional Programming in Javascript

### Aim

My aim here is to implement the problem below in Javascript using a functional programming style. I intend to look into the main aspects of Functional Programming such as;
* Pure Functions
* Higher-Order Functions
* First Class Functions
* Currying
* Referential Transparency
* Immutability

### Usage

Node version `v6.1.0`

To install clone this repo
```
git clone https://github.com/leggsimon/functional_javascript_kata.git
```

Install dependencies (there is only 1)
```
$ npm install
```

Run the program using node, passing the input file path as the second argument
```
$ node main.js ./fixtures/input0.txt
```

### The Problem

A small airline wants a simple program to be written that produces flight summary reports based on flight, route and passenger data.

There are three types of passenger the airline wants to cater for:  
1. General - normal fare paying passengers   
2. Loyalty Members - repeat customers who get benefits for choosing to fly with the airline   
3. Airline Employee - employees of the airline who fly with the airline on a free basis as a perk  

For each flight the airline charges a base ticket price for a specific route however the loyalty members can choose to pay with their loyalty points instead. When loyalty members choose to redeem their loyalty points they are done at a rate of 1 point being equal to £1 off the face value of the ticket.  Airline employees always fly free. Baggage allowance is allocated on a basis of 1 bag allowed for everyone and 1 extra bag allowed for a loyalty member. For simplicity, we assume that every passenger will bring at least 1 bag.

Your task is to write a console application that accepts two filenames as input. The first filename will be a path to a text file that contains all the route, plane and passenger data. The second filename will be the output file in which the flight summary report must be written.

The format of the input file is set of text lines that represent either plane, route or passenger information. Your program should read each line in the input file and process each instruction. The format of each instruction line is as follows in ABNF:

```
instruction = add-route / add-aircraft / add-passenger-details
add-route = "add route" SP origin SP destination SP cost-per-passenger SP ticket-price SP minimum-takeof-load-percentage CRLF
add-aircraft = "add aircraft" SP aircraft-title SP number-of-seats CRLF
add-passenger = "add" SP (general-passenger / airline-passenger / loyalty-passenger) CRLF

general-passenger = "general" SP first-name SP age
airline-passenger = "airline" SP first-name SP age
loyalty-passenger = "loyalty" SP first-name SP current-loyalty-points SP using-loyalty-points SP using-extra-baggage

origin = identifier                           ; the name of the origin city.

destination = identifier                      ; the name of the destination city.

cost-per-passenger = numeric                  ; the cost to the airline, per passenger,
                                              ; of flying the route in whole £.

ticket-price = numeric                        ; the price of the ticket at face value in whole £.

minimum-takeof-load-percentage = percentage   ; the minimum percent of the planes capacity that must
                                              ; be used for the route to be able to fly.

aircraft-title = identifier                   ; the name of the plane.

number-of-seats = numeric                     ; the total number of seats in the plane.

first-name =  identifier                      ; the first name of the passenger.

age = numeric                                 ; the age of the passenger in years.

current-loyalty-points = numeric              ; the number of loyalty points the customer currently
                                              ; has, before embarking on the current flight.

using-loyalty-point = boolean                 ; whether or not the passenger is using their loyalty
                                              ; points to pay for the flight. if the number of
                                              ; loyalty points is less than the ticket cost then the
                                              ; customer pays the remainder

using-extra-baggage = boolean                 ; whether or not the passenger is using their extra
                                              ; baggage allowance.

percentage = %d0-100
identifier = 1*ALPHA
numeric = 1*DIGIT
boolean = "TRUE" / "FALSE"
```

Your program should read every line in the input file and when it reaches the end of file it should compute the flight summary report and output the report into a file in the following format, again in ABNF:
```  
output-line =   total-passenger-count SP  
                general-passenger-count SP
                airline-passenger-count SP
                loyalty-passenger-count SP
                total-number-of-bags SP
                total-loyalty-points-redeemed SP  
                total-cost-of-flight SP
                total-unadjusted-ticket-revenue SP
                total-adjusted-revenue SP
                can-flight-proceed


total-passenger-count = numeric             ; total number of passengers on the flight
general-passenger-count = numeric           ; number of general passengers on the flight
airline-passenger-count = numeric           ; number of airline passengers on the flight
loyalty-passenger-count numeric             ; number of loyalty passengers on the flight
total-number-of-bags = numeric              ; the total number of bags on the plane
total-loyalty-points-redeemed = numeric     ; the total number of loyalty points redeemed by
                                            ; all passengers
total-cost-of-flight = numeric              ; the total cost to the airline of running the flight
total-unadjusted-ticket-revenue = numeric   ; the total ticket revenue, ignoring loyalty and airline
                                            ; passenger adjustments.
total-adjusted-revenue = numeric            ; the total ticket revenue, after adjusting for loyalty
                                            ; members points and airline passengers
can-flight-proceed = boolean                ; can the flight proceed, according to the rules defined below

numeric = ["-"] 1*DIGIT
boolean = "TRUE" / "FALSE"
```

Flight proceeds if all the rules below take place:  
1. The total adjusted revenue for the flight exceeds the total cost of the flight  
2. The number of passengers cannot exceed the amount of seats on the plane  
3. The aircraft must have a minimum percentage of passengers booked for that route  

Here is an example input file
```
add route London Dublin 100 150 75
add aircraft Gulfstream-G550 8
add general Mark 35     
add general Tom 15      
add general James 72      
add airline Trevor 54     
add loyalty Alan 65 50 FALSE FALSE  
add loyalty Suzy 21 40 TRUE FALSE
add loyalty Jone 56 100 FALSE TRUE  
add general Jack 50       
```
And here is an example output file
```
8 4 1 3 9 40 800 1200 1010 TRUE
```
This flight can proceed.

Here's another example input
```
add route London Dublin 100 150 75
add aircraft Gulfstream-G550 12
add general Mark 35     
add general Tom 15      
add general James 72      
add general Jack 50       
add airline Jane 75     
add general Steve 20      
```
And the computed output
```
6 5 1 0 6 0 600 900 750 FALSE
```  
As we can see, this flight cannot proceed because it is not at least 75% full.

Please note that only one route and one aircraft are allowed to be entered.

Structure your code as if this was a real, production application. You may however choose to provide simplified implementations for some aspects (e.g. in-memory persistence instead of a full database, if you think any persistence is required at all).

Please state any assumptions you make as comments in the codebase. If any aspects of the above specification is unclear then please also state, as comments in the source, your interpretation of the requirement.

### Notes

I haven't written to a new file as the point was to do functional programming. I did read the file so that I could parse it from it's raw state. I could've just as easily stored it as a string `const`.

### Todo

* Refactor
* Rewrite in other languages
