export default class DispatchOrder {
	protected code: string | undefined
	protected issueDate: Date

	constructor(code: string | undefined, issueDate: Date) {
		this.code = code
		this.issueDate = issueDate
	}

	getCode(): string | undefined {
		return this.code
	}

	getIssueDate(): Date {
		return this.issueDate
	}
}
