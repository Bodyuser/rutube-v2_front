import CreateCategory from '@/components/screens/create-category/CreateCategory'
import { NextPageAuth } from '@/shared/types/props-page/props-page.types'

const CreateCategoryPage: NextPageAuth = () => {
  return <CreateCategory />
}

CreateCategoryPage.isOnlyAdmin = true

export default CreateCategoryPage