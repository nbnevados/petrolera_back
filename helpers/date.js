const obtenerFechaSQL = () => {
  const now = new Date();
  const pad = (num, size = 2) => String(num).padStart(size, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
         `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${milliseconds}`;
};

module.exports = { obtenerFechaSQL };
