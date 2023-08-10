import Catalog from "@/components/screens/catalog/Catalog"
import { NextPageSeo } from "@/shared/types/props-page/props-page.types"

const CatalogPage: NextPageSeo = () => {
	return <Catalog />
}

CatalogPage.title = "Каталог категория"
CatalogPage.description =
	"Список всех категорий"

export default CatalogPage
