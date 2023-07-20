import Following from '@/components/screens/following/Following'
import { NextPageAuth } from '@/shared/types/props-page/props-page.types'

const FollowingPage: NextPageAuth = () => {
  return <Following />
}

FollowingPage.isOnlyUser = true

export default FollowingPage