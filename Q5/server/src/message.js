var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().valueOf()
  };
};

module.exports = {generateMessage};
