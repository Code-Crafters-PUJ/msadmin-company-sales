class EmailError extends Error {
  public status: number = 400

  constructor(message: string) {
    super(message)
    this.name = 'EmailError'
  }
}

export default EmailError
