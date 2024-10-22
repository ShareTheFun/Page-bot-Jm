const axios = require('axios');

exports.config = {
  name: 'lyrics',
  description: 'Fetch song lyrics by song title or artist',
  author: 'Mart John Labaco',
  category: 'music',
  guide: 'Use the command followed by the song title or artist name to fetch the lyrics.'
};

exports.initialize = async function({ senderId, args, token, bot }) {
  if (!args.length) {
    return bot.sendMessage(senderId, 'Please provide a song title or artist to search for lyrics.');
  }

  const query = args.join(' ');
  const apiUrl = `https://king-luffy.onrender.com/api/lyrics?query=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status && data.result && data.result.lyrics) {
      bot.sendMessage(senderId, data.result.lyrics);
    } else {
      bot.sendMessage(senderId, 'Sorry, no lyrics found for your query.');
    }
  } catch (error) {
    bot.sendMessage(senderId, 'An error occurred while fetching lyrics.');
  }
};
