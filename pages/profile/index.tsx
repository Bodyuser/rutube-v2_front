import { NextPageAuth } from '@/shared/types/props-page/props-page.types'
import { NextPage } from 'next'

const ProfilePage: NextPageAuth = () => {
  return <div>ProfilePage</div>
}

ProfilePage.isOnlyUser = true

export default ProfilePage