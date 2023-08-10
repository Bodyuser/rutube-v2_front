import Following from "@/components/screens/following/Following"
import { NextPageAuth } from "@/shared/types/props-page/props-page.types"

const FollowingPage: NextPageAuth =
	() => {
		return <Following />
	}

FollowingPage.title = "Подписки"
FollowingPage.description =
	"На кого вы подписаны"

export default FollowingPage
