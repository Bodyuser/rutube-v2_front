import Profile from "@/components/screens/profile/Profile"
import { NextPageAuth } from "@/shared/types/props-page/props-page.types"

const ProfilePage: NextPageAuth =
	() => {
		return <Profile />
	}

ProfilePage.isOnlyUser = true

ProfilePage.title = "Профиль"
ProfilePage.description =
	"Страница вашего профиля"

export default ProfilePage
