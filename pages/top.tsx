import Top from "@/components/screens/top/Top"
import { NextPageSeo } from "@/shared/types/props-page/props-page.types"

const TopPage: NextPageSeo = () => {
	return <Top />
}

TopPage.title = "Топ"
TopPage.description =
	"Популярные видео в последний месяц"

export default TopPage
