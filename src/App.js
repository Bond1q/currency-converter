import { getCurrrenciesListApi } from "./api/api";
import { ArrowToTop } from "./Components/ArrowToTop/ArrowToTop";
import Converter from "./Components/Converter/Converter"
import Currencies from "./Components/Currencies/Currencies"


const App = () => {
	getCurrrenciesListApi();

	return (
		<div className="App">
			<Converter />
			<Currencies />
			<ArrowToTop />
		</div>
	);
}

export default App;
