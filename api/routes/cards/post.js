const { cardData } = require('../data');

const postCards = (req, res) => {
  console.log(req.body)
  cardData.push(req.body);
  console.log(cardData)
  res.send(cardData);
};

exports.postCards = postCards;
