const isValidEvent = (req) => {
  const { name, date, place } = req.body;

  // If the user breaks the frontend validation
  if (!name || !date || !place) {
    req.flash("errors", "Form data missing.");
    return false;
  }

  const currentDate = new Date().setHours(0, 0, 0, 0);
  const reqDate = new Date(date).setHours(0, 0, 0, 0);

  if (reqDate <= currentDate) {
    req.flash("errors", "The date must be over the current day.");
    return false;
  }

  return true;
};

module.exports = isValidEvent;
