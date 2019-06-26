const { getData } = require('../../service/dataService');

handle = async (req, res) => {
    const boardData = getData('board') || [];
    const formattedBoard = boardData.reduce(
        function(accumulator, currentValue) {
          const match = accumulator.find(elt => elt.pricePerKg === currentValue.pricePerKg); 
          if(match) {
                  match.quantity = match.quantity + currentValue.quantity;
              } else {
                  const {pricePerKg, quantity, type} = currentValue;
                 accumulator = [...accumulator, {pricePerKg,quantity, type}]
              }
          return accumulator;
        },
        []
      );
    const sotedSellBoard = formattedBoard.filter(elt => elt.type === 'SELL').sort((elt1, elt2) => elt1.pricePerKg - elt2.pricePerKg);
    const sotedBuyBoard = formattedBoard.filter(elt => elt.type === 'BUY').sort((elt1, elt2) => elt2.pricePerKg - elt1.pricePerKg);
    res.json({
        currency: getData('currency'), 
        metric:  getData('metric'),
        board:  [...sotedSellBoard, ...sotedBuyBoard]
    });   
};
module.exports = {
    handle
}