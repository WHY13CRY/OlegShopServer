const searchItemService = require('../services/searchService');

const searchUserItem = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Missing query' });
    const results = await searchItemService.searchItem(query);
    res.json(results)
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {searchUserItem}
