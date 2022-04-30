// module.exports = getDate;
exports.getDate = function () {
const today = new Date();
// const currentDay = today.getDay();
const options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};
return today.toLocaleString('en-us', options);
}

exports.getDay = function () {
const today = new Date();
// const currentDay = today.getDay();
const options = {
  weekday: "long",
};
return today.toLocaleString('en-us', options);
}

exports.getYear = function () {
const currentYear = new Date();

return currentYear.getFullYear();
}
