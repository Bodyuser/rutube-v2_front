import UpdateProfile from "@/components/screens/update-profile/UpdateProfile"
import { NextPageAuth } from "@/shared/types/props-page/props-page.types"

const UpdateProfilePage: NextPageAuth =
	() => {
		return <UpdateProfile />
	}

UpdateProfilePage.isOnlyUser = true

UpdateProfilePage.title =
	"Обновление профиля"
UpdateProfilePage.description =
	"Страница обновления пользователя"

export default UpdateProfilePage
