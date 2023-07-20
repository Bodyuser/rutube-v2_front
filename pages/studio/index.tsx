import Studio from '@/components/screens/studio/Studio'
import { NextPageAuth } from '@/shared/types/props-page/props-page.types'

const StudioPage: NextPageAuth = () => {
  return <Studio />
}

StudioPage.isOnlyUser = true

export default StudioPage