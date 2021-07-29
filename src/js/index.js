import { PageList } from "./PageList";
import { Home } from "./Home";
import { PageDetail } from "./PageDetail";
import "../sass/style.scss";
const routes = {
	"": Home,
	"pagelist": PageList,
	"pagedetail": PageDetail,
  };

let pageArgument;

const setRoute = () => {
	window.addEventListener("hashchange", (e) => console.log("important",e));
	let path = window.location.hash.substring(1).split("/");
	pageArgument = path[1] || "";
	routes[path[0]](pageArgument);
	return true;
  };

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());