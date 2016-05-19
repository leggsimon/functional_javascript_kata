const fs = require('fs');
const filePath = process.argv[2]

const input = () =>
    fs.readFileSync(filePath, 'utf8')
    .trim()
    .split('\n')
    .map(line => line.split(' '))

const getPassengers = (passengerType) => input().filter(line => line[1] === passengerType)
const allPassengersCount = () =>
    getPassengers('general').length +
    getPassengers('airline').length +
    getPassengers('loyalty').length

const passengersWithExtraBags = () => getPassengers('loyalty').filter(passenger => passenger[6] === 'TRUE').length
const totalNumberOfBags = () =>
    getPassengers('general').length +
    getPassengers('airline').length +
    passengersWithExtraBags()

const passengersUsingLoyaltyPoints = () => getPassengers('loyalty').filter(passenger => passenger[5] === 'TRUE')
const totalLoyaltyPointsRedeemed = () =>
    passengersUsingLoyaltyPoints()
    .reduce((totalPoints, passenger) => totalPoints + parseInt(passenger[4]), 0)

const flightDetails = (detail) => input().find(line => line[1] === detail)
const ticketPrice = () => flightDetails('route')[5]
const costPerPassenger = () => flightDetails('route')[4]
const minimumTakeoffLoadPercentage = () => flightDetails('route')[6]
const flightRunningCost = () => allPassengersCount() * costPerPassenger()
const ticketRevenue = () => allPassengersCount() * ticketPrice()
const adjustedTicketRevenue = () =>
    ticketRevenue() -
    totalLoyaltyPointsRedeemed() -
    (getPassengers('airline').length * ticketPrice())

const aircraftCapacity = () => flightDetails('aircraft')[3]
const minimumTakeoffCapacity = () => (parseFloat(aircraftCapacity()) / 100) * minimumTakeoffLoadPercentage()
const exceedsMoreThanMinimumLoad = () => allPassengersCount() > minimumTakeoffCapacity()
const canFlightProceed = () =>
    exceedsMoreThanMinimumLoad() &&
    (adjustedTicketRevenue() > flightRunningCost()) &&
    !(allPassengersCount() > aircraftCapacity())

const output = () =>
    allPassengersCount() + ' ' +
    getPassengers('general').length + ' ' +
    getPassengers('airline').length + ' ' +
    getPassengers('loyalty').length + ' ' +
    totalNumberOfBags() + ' ' +
    totalLoyaltyPointsRedeemed() + ' ' +
    flightRunningCost() + ' ' +
    ticketRevenue() + ' ' +
    adjustedTicketRevenue() + ' ' +
    canFlightProceed().toString().toUpperCase()

console.log(output());
