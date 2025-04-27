function sanitize(val) {
  return (val && val.trim() !== '') ? val : 'N/A';
}

module.exports = { sanitize };