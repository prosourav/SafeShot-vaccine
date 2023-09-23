const config = {
  totalItems: 0,
  limit: 2,
  page: 1,
  sortType: 'dsc',
  sortBy: 'updatedAt',
  search: '',
  expands: [],
  status: 'pending',
  reviewFilter: 'approved',
  vaccines: ['Pneumonia', 'Covid', 'Viral']
};

module.exports = Object.freeze(config);