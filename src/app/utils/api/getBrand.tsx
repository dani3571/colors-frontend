
function obtainGama() {
  const string = navigator.userAgent;
  const userAgent = string;
  if (
    userAgent.toLowerCase().includes("iphone") ||
    userAgent.toLowerCase().includes("ipad") ||
    userAgent.toLowerCase().includes("ipod")
  ) {
    return "gama alta";
  } else if (userAgent.toLowerCase().includes("samsung")) {
    return "gama alta";
  } else if (userAgent.toLowerCase().includes("huawei")) {
    return "gama alta";
  } else if (userAgent.toLowerCase().includes("xiaomi")) {
    return "gama media";
  } else if (userAgent.toLowerCase().includes("google pixel")) {
    return "gama alta";
  } else if (userAgent.toLowerCase().includes("lg")) {
    return "gama baja";
  } else if (userAgent.toLowerCase().includes("motorola")) {
    return "gama media";
  } else if (userAgent.toLowerCase().includes("sony")) {
    return "gama media";
  } else if (userAgent.toLowerCase().includes("oneplus")) {
    return "gama media";
  } else if (userAgent.toLowerCase().includes("nokia")) {
    return "gama media";
  } else if (userAgent.toLowerCase().includes("asus")) {
    return "gama baja";
  } else if (userAgent.toLowerCase().includes("htc")) {
    return "gama baja";
  } else if (userAgent.toLowerCase().includes("blackberry")) {
    return "gama baja";
  } else if (userAgent.toLowerCase().includes("windows")) {
    return "gama media";
  } else if (userAgent.toLowerCase().includes("macintosh")) {
    return "gama alta";
  } else if (userAgent.toLowerCase().includes("linux")) {
    return "gama media";
  } else {
    return "marca no registrada";
  }
}
export default obtainGama;
