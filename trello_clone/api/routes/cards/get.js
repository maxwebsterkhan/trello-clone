const { cardData } = require("../data");

const getCards = (req, res) => {
 res.send(cardData);
}

exports.getCards = getCards;
