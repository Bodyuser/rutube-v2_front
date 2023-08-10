import Home from "@/components/screens/home/Home"
import { NextPageSeo } from "@/shared/types/props-page/props-page.types"

const HomePage: NextPageSeo = () => {
	return <Home />
}

HomePage.title = "Главная"
HomePage.description =
	"Rutube - видеохостинг"

export default HomePage
