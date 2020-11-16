module.exports = {
  passwordCheck(req, res) {
    if (!req.params.password || req.params.password !== "uEGGTVVtLggFTizCsMtwOJnRhjaQ2BMUQhcY") {
      let message = {message: "Password incorrect"}
      return res.status(400).send(message);
    }else {
      let message = {message: "Password incorrect"}
      return res.status(204).send(message);
    }
  },
};
