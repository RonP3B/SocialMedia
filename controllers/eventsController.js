// ----------------------------Imports----------------------------
const crypto = require("crypto");

const {
  internalErrorRes,
  isValidEvent,
  isValidInvitation,
} = require("../exports/helpers");

const { Event, EventRequest, User } = require("../exports/models");

// ----------------------------Controllers----------------------------
exports.getEvents = async (req, res, next) => {
  try {
    // Gets the all events created by the currently logged-in user
    // includes all the invitations related to each event
    const myEventsRes = await Event.findAll({
      where: { userId: req.user.id },
      include: { model: EventRequest, include: { model: User, as: "toUser" } },
    });

    // Gets all the event invitations where the currently
    // logged-in user has been invitated
    const eventsRes = await EventRequest.findAll({
      where: { toUserId: req.user.id },
      include: [
        {
          model: Event,
          include: {
            model: EventRequest,
            include: { model: User, as: "toUser" },
          },
        },
        { model: User, as: "fromUser" },
      ],
    });

    const myEvents = myEventsRes.map((event) => event.get({ plain: true }));
    const events = eventsRes.map((event) => event.get({ plain: true }));

    res.render("events/events", {
      header: true,
      modal: true,
      section: "Events",
      myEvents,
      events,
    });
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.getAddEvent = (req, res, next) => {
  res.render("events/save-event", {
    header: true,
    section: "Events",
  });
};

exports.getSendInvitation = (req, res, next) => {
  const { eventId } = req.query;

  if (!eventId) {
    req.flash("errors", "Query string missing.");
    return res.redirect("/events");
  }

  res.render("events/send-invitation", {
    header: true,
    section: "Events",
    eventId,
  });
};

exports.getResponse = async (req, res, next) => {
  const { event, from, response } = req.query;
  const statusOptions = ["will attend", "won't attend", "might attend"];

  try {
    if (!event || !from || !response || !statusOptions.includes(response)) {
      req.flash("errors", "Query strings missing.");
      return res.redirect("/events");
    }

    await EventRequest.update(
      { status: response },
      { where: { eventId: event, fromUserId: from, toUserId: req.user.id } }
    );

    req.flash("success", "Your response was added.");
    res.redirect("/events");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }

  console.log(req.query);
};

exports.postAddEvent = async (req, res, next) => {
  try {
    if (!isValidEvent(req)) return res.redirect("back");

    const { name, date, place } = req.body;
    const datetime = date.replace("T", " ");

    await Event.create({
      id: crypto.randomUUID(),
      name,
      date: datetime,
      place,
      userId: req.user.id,
    });

    req.flash("success", "Event created.");
    res.redirect("/events");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.postDeleteInvitation = async (req, res, next) => {
  const { toUserId, eventId } = req.body;

  try {
    if (!toUserId || !eventId) {
      req.flash("errors", "Form data missing.");
      return res.redirect("/events");
    }

    await EventRequest.destroy({
      where: { fromUserId: req.user.id, toUserId, eventId },
    });

    req.flash("success", "Invitation deleted.");
    res.redirect("/events");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.postSendInvitation = async (req, res, next) => {
  try {
    /* 
      Checks if it's a valid invitation and returns the 
      user that is going to be invitated
    */
    const user = await isValidInvitation(req, res);

    if (!user) return res.redirect("back");

    await EventRequest.create({
      eventId: req.body.eventId,
      toUserId: user.id,
      fromUserId: req.user.id,
      userId: req.user.id,
    });

    req.flash(
      "success",
      `Your friend  '${user.username}'  has been invited to the event.`
    );
    res.redirect("/events");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.postDeleteEvent = async (req, res, next) => {
  try {
    const { id } = req.body;

    await Event.destroy({ where: { id } });

    req.flash("success", `Event deleted.`);
    res.redirect("/events");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};
