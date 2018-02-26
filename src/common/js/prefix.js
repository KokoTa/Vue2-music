// 浏览器属性检测
const el = document.createElement('div').style;

const vendor = (() => {
  const names = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform',
  };

  const keys = Object.keys(names);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (el[names[key]] !== undefined) {
      return key;
    }
    return false;
  }

  return false;
})();

export default function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
