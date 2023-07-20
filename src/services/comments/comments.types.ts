export interface ICreateComment {
	text: string

	type: "comment" | "reply-comment"

  comment?: string
}

export interface IUpdateComment {
	text: string
}