'use strict';


const wallets = [
  {
    walletId: 1,
    cards: [
     {
      card_holder: "Konstantinos Panagiotou",
      cardNumber: 1111222233334444,
      cvv: 107,
      exp_date: 22032032
    },
    {
      card_holder: "Konstantinos Panagiotou",
      cardNumber: 5555666677778888,
      cvv: 110,
      exp_date: 22062062
    }
  ]
  },
  {
    walletId: 2,
    cards:[ {
      card_holder: "John Doe",
      cardNumber: 2222333344445555,
      cvv: 108,
      exp_date: 22042042
    }]
  },
  {
    walletId: 3,
    cards: [{
      card_holder: "Jane Doe",
      cardNumber: 3333444455556666,
      cvv: 109,
      exp_date: 22052052
    }]
  },
  {
    walletId: 4,
    cards: [{
      card_holder: "John Smith",
      cardNumber: 4444555566667777,
      cvv: 110,
      exp_date: 22062062
    }]
  },
  {
    walletId: 5,
    cards: [{
      card_holder: "Jane Smith",
      cardNumber: 5555666677778888,
      cvv: 111,
      exp_date: 22072072
    }]
  },
  {walletId: 6,
    cards: [{
    }]
  }
];



/**
 * Add a new card in your wallet.
 * FR2: The user must be able to manage their cards. (add card) 
 *
 * body Card 
 * walletId Integer Id of the user's wallet
 * returns Card
 **/
exports.addCard = function(body,walletId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "card_holder" : "Konstantinos Panagiotou",
  "cvv" : 107,
  "card_number" : 1111222233334444,
  "exp_date" : 22032032
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Remove a card from your wallet.
 * FR2: The user must be able to manage their cards. (remove cards) 
 *
 * walletId Integer Id of the user's wallet
 * cardNumber Integer Number of a user's card
 * returns Success
 **/
exports.removeCard = function(walletId, cardNumber) {
  return new Promise(function(resolve, reject) {
    const wallet = wallets.find(wallet => wallet.walletId === walletId);

    if (wallet) {
      const cardIndex = wallet.cards.findIndex(card => card.cardNumber === cardNumber);

      if (cardIndex !== -1) {
        wallet.cards.splice(cardIndex, 1);
        resolve({ message: 'Card removed successfully' });
      } else {
        reject({ message: 'Card not found', code: 400 });
      }
    } else {
      reject({ message: 'Wallet not found', code: 404 });
    }
  });
}




/**
 * Use a card from your wallet.
 * FR3: The user must be able to use their cards. (use card) 
 *
 * body Wallet Wallet model (optional)
 * walletId Integer Id of the user's wallet
 * returns Success
 **/
exports.useCard = function(body,walletId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = { };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * View all cards in your wallet.
 * FR2: The user must be able to manage their cards. (view cards) 
 *
 * walletId Integer Id of the user's wallet
 * returns Cards
 **/
exports.viewCards = function(walletId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "card_holder" : "Konstantinos Panagiotou",
  "cvv" : 107,
  "card_number" : 1111222233334444,
  "exp_date" : 22032032
}, {
  "card_holder" : "Konstantinos Panagiotou",
  "cvv" : 107,
  "card_number" : 1111222233334444,
  "exp_date" : 22032032
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}